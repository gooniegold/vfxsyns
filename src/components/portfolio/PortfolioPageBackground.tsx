"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Aurora from "@/components/Aurora";
import ColorBends from "@/components/ColorBends";
import Prism from "@/components/Prism";

const HeroBackground = dynamic(
  () => import("@/components/hero/HeroBackground").then((m) => m.HeroBackground),
  { ssr: false },
);

export type PortfolioFilter = "ALL" | "MUSIC VIDEO" | "COLOR GRADE" | "3D VFX";

const FIXED =
  "pointer-events-none fixed inset-0 z-0 overflow-hidden [pointer-events:none]";
const FILL =
  "pointer-events-none absolute inset-0 h-full w-full min-h-full [pointer-events:none]";

const CROSSFADE = { duration: 0.6, ease: "easeInOut" as const };

const AURORA_PROPS = {
  colorStops: ["#BFA06A", "#7A5C2E", "#D4B87A"],
  amplitude: 0.42,
  blend: 0.62,
  speed: 0.28,
} as const;

const PRISM_PROPS = {
  animationType: "rotate" as const,
  transparent: true,
  hueShift: 0,
  glow: 1.15,
  timeScale: 0.32,
  noise: 0.35,
  scale: 3.4,
};

function PortfolioBgLayer({
  activeFilter,
  staticOnly,
}: {
  activeFilter: PortfolioFilter;
  staticOnly: boolean;
}) {
  if (staticOnly) {
    return <div className={`${FILL} bg-[#050505]`} />;
  }
  switch (activeFilter) {
    case "ALL":
      return (
        <>
          <div className={`${FILL} z-0 bg-[#050505]`} />
          <HeroBackground position="fixed" canvasOpacity={0.45} />
        </>
      );
    case "MUSIC VIDEO":
      return (
        <>
          <div className={`${FILL} z-0 bg-[#050505]`} />
          <div className={`${FILL} z-[1]`}>
            <ColorBends
              colors={["#BFA06A", "#181818", "#7A5C2E", "#111111", "#D4B87A"]}
              speed={0.14}
              rotation={40}
              scale={1.15}
              frequency={0.95}
              warpStrength={0.9}
              transparent
              mouseInfluence={0.25}
              parallax={0.35}
              noise={0.08}
            />
          </div>
        </>
      );
    case "COLOR GRADE":
      return (
        <>
          <div className={`${FILL} z-0 bg-[#050505]`} />
          <div className={`${FILL} z-[1]`}>
            <Aurora {...AURORA_PROPS} />
          </div>
        </>
      );
    case "3D VFX":
      return (
        <>
          <div className={`${FILL} z-0 bg-[#050505]`} />
          <div className={`${FILL} z-[1]`}>
            <Prism {...PRISM_PROPS} />
          </div>
        </>
      );
    default:
      return null;
  }
}

export function PortfolioPageBackground({
  activeFilter,
  suppressAmbientAnimations = false,
}: {
  activeFilter: PortfolioFilter;
  /** When true, WebGL/CSS shader backdrops are replaced with a static fill so decode/GPU goes to videos. */
  suppressAmbientAnimations?: boolean;
}) {
  return (
    <div className={FIXED} aria-hidden style={{ pointerEvents: "none" }}>
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={activeFilter}
          className={FILL}
          style={{ pointerEvents: "none" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={CROSSFADE}
        >
          <PortfolioBgLayer activeFilter={activeFilter} staticOnly={suppressAmbientAnimations} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
