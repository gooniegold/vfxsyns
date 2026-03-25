"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Music, Package, Timer, Zap } from "lucide-react";
import ShinyText from "@/components/react-bits/ShinyText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FeatureCard } from "@/components/ui/grid-feature-cards";

const ITEMS = [
  {
    icon: Zap,
    title: "REAL RESULTS",
    description: "Serious reach across music videos, commercials, and content. The work speaks | check the portfolio.",
  },
  {
    icon: Music,
    title: "BUILT FOR ARTISTS",
    description: "Every workflow is designed around music and storytelling. No corporate polish | just VFX that hits the way the track does.",
  },
  {
    icon: Timer,
    title: "FAST TURNAROUND",
    description: "Speed without sacrificing quality. Rush delivery available. Projects scoped and delivered on time, every time.",
  },
  {
    icon: Package,
    title: "PACK + SERVICE",
    description: "Get custom VFX work OR grab ready-made packs to use yourself. Two ways to level up your visuals.",
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
                    ● WHY WORK WITH ME
                    </ShinyText>
                </p>
                <h2 className="font-display text-[clamp(44px,7vw,90px)] uppercase tracking-[0.05em] leading-none mb-6">
                    THE <span className="text-[var(--accent)]">DIFFERENCE</span>
                </h2>
                <p className="text-[var(--text-secondary)] font-body mx-auto max-w-lg text-[13px] tracking-wide text-balance md:text-[14px]">
                    Everything you need to build fast, secure, scalable visuals without the corporate friction.
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
