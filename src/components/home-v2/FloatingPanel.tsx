"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeTab } from "./tabs/HomeTab";
import { WorkTab } from "./tabs/WorkTab";
import { ShopTab } from "./tabs/ShopTab";
import { LinksTab } from "./tabs/LinksTab";
import { ViewCounter } from "./ViewCounter";
import { SoundCloudWidget } from "./SoundCloudWidget";
import { LocationTag } from "@/components/ui/location-tag";

type Tab = "home" | "work" | "shop" | "links";

const TABS: { id: Tab; label: string }[] = [
  { id: "home",  label: "home"  },
  { id: "work",  label: "work"  },
  { id: "shop",  label: "shop"  },
  { id: "links", label: "links" },
];

function ThemeToggleBtn() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    // Sync with stored preference (inline script already applied the class)
    setDark(!document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      className="flex h-5 w-5 items-center justify-center rounded-full transition-all hover:scale-110"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.4)",
      }}
      aria-label={dark ? "Light mode" : "Dark mode"}
      title={dark ? "Switch to light" : "Switch to dark"}
    >
      {dark ? (
        /* Moon */
        <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      ) : (
        /* Sun */
        <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      )}
    </button>
  );
}

export function FloatingPanel() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[420px] flex flex-col overflow-hidden rounded-2xl"
      style={{
        background: "rgba(8, 8, 10, 0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow:
          "0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
        maxHeight: "92vh",
      }}
    >
      {/* ── Top meta bar: location + view count + theme ── */}
      <div
        className="flex shrink-0 items-center justify-between px-4 pt-2.5 pb-1"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <LocationTag />
        <div className="flex items-center gap-2">
          <ViewCounter />
          <ThemeToggleBtn />
        </div>
      </div>

      {/* ── Tab nav ── */}
      <div
        className="flex shrink-0 items-center border-b px-4 py-1.5"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}
      >
        <div className="flex items-center gap-0.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative px-3 py-1.5 text-[11px] transition-colors duration-150"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                color: tab === t.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)",
                fontWeight: tab === t.id ? 500 : 400,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {t.label}
              {tab === t.id && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-x-1 -bottom-[7px] h-px"
                  style={{ background: "rgba(255,255,255,0.65)" }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
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
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "home"  && <HomeTab />}
            {tab === "work"  && <WorkTab />}
            {tab === "shop"  && <ShopTab />}
            {tab === "links" && <LinksTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Persistent music player ── */}
      <div
        className="shrink-0 px-3 pb-3 pt-2"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <SoundCloudWidget />
      </div>
    </motion.div>
  );
}
