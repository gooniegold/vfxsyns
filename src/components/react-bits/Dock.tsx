"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, { Children, cloneElement, useMemo, useRef, useState } from "react";
import { MOTION_TRANSITION } from "@/lib/motion-defaults";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
  /** Gap between icon slots in px (match Tailwind gap-* on the toolbar). */
  gapPx?: number;
  /** Horizontal padding of toolbar in px (left + right). */
  horizontalPaddingPx?: number;
};

/** Stable spring — avoids magnification ↔ layout feedback jitter */
export const DOCK_SPRING: SpringOptions = {
  stiffness: 300,
  damping: 30,
  mass: 0.5,
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const mouseDistance = useTransform(mouseX, (val) => {
    const el = ref.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return val - rect.left - rect.width / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize],
  );
  const size = useSpring(targetSize, spring);
  const scale = useTransform(size, (s) => s / baseItemSize);

  return (
    <div
      ref={ref}
      className="relative flex shrink-0 items-center justify-center"
      style={{
        width: magnification,
        height: magnification,
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <motion.div
        style={{
          width: baseItemSize,
          height: baseItemSize,
          scale,
          willChange: "transform",
        }}
        className={`relative inline-flex shrink-0 items-center justify-center rounded-full border-2 shadow-md ${className}`}
        onHoverStart={() => {
          isHovered.set(1);
          setTooltipVisible(true);
        }}
        onHoverEnd={() => {
          isHovered.set(0);
          setTooltipVisible(false);
        }}
        onFocus={() => {
          isHovered.set(1);
          setTooltipVisible(true);
        }}
        onBlur={() => {
          isHovered.set(0);
          setTooltipVisible(false);
        }}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-haspopup="true"
      >
        {Children.map(children, (child) =>
          React.isValidElement(child)
            ? cloneElement(child as React.ReactElement<{ isHovered?: 0 | 1 }>, {
                isHovered: tooltipVisible ? 1 : 0,
              })
            : child,
        )}
      </motion.div>
    </div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: 0 | 1;
};

function DockLabel({ children, className = "", isHovered }: DockLabelProps) {
  const isVisible = isHovered === 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 4, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 4, x: "-50%" }}
          transition={MOTION_TRANSITION}
          className={`motion-gpu-hint ${className} font-ui pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-fit whitespace-pre px-0 py-0 text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)] will-change-[transform,opacity]`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: 0 | 1;
};

function DockIcon({ children, className = "" }: DockIconProps) {
  return (
    <div
      className={`flex size-full items-center justify-center will-change-transform [transform:translateZ(0)] ${className}`}
    >
      {children}
    </div>
  );
}

export default function Dock({
  items,
  className = "",
  spring = DOCK_SPRING,
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50,
  gapPx = 12,
  horizontalPaddingPx = 32,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [dockHeight, magnification],
  );

  const trackWidthPx = useMemo(() => {
    const n = items.length;
    return n * magnification + Math.max(0, n - 1) * gapPx + horizontalPaddingPx;
  }, [items.length, magnification, gapPx, horizontalPaddingPx]);

  return (
    <div
      className="mx-auto flex w-full max-w-full items-center justify-center px-2"
      style={{
        height: maxHeight,
        minHeight: maxHeight,
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} relative flex shrink-0 items-center justify-center rounded-2xl border-2 border-neutral-700 py-2 will-change-transform [transform:translateZ(0)]`}
        style={{
          height: Math.max(panelHeight, magnification),
          minWidth: trackWidthPx,
          width: trackWidthPx,
          gap: gapPx,
          paddingLeft: horizontalPaddingPx / 2,
          paddingRight: horizontalPaddingPx / 2,
        }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}
