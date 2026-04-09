"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const BULLETS = [
  "Scene-aware looks that follow the cut",
  "Audio-driven timing hooks",
  "Built for music-video pipelines",
] as const;

type FeaturedProductCardProps = {
  className?: string;
};

/** Flagship product teaser — AUTO-MVE (name alternatives: PULSECUT, BEATFRAME, CUT ENGINE). */
export function FeaturedProductCard({ className }: FeaturedProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-[0_40px_100px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 80% 0%, rgba(255,78,54,0.18), transparent 50%), radial-gradient(ellipse 90% 60% at 10% 100%, rgba(99,102,241,0.12), transparent 45%), linear-gradient(165deg, #101018 0%, #0a0a10 100%)",
        }}
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--accent)]/20 blur-3xl" />
      <div className="relative z-[1] flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
            Flagship
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
            <Sparkles className="h-3 w-3 text-[var(--gold)]" aria-hidden />
            VFXSYN
          </span>
        </div>

        <h2 className="font-display text-[clamp(2rem,4.5vw,2.75rem)] leading-[0.95] tracking-[0.02em] text-[var(--text-primary)]">
          AUTO-MVE
        </h2>
        <p className="mt-2 font-body text-[13px] leading-relaxed text-[var(--text-secondary)] sm:text-[14px]">
          One-click music-video polish: effects and motion that react to the track—not random presets.
        </p>

        <ul className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-5">
          {BULLETS.map((line) => (
            <li
              key={line}
              className="flex gap-2 font-mono text-[11px] leading-snug text-[var(--text-secondary)] sm:text-[12px]"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/[0.08] pt-5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Price</p>
              <p className="font-display mt-1 text-[1.75rem] tracking-[0.04em] text-[var(--gold)] sm:text-[2rem]">
                COMING SOON
              </p>
            </div>
            <button
              type="button"
              disabled
              className="font-mono cursor-not-allowed rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]"
            >
              Notify me
            </button>
          </div>
          <p className="font-mono text-[9px] text-[var(--text-dim)]">
            Other name ideas:{" "}
            <span className="text-[var(--text-secondary)]">Pulsecut · Beatframe · Cut Engine</span>
          </p>
          <Link
            href="/shop"
            data-cursor="hover"
            className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent-bright)] underline-offset-4 hover:underline"
          >
            Browse shop →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
