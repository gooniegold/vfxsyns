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

  if (count === null) return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>···</span>
  );

  return (
    <span
      className="flex items-center gap-1"
      style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.3)" }}
    >
      {count.toLocaleString()}
    </span>
  );
}
