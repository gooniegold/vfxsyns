"use client";

export function PackRibbon() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-1 top-6 z-[3] h-24 w-24 overflow-hidden"
    >
      <div className="absolute right-[-38px] top-[18px] w-[140px] rotate-45 bg-[rgba(184,190,199,0.12)] py-1 text-center font-mono text-[7px] uppercase tracking-[0.35em] text-[var(--gold)] shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
        PACK
      </div>
    </div>
  );
}
