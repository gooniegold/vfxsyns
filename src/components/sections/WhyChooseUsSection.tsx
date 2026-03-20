"use client";

import { motion } from "framer-motion";
import { Music, Package, Timer, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MOTION_TRANSITION } from "@/lib/motion-defaults";

const ITEMS = [
  {
    icon: Zap,
    title: "REAL RESULTS",
    body: "Serious reach across music videos, commercials, and content. The work speaks — check the portfolio.",
  },
  {
    icon: Music,
    title: "BUILT FOR ARTISTS",
    body: "Every workflow is designed around music and storytelling. No corporate polish — just VFX that hits the way the track does.",
  },
  {
    icon: Timer,
    title: "FAST TURNAROUND",
    body: "Speed without sacrificing quality. Rush delivery available. Projects scoped and delivered on time, every time.",
  },
  {
    icon: Package,
    title: "PACK + SERVICE",
    body: "Get custom VFX work OR grab ready-made packs to use yourself. Two ways to level up your visuals.",
  },
];

export function WhyChooseUsSection({ id = "why" }: { id?: string }) {
  return (
    <ScrollReveal>
    <section id={id} className="relative px-6 py-[120px] md:px-10">
      <div className="relative mx-auto max-w-[1400px]">
        <span className="section-ghost-num">03</span>
        <ScrollReveal>
          <p className="font-mono relative z-[1] text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
            <span className="text-gradient">● WHY VFXSYN</span>
          </p>
          <motion.h2
            className="motion-gpu-hint font-display text-gradient relative z-[1] mt-4 text-[clamp(56px,8vw,120px)] tracking-[0.05em]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={MOTION_TRANSITION}
          >
            THE DIFFERENCE
          </motion.h2>
        </ScrollReveal>
        <div className="relative z-[1] mt-14 grid gap-6 md:grid-cols-2">
          {ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <motion.div
                data-cursor="hover"
                whileHover={{ y: -4 }}
                transition={MOTION_TRANSITION}
                className="motion-gpu-hint group border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 transition-[border-color,box-shadow] hover:border-[var(--border-gold)] hover:shadow-[var(--shadow-gold)]"
              >
                <item.icon className="h-7 w-7 text-[var(--gold)]" strokeWidth={1.25} />
                <h3 className="font-ui text-gradient mt-5 text-[22px] uppercase tracking-wide">{item.title}</h3>
                <p className="font-body mt-4 text-[12px] leading-[1.85] text-[var(--text-secondary)]">{item.body}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}
