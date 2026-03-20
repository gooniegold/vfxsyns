"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;
    const doc = document.documentElement;
    if (!doc) return;

    let ticking = false;

    const update = () => {
      const root = document.documentElement;
      if (!root) return;
      const scrollTop = window.scrollY || root.scrollTop;
      const height = root.scrollHeight - root.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      setWidth(pct);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
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
        className="h-full origin-left shadow-[0_0_10px_rgba(184,190,199,0.45)] transition-[width] duration-150 ease-out"
        style={{
          width: `${width}%`,
          background: "linear-gradient(90deg, #B8BEC7, #D4D9E0, #6B7280)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 2s linear infinite",
        }}
      />
    </div>
  );
}
