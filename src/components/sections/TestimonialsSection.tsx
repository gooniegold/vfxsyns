"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motionTransition } from "@/lib/motion-defaults";
import { Gem, Zap, Aperture } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I sent two reference frames and a voice note. Got back something that actually matched the mood instead of a generic teal look.",
    name: "Independent artist",
    role: "Atlanta",
    icon: Zap,
  },
  {
    quote:
      "Usually I lose a day fixing edges. This round the keys were tight and I could move on to the fun stuff.",
    name: "Small label",
    role: "Rollout",
    icon: Aperture,
  },
  {
    quote:
      "Files landed named in a way my mastering guy did not roast me in the group chat. That alone was worth it.",
    name: "Director",
    role: "Narrative",
    icon: Gem,
  },
] as const;

export function TestimonialsSection() {
  return (
    <ScrollReveal>
      <section className="relative z-[1] px-6 py-24 md:px-10 md:py-32">
        <div className="relative mx-auto max-w-[1200px]">
          <ScrollReveal>
            <p className="font-mono relative z-[1] text-[10px] tracking-[0.35em] text-[var(--accent-bright)]">
              Featured quotes
            </p>
            <motion.h2
              className="font-display relative z-[1] mt-4 text-[clamp(2rem,6vw,3.5rem)] tracking-[0.02em] text-[var(--text-primary)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={motionTransition()}
            >
              People we actually worked with
            </motion.h2>
          </ScrollReveal>

          <div className="relative z-[1] mt-14 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <div className="syn-glow-purple syn-card-premium group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl p-8 md:p-9">
                  <div className="absolute right-5 top-5 opacity-25 transition-opacity duration-500 group-hover:opacity-60">
                    <t.icon className="h-5 w-5 text-[var(--accent)]" aria-hidden />
                  </div>

                  <p className="font-body relative z-[1] text-[15px] leading-relaxed text-[var(--text-primary)] md:text-[16px]">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="mt-8 border-t border-[var(--border-subtle)] pt-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-primary)]">{t.name}</p>
                    <p className="font-mono mt-1 text-[10px] tracking-[0.12em] text-[var(--text-dim)]">{t.role}</p>
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
