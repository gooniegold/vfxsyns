"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
  alphaDir: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COUNT = 120;
    const stars: Star[] = [];

    function resize() {
      if (!canvas || !ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(): Star {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        speed: Math.random() * 0.25 + 0.05,
        alpha: Math.random() * 0.5 + 0.05,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
      };
    }

    resize();
    for (let i = 0; i < COUNT; i++) stars.push(spawn());
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        s.y += s.speed;
        s.alpha += s.alphaDir * 0.002;
        if (s.alpha >= 0.65) { s.alpha = 0.65; s.alphaDir = -1; }
        if (s.alpha <= 0.04) { s.alpha = 0.04; s.alphaDir = 1; }
        if (s.y > H + 4) {
          s.y = -4;
          s.x = Math.random() * W;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ willChange: "contents" }}
      aria-hidden
    />
  );
}
