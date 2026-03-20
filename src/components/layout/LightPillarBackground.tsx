"use client";

import { useMemo } from "react";

export function LightPillarBackground() {
  const beams = useMemo(
    () =>
      [6, 11, 19, 28, 37, 48, 61, 74].map((left, i) => ({
        left: `${left}%`,
        width: 1 + (i % 4),
        blur: 8 + (i % 3) * 6,
        duration: 14 + (i % 5) * 2.2,
        delay: i * 1.4,
        opacity: 0.07 + (i % 3) * 0.035,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {beams.map((b, i) => (
        <div
          key={i}
          className="absolute top-0 h-[120vh] -translate-y-[10vh]"
          style={{
            left: b.left,
            width: b.width,
            opacity: b.opacity,
            filter: `blur(${b.blur}px)`,
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(184,190,199,0.15) 35%, rgba(212,217,224,0.08) 55%, rgba(184,190,199,0.04) 78%, transparent 100%)",
            animation: `pillarDrift ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
