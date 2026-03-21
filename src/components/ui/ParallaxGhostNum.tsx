"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxGhostNum({ n }: { n: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-18%"]);

  return (
    <motion.span
      ref={ref}
      style={{ y }}
      className="section-ghost-num parallax-section-ghost will-change-transform"
      aria-hidden
    >
      {n}
    </motion.span>
  );
}
