"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_LERPS = [0.2, 0.16, 0.14, 0.12, 0.1, 0.08, 0.06, 0.05] as const;
const TRAIL_OPACITY = [0.35, 0.28, 0.2, 0.14, 0.1, 0.08, 0.06, 0.04] as const;

/** Lead dot (no lag) + 8 trailing dots. Skipped on coarse pointers. */
export function GoldArrowTrail() {
  const leadRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]);
  const trailPos = useRef(TRAIL_LERPS.map(() => ({ x: 0, y: 0 })));
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const [showTrail, setShowTrail] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.matchMedia !== "function") return;
    try {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
    } catch {
      return;
    }
    setShowTrail(true);
  }, []);

  useEffect(() => {
    if (!showTrail) return;
    if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;

    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const trailLead = leadRef.current;
      if (trailLead) {
        trailLead.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", move);

    const tick = () => {
      const t = target.current;
      let prev = { x: t.x, y: t.y };
      for (let i = 0; i < TRAIL_LERPS.length; i++) {
        const p = trailPos.current[i];
        const l = TRAIL_LERPS[i];
        p.x += (prev.x - p.x) * l;
        p.y += (prev.y - p.y) * l;
        const dot = trailsRef.current[i];
        if (dot) {
          dot.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
          dot.style.opacity = String(TRAIL_OPACITY[i] ?? 0.04);
        }
        prev = { x: p.x, y: p.y };
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafRef.current);
    };
  }, [showTrail]);

  if (!showTrail) return null;

  return (
    <>
      <div
        ref={leadRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[4px] w-[4px] rounded-full bg-[var(--gold)] shadow-[0_0_6px_var(--gold)]"
        style={{ transform: "translate(-100px, -100px)" }}
        aria-hidden
      />
      {TRAIL_LERPS.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailsRef.current[i] = el;
          }}
          className="pointer-events-none fixed left-0 top-0 z-[9998] h-[3px] w-[3px] rotate-45 bg-[var(--gold)] shadow-[0_0_6px_rgba(184,190,199,0.55)]"
          style={{ opacity: TRAIL_OPACITY[i] }}
          aria-hidden
        />
      ))}
    </>
  );
}
