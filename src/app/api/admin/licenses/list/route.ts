import { NextRequest, NextResponse } from "next/server";
import { listLicenses } from "@/lib/license-api";
import { requireAdminOrResponse } from "@/lib/admin-route-auth";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdminOrResponse();
  if (unauthorized) return unauthorized;

  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim();

  try {
    const licenses = await listLicenses(q, 250);
    return NextResponse.json({ ok: true, licenses });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not list licenses";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
