"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuroraBackdrop } from "./AuroraBackdrop";
import { DotGridBackdrop } from "./DotGridBackdrop";
import { StarFieldBackdrop } from "./StarFieldBackdrop";
import { PrismBackdrop } from "./PrismBackdrop";
import { ColorBendsBackdrop } from "./ColorBendsBackdrop";
import { DarkVeilBackdrop } from "./DarkVeilBackdrop";

/** Includes 0.4 per spec; full ladder for ratio comparison. */
const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const ORDER = [
  "hero",
  "marquee",
  "featured",
  "stats",
  "about",
  "why",
  "packs",
  "faq",
  "logoLoop",
  "footer",
] as const;

export type HomeBgSection = (typeof ORDER)[number];

function pickLayerKey(active: HomeBgSection): string {
  if (active === "hero" || active === "marquee") return "none";
  if (active === "featured") return "aurora";
  if (active === "stats") return "dotgrid";
  if (active === "about") return "starfield";
  if (active === "why") return "prism";
  if (active === "packs") return "colorbends";
  if (active === "faq") return "darkveil";
  if (active === "logoLoop" || active === "footer") return "solid";
  return "none";
}

export function HomeBackgroundManager() {
  const [active, setActive] = useState<HomeBgSection>("hero");

  useEffect(() => {
    const ratios = new Map<string, number>();
    ORDER.forEach((k) => ratios.set(k, 0));

    const pick = () => {
      let best: HomeBgSection = "hero";
      let bestR = -1;
      for (const k of ORDER) {
        const r = ratios.get(k) ?? 0;
        if (r > bestR) {
          bestR = r;
          best = k;
        }
      }
      if (bestR <= 0) setActive("hero");
      else setActive(best);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const key = e.target.getAttribute("data-home-bg");
          if (key && ratios.has(key)) {
            ratios.set(key, e.intersectionRatio);
          }
        }
        pick();
      },
      { root: null, rootMargin: "0px", threshold: THRESHOLDS },
    );

    let attempts = 0;
    let footerEl: HTMLElement | null = null;
    const run = () => {
      const root = document.getElementById("home-page-root");
      if (!root) {
        attempts += 1;
        if (attempts < 90) requestAnimationFrame(run);
        return;
      }
      root.querySelectorAll("[data-home-bg]").forEach((el) => io.observe(el));

      const logoLoop = document.querySelector('[data-home-bg="logoLoop"]');
      if (logoLoop) io.observe(logoLoop);

      footerEl = document.querySelector("footer");
      if (footerEl) {
        footerEl.setAttribute("data-home-bg", "footer");
        io.observe(footerEl);
      }
    };

    run();

    return () => {
      io.disconnect();
      if (footerEl) footerEl.removeAttribute("data-home-bg");
    };
  }, []);

  const layerKey = pickLayerKey(active);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <AnimatePresence mode="sync">
        <motion.div
          key={layerKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: layerKey === "none" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {layerKey === "none" ? <div className="absolute inset-0" aria-hidden /> : null}
          {layerKey === "aurora" ? (
            <AuroraBackdrop
              colorStops={["#B8BEC7", "#6B7280", "#D4D9E0"]}
              speed={0.2}
              amplitude={0.3}
              blend={0.5}
            />
          ) : null}
          {layerKey === "dotgrid" ? <DotGridBackdrop opacity={0.06} /> : null}
          {layerKey === "starfield" ? <StarFieldBackdrop /> : null}
          {layerKey === "prism" ? <PrismBackdrop isTransparent timeScale={0.2} /> : null}
          {layerKey === "colorbends" ? (
            <ColorBendsBackdrop colors={["#B8BEC7", "#181818", "#6B7280", "#111111"]} speed={0.1} />
          ) : null}
          {layerKey === "darkveil" ? <DarkVeilBackdrop /> : null}
          {layerKey === "solid" ? <div className="absolute inset-0 bg-[#050505]" aria-hidden /> : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
