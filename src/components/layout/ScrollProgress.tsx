"use client";

import { useEffect, useState } from "react";

/** GPU friendly: scaleX instead of animating width on every scroll frame. */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;
    const doc = document.documentElement;
    if (!doc) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const next = height > 0 ? (scrollTop / height) * 100 : 0;
      setPct(next);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9997] h-0.5 w-full bg-transparent"
      aria-hidden
    >
      <div
        className="h-full w-full origin-left will-change-transform"
        style={{
          transform: `scaleX(${Math.min(100, Math.max(0, pct)) / 100})`,
          background: "linear-gradient(90deg, #c084fc, #e9d5ff, #a855f7)",
          boxShadow: "0 0 12px rgba(168,85,247,0.45)",
        }}
      />
    </div>
  );
}
