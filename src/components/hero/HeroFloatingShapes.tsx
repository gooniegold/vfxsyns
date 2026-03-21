"use client";

export function HeroFloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <div
        className="absolute left-[8%] top-[22%] h-3 w-3 rotate-12 border border-[rgba(184,190,199,0.12)] opacity-40 [animation:vfxsyn-float-a_18s_ease-in-out_infinite]"
      />
      <div
        className="absolute right-[12%] top-[30%] h-2 w-2 rotate-45 bg-[rgba(184,190,199,0.08)] [animation:vfxsyn-float-b_22s_ease-in-out_infinite]"
      />
      <div
        className="absolute bottom-[28%] left-[18%] h-0 w-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-[rgba(184,190,199,0.1)] opacity-50 [animation:vfxsyn-float-c_20s_ease-in-out_infinite]"
      />
      <div
        className="absolute bottom-[35%] right-[22%] h-4 w-4 border border-[rgba(212,217,224,0.1)] opacity-35 [animation:vfxsyn-float-a_24s_ease-in-out_infinite_2s]"
      />
    </div>
  );
}
