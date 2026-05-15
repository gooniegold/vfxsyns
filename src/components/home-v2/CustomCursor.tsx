"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const canvas = canvasRef.current;
    if (!dot || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mx = -100, my = -100;
    let raf: number;

    // trail points
    const trail: { x: number; y: number; age: number }[] = [];
    const TRAIL_MAX = 28;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot!.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
      trail.push({ x: mx, y: my, age: 0 });
      if (trail.length > TRAIL_MAX) trail.shift();
    };

    const onEnter = () => { dot!.style.opacity = "1"; };
    const onLeave = () => { dot!.style.opacity = "0"; };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    function drawTrail() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = 1; i < trail.length; i++) {
        const p = trail[i - 1];
        const c = trail[i];
        const progress = i / trail.length;
        const alpha = progress * 0.55;
        const width = progress * 2.5;

        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(c.x, c.y);
        ctx!.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
        ctx!.lineWidth = width;
        ctx!.lineCap = "round";
        ctx!.stroke();
      }

      raf = requestAnimationFrame(drawTrail);
    }

    drawTrail();

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
      <style>{`* { cursor: none !important; }`}</style>
      {/* dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-[5px] w-[5px] rounded-full bg-[#22C55E] opacity-0 shadow-[0_0_8px_rgba(34,197,94,0.9)]"
        style={{ willChange: "transform" }}
      />
      {/* trail canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99998]"
        aria-hidden
      />
    </>
  );
}
