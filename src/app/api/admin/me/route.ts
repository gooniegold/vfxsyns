import { NextResponse } from "next/server";
import { getIsAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  const authenticated = await getIsAdminAuthenticated();
  return NextResponse.json({ ok: true, authenticated });
}
