"use client";

import { useEffect } from "react";
import { StarField } from "./StarField";
import { CustomCursor } from "./CustomCursor";
import { FloatingPanel } from "./FloatingPanel";

export function HomePage() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden">
      {/* Starfield lives absolutely inside this container */}
      <StarField />

      {/* Vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <CustomCursor />

      {/* Floating panel — centered, above vignette */}
      <div className="relative z-[10] w-full px-4">
        <FloatingPanel />
      </div>
    </div>
  );
}
