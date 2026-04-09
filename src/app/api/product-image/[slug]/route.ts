import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];
const IMAGE_MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function isMatch(fileName: string, slug: string): boolean {
  const n = fileName.toLowerCase();
  const s = slug.toLowerCase();
  if (s === "free") return n.includes("quickdraft") && n.includes("free");
  if (s === "pro") return n.includes("quickdraft") && n.includes("pro");
  return false;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;
  const slug = (params.slug || "").toLowerCase();
  if (!slug) {
    return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });
  }

  const roots = [
    path.join(process.cwd(), "products"),
    path.join(process.cwd(), "public", "products"),
  ];

  for (let i = 0; i < roots.length; i += 1) {
    const root = roots[i];
    try {
      const files = await fs.readdir(root);
      for (let j = 0; j < files.length; j += 1) {
        const file = files[j];
        const ext = path.extname(file).toLowerCase();
        if (!IMAGE_EXTENSIONS.includes(ext)) continue;
        if (!isMatch(file, slug)) continue;
        const filePath = path.join(root, file);
        const buffer = await fs.readFile(filePath);
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": IMAGE_MIME[ext] || "application/octet-stream",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch {
    }
  }

  return NextResponse.json({ ok: false, error: "Image not found" }, { status: 404 });
}
