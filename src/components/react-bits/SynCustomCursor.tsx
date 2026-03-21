"use client";

import { useEffect, useState } from "react";
import { subscribeMatchMedia } from "@/lib/safe-media";
import { cn } from "@/lib/utils";

const HOVER_SELECTORS =
  'a, button, [role="button"], [data-cursor="hover"], [data-cursor-hover], input, textarea, select, summary, label[for]';

export function SynCustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    return subscribeMatchMedia("(prefers-reduced-motion: reduce)", setReduced);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const root = document.documentElement;
    root.classList.add("syn-dot-cursor");

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) {
        setHover(false);
        return;
      }
      const interactive = el.closest(HOVER_SELECTORS);
      setHover(Boolean(interactive));
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      root.classList.remove("syn-dot-cursor");
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100000]"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <div
        className={cn(
          "rounded-full border border-[rgba(212,217,224,0.55)] bg-[radial-gradient(circle_at_30%_30%,#f2efe8,#b8bec7_45%,#6b7280)] shadow-[0_0_12px_rgba(184,190,199,0.35)] transition-[width,height,opacity] duration-200 ease-out",
          hover ? "h-9 w-9 opacity-95" : "h-2.5 w-2.5 opacity-90",
        )}
      />
    </div>
  );
}
