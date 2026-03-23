"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  rotateAmount?: number;
  scaleOnHover?: number;
  glareOpacity?: number;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = "",
  rotateAmount = 15,
  scaleOnHover = 1.05,
  glareOpacity = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [rotateAmount, -rotateAmount]);
  const rotateY = useTransform(x, [0, 1], [-rotateAmount, rotateAmount]);

  const springConfig = { damping: 20, stiffness: 100 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(1, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    springScale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    springScale.set(1);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 group relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        {children}

        {/* Glare effect */}
        <motion.div
          animate={{ opacity: isHovered ? glareOpacity : 0 }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            background: `radial-gradient(circle at calc(var(--x) * 100%) calc(var(--y) * 100%), rgba(255,255,255,0.2), transparent)`,
          }}
          className="pointer-events-none rounded-[inherit]"
        />
      </motion.div>
    </div>
  );
};
