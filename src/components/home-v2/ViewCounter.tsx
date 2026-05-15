"use client";

import { useEffect, useState } from "react";

export function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views", { method: "POST" })
      .then((r) => r.json())
      .then((d: { count?: number }) => setCount(d.count ?? 0))
      .catch(() => {
        fetch("/api/views")
          .then((r) => r.json())
          .then((d: { count?: number }) => setCount(d.count ?? 0));
      });
  }, []);

  if (count === null) {
    return (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.18)" }}>
        ···
      </span>
    );
  }

  return (
    <span
      className="flex items-center gap-1"
      style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}
    >
      {/* Eye icon */}
      <svg
        className="h-2.5 w-2.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      {count.toLocaleString()}
    </span>
  );
}
