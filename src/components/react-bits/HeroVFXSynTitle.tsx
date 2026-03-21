"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const TARGET = "VFXSYN";

const EASE = [0.16, 1, 0.3, 1] as const;

const BREATH_SHADOW = [
  "0 0 0px transparent",
  "0 0 30px rgba(184,190,199,0.4)",
  "0 0 0px transparent",
] as const;

export function HeroVFXSynTitle({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [breathing, setBreathing] = useState(false);
  const letters = TARGET.split("");

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setTimeout(() => setBreathing(true), 1200);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  return (
    <span className={cn("inline-flex max-w-[95vw] flex-wrap justify-center gap-[0.04em]", className)}>
      {letters.map((ch, index) => (
        <motion.span
          key={`${ch}-${index}`}
          className="motion-gpu-hint font-hero inline-block text-[clamp(100px,18vw,240px)] text-[var(--text-primary)]"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, filter: "blur(40px)", y: 60 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                  ...(breathing ? { textShadow: [...BREATH_SHADOW] } : {}),
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.8, delay: index * 0.08, ease: EASE },
                  filter: { duration: 0.8, delay: index * 0.08, ease: EASE },
                  y: { duration: 0.8, delay: index * 0.08, ease: EASE },
                  textShadow: breathing
                    ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0 },
                }
          }
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
