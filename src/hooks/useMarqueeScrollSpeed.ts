"use client";

import { useEffect, useState } from "react";

/** Returns CSS animation duration in seconds — faster when user scrolls quickly */
export function useMarqueeScrollSpeed(baseSec = 40) {
  const [durationSec, setDurationSec] = useState(baseSec);

  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let lastT = performance.now();
    let raf = 0;

    const loop = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(1, now - lastT);
      const v = Math.abs(y - lastY) / dt;
      lastY = y;
      lastT = now;
      const target = Math.max(14, Math.min(52, baseSec - v * 180));
      setDurationSec((d) => d + (target - d) * 0.06);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [baseSec]);

  return durationSec;
}
