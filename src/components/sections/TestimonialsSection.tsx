"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import ShinyText from "@/components/react-bits/ShinyText";
import { motionTransition } from "@/lib/motion-defaults";

import { Gem, Zap, Aperture, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "UNRIVALED VISUAL FIDELITY. TRANSFORMED OUR PRODUCTION INTO A CINEMATIC BENCHMARK.",
    category: "ELITE VFX",
    icon: Zap,
  },
  {
    quote: "DISRUPTIVE COLOR GRADING THAT REDEFINED OUR ENTIRE AESTHETIC FOR THE CURRENT CYCLE.",
    category: "PLATINUM COLOR",
    icon: Aperture,
  },
  {
    quote: "TECHNICAL PRECISION MEETS PURE CREATIVE CHAOS. THE ONLY CHOICE FOR S-TIER 3D ASSETS.",
    category: "PREMIUM 3D",
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
                ● TESTIMONIALS
              </ShinyText>
            </p>
            <motion.h2
              className="motion-gpu-hint font-display relative z-[1] mt-4 text-[clamp(44px,7vw,100px)] tracking-[0.05em]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={motionTransition()}
            >
              <span className="text-gradient">CLIENT FEEDBACK</span>
            </motion.h2>
          </ScrollReveal>

          <div className="relative z-[1] mt-16 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.category} delay={i * 0.1}>
                <div className="hud-scanline syn-card-premium group relative flex flex-col justify-between p-10 min-h-[300px] overflow-hidden">
                  <div className="absolute top-6 right-6 opacity-20 transition-opacity duration-500 group-hover:opacity-100">
                    <t.icon className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  
                  <div className="hud-text-sm mb-8 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[var(--accent)] animate-pulse" />
                    STATUS: VERIFIED_CLIENT
                  </div>
                  
                  <p className="font-display relative z-[1] text-[18px] leading-snug tracking-wide text-white transition-all duration-300 group-hover:tracking-wider">
                    "{t.quote}"
                  </p>

                  <div className="mt-10 pt-6 border-t border-[var(--border-accent)]">
                    <div className="flex items-center justify-between">
                      <span className="font-ui text-[14px] font-bold tracking-[0.2em] text-[var(--accent-bright)]">
                        {t.category}
                      </span>
                      <span className="font-mono text-[8px] opacity-30">
                        REF: {Math.random().toString(16).slice(2, 10).toUpperCase()}
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
