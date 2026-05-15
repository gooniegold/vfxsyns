"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

const WORKS = [
  { title: "JAKK MOVE", artist: "LAZERDIM700", cat: "MUSIC VIDEO", href: "/portfolio" },
  { title: "DREAM", artist: "SIYAH XO", cat: "MUSIC VIDEO", href: "/portfolio" },
  { title: "SHOWREEL", artist: "VFXSYN", cat: "VFX SHOWCASE", href: "/portfolio" },
  { title: "BOUGEE", artist: "INWINTR", cat: "MUSIC VIDEO", href: "/portfolio" },
  { title: "MONEY", artist: "LORSKEEZY", cat: "MUSIC VIDEO", href: "/portfolio" },
] as const;

export function WorkTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.4, ease }}
      className="space-y-2"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(34,197,94,0.5)]">selected cuts</p>
        <Link
          href="/portfolio"
          className="font-mono text-[9px] text-[rgba(255,255,255,0.3)] transition-colors hover:text-[rgba(34,197,94,0.7)]"
        >
          all work →
        </Link>
      </div>

      {WORKS.map((w, i) => (
        <motion.div
          key={w.title}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease, delay: i * 0.05 }}
        >
          <Link
            href={w.href}
            className="group flex items-center justify-between rounded-lg border border-[rgba(34,197,94,0.1)] bg-[rgba(0,0,0,0.4)] px-4 py-3 transition-all duration-200 hover:border-[rgba(34,197,94,0.3)] hover:bg-[rgba(34,197,94,0.04)] hover:shadow-[0_0_16px_rgba(34,197,94,0.08)]"
          >
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[rgba(34,197,94,0.4)] group-hover:bg-[#22c55e] transition-colors" />
              <div>
                <p className="font-mono text-[12px] font-medium text-[rgba(255,255,255,0.85)] group-hover:text-white transition-colors">
                  {w.title}
                </p>
                <p className="font-mono text-[10px] text-[rgba(255,255,255,0.3)]">{w.artist}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[rgba(34,197,94,0.4)]">
                {w.cat}
              </span>
              <svg className="h-3 w-3 text-[rgba(34,197,94,0.3)] transition-transform group-hover:translate-x-0.5 group-hover:text-[rgba(34,197,94,0.7)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </Link>
        </motion.div>
      ))}

      <div className="pt-2">
        <Link
          href="/portfolio"
          className="flex w-full items-center justify-center rounded-lg border border-[rgba(34,197,94,0.2)] py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(34,197,94,0.6)] transition-all hover:border-[rgba(34,197,94,0.4)] hover:bg-[rgba(34,197,94,0.04)] hover:text-[#4ade80]"
        >
          view full portfolio
        </Link>
      </div>
    </motion.div>
  );
}
