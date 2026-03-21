"use client";

import { useCallback, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className,
  spotlightClassName,
}: {
  children: ReactNode;
  className?: string;
  spotlightClassName?: string;
}) {
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  }, []);

  const style = {
    "--spot-x": "50%",
    "--spot-y": "50%",
  } as CSSProperties;

  return (
    <div
      className={cn("group/spot relative overflow-hidden rounded-[inherit]", className)}
      style={style}
      onMouseMove={onMove}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-[0] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100",
          spotlightClassName,
        )}
        style={{
          background:
            "radial-gradient(520px circle at var(--spot-x) var(--spot-y), rgba(184,190,199,0.14), transparent 45%)",
        }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
