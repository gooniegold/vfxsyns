"use client";

/** Flowing color bends — silver / charcoal, low opacity. */
export function ColorBendsBackdrop({
  colors = ["#B8BEC7", "#181818", "#6B7280", "#111111"],
  speed = 0.1,
}: {
  colors?: [string, string, string, string];
  speed?: number;
}) {
  const duration = `${Math.max(24, 48 / Math.max(speed, 0.02))}s`;
  return (
    <div className="absolute inset-0 overflow-hidden opacity-40" aria-hidden>
      <div
        className="absolute inset-[-25%]"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, ${colors[0]}22 0%, transparent 55%),
            radial-gradient(ellipse 55% 45% at 80% 20%, ${colors[1]}55 0%, transparent 50%),
            radial-gradient(ellipse 70% 60% at 50% 90%, ${colors[2]}18 0%, transparent 55%),
            linear-gradient(165deg, ${colors[3]}44 0%, transparent 45%, ${colors[0]}15 100%)`,
          filter: "blur(56px)",
          animation: `synColorBends ${duration} ease-in-out infinite`,
        }}
      />
    </div>
  );
}
