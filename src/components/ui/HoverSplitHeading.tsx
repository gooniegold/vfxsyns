"use client";

import { motion } from "framer-motion";
import ShinyText from "@/components/react-bits/ShinyText";
import { cn } from "@/lib/utils";

const containerVariants = {
  rest: {},
  hover: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letterVariants = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  },
};

/**
 * Major section title: ShinyText per letter + staggered lift + gold on group hover.
 */
export function HoverSplitHeading({
  text,
  className,
  shinyClassName,
  speed = 3,
  as: Tag = "span",
}: {
  text: string;
  /** Typography / sizing (passed to each ShinyText letter). */
  className?: string;
  shinyClassName?: string;
  speed?: number;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const chars = text.split("");

  return (
    <Tag className="inline-block max-w-full">
      <motion.span
        className="syn-heading-hover inline-flex max-w-full flex-wrap justify-center gap-[0.04em]"
        initial="rest"
        whileHover="hover"
        variants={containerVariants}
        aria-label={text}
      >
        {chars.map((c, i) => {
          if (c === " ") {
            return (
              <span key={`sp-${i}`} className="inline-block w-[0.28em]" aria-hidden>
                &nbsp;
              </span>
            );
          }
          return (
            <motion.span
              key={`${c}-${i}`}
              variants={letterVariants}
              className="inline-block"
              style={{ display: "inline-block" }}
            >
              <ShinyText
                speed={speed}
                className={cn("syn-shiny-letter", className, shinyClassName)}
              >
                {c}
              </ShinyText>
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
