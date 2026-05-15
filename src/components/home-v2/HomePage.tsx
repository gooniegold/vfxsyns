"use client";

import { useEffect } from "react";
import { StarField } from "./StarField";
import { FloatingPanel } from "./FloatingPanel";
import { CustomCursor } from "./CustomCursor";

export function HomePage() {
  // Lock body scroll on homepage
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Subtle green ambient corner glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 0% 100%, rgba(34,197,94,0.05), transparent 60%), radial-gradient(ellipse 40% 30% at 100% 0%, rgba(34,197,94,0.04), transparent 50%)",
        }}
      />

      <StarField />
      <CustomCursor />

      {/* Panel — centered */}
      <div className="relative z-[10] w-full max-w-[420px] px-4">
        <FloatingPanel />
      </div>

      {/* Wordmark bottom left */}
      <div className="absolute bottom-6 left-6 z-[10]">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(34,197,94,0.25)]">
          vfxsyn.org
        </p>
      </div>
    </div>
  );
}
