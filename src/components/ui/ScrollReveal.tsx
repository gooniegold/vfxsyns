"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { MOTION_TRANSITION } from "@/lib/motion-defaults";

export function ScrollReveal({
  children,
  className,
  delay = 0,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition">) {
  return (
    <motion.div
      className={cn("motion-gpu-hint", className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...MOTION_TRANSITION, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
