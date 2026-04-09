"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import ShinyText from "@/components/react-bits/ShinyText";
import { motionTransition } from "@/lib/motion-defaults";

import { Gem, Zap, Aperture, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Turnaround was fast and the grade sat right on the reference we sent.",
    category: "INDEPENDENT ARTIST",
    icon: Zap,
  },
  {
    quote: "Clean comps—no back-and-forth about edges or flicker.",
    category: "LABEL ROLL-OUT",
    icon: Aperture,
  },
  {
    quote: "Delivers files you can actually hand to mastering without surprises.",
    category: "DIRECTOR",
    icon: Gem,
  },
] as const;

export function TestimonialsSection() {
  return (
    <ScrollReveal>
      <section className="syn-home-snap-section relative z-[1] px-6 py-[120px] md:px-10">
        <div className="relative mx-auto max-w-[1200px]">
          <ScrollReveal>
            <p className="font-mono relative z-[1] text-[10px] tracking-[0.4em] text-[var(--accent-bright)]">
              <ShinyText speed={3} className="font-mono text-[10px] tracking-[0.4em]">
                ● NOTES
              </ShinyText>
            </p>
            <motion.h2
              className="motion-gpu-hint font-display relative z-[1] mt-4 text-[clamp(44px,7vw,100px)] tracking-[0.04em]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={motionTransition()}
            >
              <span className="text-gradient">FROM COLLABS</span>
            </motion.h2>
          </ScrollReveal>

          <div className="relative z-[1] mt-16 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.category} delay={i * 0.1}>
                <div className="hud-scanline syn-card-premium group relative flex flex-col justify-between p-10 min-h-[300px] overflow-hidden">
                  <div className="absolute top-6 right-6 opacity-20 transition-opacity duration-500 group-hover:opacity-100">
                    <t.icon className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  
                  <div className="hud-text-sm mb-8 flex items-center gap-2 opacity-70">
                    <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                    ANON · APPROVED FOR WEB
                  </div>
                  
                  <p className="font-body relative z-[1] text-[16px] md:text-[17px] leading-snug text-white/95 transition-colors duration-300">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="mt-10 pt-6 border-t border-[var(--border-accent)]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--accent-bright)]">
                        {t.category}
                      </span>
                      <span className="font-mono text-[8px] opacity-30" aria-hidden>
                        ·
                      </span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--accent)] transition-all duration-700 group-hover:w-full" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
