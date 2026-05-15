"use client";

import { useState, useEffect } from "react";

export function LocationTag() {
  const [time, setTime] = useState("");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-1.5 rounded-full transition-all duration-300"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        color: "rgba(255,255,255,0.25)",
        letterSpacing: "0.08em",
        background: "transparent",
        border: "none",
        cursor: "default",
        padding: "2px 6px",
      }}
      aria-label="Atlanta, GA location and time"
    >
      {/* Live pulse dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{
            background: "#23a559",
            animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
        <span
          className="relative inline-flex h-1.5 w-1.5 rounded-full"
          style={{ background: "#23a559" }}
        />
      </span>

      <span
        className="transition-all duration-300 overflow-hidden"
        style={{ maxWidth: hovered ? 80 : 50, whiteSpace: "nowrap" }}
      >
        {hovered ? `${time} EST` : "ATL, GA"}
      </span>
    </button>
  );
}
