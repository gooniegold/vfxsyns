"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeTab } from "./tabs/HomeTab";
import { WorkTab } from "./tabs/WorkTab";
import { ShopTab } from "./tabs/ShopTab";
import { LinksTab } from "./tabs/LinksTab";
import { ViewCounter } from "./ViewCounter";

type Tab = "home" | "work" | "shop" | "links";

const TABS: { id: Tab; label: string }[] = [
  { id: "home", label: "home" },
  { id: "work", label: "work" },
  { id: "shop", label: "shop" },
  { id: "links", label: "links" },
];

export function FloatingPanel() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-xl border border-[rgba(34,197,94,0.18)] shadow-[0_0_60px_rgba(34,197,94,0.06),0_32px_80px_rgba(0,0,0,0.7)]"
      style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Subtle green glow at top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)" }}
      />

      {/* Title bar */}
      <div
        className="flex items-center justify-between border-b border-[rgba(34,197,94,0.12)] px-4 py-2.5"
        style={{ background: "rgba(0,0,0,0.6)" }}
      >
        {/* Tabs */}
        <nav className="flex items-center gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative rounded px-2.5 py-1 font-mono text-[10px] transition-all duration-200 ${
                tab === t.id
                  ? "text-[#4ade80]"
                  : "text-[rgba(255,255,255,0.35)] hover:text-[rgba(255,255,255,0.65)]"
              }`}
            >
              {t.label}
              {tab === t.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute inset-x-0 -bottom-[11px] h-px bg-[#22c55e]"
                  style={{ boxShadow: "0 0 6px rgba(34,197,94,0.8)" }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* View counter */}
        <ViewCounter />
      </div>

      {/* Rainbow top bar (subtle green variant) */}
      <div
        className="h-[2px] w-full"
        style={{
          background: "linear-gradient(90deg, #22c55e, #4ade80, #86efac, #22c55e)",
          backgroundSize: "200% 100%",
          animation: "rainbowShift 3s linear infinite",
          boxShadow: "0 0 8px rgba(34,197,94,0.4)",
        }}
      />

      {/* Content */}
      <div className="max-h-[70vh] overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(34,197,94,0.2)]">
        <AnimatePresence mode="wait">
          <div key={tab}>
            {tab === "home" && <HomeTab />}
            {tab === "work" && <WorkTab />}
            {tab === "shop" && <ShopTab />}
            {tab === "links" && <LinksTab />}
          </div>
        </AnimatePresence>
      </div>

      {/* Bottom border glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)" }}
      />
    </motion.div>
  );
}
