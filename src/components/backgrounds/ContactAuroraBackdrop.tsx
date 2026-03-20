"use client";

import Aurora from "@/components/Aurora";

const FILL =
  "pointer-events-none absolute inset-0 h-full w-full min-h-full [pointer-events:none]";

/**
 * React Bits Aurora — contact page fixed backdrop (gold tones on #050505).
 */
export function ContactAuroraBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505] [pointer-events:none]"
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <div className={FILL} style={{ pointerEvents: "none" }}>
        <Aurora
          colorStops={["#B8BEC7", "#6B7280", "#D4D9E0"]}
          amplitude={0.4}
          blend={0.65}
          speed={0.26}
        />
      </div>
    </div>
  );
}
