import { NextRequest, NextResponse } from "next/server";
import { issueLicense } from "@/lib/license-api";

type IssueRequestBody = {
  email?: string;
  orderId?: string;
  maxActivations?: number;
  /** Overrides LICENSE_PRODUCT_MAP / default */
  product?: string;
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

  let body: IssueRequestBody;
  try {
    body = (await request.json()) as IssueRequestBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const orderId = String(body.orderId || "").trim();
  const maxActivations = Number(body.maxActivations || 1);
  const product = String(body.product || "").trim() || "quickdraft";

  if (!email || !orderId) {
    return NextResponse.json(
      { ok: false, message: "email and orderId are required" },
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
    return NextResponse.json({ ok: true, key });
  } catch (error) {
    const message = error instanceof Error ? error.message : "License issue failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
