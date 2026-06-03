"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SPRING = { type: "spring", stiffness: 380, damping: 30 } as const;

const PRODUCTS = [
  {
    handle: "quickdraft-free",
    title:  "QuickDraft Free",
    desc:   "Watermarked review exports for client passes.",
    price:  "Free",
    tier:   "free" as const,
    accent: "180,180,180",
  },
  {
    handle: "quickdraft-pro",
    title:  "QuickDraft Pro",
    desc:   "Auto render queue, watermark controls, faster handoffs.",
    price:  "$29",
    tier:   "pro"  as const,
    accent: "168,85,247",
  },
  {
    handle: "automve",
    title:  "VFXSYN AUTOMVE",
    desc:   "Automatic motion for music videos. Shakes, zooms, hit stops.",
    price:  "$49",
    tier:   "plugin" as const,
    accent: "251,191,36",
  },
] as const;

type Tier = "free" | "pro" | "plugin";

const TIER_CONFIG: Record<Tier, { label: string; labelColor: string; labelBg: string; labelBorder: string }> = {
  free: {
    label:       "FREE",
    labelColor:  "rgba(255,255,255,0.45)",
    labelBg:     "rgba(255,255,255,0.05)",
    labelBorder: "rgba(255,255,255,0.08)",
  },
  pro: {
    label:       "PRO",
    labelColor:  "rgba(192,132,252,0.9)",
    labelBg:     "rgba(168,85,247,0.1)",
    labelBorder: "rgba(168,85,247,0.25)",
  },
  plugin: {
    label:       "PLUGIN",
    labelColor:  "rgba(251,191,36,0.9)",
    labelBg:     "rgba(251,191,36,0.08)",
    labelBorder: "rgba(251,191,36,0.22)",
  },
};

export function ShopTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <p
          className="text-[9px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}
        >
          digital products
        </p>
        <Link
          href="/shop"
          className="flex items-center gap-1 text-[9px] transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}
        >
          full shop
          <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {PRODUCTS.map((p, i) => {
        const cfg = TIER_CONFIG[p.tier];
        return (
          <motion.div
            key={p.handle}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: i * 0.05 }}
          >
            <Link
              href={`/shop/${p.handle}`}
              className="group relative flex items-stretch overflow-hidden rounded-xl transition-all duration-200"
              style={{
                background: `rgba(${p.accent}, 0.03)`,
                border: `1px solid rgba(${p.accent}, 0.1)`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `rgba(${p.accent}, 0.07)`;
                el.style.borderColor = `rgba(${p.accent}, 0.22)`;
                el.style.transform = "translateY(-1px)";
                el.style.boxShadow = `0 8px 24px rgba(${p.accent}, 0.08)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `rgba(${p.accent}, 0.03)`;
                el.style.borderColor = `rgba(${p.accent}, 0.1)`;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Left accent strip */}
              <div
                className="w-[3px] shrink-0 rounded-l-xl"
                style={{ background: `rgba(${p.accent}, 0.5)` }}
              />

              {/* Content */}
              <div className="flex flex-1 items-center justify-between px-3 py-3">
                <div className="min-w-0 flex-1 pr-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className="text-[12px] font-semibold leading-none text-white"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {p.title}
                    </p>
                    <span
                      className="rounded px-1.5 py-0.5 text-[7px] uppercase tracking-[0.18em]"
                      style={{
                        background:  cfg.labelBg,
                        color:       cfg.labelColor,
                        border:      `1px solid ${cfg.labelBorder}`,
                        fontFamily:  "var(--font-mono)",
                      }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[10px] leading-snug"
                    style={{
                      color:       "rgba(255,255,255,0.32)",
                      fontFamily:  "var(--font-inter), sans-serif",
                      display:     "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow:    "hidden",
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                {/* Price + arrow */}
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className="text-[14px] font-bold leading-none"
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      color: p.tier === "free" ? "rgba(255,255,255,0.55)" : `rgb(${p.accent})`,
                    }}
                  >
                    {p.price}
                  </span>
                  <svg
                    className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color: `rgba(${p.accent}, 0.5)` }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}

      {/* Shop CTA */}
      <div className="pt-1">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} transition={SPRING}>
          <Link
            href="/shop"
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[10px] uppercase tracking-[0.18em] transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              color:  "rgba(255,255,255,0.28)",
              fontFamily: "var(--font-mono)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.03)";
              el.style.borderColor = "rgba(255,255,255,0.12)";
              el.style.color = "rgba(255,255,255,0.65)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(255,255,255,0.07)";
              el.style.color = "rgba(255,255,255,0.28)";
            }}
          >
            enter shop
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
