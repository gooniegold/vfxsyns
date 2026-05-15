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
    badge: "FREE BUILD",
    available: false,
  },
  {
    handle: "quickdraft-pro",
    title: "QuickDraft Pro",
    desc: "Auto render queue, watermark controls, faster handoffs.",
    price: "$29",
    badge: "PRO LICENSE",
    available: false,
  },
  {
    handle: "automve",
    title: "VFXSYN AUTOMVE",
    desc: "Automatic motion for music videos. Shakes, zooms, hit stops timed to audio.",
    price: "SOON",
    badge: "PLUGIN",
    available: false,
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
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(34,197,94,0.5)]">digital products</p>
        <Link
          href="/shop"
          className="font-mono text-[9px] text-[rgba(255,255,255,0.3)] transition-colors hover:text-[rgba(34,197,94,0.7)]"
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
            href={`/shop`}
            className="group flex items-center justify-between rounded-lg border border-[rgba(34,197,94,0.1)] bg-[rgba(0,0,0,0.4)] px-4 py-3.5 transition-all duration-200 hover:border-[rgba(34,197,94,0.25)] hover:bg-[rgba(34,197,94,0.03)]"
          >
            <div className="flex-1 min-w-0 pr-3">
              <div className="flex items-center gap-2">
                <p className="font-mono text-[12px] font-medium text-[rgba(255,255,255,0.85)] group-hover:text-white transition-colors">
                  {p.title}
                </p>
                <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-[rgba(34,197,94,0.45)] border border-[rgba(34,197,94,0.2)] px-1.5 py-0.5 rounded">
                  {p.badge}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[10px] text-[rgba(255,255,255,0.3)] truncate">{p.desc}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-[12px] font-bold text-[#4ade80]">{p.price}</span>
              <svg className="h-3 w-3 text-[rgba(34,197,94,0.3)] transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </Link>
        </motion.div>
      ))}

      <div className="pt-2">
        <Link
          href="/shop"
          className="flex w-full items-center justify-center rounded-lg border border-[rgba(34,197,94,0.2)] py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(34,197,94,0.6)] transition-all hover:border-[rgba(34,197,94,0.4)] hover:bg-[rgba(34,197,94,0.04)] hover:text-[#4ade80]"
        >
          enter shop
        </Link>
      </div>
    </motion.div>
  );
}
