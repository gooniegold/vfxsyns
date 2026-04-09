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

  const springConfig = { damping: 32, stiffness: 360, mass: 0.22 };
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
      {/* main core */}
      <motion.div
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[var(--accent-bright)] shadow-[0_0_14px_var(--accent)]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />

      {/* soft follower */}
      <motion.div
        className="fixed left-0 top-0 rounded-full border border-[var(--accent)]/80 bg-[rgba(36,210,155,0.04)] transition-all duration-300"
        animate={{
          width: hover ? 46 : 24,
          height: hover ? 46 : 24,
          opacity: hover ? 0.9 : 0.35,
          boxShadow: hover ? "0 0 24px var(--accent-glow)" : "0 0 0px transparent",
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
