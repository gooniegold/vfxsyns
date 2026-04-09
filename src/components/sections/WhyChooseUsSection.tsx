"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Music, Package, Timer, Zap } from "lucide-react";
import ShinyText from "@/components/react-bits/ShinyText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FeatureCard } from "@/components/ui/grid-feature-cards";

const ITEMS = [
  {
    icon: Zap,
    title: "PROOF IN THE CUT",
    description: "Reels and uploads you can scrub before you book—no mystery reel.",
  },
  {
    icon: Music,
    title: "MUSIC-FIRST",
    description: "Edits that follow the track instead of fighting it.",
  },
  {
    icon: Timer,
    title: "REAL TIMELINES",
    description: "Scope up front; rush when the date is non-negotiable.",
  },
  {
    icon: Package,
    title: "SERVICES + ASSETS",
    description: "Commission work or grab packs when you want to run the session yourself.",
  },
];

type ViewAnimationProps = {
	delay?: number;
	className?: React.ComponentProps<typeof motion.div>['className'];
	children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function WhyChooseUsSection({ id = "why" }: { id?: string }) {
  return (
    <ScrollReveal>
      <section data-home-bg="why" id={id} className="syn-home-snap-section relative z-[1] px-6 py-[120px] md:px-10">
        <div className="mx-auto w-full max-w-[1400px] space-y-16">
            <AnimatedContainer className="mx-auto max-w-3xl text-center">
                <p className="font-mono relative z-[1] mb-4 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
                    <ShinyText speed={3} className="font-mono text-[10px] uppercase tracking-[0.2em]">
                    ● WORKING TOGETHER
                    </ShinyText>
                </p>
                <h2 className="font-display text-[clamp(44px,7vw,90px)] uppercase tracking-[0.04em] leading-none mb-6">
                    STRAIGHT <span className="text-[var(--accent)]">TALK</span>
                </h2>
                <p className="text-[var(--text-secondary)] font-body mx-auto max-w-lg text-[14px] text-balance md:text-[15px] leading-relaxed">
                    Fewer buzzwords, clearer deliverables—whether you hire the edit or buy a tool.
                </p>
            </AnimatedContainer>

            <AnimatedContainer
                delay={0.4}
                className="mx-auto max-w-[1200px] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {ITEMS.map((feature, i) => (
                    <FeatureCard key={i} feature={feature} className="transition-all duration-500 xl:min-h-[260px] cursor-crosshair hover:-translate-y-1 hover:shadow-2xl" />
                ))}
            </AnimatedContainer>
        </div>
      </section>
    </ScrollReveal>
  );
}
