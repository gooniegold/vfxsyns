"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  createCheckout,
  getProducts,
  isShopifyConfigured,
  type ShopifyProductNode,
} from "@/lib/shopify";
import { createStripeCheckout, isStripeCheckoutEnabled } from "@/lib/stripe";
import ShinyText from "@/components/react-bits/ShinyText";
import { HoverSplitHeading } from "@/components/ui/HoverSplitHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassButton } from "@/components/ui/GlassButton";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { INSTAGRAM_URL } from "@/lib/constants";
import { SynSpinner } from "@/components/ui/SynSpinner";
import { BorderBeam } from "@/components/react-bits/BorderBeam";

type ManualProduct = {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceLabel: string;
  imagePath: string;
  badge: string;
  directBuyUrl?: string;
  comingSoon?: boolean;
  mediaFit?: "cover" | "contain";
};

const MANUAL_PRODUCTS: ManualProduct[] = [
  {
    id: "vfxsyn-automve",
    title: "VFXSYN AUTOMVE",
    description:
      "Automatic motion for music videos: shakes, zoom outs, punch ins, and hit stops that follow your audio so you spend less time keyframing.",
    handle: "vfxsyn-automve",
    priceLabel: "COMING SOON",
    imagePath: "/api/product-image/automve",
    badge: "PLUGIN",
    comingSoon: true,
    mediaFit: "cover",
  },
  {
    id: "quickdraft-free",
    title: "QuickDraft Free",
    description: "Low res review exports with watermark locked on. Good for client passes.",
    handle: "quickdraft-free",
    priceLabel: "FREE",
    imagePath: "/api/product-image/free",
    badge: "FREE BUILD",
    directBuyUrl: "https://buy.stripe.com/cNi5kw1gV0mOdYYbek77O00",
    comingSoon: true,
    mediaFit: "cover",
  },
  {
    id: "quickdraft-pro",
    title: "QuickDraft Pro",
    description: "Auto render queue, watermark controls, and faster handoffs when you are on a deadline.",
    handle: "quickdraft-pro",
    priceLabel: "$29",
    imagePath: "/api/product-image/pro",
    badge: "PRO LICENSE",
    comingSoon: true,
    mediaFit: "contain",
  },
];

const PRODUCT_OF_WEEK_IMAGE = "/api/product-image/free";

function productImage(p: ShopifyProductNode) {
  return p.images.edges[0]?.node?.url;
}

function variantId(p: ShopifyProductNode) {
  return p.variants.edges[0]?.node?.id;
}

function formatPrice(amount: string, currency: string) {
  const n = Number(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(n);
}

function ProductSkeleton() {
  return (
    <div className="overflow-hidden syn-glass">
      <div className="aspect-[4/3] shimmer-bg" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 shimmer-bg" />
        <div className="h-6 w-4/5 shimmer-bg" />
        <div className="h-3 w-full shimmer-bg" />
        <div className="h-10 w-full shimmer-bg" />
      </div>
    </div>
  );
}

function ProductMedia({
  src,
  title,
  badge,
  fit = "cover",
}: {
  src: string;
  title: string;
  badge: string;
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] border border-[var(--border-subtle)] bg-[#070b12]">
      {!failed ? (
        <img
          src={src}
          alt={title}
          loading="lazy"
          decoding="async"
          className={`h-full w-full ${fit === "contain" ? "object-contain p-2" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`}
          onError={() => setFailed(true)}
        />
      ) : null}
      {failed ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(168,85,247,0.2),transparent_32%),radial-gradient(circle_at_82%_24%,rgba(76,29,149,0.14),transparent_28%),linear-gradient(135deg,#07060f_0%,#120a1c_100%)]" />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(168,85,247,0.14),transparent_35%),radial-gradient(circle_at_82%_24%,rgba(139,92,246,0.1),transparent_30%)]" />
      )}
      <span className="font-mono absolute left-4 top-4 z-[4] border border-[var(--border-accent)] bg-[rgba(10,12,18,0.82)] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.3em] text-[var(--accent-bright)] backdrop-blur-md">
        {badge}
      </span>
      <div className="absolute left-5 bottom-5 z-[4]">
        <p className="font-display text-[22px] tracking-[0.03em] text-[var(--text-primary)]">{title}</p>
      </div>
    </div>
  );
}

