"use client";

import { motion } from "framer-motion";

/**
 * Fuzzy / glitch-style display text (ReactBits FuzzyText-inspired), no external MCP.
 */
export function FuzzyComingSoon() {
  return (
    <div className="group relative mx-auto max-w-4xl select-none px-4 py-8 text-center">
      <motion.div
        className="font-display relative text-[clamp(56px,8vw,120px)] leading-none tracking-[0.08em] text-[var(--gold)]"
        animate={{
          filter: ["blur(0.5px)", "blur(1.2px)", "blur(0.45px)", "blur(1px)", "blur(0.5px)"],
          opacity: [0.92, 1, 0.88, 1, 0.92],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="relative z-[1] inline-block transition-[filter,transform] duration-300 group-hover:blur-[2px] group-hover:brightness-110"
          style={{ textShadow: "0 0 40px rgba(184,190,199,0.35)" }}
        >
          COMING SOON
        </span>
        <span
          className="pointer-events-none absolute inset-0 z-0 translate-x-[2px] translate-y-[1px] text-[var(--gold)] opacity-30 mix-blend-screen blur-[0.5px] transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-45"
          aria-hidden
        >
          COMING SOON
        </span>
        <span
          className="pointer-events-none absolute inset-0 z-0 -translate-x-[2px] text-[var(--gold)] opacity-25 mix-blend-screen blur-[0.5px] transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-40"
          aria-hidden
        >
          COMING SOON
        </span>
      </motion.div>
    </div>
  );
}
