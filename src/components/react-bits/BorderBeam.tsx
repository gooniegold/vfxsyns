"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BorderBeam({
  children,
  className,
  beamClassName,
  colorFrom = "rgba(184,190,199,0.95)",
  colorTo = "rgba(99,102,241,0.55)",
  size = 120, // percentage based on original inset
  duration = 5,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  beamClassName?: string;
  colorFrom?: string;
  colorTo?: string;
  size?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[inherit] p-px", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute opacity-95",
          "animate-[syn-border-beam-spin_linear_infinite]",
          beamClassName,
        )}
        style={{
          inset: `-${size}%`,
          background: `conic-gradient(from 0deg, ${colorFrom}, ${colorTo}, transparent, ${colorFrom})`,
          animationDuration: `${duration}s`,
          animationDelay: `-${delay}s`,
        }}
      />
      <div className="relative z-[1] h-full w-full rounded-[inherit]">{children}</div>
    </div>
  );
}
