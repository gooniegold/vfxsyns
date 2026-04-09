"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { MOTION_TRANSITION } from "@/lib/motion-defaults";

export const ScrollReveal = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    delay?: number;
  } & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition">
>(function ScrollReveal({ children, className, delay = 0, ...rest }, ref) {
  return (
    <motion.div
      ref={ref}
      className={cn("motion-gpu-hint", className)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...MOTION_TRANSITION, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

ScrollReveal.displayName = "ScrollReveal";
