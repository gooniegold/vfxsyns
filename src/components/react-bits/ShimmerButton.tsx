"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#B8BEC7",
  background = "#050505",
}: {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  background?: string;
}) {
  return (
    <span
      className={cn("relative inline-flex overflow-hidden rounded-[inherit]", className)}
      style={{ background }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full animate-[syn-shimmer_2.2s_ease-in-out_infinite] opacity-40"
        style={{
          background: `linear-gradient(105deg, transparent 0%, transparent 40%, ${shimmerColor} 50%, transparent 60%, transparent 100%)`,
        }}
      />
      <span className="relative z-[1] flex w-full items-center justify-center">{children}</span>
    </span>
  );
}
