"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DiscordCard } from "./DiscordCard";
import { SoundCloudWidget } from "./SoundCloudWidget";
import { ViewCounter } from "./ViewCounter";

const ease = [0.16, 1, 0.3, 1] as const;
const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID ?? "855141280945143828";

/* ─── Shared cell wrapper ────────────────────────────────── */
function Cell({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease, delay }}
      className={`relative overflow-hidden rounded-2xl p-4 ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Cell label ─────────────────────────────────────────── */
function CellLabel({ text }: { text: string }) {
  return (
    <p
      className="mb-3 text-[9px] uppercase tracking-[0.3em]"
      style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono)" }}
    >
      {text}
    </p>
  );
}

/* ─── Identity cell ──────────────────────────────────────── */
function IdentityCell() {
  return (
    <Cell
      delay={0}
      className="col-span-2 flex flex-col justify-between"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 10% 20%, rgba(255,255,255,0.04), transparent 60%), rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Name */}
      <div>
        <h1
          className="text-[36px] font-semibold tracking-tight text-white leading-none"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          vfxsyn
        </h1>
        <p
          className="mt-2 text-[13px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter), sans-serif" }}
        >
          vfx / 3D artist · Web &amp; C++ dev
        </p>
        <a
          href="https://instagram.com/vfxsyn"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5 block text-[12px] transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}
        >
          @vfxsyn on IG
        </a>
      </div>

      {/* Stats */}
      <div
        className="mt-5 flex gap-6 border-t pt-4"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        {[
          { v: "90M+", l: "views" },
          { v: "500+", l: "videos" },
          { v: "6+", l: "years" },
        ].map(({ v, l }) => (
          <div key={l}>
            <p
              className="text-[18px] font-semibold text-white leading-none"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {v}
            </p>
            <p
              className="mt-1 text-[8px] uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}
            >
              {l}
            </p>
          </div>
        ))}

        {/* View counter pinned to the right */}
        <div className="ml-auto flex items-end">
          <div className="flex items-center gap-1.5">
            <svg
              className="h-2.5 w-2.5"
              style={{ color: "rgba(255,255,255,0.25)" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <ViewCounter />
          </div>
        </div>
      </div>
    </Cell>
  );
}

/* ─── Work cell ──────────────────────────────────────────── */
const WORKS = [
  { title: "JAKK MOVE", artist: "LAZERDIM700", slug: "JAKK MOVE" },
  { title: "DREAM",     artist: "SIYAH XO",    slug: "DREAM" },
  { title: "BOUGEE",    artist: "INWINTR",      slug: "BOUGEE" },
  { title: "MONEY",     artist: "LORSKEEZY",    slug: "MONEY" },
] as const;

function WorkCell() {
  return (
    <Cell delay={0.1} className="flex flex-col">
      <CellLabel text="selected cuts" />
      <div className="flex flex-col gap-1.5 flex-1">
        {WORKS.map((w) => (
          <Link
            key={w.title}
            href={`/portfolio?open=${encodeURIComponent(w.slug)}`}
            className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.05)";
              el.style.borderColor = "rgba(255,255,255,0.09)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.02)";
              el.style.borderColor = "rgba(255,255,255,0.04)";
            }}
          >
            <div
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ background: "rgba(255,255,255,0.3)" }}
            />
            <div className="min-w-0 flex-1">
              <p
                className="text-[11px] font-medium text-white leading-none truncate"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {w.title}
              </p>
              <p
                className="mt-[3px] text-[9px] leading-none"
                style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}
              >
                {w.artist}
              </p>
            </div>
            <svg
              className="h-2.5 w-2.5 shrink-0 opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0.5"
              style={{ color: "rgba(255,255,255,0.4)" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      <Link
        href="/portfolio"
        className="mt-3 flex items-center justify-center rounded-xl py-2 text-[9px] uppercase tracking-[0.2em] transition-all duration-200"
        style={{
          border: "1px solid rgba(255,255,255,0.07)",
          color: "rgba(255,255,255,0.25)",
          fontFamily: "var(--font-mono)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "rgba(255,255,255,0.04)";
          el.style.color = "rgba(255,255,255,0.6)";
          el.style.borderColor = "rgba(255,255,255,0.12)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "transparent";
          el.style.color = "rgba(255,255,255,0.25)";
          el.style.borderColor = "rgba(255,255,255,0.07)";
        }}
      >
        full portfolio →
      </Link>
    </Cell>
  );
}

/* ─── Shop cell ──────────────────────────────────────────── */
const PRODUCTS = [
  { handle: "quickdraft-free", title: "QuickDraft Free", price: "FREE" },
  { handle: "quickdraft-pro",  title: "QuickDraft Pro",  price: "$29"  },
  { handle: "automve",         title: "AUTOMVE",         price: "SOON" },
] as const;

function ShopCell() {
  return (
    <Cell delay={0.15} className="flex flex-col">
      <CellLabel text="shop" />
      <div className="flex flex-col gap-1.5 flex-1">
        {PRODUCTS.map((p) => (
          <Link
            key={p.handle}
            href={`/shop/${p.handle}`}
            className="group flex items-center justify-between rounded-xl px-2.5 py-2 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.05)";
              el.style.borderColor = "rgba(255,255,255,0.09)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.02)";
              el.style.borderColor = "rgba(255,255,255,0.04)";
            }}
          >
            <p
              className="text-[11px] font-medium text-white truncate"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {p.title}
            </p>
            <span
              className="ml-2 shrink-0 text-[10px] font-semibold text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {p.price}
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/shop"
        className="mt-3 flex items-center justify-center rounded-xl py-2 text-[9px] uppercase tracking-[0.2em] transition-all duration-200"
        style={{
          border: "1px solid rgba(255,255,255,0.07)",
          color: "rgba(255,255,255,0.25)",
          fontFamily: "var(--font-mono)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "rgba(255,255,255,0.04)";
          el.style.color = "rgba(255,255,255,0.6)";
          el.style.borderColor = "rgba(255,255,255,0.12)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "transparent";
          el.style.color = "rgba(255,255,255,0.25)";
          el.style.borderColor = "rgba(255,255,255,0.07)";
        }}
      >
        enter shop →
      </Link>
    </Cell>
  );
}

/* ─── Links cell ─────────────────────────────────────────── */
const BIO_LINKS = [
  { label: "Steam",      handle: "synfx",   url: "https://steamcommunity.com/id/synfx/",  accent: "102,192,244", icon: "🎮" },
  { label: "guns.lol",   handle: "@owvf",   url: "https://guns.lol/owvf",                 accent: "160,120,240", icon: "🔫" },
  { label: "SoundCloud", handle: "vfxsyn",  url: "https://soundcloud.com/vfxsyn",         accent: "244,117,33",  icon: "☁️" },
] as const;

const SOCIAL_LINKS = [
  { label: "Instagram", handle: "@vfxsyn",  url: "https://www.instagram.com/vfxsyn/",    accent: "225,48,108",  icon: "📷" },
  { label: "Twitch",    handle: "vfxsynig", url: "https://www.twitch.tv/vfxsynig",        accent: "145,71,255",  icon: "🎥" },
  { label: "YouTube",   handle: "@vfxsyn2", url: "https://www.youtube.com/@vfxsyn2",      accent: "255,50,50",   icon: "▶️" },
] as const;

function LinkPill({
  label,
  handle,
  url,
  accent,
}: {
  label: string;
  handle: string;
  url: string;
  accent: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-1 rounded-xl px-3 py-2.5 transition-all duration-200"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = `rgba(${accent}, 0.07)`;
        el.style.borderColor = `rgba(${accent}, 0.25)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255,255,255,0.02)";
        el.style.borderColor = "rgba(255,255,255,0.05)";
      }}
    >
      <p
        className="text-[11px] font-medium text-white"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {label}
      </p>
      <p
        className="text-[9px]"
        style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}
      >
        {handle}
      </p>
    </a>
  );
}

