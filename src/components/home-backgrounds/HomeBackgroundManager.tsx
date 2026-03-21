"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AuroraBackdrop } from "./AuroraBackdrop";
import { StarFieldBackdrop } from "./StarFieldBackdrop";
import { PrismBackdrop } from "./PrismBackdrop";
import { ColorBendsBackdrop } from "./ColorBendsBackdrop";
import { DarkVeilBackdrop } from "./DarkVeilBackdrop";

/**
 * Scroll-driven home backgrounds (0–1 = full page scroll).
 * 0.00–0.15: Hero — particle bg lives in HeroSection (no overlay here).
 * 0.15–0.30: Featured — Aurora
 * 0.30–0.45: Stats + About — particles / starfield
 * 0.45–0.60: THE DIFFERENCE — Prism
 * 0.60–0.75: VFX Packs — ColorBends
 * 0.75–1.00: FAQ + footer — dark minimal
 */
export function HomeBackgroundManager() {
  const { scrollYProgress } = useScroll();

  const opacityAurora = useTransform(scrollYProgress, [0.15, 0.225, 0.3], [0, 1, 0]);
  const opacityParticles = useTransform(scrollYProgress, [0.3, 0.375, 0.45], [0, 1, 0]);
  const opacityPrism = useTransform(scrollYProgress, [0.45, 0.525, 0.6], [0, 1, 0]);
  const opacityColorBends = useTransform(scrollYProgress, [0.6, 0.675, 0.75], [0, 1, 0]);
  const opacityDarkVeil = useTransform(scrollYProgress, [0.75, 0.82, 1], [0, 1, 1]);

  const layerClass = "pointer-events-none fixed inset-0 z-0";

  return (
    <>
      <motion.div className={layerClass} style={{ opacity: opacityAurora }} aria-hidden>
        <AuroraBackdrop
          colorStops={["#B8BEC7", "#6B7280", "#D4D9E0"]}
          speed={0.2}
          amplitude={0.3}
          blend={0.5}
        />
      </motion.div>

      <motion.div className={layerClass} style={{ opacity: opacityParticles }} aria-hidden>
        <StarFieldBackdrop />
      </motion.div>

      <motion.div className={layerClass} style={{ opacity: opacityPrism }} aria-hidden>
        <PrismBackdrop isTransparent timeScale={0.2} />
      </motion.div>

      <motion.div className={layerClass} style={{ opacity: opacityColorBends }} aria-hidden>
        <ColorBendsBackdrop colors={["#B8BEC7", "#181818", "#6B7280", "#111111"]} speed={0.1} />
      </motion.div>

      <motion.div className={layerClass} style={{ opacity: opacityDarkVeil }} aria-hidden>
        <DarkVeilBackdrop />
      </motion.div>
    </>
  );
}
