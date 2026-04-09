# Website

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment (Shopify shop)

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SHOPIFY_DOMAIN` — e.g. `your-store.myshopify.com` (no `https://`)
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` — Storefront API public token from Shopify Admin → Settings → Apps → Develop apps
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — optional; reserved for future direct Stripe checkout (Shopify checkout is the live path on `/shop`)
- `NEXT_PUBLIC_CHECKOUT_PROVIDER` — set `stripe` to enable Stripe checkout on `/shop`
- `STRIPE_SECRET_KEY` — Stripe secret key
- `STRIPE_WEBHOOK_SECRET` — webhook signing secret for `/api/stripe/webhook`
- `STRIPE_PRICE_MAP` — JSON map of product handle -> Stripe price id
- `STRIPE_DOWNLOAD_URL_MAP` — JSON map of product handle -> download URL
- `STRIPE_DEFAULT_DOWNLOAD_URL` — fallback download URL
- `LICENSE_MAX_ACTIVATIONS` — default activations per issued key
- `LICENSE_API_BASE_URL` — your deployed QuickDraft license Worker base URL
- `LICENSE_ADMIN_TOKEN` — admin bearer token configured in the Worker
- `LICENSE_ISSUE_SECRET` — shared secret required by local issue/revoke API routes
- `ADMIN_PANEL_USERNAME` — login user for `/admin/login`
- `ADMIN_PANEL_PASSWORD` — login password for `/admin/login`
- `ADMIN_PANEL_SESSION_SECRET` — HMAC secret for admin session cookie
- `RESEND_API_KEY` — Resend API key for delivery email
- `LICENSE_EMAIL_FROM` — sender identity for key delivery emails

## QuickDraft License API bridge (HWID lock)

Server routes added:

- `POST /api/licenses/issue`
- `POST /api/licenses/issue-owner`
- `POST /api/licenses/revoke`
- `GET /api/admin/licenses/list`
- `POST /api/admin/licenses/issue`
- `POST /api/admin/licenses/issue-owner`
- `POST /api/admin/licenses/revoke`
- `POST /api/admin/licenses/fulfill`
- `POST /api/webhooks/license-fulfill`

Both routes require header:

- `x-license-secret: <LICENSE_ISSUE_SECRET>`

Issue payload:

```json
{
  "email": "buyer@example.com",
  "orderId": "ORDER-1001",
  "maxActivations": 1
}
```

Set `maxActivations` to `1` for strict HWID lock (single machine activation).

Owner key (for you):

- Endpoint: `POST /api/licenses/issue-owner`
- Header: `x-license-secret: <LICENSE_ISSUE_SECRET>`
- Optional body:

```json
{
  "email": "you@yourdomain.com",
  "label": "main-workstation"
}
```

## Private keys panel

Routes:

- `/admin/login`
- `/admin/keys`

The panel lets you:

- Issue customer keys
- Issue owner keys
- Revoke keys
- Search/list keys
- Auto-fulfill order: issue key + email download link to buyer

## Fully automatic key + email delivery

Use your checkout success webhook to call:

- `POST /api/webhooks/license-fulfill`
- Header: `x-webhook-secret: <LICENSE_WEBHOOK_SECRET>`
- Body:

```json
{
  "email": "buyer@example.com",
  "orderId": "ORDER-1001",
  "downloadUrl": "https://yourdomain.com/downloads/quickdraft.zip",
  "maxActivations": 1
}
```

This route automatically:

1. Issues/retrieves the license key.
2. Sends key + download link to buyer email.

## Stripe (multi-product) checkout

Routes:

- `POST /api/stripe/checkout` (creates checkout session by `productHandle`)
- `POST /api/stripe/webhook` (issues key + emails buyer on payment success)

Set `NEXT_PUBLIC_CHECKOUT_PROVIDER=stripe` to make `/shop` use Stripe checkout.
The shop uses Shopify product handles and maps each handle to a Stripe Price ID with:

- `STRIPE_PRICE_MAP` (JSON object)

Example:

```json
{
  "quickdraft": "price_123",
  "vfx-pack-01": "price_456"
}
```

Webhook event supported:

- `checkout.session.completed`

<!-- When completed, the server: -->

1. Issues/retrieves license key.
2. Emails key + mapped download URL to the buyer email.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Fonts (Cinzel, Syne, Syne Mono) are loaded via `next/font` in `src/app/layout.tsx`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
