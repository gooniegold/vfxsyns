"use client";

export function HeroMeteors() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <div
        className="absolute -left-[20%] top-[12%] h-px w-[45%] rotate-[35deg] bg-gradient-to-r from-transparent via-[rgba(184,190,199,0.35)] to-transparent opacity-0 [animation:vfxsyn-meteor_9s_ease-in-out_infinite]"
      />
      <div
        className="absolute -left-[10%] top-[55%] h-px w-[38%] rotate-[32deg] bg-gradient-to-r from-transparent via-[rgba(212,217,224,0.25)] to-transparent opacity-0 [animation:vfxsyn-meteor_14s_ease-in-out_infinite_4s]"
      />
    </div>
  );
}
