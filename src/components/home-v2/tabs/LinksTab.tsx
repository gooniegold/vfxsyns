"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const BIO_LINKS = [
  {
    label: "Steam",
    handle: "heist / synfx",
    url: "https://steamcommunity.com/id/synfx/",
    accentFrom: "#1b2838",
    accentTo: "#4a90d9",
    accentRgb: "74,144,217",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.497 1.009 2.453-.397.957-1.494 1.41-2.454 1.014H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
      </svg>
    ),
  },
  {
    label: "guns.lol",
    handle: "@owvf",
    url: "https://guns.lol/owvf",
    accentFrom: "#1a0a2e",
    accentTo: "#9b59b6",
    accentRgb: "155,89,182",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M5 3h10a2 2 0 0 1 2 2v1h1a1 1 0 0 1 1 1v2h.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H19v1a1 1 0 0 1-1 1h-1.382l-1.724 3.447A1 1 0 0 1 14 17h-1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 0 0zm0 0"/>
      </svg>
    ),
  },
  {
    label: "SoundCloud",
    handle: "vfxsyn",
    url: "https://soundcloud.com/vfxsyn",
    accentFrom: "#1a0800",
    accentTo: "#f47521",
    accentRgb: "244,117,33",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M1.175 12.225C.528 12.225 0 12.75 0 13.39v.214c0 .639.528 1.163 1.175 1.163.646 0 1.175-.524 1.175-1.163v-.214c0-.638-.53-1.165-1.175-1.165zm2.138 0c-.646 0-1.174.527-1.174 1.165v1.34c0 .64.528 1.164 1.174 1.164.647 0 1.175-.525 1.175-1.164v-1.34c0-.638-.528-1.165-1.175-1.165zm2.138-.878c-.647 0-1.175.525-1.175 1.164v2.218c0 .638.528 1.163 1.175 1.163.646 0 1.174-.525 1.174-1.163v-2.218c0-.64-.528-1.164-1.174-1.164zm2.138-1.006c-.646 0-1.174.525-1.174 1.164v3.224c0 .638.528 1.163 1.174 1.163.648 0 1.175-.525 1.175-1.163V11.505c0-.639-.527-1.164-1.175-1.164zm2.165-.7c-.648 0-1.175.525-1.175 1.163v3.924c0 .639.527 1.164 1.175 1.164.646 0 1.174-.525 1.174-1.164V10.804c0-.638-.528-1.163-1.174-1.163zm2.138.234c-.647 0-1.175.526-1.175 1.164v3.689c0 .638.528 1.163 1.175 1.163.647 0 1.174-.525 1.174-1.163v-3.69c0-.637-.527-1.163-1.174-1.163zm2.137-.584c-.647 0-1.174.526-1.174 1.164v4.274c0 .638.527 1.163 1.174 1.163.648 0 1.175-.525 1.175-1.163V10.459c0-.638-.527-1.164-1.175-1.164zM24 9.34c0-2.474-2.014-4.48-4.5-4.48-1.213 0-2.31.48-3.124 1.261A6.978 6.978 0 0 0 12 4.86a6.967 6.967 0 0 0-6.975 6.952c0 .24.015.476.042.708a1.163 1.163 0 1 0 .008 2.326h15.85A3.597 3.597 0 0 0 24 11.25v-1.91z"/>
      </svg>
    ),
  },
] as const;

function LinkCard({ link, delay }: { link: typeof BIO_LINKS[number]; delay: number }) {
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease, delay }}
      className="group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${link.accentFrom}80 0%, rgba(8,8,12,0.6) 100%)`,
        border: `1px solid rgba(${link.accentRgb}, 0.2)`,
        boxShadow: `0 0 20px rgba(${link.accentRgb}, 0.04) inset`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = `linear-gradient(135deg, ${link.accentFrom}cc 0%, rgba(8,8,12,0.8) 100%)`;
        el.style.borderColor = `rgba(${link.accentRgb}, 0.45)`;
        el.style.boxShadow = `0 0 30px rgba(${link.accentRgb}, 0.12), 0 4px 20px rgba(0,0,0,0.4)`;
        el.style.transform = "translateX(3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = `linear-gradient(135deg, ${link.accentFrom}80 0%, rgba(8,8,12,0.6) 100%)`;
        el.style.borderColor = `rgba(${link.accentRgb}, 0.2)`;
        el.style.boxShadow = `0 0 20px rgba(${link.accentRgb}, 0.04) inset`;
        el.style.transform = "translateX(0)";
      }}
    >
      {/* Gradient left bar */}
      <div
        className="absolute left-0 top-0 h-full w-[2px] rounded-r-full"
        style={{ background: `linear-gradient(180deg, transparent, rgba(${link.accentRgb}, 0.8), transparent)` }}
      />

      {/* Icon */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, rgba(${link.accentRgb}, 0.18), rgba(${link.accentRgb}, 0.06))`,
          border: `1px solid rgba(${link.accentRgb}, 0.25)`,
          color: `rgba(${link.accentRgb}, 0.95)`,
          boxShadow: `0 0 12px rgba(${link.accentRgb}, 0.1)`,
        }}
      >
        {link.icon}
      </div>

      {/* Labels */}
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold leading-none text-white"
          style={{ fontFamily: "var(--font-ui), sans-serif" }}>
          {link.label}
        </p>
        <p className="mt-1 text-[9px] leading-none"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono)" }}>
          {link.handle}
        </p>
      </div>

      {/* Arrow */}
      <svg
        className="h-3.5 w-3.5 shrink-0 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
        style={{ color: `rgba(${link.accentRgb}, 0.7)` }}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      >
        <path d="M7 17L17 7M17 7H7M17 7v10"/>
      </svg>
    </motion.a>
  );
}

export function LinksTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease }}
    >
      <p className="mb-3 text-[8px] uppercase tracking-[0.3em]"
        style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono)" }}>
        bio links
      </p>
      <div className="space-y-2">
        {BIO_LINKS.map((link, i) => (
          <LinkCard key={link.label} link={link} delay={i * 0.07} />
        ))}
      </div>
    </motion.div>
  );
}
