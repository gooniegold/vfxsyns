"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { MOTION_TRANSITION } from "@/lib/motion-defaults";
import { cn } from "@/lib/utils";
import { SaberBorder } from "./SaberBorder";

export function GlassCard({
  children,
  className,
  saber = false,
  saberAlways = false,
  saberHoverOnly = true,
  rounded = 20,
  onClick,
  motionProps,
}: {
  children: React.ReactNode;
  className?: string;
  saber?: boolean;
  saberAlways?: boolean;
  saberHoverOnly?: boolean;
  rounded?: number;
  onClick?: () => void;
  motionProps?: Omit<HTMLMotionProps<"div">, "children" | "className">;
}) {
  const inner = (
    <motion.div
      data-cursor-hover={onClick ? true : undefined}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={MOTION_TRANSITION}
      className={cn(
        "motion-gpu-hint relative z-[1] h-full rounded-[var(--r)] border border-[var(--glass-border)] bg-[rgba(17,17,17,0.88)] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(242,239,232,0.06)] backdrop-blur-[20px] backdrop-saturate-[200%] transition-colors duration-300",
        "hover:border-[rgba(184,190,199,0.35)] hover:bg-[rgba(24,24,24,0.92)]",
        className,
      )}
      style={
        {
          "--r": `${rounded}px`,
          borderRadius: `${rounded}px`,
        } as React.CSSProperties
      }
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  );

  if (!saber) return inner;

  return (
    <SaberBorder
      active={saberAlways}
      hoverOnly={saberHoverOnly}
      borderRadius={rounded}
      intensity="medium"
    >
      {inner}
    </SaberBorder>
  );
}
