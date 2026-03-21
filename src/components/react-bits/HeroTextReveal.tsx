"use client";

import { motion, useReducedMotion } from "framer-motion";
import ShinyText from "@/components/react-bits/ShinyText";
import { cn } from "@/lib/utils";

/**
 * Split text reveal on load — blur → sharp with stagger (React Bits TextReveal / SplitText style).
 */
export function HeroTextReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const chars = text.split("");

  return (
    <span className="inline-flex max-w-[95vw] flex-wrap justify-center gap-[0.04em]">
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className={cn("motion-gpu-hint font-hero inline-block text-[clamp(100px,18vw,240px)]", className)}
          initial={reduce ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.55, delay: 0.12 + i * 0.06, ease: [0.16, 1, 0.3, 1] }
          }
        >
          <ShinyText speed={3} className="font-hero text-[clamp(100px,18vw,240px)]">
            {ch}
          </ShinyText>
        </motion.span>
      ))}
    </span>
  );
}
