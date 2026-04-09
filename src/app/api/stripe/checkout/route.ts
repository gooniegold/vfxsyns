import { NextRequest, NextResponse } from "next/server";
import {
  getMaxActivations,
  getProductName,
  getStripeClient,
  resolveDownloadUrl,
  resolvePriceId,
} from "@/lib/stripe-server";

type Body = {
  productHandle?: string;
  successUrl?: string;
  cancelUrl?: string;
};

export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const productHandle = String(body.productHandle || "").trim().toLowerCase();
  const successUrl = String(body.successUrl || "").trim();
  const cancelUrl = String(body.cancelUrl || "").trim();
  if (!productHandle || !successUrl || !cancelUrl) {
    return NextResponse.json(
      { ok: false, message: "productHandle, successUrl, cancelUrl are required" },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripeClient();
    const priceId = resolvePriceId(productHandle);
    const downloadUrl = resolveDownloadUrl(productHandle);
    const maxActivations = getMaxActivations();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_creation: "always",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        product: getProductName(),
        productHandle,
        downloadUrl,
        maxActivations: String(maxActivations),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { ok: false, message: "Stripe session missing checkout URL" },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout setup failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
