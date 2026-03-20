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
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassButton } from "@/components/ui/GlassButton";
import { StarBorder } from "@/components/ui/StarBorder";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { INSTAGRAM_URL } from "@/lib/constants";
import { SynAnimatedList } from "@/components/ui/SynAnimatedList";
import { cn } from "@/lib/utils";

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
    <div className="overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)]">
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

      <section className="relative z-[1] border-y border-[var(--border-subtle)] bg-transparent px-6 py-14 md:px-10">
        <div className="mx-auto max-w-[600px] text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]">What&apos;s included</p>
          <h2 className="font-ui mt-3 text-[20px] tracking-[0.06em] text-[var(--text-primary)]">
            Services &amp; delivery
          </h2>
          <SynAnimatedList
            className="mt-8 w-full bg-transparent"
            itemClassName="bg-transparent"
            trigger="scroll"
            bullet="diamond"
            items={[
              "✦ 3D Animation & Simulation",
              "✦ Cinematic Color Grading",
              "✦ Music Video VFX",
              "✦ Motion Graphics",
              "✦ Instant Pack Delivery",
              "✦ Custom Project Quotes",
            ]}
          />
        </div>
      </section>

      <section className="relative z-[1] px-6 pb-[120px] md:px-10">
        <div className="mx-auto max-w-[1200px]">
          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : null}

          {error ? (
            <div className="flex flex-col items-center py-16 text-center">
              {error === "not_configured" ? (
                <div className="w-full bg-[#050505] px-4 py-16">
                  <div className="relative mx-auto flex min-h-[1.2em] w-full max-w-[95vw] items-center justify-center">
                    <FuzzyText
                      fontSize="clamp(56px, 10vw, 140px)"
                      fontWeight={400}
                      fontFamily="var(--font-display), serif"
                      gradient={null}
                      color="#BFA06A"
                      enableHover
                      baseIntensity={0.14}
                      hoverIntensity={0.45}
                      glitchMode
                      glitchInterval={2400}
                      glitchDuration={180}
                      className="relative z-[1] mx-auto"
                    >
                      COMING SOON
                    </FuzzyText>
                  </div>
                  <p
                    className="font-mono mx-auto max-w-md text-[14px] text-[var(--text-secondary)]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.15em",
                      marginTop: "24px",
                    }}
                  >
                    VFX Packs dropping soon.
                  </p>
                  <div
                    className="mt-6 w-full"
                    style={{ display: "block", margin: "24px auto 0", width: "fit-content", maxWidth: "100%" }}
                  >
                    <GlassButton variant="gold" href={INSTAGRAM_URL}>
                      DM @vfxsyn
                    </GlassButton>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-[clamp(56px,8vw,120px)] text-[var(--text-primary)]">
                    SHOP COMING SOON
                  </h2>
                  <p className="font-body mt-4 max-w-md text-[14px] text-[var(--text-secondary)]">
                    Something went wrong loading the storefront. DM @vfxsyn on Instagram to purchase directly.
                  </p>
                  <div
                    className="w-full"
                    style={{ display: "block", margin: "24px auto 0", width: "fit-content", maxWidth: "100%" }}
                  >
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
                      className="group/card w-full rounded-[12px]"
                      tiltAmount={7}
                      tiltClassName="rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.48)]"
                    >
                      <StarBorder
                        className="w-full !block rounded-[12px]"
                        innerClassName="relative overflow-hidden rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-0 transition-colors group-hover/card:border-[var(--border-gold)]"
                      >
                        <div data-cursor="hover">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#0c0c0c]">
                        {img ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={img}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#111] to-[#050505] font-mono text-[14px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                            VFX PACK
                          </div>
                        )}
                        <span className="font-mono absolute left-2 top-2 bg-[rgba(5,5,5,0.75)] px-2 py-1 text-[8px] uppercase tracking-[0.2em] text-[var(--gold)]">
                          VFX PACK
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-ui text-[20px] text-[var(--text-primary)]">{p.title}</h3>
                        <p className="font-body mt-2 line-clamp-3 text-[12px] leading-relaxed text-[var(--text-secondary)]">
                          {(p.description || "").slice(0, 120)}
                          {(p.description || "").length > 120 ? "…" : ""}
                        </p>
                        <p className="font-mono mt-4 text-[18px] text-[var(--gold)]">
                          {formatPrice(price.amount, price.currencyCode)}
                        </p>
                        <button
                          type="button"
                          data-cursor="hover"
                          disabled={vid == null || busy}
                          onClick={() => handleBuyNow(p)}
                          className="font-ui btn-gold-glow mt-4 flex min-h-[48px] w-full items-center justify-center bg-[var(--gold)] text-[11px] uppercase tracking-[0.2em] text-[#050505] transition hover:bg-[var(--gold-bright)] disabled:opacity-50"
                        >
                          {busy ? "…" : "BUY NOW — INSTANT DELIVERY"}
                        </button>
                      </div>
                        </div>
                      </StarBorder>
                    </TiltGlare>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>

      <section className="relative z-[1] border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-3 md:gap-0">
          {[
            { icon: "⚡", t: "Instant Delivery", d: "Download link sent to your email immediately" },
            { icon: "🔒", t: "Secure Checkout", d: "Powered by Shopify + Stripe" },
            { icon: "♾️", t: "Lifetime Access", d: "Re-download anytime, forever" },
          ].map((x, i) => (
            <TiltGlare
              key={x.t}
              className="w-full rounded-[14px]"
              tiltAmount={6}
              tiltClassName="rounded-[14px] shadow-[0_10px_36px_rgba(0,0,0,0.4)]"
            >
              <StarBorder
                className="w-full !block rounded-[14px]"
                innerClassName={cn(
                  "flex flex-col gap-2 rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-base)] px-5 py-6 text-center md:text-left",
                  i > 0 && "md:border-l-0",
                )}
              >
                <span className="text-xl">{x.icon}</span>
                <p className="font-ui text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]">{x.t}</p>
                <p className="font-body text-[12px] text-[var(--text-secondary)]">{x.d}</p>
              </StarBorder>
            </TiltGlare>
          ))}
        </div>
      </section>

      <section className="relative z-[1] px-6 py-[120px] text-center md:px-10">
        <ScrollReveal>
          <h2 className="font-display text-gradient text-[clamp(56px,8vw,120px)]">CUSTOM WORK?</h2>
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
