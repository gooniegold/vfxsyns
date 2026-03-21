"use client";

/** Very dim aurora wash behind particles */
export function HeroAuroraLayer() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[0] overflow-hidden opacity-[0.15]"
      aria-hidden
    >
      <div
        className="absolute -inset-[20%] h-[140%] w-[140%] animate-[syn-hero-aurora_24s_ease-in-out_infinite] motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 30% 40%, #0a0a0a 0%, transparent 50%), radial-gradient(ellipse 70% 45% at 70% 60%, #1a1a1a 0%, transparent 55%), radial-gradient(ellipse 50% 35% at 50% 50%, rgba(184,190,199,0.35) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
