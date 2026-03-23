"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; y: number | string };
  animationTo?: { opacity: number; y: number | string };
  threshold?: number;
  rootMargin?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text = "",
  className = "",
  delay = 0.05,
  animationFrom = { opacity: 0, y: 40 },
  animationTo = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-50px",
}) => {
  const letters = text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline-block ${className}`}
      style={{ whiteSpace: "pre-wrap", display: "inline-block" }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={animationFrom}
          animate={inView ? animationTo : animationFrom}
          transition={{
            duration: 0.6,
            delay: i * delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block transform-gpu will-change-transform"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </p>
  );
};
