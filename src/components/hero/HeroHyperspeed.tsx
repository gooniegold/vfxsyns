"use client";

import { useEffect, useState } from "react";
import { subscribeMatchMedia } from "@/lib/safe-media";
import { cn } from "@/lib/utils";

/** Subtle warp streaks — fast burst on load, then slow ambient drift */
export function HeroHyperspeed() {
  const [phase, setPhase] = useState<"boost" | "cruise">("boost");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    return subscribeMatchMedia("(prefers-reduced-motion: reduce)", setReduced);
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase("cruise");
      return;
    }
    const t = window.setTimeout(() => setPhase("cruise"), 1400);
    return () => window.clearTimeout(t);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[0] overflow-hidden opacity-[0.35]"
      aria-hidden
    >
      <div
        className={cn(
          "absolute inset-[-40%] h-[180%] w-[140%] left-1/2 -translate-x-1/2",
          phase === "boost" && "animate-[syn-hyperspeed-boost_1.4s_ease-out_forwards]",
          phase === "cruise" && "animate-[syn-hyperspeed-cruise_28s_linear_infinite]",
        )}
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent 0px, transparent 14px, rgba(184,190,199,0.04) 14px, rgba(184,190,199,0.04) 15px), repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(212,217,224,0.03) 22px, rgba(212,217,224,0.03) 23px)",
        }}
      />
      <div
        className={cn(
          "absolute inset-0 opacity-40 mix-blend-screen",
          phase === "boost" && "animate-[syn-hyperspeed-sheen_1.2s_ease-out_forwards]",
          phase === "cruise" && "animate-[syn-hyperspeed-sheen-slow_22s_ease-in-out_infinite]",
        )}
        style={{
          background:
            "linear-gradient(105deg, transparent 35%, rgba(184,190,199,0.12) 50%, transparent 65%)",
        }}
      />
    </div>
  );
}
