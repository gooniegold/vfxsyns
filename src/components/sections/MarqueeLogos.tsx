"use client";

import ShinyText from "@/components/react-bits/ShinyText";

const LOGOS = [
  "ADOBE",
  "AFTER EFFECTS",
  "PREMIERE",
  "BLENDER",
  "RESOLVE",
  "MARVELOUS",
  "QUICKDRAFT",
  "AUTO-MVE",
  "VFXSYN",
];

export function MarqueeLogos() {
  return (
    <section className="relative z-[1] overflow-hidden border-y border-[var(--border-subtle)] bg-black/25 py-7">
      <div className="flex w-max gap-12 animate-[vfxsyn-marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
        {[0, 1].map((c) => (
          <div key={c} className="flex gap-12 items-center">
            {LOGOS.map((l) => (
              <span key={l} className="font-display text-[22px] tracking-[0.12em] text-[var(--text-secondary)] opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                <ShinyText speed={3} className="font-display">{l}</ShinyText>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
