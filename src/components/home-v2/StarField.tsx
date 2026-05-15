"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; r: number;
  speed: number; alpha: number; alphaDir: number;
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
    const COUNT = 140;
    const stars: Star[] = [];

    function resize() {
      if (!canvas || !ctx) return;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    }

    function spawn(): Star {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.3 + 0.25,
        speed: Math.random() * 0.2 + 0.04,
        alpha: Math.random() * 0.55 + 0.08,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
      };
    }

    resize();
    for (let i = 0; i < COUNT; i++) stars.push(spawn());

    const onResize = () => {
      // Need to reset scale on each resize
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };
    window.addEventListener("resize", onResize);

    function draw() {
      if (!ctx) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        s.y += s.speed;
        s.alpha += s.alphaDir * 0.0015;
        if (s.alpha >= 0.65) { s.alpha = 0.65; s.alphaDir = -1; }
        if (s.alpha <= 0.05) { s.alpha = 0.05; s.alphaDir =  1; }
        if (s.y > H + 5) { s.y = -5; s.x = Math.random() * W; }

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
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* CRITICAL: absolute not fixed — lives inside the fixed homepage overlay.
     fixed+z-0 gets painted below the parent's z-100 stacking context. */
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 0 }}
      aria-hidden
    />
  );
}
