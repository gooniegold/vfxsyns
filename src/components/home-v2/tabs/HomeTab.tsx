"use client";

import { motion } from "framer-motion";
import { VfxsynCard } from "../VfxsynCard";
import { DiscordMini } from "../DiscordMini";

const SPRING = { type: "spring", stiffness: 380, damping: 30 } as const;

const SOCIALS = [
  {
    label:   "Instagram",
    handle:  "@vfxsyn",
    url:     "https://www.instagram.com/vfxsyn/",
    accent:  "225,48,108",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label:   "Twitch",
    handle:  "vfxsynig",
    url:     "https://www.twitch.tv/vfxsynig",
    accent:  "145,71,255",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
      </svg>
    ),
  },
  {
    label:   "YouTube",
    handle:  "@vfxsyn2",
    url:     "https://www.youtube.com/@vfxsyn2",
    accent:  "255,50,50",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
] as const;

export function HomeTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2.5"
    >
      {/* Profile card */}
      <VfxsynCard />

      {/* Discord presence */}
      <DiscordMini />

      {/* Socials */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.1 }}
        className="rounded-xl p-3"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p
          className="mb-2.5 text-[8px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}
        >
          socials
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.12 + i * 0.05 }}
              whileHover={{ y: -2, transition: { ...SPRING, duration: 0.15 } }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-1.5 rounded-xl py-2.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `rgba(${s.accent}, 0.07)`;
                el.style.borderColor = `rgba(${s.accent}, 0.25)`;
                el.style.boxShadow = `0 4px 16px rgba(${s.accent}, 0.1)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.03)";
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
              }}
            >
              <span style={{ color: `rgb(${s.accent})` }}>{s.icon}</span>
              <div className="text-center">
                <p
                  className="text-[10px] font-medium leading-none text-white"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {s.label}
                </p>
                <p
                  className="mt-0.5 text-[8px] leading-none"
                  style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}
                >
                  {s.handle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
