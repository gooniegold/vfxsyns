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

const SPRING = { type: "spring", stiffness: 380, damping: 30 } as const;

function ThemeToggleBtn() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
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
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex h-5 w-5 items-center justify-center rounded-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: "rgba(255,255,255,0.35)",
      }}
      aria-label={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? (
        <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      ) : (
        <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      )}
    </motion.button>
  );
}

export function FloatingPanel() {
  const [tab, setTab] = useState<Tab>("home");
  const [dir, setDir] = useState(1);
  const tabIds = TABS.map((t) => t.id);

  const switchTab = (next: Tab) => {
    const from = tabIds.indexOf(tab);
    const to   = tabIds.indexOf(next);
    setDir(to > from ? 1 : -1);
    setTab(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.05 }}
      className="relative mx-auto w-full max-w-[420px] flex flex-col overflow-hidden rounded-2xl"
      style={{
        background: "rgba(7,7,9,0.92)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(28px) saturate(150%)",
        WebkitBackdropFilter: "blur(28px) saturate(150%)",
        boxShadow: [
          "0 48px 120px rgba(0,0,0,0.95)",
          "0 0 0 1px rgba(255,255,255,0.035)",
          "inset 0 1px 0 rgba(255,255,255,0.07)",
          "inset 0 -1px 0 rgba(0,0,0,0.4)",
        ].join(", "),
        maxHeight: "92vh",
      }}
    >
      {/* ── Noise texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Top meta bar ── */}
      <div
        className="relative z-10 flex shrink-0 items-center justify-between px-4 pt-2.5 pb-1.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <LocationTag />
        <div className="flex items-center gap-2">
          <ViewCounter />
          <ThemeToggleBtn />
        </div>
      </div>

      {/* ── Tab nav — sliding pill ── */}
      <div
        className="relative z-10 flex shrink-0 items-center px-3 py-1.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.18)" }}
      >
        <div className="flex items-center gap-0.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => switchTab(t.id)}
              className="relative px-3 py-1.5 text-[11px] font-medium"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                color: tab === t.id ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.3)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.15s ease",
                letterSpacing: "0.01em",
              }}
            >
              {/* Sliding pill background */}
              {tab === t.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-md"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  transition={SPRING}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div
        className="relative z-10 flex-1 overflow-y-auto p-4"
        style={{ scrollbarWidth: "none" }}
      >
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={tab}
            custom={dir}
            variants={{
              enter:  (d: number) => ({ opacity: 0, x: d * 12, y: 4 }),
              center: { opacity: 1, x: 0, y: 0 },
              exit:   (d: number) => ({ opacity: 0, x: d * -8, y: -2 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
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
        className="relative z-10 shrink-0 px-3 pb-3 pt-2"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.045)",
          background: "rgba(0,0,0,0.22)",
        }}
      >
        <SoundCloudWidget />
      </div>
    </motion.div>
  );
}
