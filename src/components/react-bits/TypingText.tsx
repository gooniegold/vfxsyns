"use client";

import { useEffect, useState } from "react";
import { subscribeMatchMedia } from "@/lib/safe-media";
import { cn } from "@/lib/utils";

export function TypingText({
  text,
  className,
  speedMs = 42,
  showCaret = false,
}: {
  text: string;
  className?: string;
  speedMs?: number;
  showCaret?: boolean;
}) {
  const [shown, setShown] = useState("");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    return subscribeMatchMedia("(prefers-reduced-motion: reduce)", setReduced);
  }, []);

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speedMs);
    return () => window.clearInterval(id);
  }, [text, speedMs, reduced]);

  return (
    <span className={cn("inline-block", className)}>
      {shown}
      {showCaret ? <span className="animate-pulse opacity-70">▍</span> : null}
    </span>
  );
}
