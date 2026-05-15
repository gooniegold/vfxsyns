"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
  alphaSpeed: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dpr = window.devicePixelRatio || 1;
    const stars: Star[] = [];
    const COUNT = 160;

    function resize() {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    }

    function spawn(): Star {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.35 + 0.1,
        alpha: Math.random() * 0.6 + 0.1,
        alphaSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      };
    }

    resize();
    for (let i = 0; i < COUNT; i++) stars.push(spawn());
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const s of stars) {
        s.y += s.speed;
        s.alpha += s.alphaSpeed;
        if (s.alpha <= 0.05 || s.alpha >= 0.75) s.alphaSpeed *= -1;
        if (s.y > window.innerHeight + 4) {
          s.y = -4;
          s.x = Math.random() * window.innerWidth;
        }

        // green-tinted stars for vfxsyn theme
        const tint = Math.random() > 0.85 ? `rgba(74, 222, 128, ${s.alpha})` : `rgba(255,255,255,${s.alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = tint;
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
      aria-hidden
    />
  );
}
