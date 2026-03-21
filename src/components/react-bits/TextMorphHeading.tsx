"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Staggered blur-in “morph” reveal for section headings */
export function TextMorphHeading({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-flex flex-wrap justify-center gap-x-[0.28em] gap-y-1", className)}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
