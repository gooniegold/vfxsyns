"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

const WORKS = [
  {
    title: "JAKK MOVE",
    artist: "LAZERDIM700",
    cat: "MUSIC VIDEO",
    slug: "JAKK MOVE",
  },
  {
    title: "DREAM",
    artist: "SIYAH XO",
    cat: "MUSIC VIDEO",
    slug: "DREAM",
  },
  {
    title: "SHOWREEL",
    artist: "VFXSYN",
    cat: "VFX SHOWCASE",
    slug: "SHOWREEL",
  },
  {
    title: "BOUGEE",
    artist: "INWINTR",
    cat: "MUSIC VIDEO",
    slug: "BOUGEE",
  },
  {
    title: "MONEY",
    artist: "LORSKEEZY",
    cat: "MUSIC VIDEO",
    slug: "MONEY",
  },
] as const;

export function WorkTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.4, ease }}
      className="space-y-1.5"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <p
          className="text-[9px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}
        >
          selected cuts
        </p>
        <Link
          href="/portfolio"
          className="text-[9px] transition-colors"
          style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}
        >
          all work →
        </Link>
      </div>

      {WORKS.map((w, i) => (
        <motion.div
          key={w.title}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease, delay: i * 0.05 }}
        >
          <Link
            href={`/portfolio?open=${encodeURIComponent(w.slug)}`}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.05)";
              el.style.borderColor = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.02)";
              el.style.borderColor = "rgba(255,255,255,0.05)";
            }}
          >
            {/* Dot indicator */}
            <div
              className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />

            {/* Title + artist */}
            <div className="min-w-0 flex-1">
              <p
                className="text-[12px] font-medium text-white leading-none"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {w.title}
              </p>
              <p
                className="mt-[3px] text-[10px] leading-none"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}
              >
                {w.artist}
              </p>
            </div>

            {/* Category + arrow */}
            <div className="flex shrink-0 items-center gap-2">
              <span
                className="text-[8px] uppercase tracking-[0.2em] hidden sm:block"
                style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono)" }}
              >
                {w.cat}
              </span>
              <svg
                className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ color: "rgba(255,255,255,0.22)" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Full portfolio button */}
      <div className="pt-2">
        <Link
          href="/portfolio"
          className="flex w-full items-center justify-center rounded-xl py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-200"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "var(--font-mono)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(255,255,255,0.04)";
            el.style.borderColor = "rgba(255,255,255,0.14)";
            el.style.color = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.borderColor = "rgba(255,255,255,0.08)";
            el.style.color = "rgba(255,255,255,0.3)";
          }}
        >
          view full portfolio
        </Link>
      </div>
    </motion.div>
  );
}
