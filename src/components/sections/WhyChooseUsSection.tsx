"use client";

import { motion } from "framer-motion";
import { HoverSplitHeading } from "@/components/ui/HoverSplitHeading";
import { Music, Package, Timer, Zap } from "lucide-react";
import ShinyText from "@/components/react-bits/ShinyText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StarBorder } from "@/components/ui/StarBorder";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { SpotlightCard } from "@/components/react-bits/SpotlightCard";
import { ParallaxGhostNum } from "@/components/ui/ParallaxGhostNum";

const HEADING_EASE = [0.16, 1, 0.3, 1] as const;

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
      <section data-home-bg="why" id={id} className="syn-home-snap-section relative z-[1] px-6 py-[120px] md:px-10">
        <div className="relative mx-auto max-w-[1400px]">
          <ParallaxGhostNum n="03" />
          <ScrollReveal>
            <p className="font-mono relative z-[1] text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
              <ShinyText speed={3} className="font-mono text-[10px] uppercase tracking-[0.2em]">
                ● WHY VFXSYN
              </ShinyText>
            </p>
            <motion.h2
              className="motion-gpu-hint font-display relative z-[1] mt-4 text-[clamp(56px,8vw,120px)] tracking-[0.05em]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: HEADING_EASE }}
            >
              <HoverSplitHeading
                text="THE DIFFERENCE"
                speed={3}
                className="font-display text-[clamp(56px,8vw,120px)] tracking-[0.05em]"
              />
            </motion.h2>
            <motion.div
              className="motion-gpu-hint relative z-[1] mt-4 h-px w-[60px] bg-[var(--gold)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              style={{ transformOrigin: "left center" }}
              transition={{ duration: 0.55, delay: 0.82, ease: HEADING_EASE }}
              aria-hidden
            />
          </ScrollReveal>
          <div className="relative z-[1] mt-14 grid gap-6 md:grid-cols-2 md:items-stretch">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                className="motion-gpu-hint h-full min-h-0"
                data-cursor="hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
              >
                <TiltGlare
                  className="h-full min-h-[200px] rounded-[16px]"
                  tiltClassName="h-full min-h-[200px] rounded-[16px] [transform-style:preserve-3d]"
                  tiltAmount={8}
                  glareColor="rgba(184,190,199,0.14)"
                >
                  <SpotlightCard className="h-full min-h-[200px] rounded-[16px]">
                  <StarBorder
                    className="h-full min-h-0 w-full !block rounded-[16px]"
                    innerClassName="group relative flex h-full min-h-0 flex-col rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 transition-[border-color,box-shadow] duration-300 hover:border-[var(--border-gold)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                  >
                    <item.icon
                      className="h-7 w-7 text-[var(--text-secondary)] transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:rotate-[10deg] group-hover:text-[var(--gold)] group-hover:[filter:drop-shadow(0_0_8px_rgba(184,190,199,0.6))]"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                    <h3 className="mt-5 text-[22px] uppercase tracking-wide">
                      <ShinyText speed={3} className="font-ui uppercase tracking-wide">
                        {item.title}
                      </ShinyText>
                    </h3>
                    <p className="font-body mt-4 text-[12px] leading-[1.85] text-[var(--text-secondary)]">{item.body}</p>
                  </StarBorder>
                  </SpotlightCard>
                </TiltGlare>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
