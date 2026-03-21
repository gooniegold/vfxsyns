"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { subscribeMatchMedia } from "@/lib/safe-media";
import { cn } from "@/lib/utils";

const THRESHOLD = 400;

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    return subscribeMatchMedia("(prefers-reduced-motion: reduce)", setReduced);
  }, []);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      data-cursor="hover"
      className={cn(
        "fixed bottom-8 right-6 z-[9998] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-gold)] bg-[rgba(5,5,5,0.85)] text-[var(--gold)] shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-md transition hover:bg-[var(--gold-glow)]",
        reduced && "transition-none",
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
    >
      <ChevronUp className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );
}
