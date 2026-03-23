"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MessageCircle, Target, Zap, Package } from "lucide-react";
import ShinyText from "@/components/react-bits/ShinyText";
import { motionTransition } from "@/lib/motion-defaults";

const STEPS = [
  {
    num: "01",
    title: "DM ME",
    desc: "Reach out on Instagram with your vision, references, and timeline.",
    icon: MessageCircle,
  },
  {
    num: "02",
    title: "WE PLAN",
    desc: "We discuss the scope, style, and deliverables until it's locked in.",
    icon: Target,
  },
  {
    num: "03",
    title: "I CREATE",
    desc: "VFX, color grading, 3D animation | I bring the vision to life.",
    icon: Zap,
  },
  {
    num: "04",
    title: "YOU RECEIVE",
    desc: "Final files delivered. Quick turnaround, unlimited revisions.",
    icon: Package,
  },
] as const;

export function ProcessSection() {
  return (
    <ScrollReveal>
      <section className="syn-home-snap-section relative z-[1] px-6 py-[120px] md:px-10">
        <div className="relative mx-auto max-w-[1200px]">
          <ScrollReveal>
            <p className="font-mono relative z-[1] text-[10px] tracking-[0.4em] text-[var(--accent)]">
              <ShinyText speed={3} className="font-mono text-[10px] tracking-[0.4em]">
                HOW IT WORKS
              </ShinyText>
            </p>
            <motion.h2
              className="motion-gpu-hint font-display relative z-[1] mt-4 text-[clamp(44px,7vw,100px)] tracking-[0.05em]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={motionTransition()}
            >
              <span className="text-gradient">THE PROCESS</span>
            </motion.h2>
          </ScrollReveal>

          <div className="relative z-[1] mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={s.num} delay={i * 0.1}>
                  <div className="syn-card-premium group relative flex flex-col gap-4 p-8 transition-all duration-400 hover:translate-y-[-4px]">
                    {/* connecting line */}
                    {i < STEPS.length - 1 && (
                      <div
                        className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-6 translate-x-full lg:block"
                        style={{
                          background: "linear-gradient(90deg, var(--border-accent), transparent)",
                        }}
                        aria-hidden
                      />
                    )}

                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-[var(--accent)]" />
                      <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)] opacity-60">
                        {s.num}
                      </span>
                    </div>

                    <h3 className="font-ui text-[22px] tracking-[0.06em] text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {s.title}
                    </h3>

                    <p className="font-body text-[12px] leading-relaxed text-[var(--text-secondary)]">
                      {s.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
