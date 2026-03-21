"use client";

import { useEffect, useRef } from "react";

/** Sparse silver particles with slow drift (canvas). */
export function StarFieldBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Dot = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    const dots: Dot[] = [];
    const COUNT = 42;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      dots.length = 0;
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < COUNT; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.35 + Math.random() * 1.1,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          a: 0.12 + Math.random() * 0.35,
        });
      }
    };

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(184, 190, 199, 0.85)";
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -4) d.x = w + 4;
        if (d.x > w + 4) d.x = -4;
        if (d.y < -4) d.y = h + 4;
        if (d.y > h + 4) d.y = -4;
        ctx.globalAlpha = d.a;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    init();
    tick();
    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
