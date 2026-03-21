"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { subscribeMatchMedia } from "@/lib/safe-media";
import { cn } from "@/lib/utils";

export function WordRotate({
  words,
  intervalMs = 2000,
  startDelayMs = 500,
  className,
}: {
  words: string[];
  intervalMs?: number;
  startDelayMs?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    return subscribeMatchMedia("(prefers-reduced-motion: reduce)", setReduced);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let intervalId: number | undefined;
    const start = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setI((n) => (n + 1) % words.length);
      }, intervalMs);
    }, startDelayMs);
    return () => {
      window.clearTimeout(start);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [words.length, intervalMs, startDelayMs, reduced]);

  const current = words[reduced ? 0 : i] ?? words[0];

  return (
    <span className={cn("inline-flex min-h-[1.2em] items-center justify-center", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0, filter: "blur(10px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(6px)", y: -6 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block italic"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
