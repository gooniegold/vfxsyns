import { NextRequest, NextResponse } from "next/server";
import { selfLookupLicense } from "@/lib/license-api";

type Body = {
  email?: string;
  licenseKey?: string;
};

export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const licenseKey = String(body.licenseKey || "").trim();
  if (!email || !licenseKey) {
    return NextResponse.json(
      { ok: false, message: "email and licenseKey are required" },
      { status: 400 }
    );
  }

  try {
    const license = await selfLookupLicense({ email, licenseKey });
    return NextResponse.json({ ok: true, license });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lookup failed";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
