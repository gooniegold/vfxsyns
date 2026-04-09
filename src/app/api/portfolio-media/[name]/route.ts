import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const VIDEO_MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".m4v": "video/x-m4v",
};

function safeFileName(input: string): string {
  return path.basename(input);
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> }
) {
  const params = await context.params;
  const name = safeFileName(decodeURIComponent(params.name || ""));
  if (!name) {
    return NextResponse.json({ ok: false, error: "Missing file name" }, { status: 400 });
  }

  const roots = [
    path.join(process.cwd(), "portfolio"),
    path.join(process.cwd(), "public", "portfolio"),
    path.join(process.cwd(), "src", "components", "portfolio"),
  ];

  for (let i = 0; i < roots.length; i += 1) {
    const filePath = path.join(roots[i], name);
    try {
      const buffer = await fs.readFile(filePath);
      const ext = path.extname(name).toLowerCase();
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": VIDEO_MIME[ext] || "application/octet-stream",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch {
    }
  }

  return NextResponse.json({ ok: false, error: "File not found" }, { status: 404 });
}
