import { loadStripe } from "@stripe/stripe-js";

const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const provider = (process.env.NEXT_PUBLIC_CHECKOUT_PROVIDER || "").toLowerCase();

export const stripePromise = key ? loadStripe(key) : null;

export function isStripeCheckoutEnabled(): boolean {
  return provider === "stripe";
}

export async function createStripeCheckout(productHandle: string): Promise<string> {
  const origin = window.location.origin;
  const successUrl = `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/shop?checkout=cancel`;
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
