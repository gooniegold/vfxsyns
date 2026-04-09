import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const VIDEO_EXTENSIONS = [".mp4", ".mov", ".webm", ".m4v"];

function detectCategory(baseName: string): "MUSIC VIDEO" | "COLOR GRADE" | null {
  const n = baseName.toLowerCase();
  if (n.includes("musicvideo") || n.includes("music_video") || n.includes("music-video") || n.includes("music video")) {
    return "MUSIC VIDEO";
  }
  if (n.includes("colorgrade") || n.includes("color_grade") || n.includes("color-grade") || n.includes("color grade")) {
    return "COLOR GRADE";
  }
  return null;
}

function titleFromBaseName(baseName: string): string {
  return baseName
    .replace(/[_-]+/g, " ")
    .replace(/\b(music video|musicvideo|color grade|colorgrade|3d)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (s) => s.toUpperCase()) || "Untitled";
}

export async function GET() {
  try {
    const roots = [
      { dir: path.join(process.cwd(), "portfolio"), viaApi: true },
      { dir: path.join(process.cwd(), "public", "portfolio"), viaApi: false },
      { dir: path.join(process.cwd(), "src", "components", "portfolio"), viaApi: true },
    ];

    const collected: Array<{ file: string; viaApi: boolean }> = [];
    for (let i = 0; i < roots.length; i += 1) {
      const root = roots[i];
      try {
        const files = await fs.readdir(root.dir);
        for (let j = 0; j < files.length; j += 1) {
          collected.push({ file: files[j], viaApi: root.viaApi });
        }
      } catch {
      }
    }

    const items = collected
      .filter((entry) => VIDEO_EXTENSIONS.includes(path.extname(entry.file).toLowerCase()))
      .map((entry) => {
        const file = entry.file;
        const ext = path.extname(file);
        const base = path.basename(file, ext);
        const category = detectCategory(base) || "MUSIC VIDEO";
        const encodedFile = encodeURIComponent(file);
        return {
          title: titleFromBaseName(base),
          category,
          videoSrc: entry.viaApi ? `/api/portfolio-media/${encodedFile}` : `/portfolio/${encodedFile}`,
          desc: "Premium finish built for speed, clarity, and client-ready delivery.",
        };
      })
      .filter(Boolean);

    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json({ ok: true, items: [] });
  }
}
