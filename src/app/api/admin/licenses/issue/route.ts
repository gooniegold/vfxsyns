import { NextRequest, NextResponse } from "next/server";
import { issueLicense } from "@/lib/license-api";
import { requireAdminOrResponse } from "@/lib/admin-route-auth";

type Body = {
  email?: string;
  orderId?: string;
  maxActivations?: number;
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
  const maxActivations = Number(body.maxActivations || 1);
  if (!email || !orderId) {
    return NextResponse.json({ ok: false, message: "email and orderId are required" }, { status: 400 });
  }

  try {
    const key = await issueLicense({
      email,
      orderId,
      maxActivations: maxActivations > 0 ? Math.floor(maxActivations) : 1,
    });
    return NextResponse.json({ ok: true, key });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Issue failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
