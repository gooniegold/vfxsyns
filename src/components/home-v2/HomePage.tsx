"use client";

import { useEffect } from "react";
import { StarField } from "./StarField";
import { CustomCursor } from "./CustomCursor";
import { BentoHome } from "./BentoHome";

export function HomePage() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-auto">
      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Starfield */}
      <StarField />
      <CustomCursor />

      {/* Bento grid — centered, scroll if needed on small screens */}
      <div
        className="relative z-[10] w-full px-4 py-6"
        style={{ maxWidth: 896 }}
      >
        <BentoHome />
      </div>
    </div>
  );
}
