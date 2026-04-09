import Stripe from "stripe";

const API_VERSION: Stripe.LatestApiVersion = "2026-03-25.dahlia";
const PRODUCT_NAME = "quickdraft";

function getEnv(name: string): string {
  const value = process.env[name];
  const clean = String(value || "").trim();
  if (!clean) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return clean;
}

export function getStripeClient(): Stripe {
  return new Stripe(getEnv("STRIPE_SECRET_KEY"), {
    apiVersion: API_VERSION,
  });
}

export type PriceMap = Record<string, string>;
export type DownloadMap = Record<string, string>;

function parseMap(value: string | undefined, envName: string): Record<string, string> {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error(`${envName} must be a JSON object`);
    }
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === "string" && v.trim()) {
        out[k.trim().toLowerCase()] = v.trim();
      }
    }
    return out;
  } catch {
    throw new Error(
      `${envName} must be valid JSON map, e.g. {"quickdraft":"price_123"}`
    );
  }
}

export function getStripePriceMap(): PriceMap {
  return parseMap(process.env.STRIPE_PRICE_MAP, "STRIPE_PRICE_MAP");
}

export function getStripeDownloadMap(): DownloadMap {
  return parseMap(process.env.STRIPE_DOWNLOAD_URL_MAP, "STRIPE_DOWNLOAD_URL_MAP");
}

export function resolvePriceId(productHandle: string): string {
  const map = getStripePriceMap();
  const key = productHandle.trim().toLowerCase();
  const id = map[key];
  if (!id) {
    throw new Error(`No Stripe price mapping found for product: ${productHandle}`);
  }
  return id;
}

export function resolveDownloadUrl(productHandle: string): string {
  const map = getStripeDownloadMap();
  const key = productHandle.trim().toLowerCase();
  const mapped = map[key];
  if (mapped) return mapped;
  const fallback = process.env.STRIPE_DEFAULT_DOWNLOAD_URL;
  if (fallback && fallback.trim()) return fallback.trim();
  throw new Error(
    `No download URL mapping found for product: ${productHandle}. Set STRIPE_DOWNLOAD_URL_MAP or STRIPE_DEFAULT_DOWNLOAD_URL.`
  );
}

export function getMaxActivations(): number {
  const raw = Number(process.env.LICENSE_MAX_ACTIVATIONS || "1");
  if (!Number.isFinite(raw) || raw <= 0) return 1;
  return Math.floor(raw);
}

export function getWebhookSecret(): string {
  return getEnv("STRIPE_WEBHOOK_SECRET");
}

export function getProductName(): string {
  return PRODUCT_NAME;
}
