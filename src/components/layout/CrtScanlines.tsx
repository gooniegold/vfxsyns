/** Site-wide subtle CRT scanlines — fixed, pointer-events none */
export function CrtScanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[26] opacity-[0.02]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 3px)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
