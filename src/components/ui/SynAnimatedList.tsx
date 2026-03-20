"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

function formatBulletLine(text: string, bullet: "diamond" | "dot") {
  const mark = bullet === "diamond" ? "✦" : "●";
  const idx = text.indexOf(mark);
  if (idx === -1) {
    return <>{text}</>;
  }
  const after = text.slice(idx + mark.length);
  return (
    <>
      <span className="text-[var(--gold)]">{mark}</span>
      {after}
    </>
  );
}

export function SynAnimatedList({
  items,
  className,
  trigger,
  bullet,
}: {
  items: string[];
  className?: string;
  trigger: "scroll" | "mount";
  bullet: "diamond" | "dot";
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.12, margin: "-24px" });
  const [mountShow, setMountShow] = useState(false);

  useEffect(() => {
    if (trigger !== "mount") return;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setMountShow(true));
    });
    return () => window.cancelAnimationFrame(id);
  }, [trigger]);

  const active = trigger === "mount" ? mountShow : inView;

  return (
    <ul ref={listRef} className={cn("m-0 w-full list-none p-0", className)}>
      {items.map((item, i) => (
        <motion.li
          key={`${item}-${i}`}
          initial={{ opacity: 0, x: bullet === "diamond" ? -18 : -14, y: 10 }}
          animate={active ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: bullet === "diamond" ? -18 : -14, y: 10 }}
          transition={{
            duration: 0.42,
            delay: i * 0.075,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="border-b border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-3 font-mono text-[14px] text-[var(--text-primary)] last:border-b-0"
        >
          {formatBulletLine(item, bullet)}
        </motion.li>
      ))}
    </ul>
  );
}
