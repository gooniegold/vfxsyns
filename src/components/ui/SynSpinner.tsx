"use client";

import { cn } from "@/lib/utils";

export function SynSpinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block h-8 w-8 rounded-full border-2 border-[rgba(184,190,199,0.2)] border-t-[var(--gold)] animate-spin",
        className,
      )}
    />
  );
}
