import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe-server";

export const runtime = "nodejs";

/**
 * Stripe Checkout success URLs should use:
 *   /thank-you?session_id={CHECKOUT_SESSION_ID}
 * (Stripe replaces the placeholder.) Never put license keys in the URL.
 *
 * Sellhub: if you redirect here with your own opaque token instead, add a
 * separate route later (e.g. GET /api/order/sellhub?ref=…) — do not pass secrets in query strings.
 */

type LineOut = {
  title: string;
  quantity: number;
  downloadUrl: string | null;
};

function lineItemTitle(item: Stripe.LineItem): string {
  if (item.description) return item.description;
  const p = item.price?.product;
  if (p && typeof p === "object" && !("deleted" in p && p.deleted)) {
    return (p as Stripe.Product).name || "Product";
  }
  return "Product";
}

function productDownloadUrl(item: Stripe.LineItem): string | null {
  const p = item.price?.product;
  if (p && typeof p === "object" && !("deleted" in p && p.deleted)) {
    const url = (p as Stripe.Product).metadata?.download_url;
    if (url && String(url).trim()) return String(url).trim();
  }
  return null;
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")?.trim() || "";
  if (!sessionId.startsWith("cs_")) {
    return NextResponse.json({ ok: false, message: "Missing or invalid session_id" }, { status: 400 });
  }

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    const paid =
      session.payment_status === "paid" ||
      session.payment_status === "no_payment_required";

    if (!paid && session.status !== "complete") {
      return NextResponse.json(
        { ok: false, message: "Checkout not completed for this session" },
        { status: 400 },
      );
    }

    const email = String(session.customer_details?.email || session.customer_email || "").trim();
    const meta = session.metadata || {};
    const sessionDownload = String(meta.downloadUrl || "").trim() || null;
    const productHandle = String(meta.productHandle || "").trim() || null;

    const rawItems = session.line_items?.data || [];
    const lineItems: LineOut[] = rawItems.map((item) => ({
      title: lineItemTitle(item),
      quantity: item.quantity ?? 1,
      downloadUrl: productDownloadUrl(item),
    }));

    if (lineItems.length === 1 && !lineItems[0].downloadUrl && sessionDownload) {
      lineItems[0] = { ...lineItems[0], downloadUrl: sessionDownload };
    }

    return NextResponse.json({
      ok: true,
      email: email || null,
      currency: session.currency,
      amountTotal: session.amount_total,
      paymentStatus: session.payment_status,
      productHandle,
      sessionDownloadUrl: sessionDownload,
      lineItems,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Lookup failed";
    return NextResponse.json({ ok: false, message }, { status: 404 });
  }
}
