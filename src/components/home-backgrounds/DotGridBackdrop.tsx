"use client";

/** Subtle silver dot grid — very low contrast. */
export function DotGridBackdrop({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0"
      aria-hidden
      style={{
        opacity,
        backgroundImage: `radial-gradient(rgba(184, 190, 199, 1) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />
  );
}
