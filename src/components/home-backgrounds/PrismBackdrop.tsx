"use client";

/** Dark prism — conic layers, silver/black, slow rotation. */
export function PrismBackdrop({
  isTransparent = true,
  timeScale = 0.2,
}: {
  isTransparent?: boolean;
  timeScale?: number;
}) {
  const duration = `${Math.max(40, 120 / Math.max(timeScale, 0.05))}s`;
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-[-20%] mix-blend-soft-light"
        style={{
          opacity: isTransparent ? 0.45 : 1,
          background: `conic-gradient(from 210deg at 50% 50%,
            rgba(5,5,5,0.95) 0deg,
            rgba(184,190,199,0.12) 72deg,
            rgba(17,17,17,0.9) 140deg,
            rgba(107,114,128,0.18) 220deg,
            rgba(5,5,5,0.95) 360deg)`,
          filter: "blur(48px)",
          animation: `synPrismSpin ${duration} linear infinite`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.75)_100%)]"
        aria-hidden
      />
    </div>
  );
}
