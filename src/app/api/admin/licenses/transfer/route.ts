import { NextRequest, NextResponse } from "next/server";
import { transferLicense } from "@/lib/license-api";
import { requireAdminOrResponse } from "@/lib/admin-route-auth";

type Body = {
  licenseKey?: string;
};

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminOrResponse();
  if (unauthorized) return unauthorized;

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const licenseKey = String(body.licenseKey || "").trim();
  if (!licenseKey) {
    return NextResponse.json({ ok: false, message: "licenseKey is required" }, { status: 400 });
  }

  try {
    await transferLicense(licenseKey);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Transfer failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
