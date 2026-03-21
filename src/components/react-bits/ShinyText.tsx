"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ShinyTextProps = {
  children: ReactNode;
  className?: string;
  /** Seconds per full shine cycle (React Bits default semantics). */
  speed?: number;
  color?: string;
  shineColor?: string;
  /** Linear gradient angle in degrees. */
  spread?: number;
};

/** Metallic sweep — based on React Bits “Shiny Text” (gradient + animated background-position). */
export default function ShinyText({
  children,
  className = "",
  speed = 3,
  /** Silver base */
  color = "#B8BEC7",
  /** Subtle highlight — silver / soft gold */
  shineColor = "#D4D9E0",
  spread = 120,
}: ShinyTextProps) {
  return (
    <span
      className={cn("syn-shiny-text inline-block bg-clip-text text-transparent bg-[length:200%_auto]", className)}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animation: `synShinyText ${speed}s linear infinite`,
      }}
    >
      {children}
    </span>
  );
}
