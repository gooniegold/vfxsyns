"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ShinyText from "@/components/react-bits/ShinyText";
import { cn } from "@/lib/utils";

const TARGET = "VFXSYN";
const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomChar() {
  return POOL[Math.floor(Math.random() * POOL.length)] ?? "X";
}

export function HeroVFXSynTitle({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [chars, setChars] = useState(TARGET.split(""));
  const [glitch, setGlitch] = useState(false);
  const scrambleRef = useRef<number | null>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setGlitch(true);
      window.setTimeout(() => setGlitch(false), 300);
    }, 8000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const resolveTo = useCallback((target: string) => {
    const steps = 10;
    let step = 0;
    if (scrambleRef.current) window.clearInterval(scrambleRef.current);
    scrambleRef.current = window.setInterval(() => {
      step += 1;
      const t = step / steps;
      setChars(
        target.split("").map((c, i) => {
          if (t > i / target.length + 0.15) return c;
          return randomChar();
        }),
      );
      if (step >= steps) {
        if (scrambleRef.current) window.clearInterval(scrambleRef.current);
        setChars(target.split(""));
      }
    }, 80);
  }, []);

  const onEnter = () => {
    hoverRef.current = true;
    if (reduce) return;
    resolveTo(TARGET);
  };

  const onLeave = () => {
    hoverRef.current = false;
    if (reduce) return;
    resolveTo(TARGET);
  };

  return (
    <motion.span
      className={cn(
        "relative inline-flex flex-wrap justify-center gap-[0.04em]",
        glitch && !reduce && "syn-hero-glitch",
        className,
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={false}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-8%] z-0 animate-[syn-hero-neon-pulse_4s_ease-in-out_infinite] motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(184,190,199,0.2), transparent 70%)",
          filter: "blur(14px)",
          opacity: 0.55,
        }}
      />
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className={cn(
            "motion-gpu-hint font-hero relative z-[1] inline-block text-[clamp(100px,18vw,240px)]",
            glitch && !reduce && "syn-hero-glitch-char",
          )}
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
    </motion.span>
  );
}
