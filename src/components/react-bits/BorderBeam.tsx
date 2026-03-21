"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BorderBeam({
  children,
  className,
  beamClassName,
}: {
  children: ReactNode;
  className?: string;
  beamClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[inherit] p-px", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-[120%] opacity-95",
          "[background:conic-gradient(from_0deg,rgba(184,190,199,0.95),rgba(212,217,224,0.35),rgba(107,114,128,0.55),rgba(184,190,199,0.95))]",
          "animate-[syn-border-beam-spin_5s_linear_infinite]",
          beamClassName,
        )}
      />
      <div className="relative z-[1] h-full w-full rounded-[inherit]">{children}</div>
    </div>
  );
}
