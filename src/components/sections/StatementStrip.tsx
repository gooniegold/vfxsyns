"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AboutMagicBento } from "@/components/vfxsyn/AboutMagicBento";

export function StatementStrip() {
  return (
    <ScrollReveal>
      <section
        data-home-bg="about"
        className="about-bento-section-mask syn-home-snap-section relative z-[1] px-6 py-[100px] md:px-10"
        aria-label="About"
      >
        <AboutMagicBento />
      </section>
    </ScrollReveal>
  );
}
