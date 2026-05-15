"use client";

import { useEffect, useState } from "react";

export function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Increment on visit
    fetch("/api/views", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {
        // Fallback: just GET
        fetch("/api/views")
          .then((r) => r.json())
          .then((d) => setCount(d.count));
      });
  }, []);

  if (count === null) return <span className="font-mono text-[10px] text-[rgba(34,197,94,0.4)]">···</span>;

  return (
    <span className="flex items-center gap-1.5 font-mono text-[10px] text-[rgba(34,197,94,0.6)]">
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      {count.toLocaleString()}
    </span>
  );
}