export function ShopView({ pageHeader }: { pageHeader?: ReactNode }) {
  const [products, setProducts] = useState<ShopifyProductNode[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const stripeCheckout = isStripeCheckoutEnabled();

  useEffect(() => {
    let cancelled = false;
    if (!isShopifyConfigured()) {
      setLoading(false);
      setError("not_configured");
      return;
    }
    (async () => {
      try {
        const data = await getProducts(20);
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "fetch_failed");
          setProducts(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleBuyNow = useCallback(async (p: ShopifyProductNode) => {
    const handle = String(p.handle || "").trim().toLowerCase();
    const vid = variantId(p);
    if (!handle) return;
    setCheckoutLoading(handle);
    try {
      if (stripeCheckout) {
        const url = await createStripeCheckout(handle);
        window.location.href = url;
        return;
      }
      if (!vid) {
        throw new Error("Missing product variant ID");
      }
      const cart = await createCheckout(vid, 1);
      window.location.href = cart.checkoutUrl;
    } catch {
      setCheckoutLoading(null);
      alert("Checkout could not start. Try again or DM @vfxsyn on Instagram.");
    }
  }, [stripeCheckout]);

  const handleManualBuyNow = useCallback(async (productHandle: string) => {
    if (!productHandle) return;
    setCheckoutLoading(productHandle);
    try {
      const manualProduct = MANUAL_PRODUCTS.find((p) => p.handle === productHandle);
      if (manualProduct?.comingSoon) {
        setCheckoutLoading(null);
        return;
      }
      const directBuyUrl = String(manualProduct?.directBuyUrl || "").trim();
      if (directBuyUrl) {
        window.location.href = directBuyUrl;
        return;
      }
      if (stripeCheckout) {
        const url = await createStripeCheckout(productHandle);
        window.location.href = url;
        return;
      }
      window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
    } catch {
      setCheckoutLoading(null);
      alert("Checkout could not start. Add Stripe mapping for this handle or use DM checkout.");
    }
  }, [stripeCheckout]);

  const showGrid = !error && products && products.length > 0;
  const showEmpty = !loading && !error && products && products.length === 0;

  return (
    <div className="relative bg-[var(--bg-base)]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_15%_10%,rgba(36,210,155,0.18),transparent_28%),radial-gradient(circle_at_80%_26%,rgba(112,216,255,0.14),transparent_24%)]" />
      {pageHeader}

      <section className="relative z-[1] px-6 pb-8 md:px-10">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[24px] border border-[var(--border-accent)] bg-[rgba(8,12,18,0.85)] shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_1fr] md:items-center md:p-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent-bright)]">
                FEATURED
              </p>
              <h2 className="font-display mt-4 text-[clamp(36px,5vw,68px)] leading-[0.95] tracking-[0.03em] text-[var(--text-primary)]">
                QUICKDRAFT <span className="text-[var(--accent)]">FREE</span>
              </h2>
              <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Watermarked review builds so clients can comment without leaking a clean master.
              </p>
              <div className="mt-7">
                <button
                  type="button"
                  data-cursor="hover"
                  disabled
                  onClick={() => handleManualBuyNow("quickdraft-free")}
                  className="font-ui inline-flex min-h-[48px] cursor-not-allowed items-center justify-center rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-card)] px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text-secondary)] opacity-80"
                >
                  COMING SOON
                </button>
              </div>
            </div>
            <ProductMedia src={PRODUCT_OF_WEEK_IMAGE} title="QuickDraft Free" badge="FEATURED" />
          </div>
        </div>
      </section>

      <section className="relative z-[1] px-6 pb-[120px] md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 flex items-end justify-between gap-5 border-b border-[var(--border-subtle)] pb-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent-bright)]">
                CATALOG
              </p>
              <h3 className="font-display mt-3 text-[clamp(30px,4vw,54px)] tracking-[0.03em] text-[var(--text-primary)]">
                QUICKDRAFT LINE
              </h3>
            </div>
            <p className="max-w-[420px] text-right text-[13px] text-[var(--text-secondary)]">
              One-time purchase, digital delivery, license in your inbox.
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {MANUAL_PRODUCTS.map((p, i) => {
              const busy = checkoutLoading === p.handle;
              return (
                <ScrollReveal key={p.id} delay={i * 0.06}>
                  <TiltGlare
                    className="group/card w-full rounded-[24px]"
                    tiltAmount={6}
                    tiltClassName="rounded-[24px] shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
                  >
                    <div className="syn-card-premium !block h-full overflow-hidden">
                      <div className="p-6">
                        <ProductMedia src={p.imagePath} title={p.title} badge={p.badge} fit={p.mediaFit} />
                      </div>
                      <div className="px-8 pb-8">
                        <p className="font-body min-h-[44px] text-[14px] leading-relaxed text-[var(--text-secondary)]">
                          {p.description}
                        </p>
                        <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-5">
                          <span className="font-display text-[24px] text-white">{p.priceLabel}</span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-dim)]">
                            {p.handle}
                          </span>
                        </div>
                        <button
                          type="button"
                          data-cursor="hover"
                          disabled={busy || Boolean(p.comingSoon)}
                          onClick={() => handleManualBuyNow(p.handle)}
                          className="font-ui mt-8 flex min-h-[52px] w-full items-center justify-center rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {busy ? (
                            <span className="inline-flex items-center gap-2">
                              <SynSpinner className="h-4 w-4 border border-[rgba(120,103,255,0.35)] border-t-white" />
                              SECURE CHECKOUT...
                            </span>
                          ) : (
                            "COMING SOON"
                          )}
                        </button>
                      </div>
                      <BorderBeam size={160} duration={4} colorFrom="var(--accent)" colorTo="var(--accent-secondary)">
                        <div className="absolute inset-0" />
                      </BorderBeam>
                    </div>
                  </TiltGlare>
                </ScrollReveal>
              );
            })}
          </div>

          {loading ? (
            <div className="relative flex flex-col items-center">
              <div className="mb-8 flex items-center gap-3">
                <SynSpinner />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  Loading storefront…
                </span>
              </div>
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
            </div>
          ) : null}

          {error && error !== "not_configured" ? (
            <div className="flex flex-col items-center py-16 text-center">
              <h2 className="font-display text-[clamp(56px,8vw,120px)] text-[var(--text-primary)]">
                <HoverSplitHeading text="STOREFRONT OFFLINE" speed={3} className="font-display text-[clamp(56px,8vw,120px)]" />
              </h2>
              <p className="font-body mt-4 max-w-md text-[14px] text-[var(--text-secondary)]">
                Direct purchase is still available through Instagram.
              </p>
              <div className="mt-10 w-full flex justify-center">
                <GlassButton variant="gold" href={INSTAGRAM_URL}>
                  DM @vfxsyn
                </GlassButton>
              </div>
            </div>
          ) : null}

          {showEmpty ? (
            <div className="py-24 text-center font-body text-[var(--text-secondary)]">
              No products yet. Check back soon.
            </div>
          ) : null}

          {showGrid ? (
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent-bright)]">
                EXTERNAL STORE ITEMS
              </p>
            </div>
          ) : null}

          {showGrid ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products!.map((p, i) => {
                const img = productImage(p);
                const vid = variantId(p);
                const price = p.priceRange.minVariantPrice;
                const checkoutId = String(p.handle || "").trim().toLowerCase();
                const busy = Boolean(checkoutId && checkoutLoading === checkoutId);
                return (
                  <ScrollReveal key={p.id} delay={i * 0.05}>
                    <TiltGlare
                      className="group/card w-full rounded-[24px]"
                      tiltAmount={6}
                      tiltClassName="rounded-[24px] shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
                    >
                      <div className="syn-card-premium !block overflow-hidden">
                        <div data-cursor="hover">
                          <div className="relative aspect-[4/3] overflow-hidden bg-[#030308]">
                            {img ? (
                              <img
                                src={img}
                                alt=""
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#0c0c0c] to-[#030308] font-mono text-[12px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                                <ShinyText speed={3}>VFX PACK</ShinyText>
                              </div>
                            )}
                            <span className="font-mono absolute left-4 top-4 z-[4] bg-[var(--bg-base)] border border-[var(--border-accent)] px-3 py-1.5 text-[8px] uppercase tracking-[0.3em] font-bold text-[var(--accent-bright)] backdrop-blur-md">
                              ASSET PACK
                            </span>
                          </div>
                          <div className="p-8">
                            <h3 className="font-ui text-[24px] font-bold tracking-[0.05em] text-[var(--text-primary)] transition-colors duration-400 group-hover:text-[var(--accent-bright)]">
                              {p.title}
                            </h3>
                            <p className="font-body mt-3 line-clamp-2 text-[13px] leading-relaxed text-[var(--text-secondary)] min-h-[40px]">
                              {p.description || "Premium VFX assets for professional creators."}
                            </p>
                            <div className="mt-6 flex items-center justify-between">
                              <span className="font-display text-[20px] text-white">
                                {formatPrice(price.amount, price.currencyCode)}
                              </span>
                              <div className="h-px w-12 bg-[var(--border-accent)]" />
                            </div>
                            <button
                              type="button"
                              data-cursor="hover"
                              disabled={busy || (!stripeCheckout && vid == null)}
                              onClick={() => handleBuyNow(p)}
                              className="font-ui syn-btn-accent-glow mt-8 flex min-h-[52px] w-full items-center justify-center rounded-[4px] bg-[var(--bg-card)] border border-[var(--border-accent)] text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                            >
                              {busy ? (
                                <span className="inline-flex items-center gap-2">
                                  <SynSpinner className="h-4 w-4 border border-[rgba(99,102,241,0.35)] border-t-white" />
                                  SECURE CHECKOUT...
                                </span>
                              ) : (
                                "BUY NOW"
                              )}
                            </button>
                          </div>
                        </div>
                        <BorderBeam size={150} duration={4} colorFrom="var(--accent)" colorTo="var(--gold)">
                          <div className="absolute inset-0" />
                        </BorderBeam>
                      </div>
                    </TiltGlare>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>

      <section className="relative z-[1] border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-3">
          {[
            { icon: "⚡", t: "Instant Delivery", d: "Download link sent immediately after purchase." },
            { icon: "🛡️", t: "Secure Checkout", d: "Industry-standard encryption via Stripe." },
            { icon: "✨", t: "Lifetime Access", d: "Updates and re-downloads included forever." },
          ].map((x) => (
            <TiltGlare
              key={x.t}
              className="w-full rounded-[20px]"
              tiltAmount={4}
              tiltClassName="rounded-[20px]"
            >
              <div className="syn-card-premium flex flex-col items-center gap-4 p-8 text-center min-h-[180px]">
                <span className="text-3xl filter saturate-0 group-hover:saturate-100 transition-all">{x.icon}</span>
                <p className="font-ui text-[12px] font-bold uppercase tracking-[0.25em] text-[var(--accent-bright)]">{x.t}</p>
                <p className="font-body text-[13px] text-[var(--text-secondary)] leading-relaxed">{x.d}</p>
                <BorderBeam size={80} duration={8} colorFrom="var(--accent-dim)" colorTo="transparent">
                  <div className="absolute inset-0" />
                </BorderBeam>
              </div>
            </TiltGlare>
          ))}
        </div>
      </section>

      <section className="relative z-[1] px-6 py-[120px] text-center md:px-10">
        <ScrollReveal>
          <h2 className="font-display text-[clamp(56px,8vw,120px)]">
            <HoverSplitHeading text="CUSTOM WORK" speed={3} className="font-display text-[clamp(56px,8vw,120px)]" />
          </h2>
          <p className="font-body mx-auto mt-4 max-w-lg text-[14px] text-[var(--text-secondary)]">
            Not everything lives in the store. DM for full post packages and one off shots.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="font-ui btn-gold-glow mt-8 inline-block border border-[var(--border-gold)] bg-transparent px-10 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)] hover:bg-[var(--gold-glow)]"
          >
            OPEN INSTAGRAM
          </a>
          <p className="mt-8">
            <Link href="/contact" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--gold)]">
              CONTACT FORM →
            </Link>
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
