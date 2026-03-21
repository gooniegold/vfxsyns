"use client";

import type { CSSProperties } from "react";

/**
 * Aurora-style mesh (React Bits–style): soft silver gradients with slow drift.
 */
export function AuroraBackdrop({
  colorStops = ["#B8BEC7", "#6B7280", "#D4D9E0"],
  speed = 0.2,
  amplitude = 0.3,
  blend = 0.5,
}: {
  colorStops?: [string, string, string];
  speed?: number;
  amplitude?: number;
  blend?: number;
}) {
  const duration = `${Math.max(8, 18 / Math.max(speed, 0.05))}s`;
  const tx = `${amplitude * 18}%`;
  const ty = `${-amplitude * 14}%`;
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-[-35%] mix-blend-screen"
        style={
          {
            opacity: blend,
            background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${colorStops[0]}33 0%, transparent 55%),
              radial-gradient(ellipse 70% 50% at 70% 60%, ${colorStops[1]}44 0%, transparent 50%),
              radial-gradient(ellipse 90% 70% at 50% 80%, ${colorStops[2]}28 0%, transparent 60%)`,
            filter: "blur(72px)",
            animation: `synAuroraDrift ${duration} ease-in-out infinite alternate`,
            ["--aurora-tx" as string]: tx,
            ["--aurora-ty" as string]: ty,
          } as CSSProperties
        }
      />
    </div>
  );
}
