"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { subscribeMatchMedia } from "@/lib/safe-media";

const RANGE = 80;
const STRENGTH = 0.12;

export function MagneticDockWrap({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [coarse, setCoarse] = useState(true);

  useEffect(() => {
    return subscribeMatchMedia("(pointer: coarse)", setCoarse);
  }, []);

  useEffect(() => {
    if (coarse) return;
    const el = wrapRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d > RANGE) {
        setOff({ x: 0, y: 0 });
        return;
      }
      const pull = (RANGE - d) / RANGE;
      setOff({ x: dx * pull * STRENGTH, y: dy * pull * STRENGTH });
    };

    const leave = () => setOff({ x: 0, y: 0 });
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [coarse]);

  return (
    <div ref={wrapRef} style={{ transform: `translate(${off.x}px, ${off.y}px)` }} className="will-change-transform">
      {children}
    </div>
  );
}
