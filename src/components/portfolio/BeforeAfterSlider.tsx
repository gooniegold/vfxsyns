"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import { GripVertical } from "lucide-react";
import { SYN_VIDEO_BASE_STYLE } from "@/lib/video-presentation";
import { cn } from "@/lib/utils";

export function BeforeAfterSlider({
  leftLabel = "REFERENCE",
  rightLabel = "GRADE",
  leftSrc,
  rightSrc,
  className,
}: {
  leftLabel?: string;
  rightLabel?: string;
  leftSrc: string;
  rightSrc: string;
  className?: string;
}) {
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const tr = trackRef.current;
    if (!tr) return;
    const r = tr.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - r.left, 0), r.width);
    setPct((x / r.width) * 100);
  }, []);

  return (
    <div className={cn("relative w-full select-none", className)}>
      <p className="font-mono mb-4 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">Color grade · drag to compare</p>
      <div
        ref={trackRef}
        className="relative aspect-video w-full cursor-ew-resize overflow-hidden rounded-[12px] border border-[var(--border-subtle)] bg-black"
        onMouseDown={(e) => {
          dragging.current = true;
          setFromClientX(e.clientX);
        }}
        onMouseMove={(e) => {
          if (dragging.current) setFromClientX(e.clientX);
        }}
        onMouseUp={() => {
          dragging.current = false;
        }}
        onMouseLeave={() => {
          dragging.current = false;
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          setFromClientX(e.touches[0]?.clientX ?? 0);
        }}
        onTouchMove={(e) => {
          if (dragging.current) setFromClientX(e.touches[0]?.clientX ?? 0);
        }}
        onTouchEnd={() => {
          dragging.current = false;
        }}
      >
        <video
          src={rightSrc}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          style={SYN_VIDEO_BASE_STYLE}
        />
        <video
          src={leftSrc}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          style={{
            ...SYN_VIDEO_BASE_STYLE,
            clipPath: `inset(0 ${100 - pct}% 0 0)`,
          } as CSSProperties}
        />
        <div
          className="pointer-events-none absolute bottom-0 top-0 z-[2] w-px bg-[var(--gold)] shadow-[0_0_12px_rgba(184,190,199,0.6)]"
          style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
        />
        <button
          type="button"
          aria-label="Drag to compare"
          className="absolute top-1/2 z-[3] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-gold)] bg-[rgba(5,5,5,0.75)] text-[var(--gold)] backdrop-blur-sm"
          style={{ left: `${pct}%` }}
        >
          <GripVertical className="h-6 w-6" strokeWidth={1.25} />
        </button>
        <span className="pointer-events-none absolute left-3 top-3 z-[4] rounded bg-[rgba(5,5,5,0.65)] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          {leftLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 z-[4] rounded bg-[rgba(5,5,5,0.65)] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          {rightLabel}
        </span>
      </div>
    </div>
  );
}
