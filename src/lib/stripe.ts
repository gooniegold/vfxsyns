import { loadStripe } from "@stripe/stripe-js";

// STRIPE DIRECT CHECKOUT SETUP NOTES:
// 1. Create products in Stripe Dashboard → Products
// 2. Copy Price IDs (price_xxx)
// 3. Create a serverless function (see template below)
// 4. That function POSTs to Stripe and returns a session URL
// 5. Use stripePromise then stripe.redirectToCheckout({ sessionId })
//
// Serverless template (Vercel /api/checkout, Netlify Function):
// POST body: { priceId: 'price_xxx', successUrl, cancelUrl }
// Returns: { url: 'https://checkout.stripe.com/...' }
// Server calls Stripe: stripe.checkout.sessions.create({ mode: 'payment', line_items: [...] })

const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = key ? loadStripe(key) : null;

export async function createStripeCheckout(priceId: string) {
  void priceId;
  console.info("Stripe direct checkout requires a backend endpoint.");
  console.info("Recommended: Vercel serverless function POST /api/checkout");
  console.info("Connect to: https://api.stripe.com/v1/checkout/sessions");
  return null;
}
