"use client";

import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type PortfolioFilter = "ALL" | "MUSIC VIDEO" | "COLOR GRADE" | "3D VFX";

const PILLARS: { left: string; delay: string; duration: string }[] = [
  { left: "10%", delay: "0s", duration: "3s" },
  { left: "20%", delay: "0.6s", duration: "4s" },
  { left: "35%", delay: "1.2s", duration: "3.5s" },
  { left: "48%", delay: "0.3s", duration: "5s" },
  { left: "60%", delay: "0.9s", duration: "4s" },
  { left: "75%", delay: "1.5s", duration: "3s" },
  { left: "88%", delay: "0.5s", duration: "4.5s" },
];

/** Fixed layout so SSR/client match — reads as “random” */
const FLOATING_LINES: {
  top: string;
  left: string;
  width: number;
  delay: string;
  duration: string;
  r: number;
}[] = [
  { top: "12%", left: "5%", width: 180, delay: "0s", duration: "5.5s", r: -12 },
  { top: "78%", left: "62%", width: 220, delay: "1.1s", duration: "6.8s", r: 28 },
  { top: "44%", left: "18%", width: 95, delay: "0.4s", duration: "5.2s", r: -35 },
  { top: "8%", left: "55%", width: 240, delay: "2s", duration: "7s", r: 15 },
  { top: "91%", left: "30%", width: 130, delay: "0.7s", duration: "6s", r: -22 },
  { top: "33%", left: "70%", width: 200, delay: "1.4s", duration: "5.8s", r: 40 },
  { top: "56%", left: "8%", width: 110, delay: "0.2s", duration: "6.4s", r: -8 },
  { top: "22%", left: "42%", width: 175, delay: "1.8s", duration: "5.3s", r: 33 },
  { top: "67%", left: "48%", width: 250, delay: "0.9s", duration: "6.2s", r: -40 },
  { top: "5%", left: "78%", width: 88, delay: "0.5s", duration: "5.9s", r: 5 },
  { top: "84%", left: "12%", width: 195, delay: "1.2s", duration: "6.6s", r: -28 },
  { top: "39%", left: "82%", width: 145, delay: "0.15s", duration: "5.6s", r: 22 },
  { top: "71%", left: "35%", width: 205, delay: "2.2s", duration: "7.1s", r: -18 },
  { top: "15%", left: "88%", width: 120, delay: "0.65s", duration: "6.3s", r: 37 },
  { top: "52%", left: "58%", width: 168, delay: "1.5s", duration: "5.4s", r: -5 },
];

function AllBackground() {
  return null;
}

function MusicVideoBackground() {
  return (
    <>
      {PILLARS.map((p) => (
        <div
          key={p.left + p.delay}
          className="portfolio-bg-pillar"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
      <div className="portfolio-bg-pillar-glow" aria-hidden />
    </>
  );
}

function ColorGradeBackground() {
  return (
    <>
      <div className="portfolio-bg-aurora-ellipse portfolio-bg-aurora-e1" />
      <div className="portfolio-bg-aurora-ellipse portfolio-bg-aurora-e2" />
      <div className="portfolio-bg-aurora-ellipse portfolio-bg-aurora-e3" />
    </>
  );
}

function VfxLinesBackground() {
  return (
    <>
      {FLOATING_LINES.map((line, i) => (
        <div
          key={i}
          className="portfolio-bg-float-line"
          style={
            {
              top: line.top,
              left: line.left,
              width: line.width,
              animationDelay: line.delay,
              animationDuration: line.duration,
              "--r": `${line.r}deg`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

export function PortfolioBG({ activeFilter }: { activeFilter: PortfolioFilter }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: activeFilter === "ALL" ? "transparent" : undefined,
          }}
        >
          {activeFilter === "ALL" ? (
            <AllBackground />
          ) : activeFilter === "MUSIC VIDEO" ? (
            <MusicVideoBackground />
          ) : activeFilter === "COLOR GRADE" ? (
            <ColorGradeBackground />
          ) : (
            <VfxLinesBackground />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
