import { loadStripe } from "@stripe/stripe-js";

const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const provider = (process.env.NEXT_PUBLIC_CHECKOUT_PROVIDER || "").toLowerCase();

export const stripePromise = key ? loadStripe(key) : null;

export function isStripeCheckoutEnabled(): boolean {
  return provider === "stripe";
}

export async function createStripeCheckout(productHandle: string): Promise<string> {
  const successUrl = `${window.location.origin}/shop?checkout=success`;
  const cancelUrl = `${window.location.origin}/shop?checkout=cancel`;
  const response = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productHandle,
      successUrl,
      cancelUrl,
    }),
  });
  const data = (await response.json()) as {
    ok?: boolean;
    url?: string;
    message?: string;
  };
  if (!response.ok || !data.ok || !data.url) {
    throw new Error(data.message || "Stripe checkout failed");
  }
  return data.url;
}
