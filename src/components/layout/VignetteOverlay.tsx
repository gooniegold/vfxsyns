/** Cinematic edge darkening */
export function VignetteOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[24]"
      style={{
        background:
          "radial-gradient(ellipse 65% 60% at 50% 45%, transparent 30%, rgba(0,0,0,0.55) 100%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
