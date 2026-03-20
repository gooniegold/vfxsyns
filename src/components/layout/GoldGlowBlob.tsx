export function GoldGlowBlob() {
  return (
    <div
      className="pointer-events-none fixed -right-[200px] -top-[100px] z-0 h-[600px] w-[600px] rounded-full blur-[80px]"
      style={{
        background: "radial-gradient(circle, rgba(191,160,106,0.04) 0%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}
