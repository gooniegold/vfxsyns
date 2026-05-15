"use client";

import { useEffect, useRef } from "react";

/* Smooth lerp cursor with fading trail — fixes jitter and stale-trail bugs */
export function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dot    = dotRef.current;
    const ring   = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Target mouse position */
    let mx = -200, my = -200;
    /* Lerped positions */
    let dx = -200, dy = -200;   // dot (fast)
    let rx = -200, ry = -200;   // ring (slow)

    /* Trail particles: each has position + age */
    type Particle = { x: number; y: number; age: number; maxAge: number };
    const particles: Particle[] = [];
    const EMIT_DIST = 4;   // px between particles
    let lastEmitX = -999, lastEmitY = -999;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      /* Emit trail particle every EMIT_DIST px */
      const d = Math.hypot(mx - lastEmitX, my - lastEmitY);
      if (d > EMIT_DIST) {
        particles.push({ x: mx, y: my, age: 0, maxAge: 22 });
        lastEmitX = mx;
        lastEmitY = my;
        /* Cap trail length */
        if (particles.length > 40) particles.shift();
      }
    };

    const onEnter = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };
    const onLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };

    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", onMove);

    let raf: number;

    const tick = () => {
      /* Lerp dot (fast) and ring (slow) */
      const dotLerp  = 0.28;
      const ringLerp = 0.10;
      dx = dx + (mx - dx) * dotLerp;
      dy = dy + (my - dy) * dotLerp;
      rx = rx + (mx - rx) * ringLerp;
      ry = ry + (my - ry) * ringLerp;

      dot.style.transform  = `translate(${dx - 3}px, ${dy - 3}px)`;
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;

      /* Draw trail */
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;
        const life = 1 - p.age / p.maxAge;

        if (life <= 0) { particles.splice(i, 1); continue; }

        const size = life * 3;
        const alpha = life * 0.55;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 60, 60, ${alpha})`;
        ctx.shadowColor = `rgba(220, 40, 40, ${alpha * 0.8})`;
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* cursor:none only on homepage – scoped via parent's fixed container */}
      <style>{`
        .homepage-cursor-scope * { cursor: none !important; }
        .homepage-cursor-scope a, .homepage-cursor-scope button { cursor: none !important; }
      `}</style>

      {/* Inner dot — fast */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999999] h-[6px] w-[6px] rounded-full opacity-0"
        style={{
          background: "rgba(220,50,50,1)",
          boxShadow: "0 0 8px rgba(220,50,50,0.9), 0 0 16px rgba(220,50,50,0.4)",
          willChange: "transform",
        }}
      />

      {/* Outer ring — slow */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[999998] h-[32px] w-[32px] rounded-full opacity-0"
        style={{
          border: "1px solid rgba(220,50,50,0.4)",
          boxShadow: "0 0 12px rgba(220,50,50,0.15) inset",
          willChange: "transform",
          transition: "width 0.15s, height 0.15s",
        }}
      />

      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[999997]"
        aria-hidden
      />
    </>
  );
}
