"use client";

import { motion } from "framer-motion";
import { DiscordCard } from "../DiscordCard";
import { SoundCloudWidget } from "../SoundCloudWidget";

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
      <div className="rounded-xl border border-[rgba(34,197,94,0.18)] bg-[rgba(0,0,0,0.45)] p-4 backdrop-blur-sm">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(34,197,94,0.5)]">
          atlanta post house
        </p>
        <h1 className="mt-1 font-mono text-[22px] font-bold tracking-tight text-white">
          vfxsyn
        </h1>
        <p className="mt-1 font-mono text-[11px] text-[rgba(255,255,255,0.45)]">
          vfx · color · finishing for music videos
        </p>

        {/* Quick stats */}
        <div className="mt-4 flex gap-5 border-t border-[rgba(34,197,94,0.1)] pt-4">
          {[
            { v: "90M+", l: "views" },
            { v: "500+", l: "videos" },
            { v: "6+", l: "years" },
          ].map(({ v, l }) => (
            <div key={l}>
              <p className="font-mono text-[15px] font-bold text-[#4ade80]">{v}</p>
              <p className="font-mono text-[9px] text-[rgba(255,255,255,0.3)]">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Discord presence */}
      <DiscordCard userId={DISCORD_ID} />

      {/* SoundCloud */}
      <SoundCloudWidget />
    </motion.div>
  );
}
