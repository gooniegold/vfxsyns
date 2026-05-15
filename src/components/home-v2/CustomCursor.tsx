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
    const trail: { x: number; y: number }[] = [];
    const TRAIL_MAX = 24;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot!.style.transform = `translate(${mx - 2.5}px, ${my - 2.5}px)`;
      trail.push({ x: mx, y: my });
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
        const t = i / trail.length;
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(c.x, c.y);
        ctx!.strokeStyle = `rgba(255,255,255,${t * 0.45})`;
        ctx!.lineWidth = t * 2;
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
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-[5px] w-[5px] rounded-full bg-white opacity-0"
        style={{ willChange: "transform", boxShadow: "0 0 6px rgba(255,255,255,0.8)" }}
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99998]"
        aria-hidden
      />
    </>
  );
}
