"use client";

import { useCallback, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Mouse-follow radial light behind the logotype (illuminates VFXSYN) */
export function HeroTitleSpotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const move = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--hx", `${x}%`);
    el.style.setProperty("--hy", `${y}%`);
  }, []);

  const style = { "--hx": "50%", "--hy": "45%" } as CSSProperties;

  return (
    <div
      className={cn("relative inline-flex max-w-[95vw] flex-wrap justify-center", className)}
      style={style}
      onMouseMove={move}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-12%] z-0 opacity-[0.85]"
        style={{
          background:
            "radial-gradient(ellipse 42% 65% at var(--hx) var(--hy), rgba(242,239,232,0.14), rgba(184,190,199,0.06) 38%, transparent 65%)",
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
