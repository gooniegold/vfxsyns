import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { issueLicense, licenseProductIdForHandle } from "@/lib/license-api";
import { sendLicenseEmail } from "@/lib/license-email";
import { buildDiskDownloadUrl } from "@/lib/disk-download";
import {
  getMaxActivations,
  getStripePriceMap,
  getStripeClient,
  getWebhookSecret,
  tryResolveDownloadUrl,
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

/**
 * Stripe does not host your downloadable files. Put the file on R2, S3, Vercel Blob, etc.,
 * then set Product metadata key `download_url` in the Dashboard, or use STRIPE_DOWNLOAD_URL_MAP.
 */
async function firstLineProduct(
  stripe: Stripe,
  sessionId: string,
): Promise<{ product: Stripe.Product | null; priceId: string }> {
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
    limit: 8,
    expand: ["data.price.product"],
  });

  for (const item of lineItems.data) {
    const price = item.price;
    if (!price || typeof price === "string") continue;
    if ("deleted" in price && price.deleted) continue;

    const priceId = String(price.id || "").trim();
    const prod = price.product;

    if (prod && typeof prod === "object" && !("deleted" in prod && (prod as { deleted?: boolean }).deleted)) {
      return { product: prod as Stripe.Product, priceId };
    }
    if (typeof prod === "string") {
      try {
        const p = await stripe.products.retrieve(prod);
        return { product: p, priceId };
      } catch {
        continue;
      }
    }
  }

  return { product: null, priceId: "" };
}

async function handleCheckoutCompleted(
  stripe: Stripe,
  session: {
    id: string;
    customer_details?: { email?: string | null };
    metadata?: Record<string, string | undefined> | null;
  },
) {
  const email = String(session.customer_details?.email || "").trim().toLowerCase();
  if (!email) return;

  const metadata = session.metadata || {};
  const { product: stripeProduct, priceId } = await firstLineProduct(stripe, session.id);

  let productHandle = String(metadata.productHandle || "").trim().toLowerCase();
  if (!productHandle && priceId) {
    productHandle = reversePriceMap()[priceId] || "";
  }
  if (!productHandle && stripeProduct?.metadata) {
    productHandle = String(
      stripeProduct.metadata.product_handle || stripeProduct.metadata.handle || "",
    )
      .trim()
      .toLowerCase();
  }

  let downloadUrl = String(metadata.downloadUrl || "").trim();
  if (!downloadUrl && stripeProduct?.metadata?.download_url) {
    downloadUrl = String(stripeProduct.metadata.download_url).trim();
  }
  if (!downloadUrl && productHandle) {
    const disk = buildDiskDownloadUrl(productHandle, session.id);
    if (disk) downloadUrl = disk;
  }
  if (!downloadUrl && productHandle) {
    downloadUrl = tryResolveDownloadUrl(productHandle);
  }
  if (!downloadUrl) {
    downloadUrl = String(process.env.STRIPE_DEFAULT_DOWNLOAD_URL || "").trim();
  }

  let maxActivations = getMaxActivations();
  const metaMax = Number(metadata.maxActivations || "");
  if (Number.isFinite(metaMax) && metaMax > 0) {
    maxActivations = Math.floor(metaMax);
  } else if (stripeProduct?.metadata?.max_activations) {
    const n = Number(stripeProduct.metadata.max_activations);
    if (Number.isFinite(n) && n > 0) maxActivations = Math.floor(n);
  }

  const licenseProduct = licenseProductIdForHandle(productHandle || "quickdraft");

  const licenseKey = await issueLicense({
    email,
    orderId: session.id,
    maxActivations,
    product: licenseProduct,
  });

  await sendLicenseEmail({
    to: email,
    orderId: session.id,
    licenseKey,
    ...(downloadUrl ? { downloadUrl } : {}),
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
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, getWebhookSecret());
    } catch {
      return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(stripe, event.data.object as never);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
