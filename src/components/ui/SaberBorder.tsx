"use client";

import { cn } from "@/lib/utils";

type SaberColor = "gold" | "white" | "amber";
type Intensity = "low" | "medium" | "high";

export function SaberBorder({
  children,
  className,
  active = false,
  hoverOnly = true,
  color = "gold",
  borderRadius = 20,
  intensity = "medium",
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  hoverOnly?: boolean;
  color?: SaberColor;
  borderRadius?: number;
  intensity?: Intensity;
}) {
  const always = active || !hoverOnly;

  return (
    <div
      className={cn("saber-border", className)}
      style={
        {
          borderRadius: `${borderRadius}px`,
          "--saber-r": `${borderRadius}px`,
        } as React.CSSProperties
      }
      data-saber={color}
      data-intensity={intensity}
      data-active={always ? "1" : "0"}
      data-hover={always ? "0" : "1"}
    >
      {children}
    </div>
  );
}
