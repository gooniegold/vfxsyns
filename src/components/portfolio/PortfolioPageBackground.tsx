"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LightPillarBG } from "../backgrounds/LightPillarBG";
import { SoftAuroraBG } from "../backgrounds/SoftAuroraBG";

export type PortfolioFilter = "ALL" | "MUSIC VIDEO" | "COLOR GRADE";

const FIXED =
  "pointer-events-none fixed inset-0 z-0 overflow-hidden [pointer-events:none]";
const FILL =
  "pointer-events-none absolute inset-0 h-full w-full min-h-full [pointer-events:none]";

/** Solid fill only — no WebGL, no Three.js, no shaders. */
const STATIC_FALLBACK_CLASS =
  "pointer-events-none absolute inset-0 h-full w-full min-h-full bg-[#050505]";

function PortfolioBgLayer({
  activeFilter,
  staticOnly,
}: {
  activeFilter: PortfolioFilter;
  staticOnly: boolean;
}) {
  if (staticOnly) {
    return <div className={STATIC_FALLBACK_CLASS} aria-hidden />;
  }
  switch (activeFilter) {
    case "ALL":
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            background: "#050505",
            pointerEvents: "none",
          }}
          aria-hidden
        />
      );
    case "MUSIC VIDEO":
      return <LightPillarBG />;
    case "COLOR GRADE":
      return <SoftAuroraBG />;
    default:
      return null;
  }
}

export function PortfolioPageBackground({
  activeFilter,
  suppressAmbientAnimations = false,
}: {
  activeFilter: PortfolioFilter;
  /** When true, animated backdrops are replaced with a static fill so decode/GPU goes to videos. */
  suppressAmbientAnimations?: boolean;
}) {
  return (
    <div className={FIXED} aria-hidden style={{ pointerEvents: "none" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className={FILL}
          style={{ pointerEvents: "none" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <PortfolioBgLayer activeFilter={activeFilter} staticOnly={suppressAmbientAnimations} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
