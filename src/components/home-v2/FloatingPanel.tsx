"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeTab } from "./tabs/HomeTab";
import { WorkTab } from "./tabs/WorkTab";
import { ShopTab } from "./tabs/ShopTab";
import { LinksTab } from "./tabs/LinksTab";
import { ViewCounter } from "./ViewCounter";
import { SoundCloudWidget } from "./SoundCloudWidget";

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
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl flex flex-col"
      style={{
        background: "rgba(10, 10, 10, 0.88)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)",
        maxHeight: "92vh",
      }}
    >
      {/* ── Nav bar ── */}
      <div
        className="flex shrink-0 items-center justify-between border-b px-4 py-2"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.35)" }}
      >
        <div className="flex items-center gap-0.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative px-3 py-1.5 text-[11px] transition-colors duration-150"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                color: tab === t.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                fontWeight: tab === t.id ? 500 : 400,
              }}
            >
              {t.label}
              {tab === t.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-x-2 -bottom-[9px] h-px"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>
        <ViewCounter />
      </div>

      {/* ── Scrollable tab content ── */}
      <div
        className="flex-1 overflow-y-auto p-4"
        style={{ scrollbarWidth: "none" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "home"  && <HomeTab />}
            {tab === "work"  && <WorkTab />}
            {tab === "shop"  && <ShopTab />}
            {tab === "links" && <LinksTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Persistent music player — always visible at bottom ── */}
      <div
        className="shrink-0 border-t px-3 py-3"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}
      >
        <SoundCloudWidget />
      </div>
    </motion.div>
  );
}
