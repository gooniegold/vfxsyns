"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const BULLETS = [
  "Auto shakes, zoom outs, and punch ins timed to the track",
  "Stacks motion so the edit feels alive without hand keying every hit",
  "Built for music video pace: fast preview, fast export",
] as const;

type FeaturedProductCardProps = {
  className?: string;
};

export function FeaturedProductCard({ className }: FeaturedProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "syn-glow-purple relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-accent)] bg-[var(--bg-elevated)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-95"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 85% 0%, rgba(168,85,247,0.22), transparent 52%), radial-gradient(ellipse 90% 60% at 8% 100%, rgba(139,92,246,0.14), transparent 48%), linear-gradient(165deg, #140a22 0%, #0a0614 100%)",
        }}
      />
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--accent)]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-[var(--accent-secondary)]/15 blur-3xl" />

      <div className="relative z-[1] flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent-bright)]">
            Flagship plugin
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-black/35 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
            <Sparkles className="h-3 w-3 text-[var(--gold)]" aria-hidden />
            VFXSYN
          </span>
        </div>

        <h2 className="font-display text-[clamp(1.85rem,4.2vw,2.6rem)] leading-[1.05] tracking-[0.02em] text-[var(--text-primary)]">
          VFXSYN AUTOMVE
        </h2>
        <p className="mt-3 font-body text-[13px] leading-relaxed text-[var(--text-secondary)] sm:text-[14px]">
          Drop a cut, get motion: the plugin reads your timeline and layers shakes, zooms, and hit stops so you are not painting keyframes all night.
        </p>

        <ul className="mt-6 space-y-2.5 border-t border-white/[0.08] pt-5">
          {BULLETS.map((line) => (
            <li
              key={line}
              className="flex gap-2.5 font-mono text-[11px] leading-snug text-[var(--text-secondary)] sm:text-[12px]"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" aria-hidden />
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/[0.1] pt-5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Price</p>
              <p className="font-display mt-1 text-[1.65rem] tracking-[0.04em] text-[var(--gold)] sm:text-[1.9rem]">
                COMING SOON
              </p>
            </div>
            <button
              type="button"
              disabled
              className="font-mono cursor-not-allowed rounded-md border border-white/12 bg-white/[0.06] px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)] transition hover:bg-white/[0.08]"
            >
              Notify me
            </button>
          </div>
          <Link
            href="/shop"
            data-cursor="hover"
            className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent-bright)] underline-offset-4 transition hover:text-[var(--gold)] hover:underline"
          >
            View in shop
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
