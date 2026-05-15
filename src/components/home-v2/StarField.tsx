"use client";

import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
  alphaTarget: number;
  alphaSpeed: number;
  drift: number;        // horizontal drift speed
  driftAngle: number;   // sine wave phase
  driftSpeed: number;   // how fast the angle changes
  wobble: number;       // amplitude of horizontal sway
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
    const COUNT = 220;
    const flakes: Flake[] = [];

    function resize() {
      if (!canvas || !ctx) return;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function spawn(fromTop = false): Flake {
      const W = window.innerWidth;
      const H = window.innerHeight;
      return {
        x: Math.random() * W,
        y: fromTop ? -Math.random() * H : Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        speed: Math.random() * 0.35 + 0.08,    // very slow — snow-like
        alpha: 0,
        alphaTarget: Math.random() * 0.45 + 0.08,
        alphaSpeed: Math.random() * 0.003 + 0.001,
        drift: (Math.random() - 0.5) * 0.25,   // gentle base drift
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.008 + 0.003,
        wobble: Math.random() * 0.6 + 0.2,     // sway amplitude
      };
    }

    resize();
    // Spread initial flakes across screen, not all from top
    for (let i = 0; i < COUNT; i++) flakes.push(spawn(false));

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    function draw() {
      if (!ctx) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      for (const f of flakes) {
        // Drift angle advances — creates gentle swaying motion
        f.driftAngle += f.driftSpeed;
        // Move down + gentle horizontal sway
        f.y += f.speed;
        f.x += f.drift + Math.sin(f.driftAngle) * f.wobble * 0.15;

        // Fade in/out towards target alpha
        if (f.alpha < f.alphaTarget) {
          f.alpha = Math.min(f.alpha + f.alphaSpeed, f.alphaTarget);
        }
        // Occasionally pick a new target alpha for twinkling
        if (Math.random() < 0.002) {
          f.alphaTarget = Math.random() * 0.45 + 0.06;
        }

        // Reset when off-screen
        if (f.y > H + 8) {
          const fresh = spawn(true);
          f.x = fresh.x;
          f.y = -Math.random() * 20;
          f.r = fresh.r;
          f.speed = fresh.speed;
          f.drift = fresh.drift;
          f.driftAngle = fresh.driftAngle;
          f.driftSpeed = fresh.driftSpeed;
          f.wobble = fresh.wobble;
          f.alphaTarget = fresh.alphaTarget;
          f.alpha = 0;
        }
        // Wrap horizontal
        if (f.x > W + 5) f.x = -5;
        if (f.x < -5) f.x = W + 5;

        // Draw — soft circular flake
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.alpha.toFixed(3)})`;
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

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 0 }}
      aria-hidden
    />
  );
}
