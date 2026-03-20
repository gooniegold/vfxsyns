"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { subscribeMatchMedia } from "@/lib/safe-media";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    return subscribeMatchMedia("(prefers-reduced-motion: reduce)", setReduced);
  }, []);
  return reduced;
}

export function CountUp({
  end,
  suffix = "",
  duration = 1.6,
  onComplete,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  onComplete?: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const [val, setVal] = useState(0);
  const reduced = usePrefersReducedMotion();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(end);
      onCompleteRef.current?.();
      return;
    }
    const start = performance.now();
    let completed = false;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * end));
      if (t < 1) requestAnimationFrame(tick);
      else if (!completed) {
        completed = true;
        onCompleteRef.current?.();
      }
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration, reduced]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}
