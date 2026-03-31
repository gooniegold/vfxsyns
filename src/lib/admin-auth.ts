import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "qd_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14;

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function base64url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function sign(payload: string): string {
  const secret = getEnv("ADMIN_PANEL_SESSION_SECRET");
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUser = getEnv("ADMIN_PANEL_USERNAME");
  const expectedPass = getEnv("ADMIN_PANEL_PASSWORD");
  return username === expectedUser && password === expectedPass;
}

export function createSessionToken(username: string): string {
  const payloadObj = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const payload = base64url(JSON.stringify(payloadObj));
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

function safeParsePayload(token: string): { u: string; exp: number } | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const payload = parts[0];
  try {
    const decoded = Buffer.from(payload, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded) as { u: string; exp: number };
    if (!parsed || typeof parsed.u !== "string" || typeof parsed.exp !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const payload = parts[0];
  const sig = parts[1];
  const expectedSig = sign(payload);
  if (sig !== expectedSig) return false;
  const parsed = safeParsePayload(token);
  if (!parsed) return false;
  return parsed.exp > Math.floor(Date.now() / 1000);
}

export async function getIsAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}

export function getAdminSessionCookieName(): string {
  return ADMIN_SESSION_COOKIE;
}

export function getAdminSessionTtlSeconds(): number {
  return SESSION_TTL_SECONDS;
}
