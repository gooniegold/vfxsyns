"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { subscribeMatchMedia } from "@/lib/safe-media";

const HOVER_SELECTORS =
  'a, button, [role="button"], [data-cursor="hover"], [data-cursor-hover], input, textarea, select, summary, label[for]';

export function SynCustomCursor() {
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 10000x smoother & magnetic feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    return subscribeMatchMedia("(prefers-reduced-motion: reduce)", setReduced);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const root = document.documentElement;
    root.classList.add("syn-dot-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        setHover(Boolean(el.closest(HOVER_SELECTORS)));
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      root.classList.remove("syn-dot-cursor");
    };
  }, [reduced, mouseX, mouseY]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100000]">
      {/* ── main dot ── */}
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_var(--accent)]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      
      {/* ── outer ring ── */}
      <motion.div
        className="fixed left-0 top-0 rounded-full border border-[var(--accent)] transition-all duration-300"
        animate={{
          width: hover ? 64 : 32,
          height: hover ? 64 : 32,
          opacity: hover ? 0.8 : 0.3,
          boxShadow: hover ? "0 0 20px var(--accent-glow)" : "0 0 0px transparent",
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* ── hud flair ── */}
      <motion.div
        className="fixed left-0 top-0 h-[22px] w-[22px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", opacity: hover ? 1 : 0 }}
      >
        <div className="absolute left-0 top-0 h-1 w-1 border-l border-t border-[var(--accent-bright)]" />
        <div className="absolute right-0 bottom-0 h-1 w-1 border-r border-b border-[var(--accent-bright)]" />
      </motion.div>
    </div>
  );
}
