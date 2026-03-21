"use client";

/** Dark atmospheric veil — vignette + soft noise-like gradients. */
export function DarkVeilBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% -10%, rgba(184,190,199,0.06) 0%, transparent 45%),
            radial-gradient(ellipse 100% 70% at 50% 110%, rgba(5,5,5,0.95) 0%, transparent 55%),
            linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.92) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
