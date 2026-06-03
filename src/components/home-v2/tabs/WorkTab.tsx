"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SPRING = { type: "spring", stiffness: 380, damping: 30 } as const;

const WORKS = [
  {
    title:  "JAKK MOVE",
    artist: "LAZERDIM700",
    cat:    "MUSIC VIDEO",
    slug:   "JAKK MOVE",
    accent: "220,60,60",   // deep red
    year:   "2024",
  },
  {
    title:  "DREAM",
    artist: "SIYAH XO",
    cat:    "MUSIC VIDEO",
    slug:   "DREAM",
    accent: "120,80,240",  // violet
    year:   "2024",
  },
  {
    title:  "SHOWREEL",
    artist: "VFXSYN",
    cat:    "VFX SHOWCASE",
    slug:   "SHOWREEL",
    accent: "255,160,30",  // amber
    year:   "2024",
  },
  {
    title:  "BOUGEE",
    artist: "INWINTR",
    cat:    "MUSIC VIDEO",
    slug:   "BOUGEE",
    accent: "30,200,140",  // teal
    year:   "2023",
  },
  {
    title:  "MONEY",
    artist: "LORSKEEZY",
    cat:    "MUSIC VIDEO",
    slug:   "MONEY",
    accent: "50,180,255",  // sky
    year:   "2023",
  },
] as const;

export function WorkTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-1"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <p
          className="text-[9px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}
        >
          selected cuts
        </p>
        <Link
          href="/portfolio"
          className="flex items-center gap-1 text-[9px] transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}
        >
          all work
          <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {WORKS.map((w, i) => (
        <motion.div
          key={w.title}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: i * 0.04 }}
        >
          <Link
            href={`/portfolio?open=${encodeURIComponent(w.slug)}`}
            className="group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
              transition: "background 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `rgba(${w.accent}, 0.05)`;
              el.style.borderColor = `rgba(${w.accent}, 0.2)`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.025)";
              el.style.borderColor = "rgba(255,255,255,0.05)";
            }}
          >
            {/* Color accent left bar */}
            <div
              className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r-full transition-opacity duration-200"
              style={{
                background: `rgba(${w.accent}, 0.8)`,
                boxShadow: `0 0 6px rgba(${w.accent}, 0.5)`,
                opacity: 0.5,
              }}
            />

            {/* Index number */}
            <span
              className="ml-1 shrink-0 tabular-nums text-[9px]"
              style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-mono)", minWidth: "12px" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Title + artist */}
            <div className="min-w-0 flex-1">
              <p
                className="text-[12px] font-medium leading-none text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {w.title}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <p
                  className="text-[9px] leading-none"
                  style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}
                >
                  {w.artist}
                </p>
                <span
                  className="h-0.5 w-0.5 rounded-full shrink-0"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
                <p
                  className="text-[8px] leading-none uppercase tracking-[0.15em]"
                  style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-mono)" }}
                >
                  {w.year}
                </p>
              </div>
            </div>

            {/* Category chip + arrow */}
            <div className="flex shrink-0 items-center gap-2">
              <span
                className="hidden rounded px-1.5 py-0.5 text-[7px] uppercase tracking-[0.15em] sm:block"
                style={{
                  background: `rgba(${w.accent}, 0.08)`,
                  color: `rgba(${w.accent}, 0.7)`,
                  border: `1px solid rgba(${w.accent}, 0.15)`,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {w.cat}
              </span>
              <svg
                className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ color: "rgba(255,255,255,0.2)" }}
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

      {/* Full portfolio CTA */}
      <div className="pt-2">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} transition={SPRING}>
          <Link
            href="/portfolio"
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[10px] uppercase tracking-[0.18em] transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.28)",
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
            view full portfolio
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
