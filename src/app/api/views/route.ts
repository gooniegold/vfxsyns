import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "edge";

export async function GET() {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("page_views")
    .select("count")
    .eq("id", 1)
    .single();
  if (error) return NextResponse.json({ count: 3533 });
  return NextResponse.json({ count: data.count });
}

export async function POST() {
  const db = supabaseAdmin();
  const { data, error } = await db.rpc("increment_views");
  if (error) {
    // fallback: manual increment
    const { data: cur } = await db.from("page_views").select("count").eq("id", 1).single();
    const next = (cur?.count ?? 3533) + 1;
    await db.from("page_views").update({ count: next, updated_at: new Date().toISOString() }).eq("id", 1);
    return NextResponse.json({ count: next });
  }
  return NextResponse.json({ count: data });
}
