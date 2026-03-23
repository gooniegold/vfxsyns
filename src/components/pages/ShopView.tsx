"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  createCheckout,
  getProducts,
  isShopifyConfigured,
  type ShopifyProductNode,
} from "@/lib/shopify";
import FuzzyText from "@/components/react-bits/FuzzyText";
import ShinyText from "@/components/react-bits/ShinyText";
import { HoverSplitHeading } from "@/components/ui/HoverSplitHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassButton } from "@/components/ui/GlassButton";
import { StarBorder } from "@/components/ui/StarBorder";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { INSTAGRAM_URL } from "@/lib/constants";
import { SynAnimatedList } from "@/components/ui/SynAnimatedList";
import { cn } from "@/lib/utils";
import { SynSpinner } from "@/components/ui/SynSpinner";
import { BorderBeam } from "@/components/react-bits/BorderBeam";

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

export function ShopView({ pageHeader }: { pageHeader?: ReactNode }) {
  const [products, setProducts] = useState<ShopifyProductNode[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

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
    const vid = variantId(p);
    if (!vid) return;
    setCheckoutLoading(vid);
    try {
      const cart = await createCheckout(vid, 1);
      window.location.href = cart.checkoutUrl;
    } catch {
      setCheckoutLoading(null);
      alert("Checkout could not start. Try again or DM @vfxsyn on Instagram.");
    }
  }, []);

  const showGrid = !error && products && products.length > 0;
  const showEmpty = !loading && !error && products && products.length === 0;

  return (
    <div className="relative bg-[var(--bg-base)]">
      {pageHeader}

      <section className="relative z-[1] border-y border-[var(--border-accent)] bg-[rgba(99,102,241,0.03)] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-[800px] text-center flex flex-col items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--accent-bright)]">
            <ShinyText speed={3}>WHAT&apos;S INCLUDED</ShinyText>
          </p>
          <h2 className="font-display mt-6 text-[clamp(32px,5vw,64px)] tracking-[0.05em] text-[var(--text-primary)]">
            PREMIUM WORKFLOW
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[var(--accent-bright)] to-transparent mt-6 mb-10" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 w-full opacity-80">
            {[
              "3D Animation & Simulation",
              "Cinematic Color Grading",
              "Music Video VFX",
              "Motion Graphics",
              "Instant Pack Delivery",
              "Custom Project Quotes",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 font-ui text-[14px] font-bold tracking-[0.1em] text-[var(--text-secondary)] hover:text-white transition-colors">
                <span className="text-[var(--accent-bright)]">✦</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-[1] px-6 pb-[120px] md:px-10">
        <div className="mx-auto max-w-[1200px]">
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

          {error ? (
            <div className="flex flex-col items-center py-16 text-center">
              {error === "not_configured" ? (
                <div className="w-full bg-[#030308] px-4 py-24">
                  <div className="relative mx-auto flex min-h-[1.2em] w-full max-w-[95vw] items-center justify-center">
                    <FuzzyText
                      fontSize="clamp(56px, 10vw, 140px)"
                      fontWeight={400}
                      fontFamily="var(--font-display), serif"
                      gradient={null}
                      color="#6366F1"
                      enableHover
                      baseIntensity={0.2}
                      hoverIntensity={0.6}
                      glitchMode
                      glitchInterval={2000}
                      glitchDuration={200}
                      className="relative z-[1] mx-auto"
                    >
                      COMING SOON
                    </FuzzyText>
                  </div>
                  <p className="font-mono mx-auto max-w-md text-[13px] tracking-[0.2em] text-[var(--text-secondary)] mt-8 uppercase">
                    VFX PACKS — THE NEXT EVOLUTION
                  </p>
                  <div className="mt-12 w-full flex justify-center">
                    <GlassButton variant="gold" href={INSTAGRAM_URL} className="syn-btn-accent-glow border-[var(--border-accent)]">
                      DM @vfxsyn FOR EARLY ACCESS
                    </GlassButton>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-[clamp(56px,8vw,120px)] text-[var(--text-primary)]">
                    <HoverSplitHeading text="STOREFRONT OFFLINE" speed={3} className="font-display text-[clamp(56px,8vw,120px)]" />
                  </h2>
                  <p className="font-body mt-4 max-w-md text-[14px] text-[var(--text-secondary)]">
                    Direct purchase available via Instagram.
                  </p>
                  <div className="mt-10 w-full flex justify-center">
                    <GlassButton variant="gold" href={INSTAGRAM_URL}>
                      DM @vfxsyn
                    </GlassButton>
                  </div>
                </>
              )}
            </div>
          ) : null}

          {showEmpty ? (
            <div className="py-24 text-center font-body text-[var(--text-secondary)]">
              No products yet — check back soon.
            </div>
          ) : null}

          {showGrid ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products!.map((p, i) => {
                const img = productImage(p);
                const vid = variantId(p);
                const price = p.priceRange.minVariantPrice;
                const busy = Boolean(vid && checkoutLoading === vid);
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
                              <span className="font-display text-[20px] font-black text-white">
                                {formatPrice(price.amount, price.currencyCode)}
                              </span>
                              <div className="h-px w-12 bg-[var(--border-accent)]" />
                            </div>
                            <button
                              type="button"
                              data-cursor="hover"
                              disabled={vid == null || busy}
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
            <HoverSplitHeading text="CUSTOM WORK?" speed={3} className="font-display text-[clamp(56px,8vw,120px)]" />
          </h2>
          <p className="font-body mx-auto mt-4 max-w-lg text-[14px] text-[var(--text-secondary)]">
            DM @vfxsyn for custom VFX, color grading, and music video packages.
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
