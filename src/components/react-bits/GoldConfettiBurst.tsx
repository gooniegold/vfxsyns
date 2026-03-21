"use client";

import { useCallback } from "react";

const KEY = "vfxsyn-hero-confetti";

export function useGoldConfettiOnce() {
  return useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }

    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText =
      "pointer-events:none;position:fixed;inset:0;z-index:99998;width:100%;height:100%";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      document.body.removeChild(canvas);
      return;
    }

    const n = 48;
    const parts = Array.from({ length: n }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 10 - 4,
      life: 0,
      size: 2 + Math.random() * 3,
      hue: 210 + Math.random() * 25,
    }));

    let frame = 0;
    const maxFrames = 90;

    const tick = () => {
      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        ctx.fillStyle = `hsla(${p.hue}, 18%, 78%, ${1 - p.life / maxFrames})`;
        ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
      }
      if (frame < maxFrames) requestAnimationFrame(tick);
      else document.body.removeChild(canvas);
    };
    requestAnimationFrame(tick);
  }, []);
}
