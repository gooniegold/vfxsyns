"use client";

import type { CSSProperties } from "react";

const LINES = [
  { top: "5%", left: "0%", width: "120px", rotate: "-30deg", delay: "0s", dur: "5s" },
  { top: "12%", left: "60%", width: "200px", rotate: "15deg", delay: "0.8s", dur: "7s" },
  { top: "25%", left: "20%", width: "80px", rotate: "-45deg", delay: "1.5s", dur: "6s" },
  { top: "30%", left: "80%", width: "150px", rotate: "30deg", delay: "0.3s", dur: "8s" },
  { top: "42%", left: "5%", width: "180px", rotate: "-15deg", delay: "2s", dur: "5.5s" },
  { top: "50%", left: "45%", width: "90px", rotate: "60deg", delay: "1s", dur: "9s" },
  { top: "60%", left: "70%", width: "130px", rotate: "-20deg", delay: "0.5s", dur: "6.5s" },
  { top: "65%", left: "15%", width: "220px", rotate: "10deg", delay: "1.8s", dur: "7.5s" },
  { top: "72%", left: "55%", width: "100px", rotate: "-50deg", delay: "0.2s", dur: "5s" },
  { top: "80%", left: "30%", width: "160px", rotate: "25deg", delay: "2.5s", dur: "8s" },
  { top: "88%", left: "75%", width: "110px", rotate: "-35deg", delay: "1.2s", dur: "6s" },
  { top: "92%", left: "10%", width: "190px", rotate: "40deg", delay: "0.7s", dur: "7s" },
] as const;

export function FloatingLinesBG() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#050505",
      }}
      aria-hidden
    >
      {LINES.map((l, i) => (
        <div
          key={i}
          style={
            {
              position: "absolute",
              top: l.top,
              left: l.left,
              width: l.width,
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(184,190,199,0.18), transparent)",
              animation: `lineFloat ${l.dur} ease-in-out infinite`,
              animationDelay: l.delay,
              ["--r"]: l.rotate,
            } as CSSProperties
          }
        />
      ))}
      <style>{`
        @keyframes lineFloat {
          0%, 100% { opacity: 0; transform: translateY(0px) rotate(var(--r)); }
          30% { opacity: 1; }
          70% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-30px) rotate(var(--r)); }
        }
      `}</style>
    </div>
  );
}
