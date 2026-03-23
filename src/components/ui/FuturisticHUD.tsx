"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FuturisticHUD() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      {/* ── corner brackets ── */}
      <div className="absolute left-8 top-8 h-8 w-8 border-l border-t border-[var(--accent)] opacity-40" />
      <div className="absolute right-8 top-8 h-8 w-8 border-r border-t border-[var(--accent)] opacity-40" />
      <div className="absolute bottom-8 left-8 h-8 w-8 border-b border-l border-[var(--accent)] opacity-40" />
      <div className="absolute bottom-8 right-8 h-8 w-8 border-b border-r border-[var(--accent)] opacity-40" />

      {/* ── hud data points ── */}
      <div className="absolute left-10 top-20 space-y-4">
        <div className="hud-text-sm flex flex-col gap-1">
          <span className="opacity-40">SYSTEM: OK</span>
          <span className="animate-hud-pulse">SIGNAL: ENCRYPTED</span>
          <span className="opacity-40">UPLINK: 8.42 TB/s</span>
        </div>
      </div>

      <div className="absolute right-10 top-20 text-right">
        <div className="hud-text-sm flex flex-col gap-1">
          <span>STMT: REVAMP_V2</span>
          <span>TIME: {time}</span>
          <span>NODE: SG-ATL-04</span>
        </div>
      </div>

      {/* ── bottom status bar ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="hud-text-sm flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-[var(--accent-dim)]">
              <motion.div 
                className="h-full bg-[var(--accent)]" 
                animate={{ width: ["0%", "80%", "45%", "90%", "60%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <span>LOAD_01</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-[var(--accent-dim)]">
              <motion.div 
                className="h-full bg-[var(--accent)]" 
                animate={{ width: ["10%", "95%", "30%", "85%", "40%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <span>LOAD_02</span>
          </div>
        </div>
      </div>

      {/* ── side ornaments ── */}
      <div className="absolute left-0 top-1/2 h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent opacity-20" />
      <div className="absolute right-0 top-1/2 h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent opacity-20" />

      {/* ── moving crosshair ── */}
      <motion.div 
        className="absolute left-0 top-0 h-4 w-4 border border-[var(--accent)] opacity-10"
        animate={{ x: coords.x - 8, y: coords.y - 8 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />
    </div>
  );
}
