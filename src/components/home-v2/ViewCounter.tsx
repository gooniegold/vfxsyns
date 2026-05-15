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
      style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}
    >
      {count.toLocaleString()} views
    </span>
  );
}
