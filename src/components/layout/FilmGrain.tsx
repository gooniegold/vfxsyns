"use client";

import { useEffect, useRef } from "react";

export function FilmGrain() {
  const seedRef = useRef(0);
  const rafRef = useRef(0);
  const frameRef = useRef(0);
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);

  useEffect(() => {
    const step = () => {
      frameRef.current += 1;
      if (frameRef.current % 2 === 0) {
        seedRef.current = (seedRef.current + 0.15) % 1000;
        turbulenceRef.current?.setAttribute("seed", String(seedRef.current));
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[25] mix-blend-overlay opacity-[0.035]"
      aria-hidden
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="vfxsyn-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              ref={(el) => {
                turbulenceRef.current = el;
              }}
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              seed="0"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#vfxsyn-grain)" />
      </svg>
    </div>
  );
}
