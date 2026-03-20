"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TiltGlare({
  children,
  className = "",
  tiltClassName = "",
  tiltStyle,
  glareColor = "rgba(191,160,106,0.15)",
  tiltAmount = 8,
}: {
  children: ReactNode;
  className?: string;
  /** Applied to the element that receives rotateX/Y (border/shadow live here). */
  tiltClassName?: string;
  tiltStyle?: CSSProperties;
  glareColor?: string;
  tiltAmount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 280, damping: 30 });
  const ry = useSpring(0, { stiffness: 280, damping: 30 });
  const glX = useMotionValue(50);
  const glY = useMotionValue(50);

  const glareBg = useMotionTemplate`radial-gradient(circle at ${glX}% ${glY}%, ${glareColor} 0%, transparent 58%)`;

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      glX.set(((e.clientX - r.left) / r.width) * 100);
      glY.set(((e.clientY - r.top) / r.height) * 100);
      const ox = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const oy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      ry.set(ox * tiltAmount);
      rx.set(-oy * tiltAmount);
    },
    [glX, glY, rx, ry, tiltAmount],
  );

  const onLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
    glX.set(50);
    glY.set(50);
  }, [glX, glY, rx, ry]);

  return (
    <div
      ref={ref}
      className={`relative [perspective:1200px] [transform-style:preserve-3d] ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className={cn("relative h-full [transform-style:preserve-3d]", tiltClassName)}
        style={{ rotateX: rx, rotateY: ry, ...tiltStyle }}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[6] rounded-[inherit]"
          style={{ background: glareBg }}
        />
      </motion.div>
    </div>
  );
}
