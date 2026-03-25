"use client";

import { useEffect, useState } from "react";

export function FuturisticHUD() {
  const [time, setTime] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}:${now
          .getMilliseconds()
          .toString()
          .padStart(3, "0")}`
      );
    };
    const interval = setInterval(updateTime, 47);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20; 
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9900] overflow-hidden transition-transform duration-75 ease-out"
      style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 hud-grid opacity-40 mix-blend-screen" />

      {/* Scan line */}
      <div className="hud-scan-line" />
      
      {/* Vignette / Edge glow */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(3,3,6,0.95)]" />
      
      {/* Corner crosshairs */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[var(--hud-text)] opacity-70" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[var(--hud-text)] opacity-70" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[var(--hud-text)] opacity-70" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[var(--hud-text)] opacity-70" />
      
      {/* Top right data stream */}
      <div className="absolute top-8 right-8 hud-text text-right flex flex-col items-end gap-1">
        <div>SYS.OP.NORMAL</div>
        <div>{time}</div>
        <div className="w-16 h-[1px] bg-[var(--hud-text)] mt-1 opacity-50" />
      </div>

      {/* Left side coordinates block */}
      <div className="absolute bottom-8 left-8 hud-text flex flex-col gap-1 opacity-80">
        <div>VFX//SYN</div>
        <div>LAT: 33.7490° N</div>
        <div>LNG: 84.3880° W</div>
        <div>STATUS: ONLINE</div>
      </div>
    </div>
  );
}
