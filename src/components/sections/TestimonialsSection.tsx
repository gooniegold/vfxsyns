"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import ShinyText from "@/components/react-bits/ShinyText";
import { motionTransition } from "@/lib/motion-defaults";

const TESTIMONIALS = [
  {
    quote: "The VFX work is unlike anything else. Transformed my music video into a cinematic masterpiece.",
    author: "LAZERDIM700",
    role: "Artist",
  },
  {
    quote: "Professional, fast, and insane attention to detail. The only person I trust with my color grading.",
    author: "COSIGN",
    role: "Director",
  },
  {
    quote: "VFXSYN is on another level. The 3D animations are industry standard and the workflow is seamless.",
    author: "SIYAHXO",
    role: "VFX Artist",
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
              <ScrollReveal key={t.author} delay={i * 0.1}>
                <div className="syn-card-premium group relative flex flex-col justify-between p-10 min-h-[280px]">
                  <div className="absolute top-6 left-8 text-6xl opacity-[0.03] pointer-events-none" aria-hidden>
                    "
                  </div>
                  
                  <p className="font-body relative z-[1] text-[15px] italic leading-relaxed text-[var(--text-primary)] group-hover:text-white transition-colors duration-300">
                    "{t.quote}"
                  </p>

                  <div className="mt-8 flex flex-col gap-1 border-t border-[var(--border-accent)] pt-6">
                    <span className="font-ui text-[16px] font-bold tracking-[0.1em] text-[var(--accent-bright)]">
                      {t.author}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-secondary)]">
                      {t.role}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
