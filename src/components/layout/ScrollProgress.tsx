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
        className="motion-gpu-hint h-full origin-left shadow-[0_0_10px_rgba(191,160,106,0.45)] transition-[width] duration-150 ease-out"
        style={{
          width: `${width}%`,
          background: "linear-gradient(90deg, #BFA06A, #D4B87A, #7A5C2E)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 2s linear infinite",
        }}
      />
    </div>
  );
}
