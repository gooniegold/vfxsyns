import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 300; // cache 5 min

export async function GET() {
  const username = process.env.NEXT_PUBLIC_SOUNDCLOUD_USERNAME ?? "vfxsyn";
  try {
    // Resolve user via SoundCloud oEmbed (public, no auth needed)
    const oembed = await fetch(
      `https://soundcloud.com/oembed?url=https://soundcloud.com/${username}&format=json`,
      { next: { revalidate: 300 } }
    );
    if (!oembed.ok) throw new Error("oembed failed");
    const data = await oembed.json();
    return NextResponse.json({
      username,
      title: data.title ?? username,
      thumbnail: data.thumbnail_url ?? null,
      embed_html: data.html ?? null,
      profile_url: `https://soundcloud.com/${username}`,
    });
  } catch {
    return NextResponse.json({
      username,
      title: username,
      thumbnail: null,
      embed_html: null,
      profile_url: `https://soundcloud.com/${username}`,
    });
  }
}
