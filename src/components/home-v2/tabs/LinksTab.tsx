"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  {
    label: "instagram",
    handle: "@vfxsyn",
    url: "https://www.instagram.com/vfxsyn/",
    accent: "225, 48, 108", // ig pink/red
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "guns.lol",
    handle: "@owvf",
    url: "https://guns.lol/owvf",
    accent: "120, 80, 180", // purple
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    ),
  },
  {
    label: "steam",
    handle: "heist / synfx",
    url: "https://steamcommunity.com/id/synfx/",
    accent: "102, 192, 244", // steam blue
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.497 1.009 2.453-.397.957-1.494 1.41-2.454 1.014H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
      </svg>
    ),
  },
  {
    label: "twitch",
    handle: "vfxsynig",
    url: "https://www.twitch.tv/vfxsynig",
    accent: "145, 71, 255", // twitch purple
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
      </svg>
    ),
  },
  {
    label: "youtube",
    handle: "@vfxsyn2",
    url: "https://www.youtube.com/@vfxsyn2",
    accent: "255, 0, 0", // yt red
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: "soundcloud",
    handle: "vfxsyn",
    url: "https://soundcloud.com/vfxsyn",
    accent: "244, 117, 33", // sc orange
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M1.175 12.225C.528 12.225 0 12.75 0 13.39v.214c0 .639.528 1.163 1.175 1.163.646 0 1.175-.524 1.175-1.163v-.214c0-.638-.53-1.165-1.175-1.165zm2.138 0c-.646 0-1.174.527-1.174 1.165v1.34c0 .64.528 1.164 1.174 1.164.647 0 1.175-.525 1.175-1.164v-1.34c0-.638-.528-1.165-1.175-1.165zm2.138-.878c-.647 0-1.175.525-1.175 1.164v2.218c0 .638.528 1.163 1.175 1.163.646 0 1.174-.525 1.174-1.163v-2.218c0-.64-.528-1.164-1.174-1.164zm2.138-1.006c-.646 0-1.174.525-1.174 1.164v3.224c0 .638.528 1.163 1.174 1.163.648 0 1.175-.525 1.175-1.163V11.505c0-.639-.527-1.164-1.175-1.164zm2.165-.7c-.648 0-1.175.525-1.175 1.163v3.924c0 .639.527 1.164 1.175 1.164.646 0 1.174-.525 1.174-1.164V10.804c0-.638-.528-1.163-1.174-1.163zm2.138.234c-.647 0-1.175.526-1.175 1.164v3.689c0 .638.528 1.163 1.175 1.163.647 0 1.174-.525 1.174-1.163v-3.69c0-.637-.527-1.163-1.174-1.163zm2.137-.584c-.647 0-1.174.526-1.174 1.164v4.274c0 .638.527 1.163 1.174 1.163.648 0 1.175-.525 1.175-1.163V10.459c0-.638-.527-1.164-1.175-1.164zM24 9.34c0-2.474-2.014-4.48-4.5-4.48-1.213 0-2.31.48-3.124 1.261A6.978 6.978 0 0 0 12 4.86a6.967 6.967 0 0 0-6.975 6.952c0 .24.015.476.042.708a1.163 1.163 0 1 0 .008 2.326h15.85A3.597 3.597 0 0 0 24 11.25v-1.91z"/>
      </svg>
    ),
  },
] as const;

export function LinksTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.4, ease }}
      className="space-y-2"
    >
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(34,197,94,0.5)]">links</p>

      {LINKS.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease, delay: i * 0.05 }}
          className="group flex items-center justify-between rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.45)] px-4 py-3 transition-all duration-200"
          style={{
            // @ts-ignore
            "--accent": link.accent,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = `rgba(${link.accent}, 0.35)`;
            el.style.background = `rgba(${link.accent}, 0.06)`;
            el.style.boxShadow = `0 0 20px rgba(${link.accent}, 0.08)`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(255,255,255,0.06)";
            el.style.background = "rgba(0,0,0,0.45)";
            el.style.boxShadow = "none";
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors"
              style={{ color: `rgba(${link.accent}, 0.8)`, background: `rgba(${link.accent}, 0.12)` }}
            >
              {link.icon}
            </div>
            <div>
              <p className="font-mono text-[12px] font-medium text-[rgba(255,255,255,0.8)] group-hover:text-white transition-colors">
                {link.label}
              </p>
              <p className="font-mono text-[10px] text-[rgba(255,255,255,0.3)]">{link.handle}</p>
            </div>
          </div>
          <svg
            className="h-3.5 w-3.5 text-[rgba(255,255,255,0.2)] transition-all group-hover:translate-x-0.5 group-hover:text-[rgba(255,255,255,0.5)]"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
          >
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </motion.a>
      ))}
    </motion.div>
  );
}
