import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { issueLicense } from "@/lib/license-api";
import { sendLicenseEmail } from "@/lib/license-email";
import {
  getMaxActivations,
  getStripePriceMap,
  getStripeClient,
  getWebhookSecret,
  resolveDownloadUrl,
} from "@/lib/stripe-server";

export const runtime = "nodejs";

function reversePriceMap(): Record<string, string> {
  const byHandle = getStripePriceMap();
  const byPriceId: Record<string, string> = {};
  for (const [handle, priceId] of Object.entries(byHandle)) {
    byPriceId[String(priceId).trim()] = handle;
  }
  return byPriceId;
}

async function resolveProductHandleFromSession(
  stripe: Stripe,
  sessionId: string,
  metadata: Record<string, string | undefined>
): Promise<string> {
  const direct = String(metadata.productHandle || "").trim().toLowerCase();
  if (direct) return direct;

  const map = reversePriceMap();
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 5 });
  for (let i = 0; i < lineItems.data.length; i += 1) {
    const priceId = String(lineItems.data[i]?.price?.id || "").trim();
    const handle = map[priceId];
    if (handle) return handle;
  }
  return "";
}

async function handleCheckoutCompleted(stripe: Stripe, session: {
  id: string;
  customer_details?: { email?: string | null };
  metadata?: Record<string, string | undefined> | null;
}) {
  const email = String(session.customer_details?.email || "").trim().toLowerCase();
  if (!email) return;

  const metadata = session.metadata || {};
  const productHandle = await resolveProductHandleFromSession(stripe, session.id, metadata);
  const metadataDownloadUrl = String(metadata.downloadUrl || "").trim();
  let downloadUrl = metadataDownloadUrl;
  if (!downloadUrl) {
    try {
      downloadUrl = resolveDownloadUrl(productHandle || "quickdraft_free");
    } catch {
      downloadUrl = "";
    }
  }
  if (!downloadUrl) return;

  const maxRaw = Number(metadata.maxActivations || "");
  const maxActivations =
    Number.isFinite(maxRaw) && maxRaw > 0 ? Math.floor(maxRaw) : getMaxActivations();

  const licenseKey = await issueLicense({
    email,
    orderId: session.id,
    maxActivations,
  });

  await sendLicenseEmail({
    to: email,
    orderId: session.id,
    licenseKey,
    downloadUrl,
  });
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature") || "";
  if (!signature) {
    return NextResponse.json({ ok: false, message: "Missing stripe signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  try {
    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(rawBody, signature, getWebhookSecret());

    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(stripe, event.data.object as never);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
