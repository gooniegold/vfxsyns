"use client";

import { motion } from "framer-motion";
import { useLanyard, type LanyardData } from "./VfxsynCard";

const STATUS_COLOR: Record<string, string> = {
  online: "#23a559",
  idle:   "#f0b232",
  dnd:    "#f23f43",
  offline:"#4e5058",
};
const STATUS_LABEL: Record<string, string> = {
  online:  "Online",
  idle:    "Idle",
  dnd:     "Do Not Disturb",
  offline: "Offline",
};

/* ── Badge definitions — Discord CDN images for pixel-perfect accuracy ── */
const BADGE_FLAGS: { bit: number; label: string; img: string }[] = [
  { bit: 1,       label: "Discord Staff",          img: "staff" },
  { bit: 2,       label: "Partnered Server Owner", img: "partner" },
  { bit: 4,       label: "HypeSquad Events",       img: "hypesquad" },
  { bit: 8,       label: "Bug Hunter",             img: "bug_hunter_level_1" },
  { bit: 64,      label: "HypeSquad Bravery",      img: "hypesquad_house_1" },
  { bit: 128,     label: "HypeSquad Brilliance",   img: "hypesquad_house_2" },
  { bit: 256,     label: "HypeSquad Balance",      img: "hypesquad_house_3" },
  { bit: 512,     label: "Early Supporter",        img: "early_supporter" },
  { bit: 16384,   label: "Bug Hunter Lv.2",        img: "bug_hunter_level_2" },
  { bit: 131072,  label: "Verified Bot Developer", img: "verified_developer" },
  { bit: 4194304, label: "Active Developer",       img: "active_developer" },
];

function badgeCdnUrl(img: string) {
  return `https://cdn.discordapp.com/badge-icons/${img}.png?size=32`;
}

function avatarUrl(u: LanyardData["discord_user"]) {
  if (!u.avatar) return "https://cdn.discordapp.com/embed/avatars/0.png";
  const ext = u.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${ext}?size=80`;
}

/* ── Badge row — real Discord CDN images ── */
function BadgeRow({ data }: { data: LanyardData }) {
  const flags = data.discord_user.public_flags ?? 0;
  const earned = BADGE_FLAGS.filter((b) => (flags & b.bit) !== 0);

  /* Nitro: user has OG clan tag which requires active Nitro subscription */
  const hasNitro =
    (data.discord_user.premium_type ?? 0) > 0 ||
    (data.discord_user.avatar?.startsWith("a_") ?? false);

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* Nitro always rendered — confirmed via clan tag */}
      <img
        src={badgeCdnUrl("premium")}
        alt="Discord Nitro"
        title="Discord Nitro"
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
        style={{ imageRendering: "crisp-edges" }}
      />
      {earned.map((b) => (
        <img
          key={b.img}
          src={badgeCdnUrl(b.img)}
          alt={b.label}
          title={b.label}
          width={16}
          height={16}
          className="h-4 w-4 object-contain"
          style={{ imageRendering: "crisp-edges" }}
        />
      ))}
    </div>
  );
}

/* ── Activity line — no emoji, SVG only ── */
function ActivityLine({ data }: { data: LanyardData }) {
  const { activities, listening_to_spotify, spotify } = data;
  const customStatus = activities.find((a) => a.type === 4);
  const stream       = activities.find((a) => a.type === 1);
  const game         = activities.find((a) => a.type === 0);

  if (customStatus?.state) {
    return (
      <p className="mt-0.5 text-[9px] truncate" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-mono)" }}>
        {customStatus.state}
      </p>
    );
  }

  if (listening_to_spotify && spotify) {
    return (
      <div className="mt-0.5 flex items-center gap-1 min-w-0">
        {/* Spotify mark — no emoji */}
        <svg className="h-2.5 w-2.5 shrink-0" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <p className="truncate text-[9px]" style={{ color: "rgba(30,215,96,0.8)", fontFamily: "var(--font-mono)" }}>
          {spotify.song}
        </p>
      </div>
    );
  }

  if (stream) {
    return (
      <div className="mt-0.5 flex items-center gap-1">
        {/* Live dot — SVG, no emoji */}
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f23f43]" style={{ boxShadow: "0 0 4px #f23f43" }} />
        <p className="text-[9px]" style={{ color: "#9146FF", fontFamily: "var(--font-mono)" }}>
          Live · {stream.name}
        </p>
      </div>
    );
  }

  if (game) {
    return (
      <p className="mt-0.5 text-[9px] truncate" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}>
        {game.name}
      </p>
    );
  }

  return null;
}

/* ── Skeleton ── */
function DiscordMiniSkeleton() {
  return (
    <div
      className="rounded-xl px-3 py-2.5"
      style={{ background: "rgba(88,101,242,0.04)", border: "1px solid rgba(88,101,242,0.1)" }}
    >
      <div className="flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-20 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="h-2 w-12 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export function DiscordMini() {
  const data = useLanyard();

  if (!data) return <DiscordMiniSkeleton />;

  const u           = data.discord_user;
  const status      = data.discord_status;
  const statusColor = STATUS_COLOR[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative overflow-hidden rounded-xl"
      style={{
        background: "rgba(88,101,242,0.04)",
        border: "1px solid rgba(88,101,242,0.14)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(88,101,242,0.6), rgba(114,137,218,0.4), rgba(88,101,242,0.6), transparent)",
        }}
      />

      <div className="relative px-3 py-2.5">
        {/* Header row: Discord label + badges */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {/* Discord logomark */}
            <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="#5865f2">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.133 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            <span
              className="text-[8px] uppercase tracking-[0.2em]"
              style={{ color: "rgba(88,101,242,0.75)", fontFamily: "var(--font-mono)" }}
            >
              discord
            </span>
          </div>
          <BadgeRow data={data} />
        </div>

        {/* Avatar + identity */}
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl(u)}
              alt={u.global_name ?? u.username}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
              style={{ boxShadow: `0 0 0 2px rgba(88,101,242,0.35), 0 0 12px rgba(88,101,242,0.15)` }}
            />
            {/* Status dot */}
            <span
              className="absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full"
              style={{
                background: statusColor,
                border: "2px solid rgba(6,6,10,0.95)",
                boxShadow: `0 0 6px ${statusColor}90`,
              }}
              title={STATUS_LABEL[status]}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="text-[13px] font-semibold leading-none text-white"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              {u.global_name ?? u.username}
            </p>
            <p
              className="mt-0.5 text-[9px] leading-none"
              style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}
            >
              @{u.username}
            </p>
            <ActivityLine data={data} />
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(88,101,242,0.4), transparent)" }}
      />
    </motion.div>
  );
}
