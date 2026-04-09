import { NextRequest, NextResponse } from "next/server";
import { issueLicense } from "@/lib/license-api";
import { sendLicenseEmail } from "@/lib/license-email";

type Body = {
  email?: string;
  orderId?: string;
  downloadUrl?: string;
  maxActivations?: number;
};

function isAuthorized(request: NextRequest): boolean {
  const expected = String(process.env.LICENSE_WEBHOOK_SECRET || "").trim();
  if (!expected) return false;
  const provided = String(request.headers.get("x-webhook-secret") || "").trim();
  return provided === expected;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const orderId = String(body.orderId || "").trim();
  const downloadUrl = String(body.downloadUrl || "").trim();
  const maxActivations = Number(body.maxActivations || 1);
  if (!email || !orderId || !downloadUrl) {
    return NextResponse.json(
      { ok: false, message: "email, orderId, and downloadUrl are required" },
      { status: 400 }
    );
  }

  try {
    const key = await issueLicense({
      email,
      orderId,
      maxActivations: maxActivations > 0 ? Math.floor(maxActivations) : 1,
    });
    await sendLicenseEmail({
      to: email,
      licenseKey: key,
      downloadUrl,
      orderId,
    });
    return NextResponse.json({ ok: true, key, emailed: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook fulfillment failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
