"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

const PRODUCTS = [
  {
    handle: "quickdraft-free",
    title: "QuickDraft Free",
    desc: "Watermarked review exports for client passes.",
    price: "FREE",
    badge: "FREE",
  },
  {
    handle: "quickdraft-pro",
    title: "QuickDraft Pro",
    desc: "Auto render queue, watermark controls, faster handoffs.",
    price: "$29",
    badge: "PRO",
  },
  {
    handle: "automve",
    title: "VFXSYN AUTOMVE",
    desc: "Automatic motion for music videos. Shakes, zooms, hit stops.",
    price: "$49",
    badge: "PLUGIN",
  },
] as const;

export function ShopTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.4, ease }}
      className="space-y-2"
    >
      <div className="mb-3 flex items-center justify-between">
        <p
          className="text-[9px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}
        >
          digital products
        </p>
        <Link
          href="/shop"
          className="text-[9px] transition-colors"
          style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}
        >
          full shop →
        </Link>
      </div>

      {PRODUCTS.map((p, i) => (
        <motion.div
          key={p.handle}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease, delay: i * 0.06 }}
        >
          <Link
            href={`/shop/${p.handle}`}
            className="group flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
            }}
          >
            <div className="min-w-0 flex-1 pr-3">
              <div className="flex items-center gap-2">
                <p
                  className="text-[12px] font-medium text-white"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {p.title}
                </p>
                <span
                  className="rounded px-1.5 py-0.5 text-[7px] uppercase tracking-[0.2em]"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-mono)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {p.badge}
                </span>
              </div>
              <p
                className="mt-0.5 truncate text-[10px]"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {p.desc}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span
                className="text-[12px] font-semibold text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {p.price}
              </span>
              <svg
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                style={{ color: "rgba(255,255,255,0.25)" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </Link>
        </motion.div>
      ))}

      <div className="pt-1">
        <Link
          href="/shop"
          className="flex w-full items-center justify-center rounded-lg py-3 text-[10px] uppercase tracking-[0.2em] transition-all"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-mono)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          enter shop
        </Link>
      </div>
    </motion.div>
  );
}