function LinksCell() {
  return (
    <Cell delay={0.2} className="col-span-2 flex flex-col">
      <div className="flex gap-6">
        {/* Bio links */}
        <div className="flex-1">
          <CellLabel text="Bio Links" />
          <div className="grid grid-cols-3 gap-2">
            {BIO_LINKS.map((l) => (
              <LinkPill key={l.label} {...l} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-px self-stretch"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Socials */}
        <div className="flex-1">
          <CellLabel text="Socials" />
          <div className="grid grid-cols-3 gap-2">
            {SOCIAL_LINKS.map((l) => (
              <LinkPill key={l.label} {...l} />
            ))}
          </div>
        </div>
      </div>
    </Cell>
  );
}

/* ─── Bento Home ─────────────────────────────────────────── */
export function BentoHome() {
  return (
    <div
      className="w-full"
      style={{ maxWidth: 860 }}
    >
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto",
        }}
      >
        {/* Row 1: Identity (2col) | Discord (1col, spans 2 rows) */}
        <IdentityCell />

        {/* Discord — row-span-2 */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          style={{ gridRow: "span 2" }}
        >
          <DiscordCard userId={DISCORD_ID} />
        </motion.div>

        {/* Row 2: SoundCloud (1col) | Work (1col) */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.08 }}
        >
          <SoundCloudWidget />
        </motion.div>

        <WorkCell />

        {/* Row 3: Shop (1col) | Links (2col) */}
        <ShopCell />
        <LinksCell />
      </div>
    </div>
  );
}
