"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { HoverSplitHeading } from "@/components/ui/HoverSplitHeading";
import { MOTION_TRANSITION } from "@/lib/motion-defaults";
import { cn } from "@/lib/utils";

export function SynPageHero({
  title,
  subtitle,
  eyebrow,
  sectionGhostNum,
  titleClassName = "font-display text-[clamp(56px,8vw,120px)] leading-none tracking-[0.06em]",
  subtitleClassName,
  innerClassName,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: ReactNode;
  sectionGhostNum?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  innerClassName?: string;
}) {
  return (
    <section className="relative px-6 pb-12 pt-4 md:px-10">
      {sectionGhostNum ? (
        <span className="section-ghost-num" aria-hidden>
          {sectionGhostNum}
        </span>
      ) : null}
      <motion.div
        className={cn("motion-gpu-hint relative z-[1] max-w-[1400px]", innerClassName)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={MOTION_TRANSITION}
      >
        {eyebrow}
        <div className={eyebrow ? "mt-4" : ""}>
          <HoverSplitHeading text={title} className={titleClassName} speed={3} />
        </div>
        {subtitle ? (
          <p
            className={cn(
              "mt-4 max-w-xl font-body text-[13px] italic text-[var(--text-secondary)] md:text-[15px]",
              subtitleClassName,
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </motion.div>
    </section>
  );
}
