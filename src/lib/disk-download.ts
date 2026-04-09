import { createHmac, timingSafeEqual } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { getSiteOrigin } from "@/lib/site";

type FileMap = Record<string, string>;

function parseFileMap(raw: string | undefined): FileMap {
  if (!raw?.trim()) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const out: FileMap = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === "string" && v.trim()) {
        out[k.trim().toLowerCase()] = v.trim();
      }
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * Self-hosted only: absolute folder on the machine running Next.js (your PC or VPS).
 * Vercel and other serverless hosts cannot see your home PC disk — upload to R2/S3/Blob instead.
 */
export function getDiskDownloadConfig(): {
  root: string;
  map: FileMap;
  secret: string;
  ttlSec: number;
} | null {
  const root = process.env.DOWNLOAD_FILES_ROOT?.trim();
  const secret = process.env.DOWNLOAD_SIGNING_SECRET?.trim();
  if (!root || !secret) return null;
  const map = parseFileMap(process.env.DOWNLOAD_FILE_MAP);
  if (Object.keys(map).length === 0) return null;
  const ttlRaw = Number(process.env.DOWNLOAD_LINK_TTL_SEC || 60 * 60 * 24 * 7);
  const ttlSec = Number.isFinite(ttlRaw) && ttlRaw > 60 ? Math.floor(ttlRaw) : 604800;
  return { root, map, secret, ttlSec };
}

export function getPublicBaseUrl(): string {
  return getSiteOrigin();
}

export function resolveFilePathForHandle(handle: string): string | null {
  const cfg = getDiskDownloadConfig();
  if (!cfg) return null;
  const key = handle.trim().toLowerCase();
  const mapped = cfg.map[key];
  if (!mapped) return null;
  const safe = path.basename(mapped.trim());
  if (!safe || safe !== mapped.trim()) return null;
  const full = path.join(cfg.root, safe);
  const resolvedRoot = path.resolve(cfg.root);
  const resolvedFile = path.resolve(full);
  if (!resolvedFile.startsWith(resolvedRoot + path.sep) && resolvedFile !== resolvedRoot) {
    return null;
  }
  return resolvedFile;
}

function signTokenBody(secret: string, body: string): string {
  return createHmac("sha256", secret).update(body).digest("base64url");
}

export function signDownloadToken(payload: { handle: string; orderId: string }): string {
  const cfg = getDiskDownloadConfig();
  if (!cfg) throw new Error("Disk download is not configured");
  const exp = Math.floor(Date.now() / 1000) + cfg.ttlSec;
  const body = JSON.stringify({
    v: 1,
    handle: payload.handle.trim().toLowerCase(),
    orderId: payload.orderId,
    exp,
  });
  const sig = signTokenBody(cfg.secret, body);
  return Buffer.from(body, "utf8").toString("base64url") + "." + sig;
}

export type VerifiedDownload = { handle: string; orderId: string };

export function verifyDownloadToken(token: string): VerifiedDownload | null {
  const cfg = getDiskDownloadConfig();
  if (!cfg) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const bodyB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let body: string;
  try {
    body = Buffer.from(bodyB64, "base64url").toString("utf8");
  } catch {
    return null;
  }
  const expected = signTokenBody(cfg.secret, body);
  if (sig.length !== expected.length) return null;
  if (!timingSafeEqual(Buffer.from(sig, "utf8"), Buffer.from(expected, "utf8"))) {
    return null;
  }
  let data: { v?: number; handle?: string; orderId?: string; exp?: number };
  try {
    data = JSON.parse(body) as { v?: number; handle?: string; orderId?: string; exp?: number };
  } catch {
    return null;
  }
  if (data.v !== 1 || !data.handle || typeof data.exp !== "number") return null;
  if (Math.floor(Date.now() / 1000) > data.exp) return null;
  return { handle: data.handle, orderId: String(data.orderId || "") };
}

/** Signed URL emailed after purchase (self-hosted with DOWNLOAD_FILES_ROOT). */
export function buildDiskDownloadUrl(handle: string, orderId: string): string | null {
  const cfg = getDiskDownloadConfig();
  if (!cfg?.map[handle.trim().toLowerCase()]) return null;
  const base = getPublicBaseUrl();
  if (!base) return null;
  try {
    const token = signDownloadToken({ handle, orderId });
    return `${base}/api/secure-download?t=${encodeURIComponent(token)}`;
  } catch {
    return null;
  }
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    const st = await fs.promises.stat(filePath);
    return st.isFile();
  } catch {
    return false;
  }
}
