"use client";

import { useCallback, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Ripple = { x: number; y: number; id: number };

export function RippleSurface({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);
  const uid = useId();

  const onPointerDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const id = nextId.current++;
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    setRipples((r) => [...r, { x, y, id }]);
    window.setTimeout(() => {
      setRipples((r) => r.filter((item) => item.id !== id));
    }, 650);
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} onPointerDown={onPointerDown}>
      {children}
      {ripples.map((r) => (
        <span
          key={`${uid}-${r.id}`}
          aria-hidden
          className="pointer-events-none absolute h-24 w-24 animate-[syn-ripple_0.65s_ease-out_forwards] rounded-full bg-[rgba(184,190,199,0.22)]"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}
