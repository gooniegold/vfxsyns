"use client";

import { useEffect } from "react";
import { StarField } from "./StarField";
import { FloatingPanel } from "./FloatingPanel";
import { CustomCursor } from "./CustomCursor";

export function HomePage() {
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
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <StarField />
      <CustomCursor />

      {/* Panel */}
      <div className="relative z-[10] w-full max-w-[420px] px-4">
        <FloatingPanel />
      </div>
    </div>
  );
}
