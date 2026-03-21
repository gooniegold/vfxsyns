"use client";

import { useRef, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  className,
  strength = 0.42,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 320, damping: 28, mass: 0.4 });
  const y = useSpring(0, { stiffness: 320, damping: 28, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
