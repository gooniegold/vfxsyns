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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505] [pointer-events:none]"
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <div className={FILL} style={{ pointerEvents: "none" }}>
        <Prism
          animationType="rotate"
          transparent
          hueShift={0.18}
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
