import { NextRequest, NextResponse } from "next/server";
import { issueLicense, licenseProductIdForHandle } from "@/lib/license-api";
import { sendLicenseEmail } from "@/lib/license-email";
import { requireAdminOrResponse } from "@/lib/admin-route-auth";

type Body = {
  email?: string;
  orderId?: string;
  downloadUrl?: string;
  maxActivations?: number;
  product?: string;
  productHandle?: string;
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

  const email = String(body.email || "").trim().toLowerCase();
  const orderId = String(body.orderId || "").trim();
  const downloadUrl = String(body.downloadUrl || "").trim();
  const maxActivations = Number(body.maxActivations || 1);
  const productExplicit = String(body.product || "").trim();
  const productHandle = String(body.productHandle || "").trim();
  const product =
    productExplicit ||
    (productHandle ? licenseProductIdForHandle(productHandle) : "quickdraft");
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
      product,
    });
    await sendLicenseEmail({
      to: email,
      licenseKey: key,
      downloadUrl,
      orderId,
    });
    return NextResponse.json({ ok: true, key, emailed: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Fulfillment failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
