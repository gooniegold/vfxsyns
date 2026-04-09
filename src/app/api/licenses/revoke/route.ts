import { NextRequest, NextResponse } from "next/server";
import { revokeLicense } from "@/lib/license-api";

type RevokeRequestBody = {
  licenseKey?: string;
};

function isAuthorized(request: NextRequest): boolean {
  const expected = String(process.env.LICENSE_ISSUE_SECRET || "").trim();
  if (!expected) return false;
  const provided = String(request.headers.get("x-license-secret") || "").trim();
  return provided === expected;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: RevokeRequestBody;
  try {
    body = (await request.json()) as RevokeRequestBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const licenseKey = String(body.licenseKey || "").trim();
  if (!licenseKey) {
    return NextResponse.json({ ok: false, message: "licenseKey is required" }, { status: 400 });
  }

  try {
    await revokeLicense(licenseKey);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "License revoke failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
