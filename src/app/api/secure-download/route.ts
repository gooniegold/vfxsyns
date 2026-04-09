import fs from "node:fs";
import { Readable } from "node:stream";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { fileExists, resolveFilePathForHandle, verifyDownloadToken } from "@/lib/disk-download";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Streams a file from DOWNLOAD_FILES_ROOT when `t` is a valid signed token.
 * Only works on the machine that hosts those files (self-hosted). Not for Vercel + files on your PC.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("t");
  if (!token) {
    return NextResponse.json({ ok: false, message: "Missing token" }, { status: 400 });
  }

  const payload = verifyDownloadToken(token);
  if (!payload) {
    return NextResponse.json({ ok: false, message: "Invalid or expired link" }, { status: 401 });
  }

  const filePath = resolveFilePathForHandle(payload.handle);
  if (!filePath) {
    return NextResponse.json({ ok: false, message: "Unknown product" }, { status: 404 });
  }

  if (!(await fileExists(filePath))) {
    return NextResponse.json({ ok: false, message: "File missing on server" }, { status: 404 });
  }

  const stat = await fs.promises.stat(filePath);
  const stream = fs.createReadStream(filePath);
  const filename = path.basename(filePath);

  const webStream = Readable.toWeb(stream) as unknown as BodyInit;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": String(stat.size),
      "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
