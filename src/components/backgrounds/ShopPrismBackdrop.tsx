"use client";

import Prism from "@/components/Prism";

const FILL =
  "pointer-events-none absolute inset-0 h-full w-full min-h-full [pointer-events:none]";

/**
 * React Bits Prism — shop page fixed backdrop (gold on #050505).
 */
export function ShopPrismBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden [pointer-events:none]"
      style={{
        pointerEvents: "none",
        backgroundColor: "#050505",
        backgroundImage: "radial-gradient(ellipse at top, rgba(184,190,199,0.08) 0%, transparent 60%)",
      }}
      aria-hidden
    >
      <div className={FILL} style={{ pointerEvents: "none" }}>
        <Prism
          animationType="rotate"
          transparent
          hueShift={0}
          glow={1.2}
          timeScale={0.3}
          noise={0.35}
          scale={3.5}
          baseWidth={5.5}
          height={3.5}
        />
      </div>
    </div>
  );
}
