import { notFound } from "next/navigation";
import Link from "next/link";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

/* ── Product catalogue (matches ShopView MANUAL_PRODUCTS) ── */
const PRODUCTS = [
  {
    handle: "quickdraft-free",
    title: "QuickDraft Free",
    badge: "FREE BUILD",
    price: "FREE",
    description:
      "Low-res review exports with a watermark locked on. Built for client passes — share rough cuts without worrying about unauthorised distribution.",
    features: [
      "720p watermarked export",
      "Client-review-friendly format",
      "One-click render from timeline",
      "Works with After Effects & Premiere",
    ],
    buyUrl: "https://buy.stripe.com/cNi5kw1gV0mOdYYbek77O00",
    available: false,
  },
  {
    handle: "quickdraft-pro",
    title: "QuickDraft Pro",
    badge: "PRO LICENSE",
    price: "$29",
    description:
      "Auto render queue, granular watermark controls, and faster handoffs when you're on a deadline. One-off purchase, instant download, yours forever.",
    features: [
      "Full-res exports with optional watermark",
      "Auto render queue — batch multiple comps",
      "Watermark position, opacity & scale controls",
      "Priority update access",
    ],
    buyUrl: null,
    available: false,
  },
  {
    handle: "automve",
    title: "VFXSYN AUTOMVE",
    badge: "PLUGIN",
    price: "SOON",
    description:
      "Automatic motion for music videos. Shakes, zoom outs, punch ins, and hit stops that follow your audio — so you spend less time keyframing.",
    features: [
      "Audio-reactive shake & zoom engine",
      "Hit-stop generator with custom hold frames",
      "BPM detection & beat-snap",
      "Works inside After Effects",
    ],
    buyUrl: null,
    available: false,
  },
];

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = PRODUCTS.find((p) => p.handle === handle);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-[900px] px-6 py-10 md:px-10">
        {/* Breadcrumb */}
        <PageBreadcrumb
          items={[
            { label: "HOME", href: "/" },
            { label: "SHOP", href: "/shop" },
            { label: product.title.toUpperCase() },
          ]}
        />

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {/* Left — product image placeholder */}
          <div
            className="flex aspect-square items-center justify-center rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <svg
              className="h-16 w-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1.5}
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </div>

          {/* Right — info */}
          <div className="flex flex-col justify-center space-y-5">
            {/* Badge + price */}
            <div className="flex items-center gap-3">
              <span
                className="rounded px-2 py-0.5 text-[9px] uppercase tracking-widest"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {product.badge}
              </span>
              <span
                className="text-[22px] font-semibold text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {product.price}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[28px] font-semibold leading-tight text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {product.title}
            </h1>

            {/* Description */}
            <p
              className="text-[13px] leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {product.description}
            </p>

            {/* Feature list */}
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span
                    className="h-1 w-1 shrink-0 rounded-full bg-white"
                    style={{ opacity: 0.4 }}
                  />
                  <span
                    className="text-[12px]"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            {product.available && product.buyUrl ? (
              <a
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center rounded-xl text-[13px] font-medium text-black transition-opacity hover:opacity-90"
                style={{ background: "#ffffff", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {product.price === "FREE" ? "Download Free" : `Buy — ${product.price}`}
              </a>
            ) : (
              <div
                className="flex h-11 w-full items-center justify-center rounded-xl text-[13px]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                Coming Soon
              </div>
            )}

            <Link
              href="/shop"
              className="text-center text-[11px] transition-colors"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}
            >
              ← back to shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
