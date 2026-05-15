"use client";

import { motion } from "framer-motion";
import { DiscordCard } from "../DiscordCard";

const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID ?? "855141280945143828";
const ease = [0.16, 1, 0.3, 1] as const;

export function HomeTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.4, ease }}
      className="space-y-3"
    >
      {/* Identity */}
      <div
        className="rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <h1
          className="text-[22px] font-semibold tracking-tight text-white"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          vfxsyn
        </h1>
        <p
          className="mt-1.5 text-[12px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter), sans-serif" }}
        >
          vfx / 3D artist · Web &amp; C++ dev
        </p>
        <a
          href="https://instagram.com/vfxsyn"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-[12px] underline underline-offset-2 transition-colors hover:text-white"
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-inter), sans-serif",
            textDecorationColor: "rgba(255,255,255,0.25)",
          }}
        >
          @vfxsyn on IG
        </a>

        {/* Quick stats */}
        <div
          className="mt-4 flex gap-6 border-t pt-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {[
            { v: "90M+", l: "views" },
            { v: "500+", l: "videos" },
            { v: "6+",   l: "years"  },
          ].map(({ v, l }) => (
            <div key={l}>
              <p
                className="text-[15px] font-semibold text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {v}
              </p>
              <p
                className="text-[9px] uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}
              >
                {l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Discord presence */}
      <DiscordCard userId={DISCORD_ID} />
    </motion.div>
  );
}
