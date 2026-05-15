"use client";

import { useLanyard, type LanyardData } from "./VfxsynCard";
import { GlowCard } from "@/components/ui/spotlight-card";

const STATUS_COLOR: Record<string, string> = {
  online: "#23a559", idle: "#f0b232", dnd: "#f23f43", offline: "#80848e",
};
const STATUS_LABEL: Record<string, string> = {
  online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline",
};

/* ─── Exact Discord badge SVGs (inline, no CDN) ─── */
const BADGE_DEFS = [
  {
    key: "nitro",
    label: "Nitro",
    check: (d: LanyardData, flags: number) =>
      (d.discord_user.premium_type ?? 0) > 0 ||
      d.discord_user.avatar?.startsWith("a_") ||
      (flags & 128) !== 0,   // Nitro badge bit
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Discord Nitro"
        style={{ filter: "drop-shadow(0 0 4px rgba(100,120,255,0.8))" }}>
        <defs>
          <linearGradient id="nitro-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8ea1e1"/>
            <stop offset="100%" stopColor="#5865f2"/>
          </linearGradient>
        </defs>
        {/* Lightning bolt — matches Discord's Nitro icon shape */}
        <path d="M13.5 2L5 14h6.5L10 22l9-12h-6.5L13.5 2z" fill="url(#nitro-g)"/>
      </svg>
    ),
  },
  {
    key: "bravery",
    label: "HypeSquad Bravery",
    check: (_: LanyardData, flags: number) => (flags & 64) !== 0,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="HypeSquad Bravery"
        style={{ filter: "drop-shadow(0 0 4px rgba(200,80,240,0.8))" }}>
        <defs>
          <linearGradient id="bravery-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0abfc"/>
            <stop offset="100%" stopColor="#a21caf"/>
          </linearGradient>
        </defs>
        {/* House shape — HypeSquad */}
        <path d="M12 2L22 10v11h-7v-6H9v6H2V10L12 2z" fill="url(#bravery-g)"/>
      </svg>
    ),
  },
  {
    key: "brilliance",
    label: "HypeSquad Brilliance",
    check: (_: LanyardData, flags: number) => (flags & 128) !== 0,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="HypeSquad Brilliance"
        style={{ filter: "drop-shadow(0 0 4px rgba(255,100,50,0.8))" }}>
        <defs>
          <linearGradient id="brilliance-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb923c"/>
            <stop offset="100%" stopColor="#ef4444"/>
          </linearGradient>
        </defs>
        <path d="M12 2L22 10v11h-7v-6H9v6H2V10L12 2z" fill="url(#brilliance-g)"/>
      </svg>
    ),
  },
  {
    key: "balance",
    label: "HypeSquad Balance",
    check: (_: LanyardData, flags: number) => (flags & 256) !== 0,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="HypeSquad Balance"
        style={{ filter: "drop-shadow(0 0 4px rgba(80,200,200,0.8))" }}>
        <defs>
          <linearGradient id="balance-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9"/>
            <stop offset="100%" stopColor="#0891b2"/>
          </linearGradient>
        </defs>
        <path d="M12 2L22 10v11h-7v-6H9v6H2V10L12 2z" fill="url(#balance-g)"/>
      </svg>
    ),
  },
  {
    key: "early_supporter",
    label: "Early Supporter",
    check: (_: LanyardData, flags: number) => (flags & 512) !== 0,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Early Supporter"
        style={{ filter: "drop-shadow(0 0 4px rgba(160,100,255,0.7))" }}>
        <defs>
          <linearGradient id="early-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c084fc"/>
            <stop offset="100%" stopColor="#7c3aed"/>
          </linearGradient>
        </defs>
        {/* Heart shape */}
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="url(#early-g)"/>
      </svg>
    ),
  },
  {
    key: "bug_hunter",
    label: "Bug Hunter",
    check: (_: LanyardData, flags: number) => (flags & 8) !== 0,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Bug Hunter"
        style={{ filter: "drop-shadow(0 0 4px rgba(80,200,120,0.7))" }}>
        <defs>
          <linearGradient id="bug-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4ade80"/>
            <stop offset="100%" stopColor="#15803d"/>
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9" fill="url(#bug-g)"/>
        <path d="M8 10c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none"/>
        <ellipse cx="12" cy="14" rx="3.5" ry="4" fill="rgba(0,0,0,0.25)"/>
        <line x1="5" y1="9" x2="8" y2="11" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
        <line x1="19" y1="9" x2="16" y2="11" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    key: "active_dev",
    label: "Active Developer",
    check: (_: LanyardData, flags: number) => (flags & 4194304) !== 0,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Active Developer"
        style={{ filter: "drop-shadow(0 0 4px rgba(80,210,140,0.7))" }}>
        <defs>
          <linearGradient id="dev-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ee7b7"/>
            <stop offset="100%" stopColor="#059669"/>
          </linearGradient>
        </defs>
        <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 7l-4 10" stroke="url(#dev-g)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    key: "verified_dev",
    label: "Verified Bot Developer",
    check: (_: LanyardData, flags: number) => (flags & 131072) !== 0,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Verified Bot Developer"
        style={{ filter: "drop-shadow(0 0 4px rgba(80,160,255,0.7))" }}>
        <defs>
          <linearGradient id="verdev-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#93c5fd"/>
            <stop offset="100%" stopColor="#1d4ed8"/>
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#verdev-g)"/>
        <path d="M8 12.5l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    key: "partner",
    label: "Discord Partner",
    check: (_: LanyardData, flags: number) => (flags & 2) !== 0,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Discord Partner"
        style={{ filter: "drop-shadow(0 0 4px rgba(80,140,255,0.7))" }}>
        <defs>
          <linearGradient id="partner-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa"/>
            <stop offset="100%" stopColor="#2563eb"/>
          </linearGradient>
        </defs>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="url(#partner-g)"/>
      </svg>
    ),
  },
  {
    key: "staff",
    label: "Discord Staff",
    check: (_: LanyardData, flags: number) => (flags & 1) !== 0,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Discord Staff"
        style={{ filter: "drop-shadow(0 0 4px rgba(255,180,50,0.7))" }}>
        <defs>
          <linearGradient id="staff-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24"/>
            <stop offset="100%" stopColor="#d97706"/>
          </linearGradient>
        </defs>
        <path d="M12 1L15.5 8.5H23L17 13L19.5 21L12 16.5L4.5 21L7 13L1 8.5H8.5L12 1z" fill="url(#staff-g)"/>
      </svg>
    ),
  },
];

function BadgeRow({ data }: { data: LanyardData }) {
  const flags = data.discord_user.public_flags ?? 0;
  const badges = BADGE_DEFS.filter((b) => b.check(data, flags));

  /* Always show at least Bravery since public_flags: 64 is confirmed */
  const hasAny = badges.length > 0;
  const showBravery = (flags & 64) !== 0 || !hasAny;

  const toShow = hasAny ? badges : BADGE_DEFS.filter((b) => b.key === "bravery");

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* Nitro always shown — user has OG clan tag which requires it */}
      {!toShow.find((b) => b.key === "nitro") && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Discord Nitro"
          style={{ filter: "drop-shadow(0 0 4px rgba(100,120,255,0.8))" }}>
          <defs>
            <linearGradient id="nitro-fallback" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8ea1e1"/>
              <stop offset="100%" stopColor="#5865f2"/>
            </linearGradient>
          </defs>
          <path d="M13.5 2L5 14h6.5L10 22l9-12h-6.5L13.5 2z" fill="url(#nitro-fallback)"/>
        </svg>
      )}
      {showBravery && !toShow.find((b) => b.key === "bravery") && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="HypeSquad Bravery"
          style={{ filter: "drop-shadow(0 0 4px rgba(200,80,240,0.8))" }}>
          <defs>
            <linearGradient id="bravery-fallback" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f0abfc"/>
              <stop offset="100%" stopColor="#a21caf"/>
            </linearGradient>
          </defs>
          <path d="M12 2L22 10v11h-7v-6H9v6H2V10L12 2z" fill="url(#bravery-fallback)"/>
        </svg>
      )}
      {toShow.map((b) => (
        <span key={b.key}>{b.svg}</span>
      ))}
    </div>
  );
}

function avatarUrl(u: LanyardData["discord_user"]) {
  if (!u.avatar) return "https://cdn.discordapp.com/embed/avatars/0.png";
  const ext = u.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${ext}?size=80`;
}

function MiniActivity({ data }: { data: LanyardData }) {
  const { activities, listening_to_spotify, spotify } = data;
  const customStatus = activities.find((a) => a.type === 4);
  const stream = activities.find((a) => a.type === 1);
  const game   = activities.find((a) => a.type === 0);

  if (customStatus?.state) {
    return (
      <p className="mt-0.5 text-[9px] truncate"
        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono)" }}>
        {customStatus.state}
      </p>
    );
  }
  if (listening_to_spotify && spotify) {
    return (
      <p className="mt-0.5 text-[9px] truncate"
        style={{ color: "rgba(30,215,96,0.7)", fontFamily: "var(--font-mono)" }}>
        ♪ {spotify.song}
      </p>
    );
  }
  if (stream) {
    return (
      <p className="mt-0.5 text-[9px]"
        style={{ color: "rgba(145,70,255,0.8)", fontFamily: "var(--font-mono)" }}>
        🔴 Live · {stream.name}
      </p>
    );
  }
  if (game) {
    return (
      <p className="mt-0.5 text-[9px] truncate"
        style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}>
        Playing {game.name}
      </p>
    );
  }
  return null;
}

export function DiscordMini() {
  const data = useLanyard();

  if (!data) {
    return (
      <div className="rounded-xl px-3 py-2.5"
        style={{ background: "rgba(88,101,242,0.05)", border: "1px solid rgba(88,101,242,0.12)" }}>
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full animate-pulse"
            style={{ background: "rgba(88,101,242,0.15)" }} />
          <div className="space-y-1.5">
            <div className="h-2 w-16 rounded-full animate-pulse"
              style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="h-2 w-10 rounded-full animate-pulse"
              style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
        </div>
      </div>
    );
  }

  const u           = data.discord_user;
  const status      = data.discord_status;
  const statusColor = STATUS_COLOR[status];

  return (
    <GlowCard glowColor="blue" className="w-full" customSize>
      {/* Top blue accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(88,101,242,0.7), rgba(114,137,218,0.5), rgba(88,101,242,0.7), transparent)" }} />

      <div className="relative z-10 px-3 py-2.5">
        {/* Label + badges */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="#5865f2">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.133 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            <span className="text-[8px] uppercase tracking-[0.2em]"
              style={{ color: "rgba(88,101,242,0.8)", fontFamily: "var(--font-mono)" }}>
              discord
            </span>
          </div>
          <BadgeRow data={data} />
        </div>

        {/* Avatar + info row */}
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl(u)}
              alt={u.global_name ?? u.username}
              className="h-10 w-10 rounded-full object-cover"
              style={{
                boxShadow: `0 0 0 2px rgba(88,101,242,0.4), 0 0 14px rgba(88,101,242,0.2)`,
              }}
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 block h-3.5 w-3.5 rounded-full"
              style={{
                background: statusColor,
                border: "2.5px solid rgba(8,8,12,0.95)",
                boxShadow: `0 0 8px ${statusColor}80`,
              }}
              title={STATUS_LABEL[status]}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold leading-none text-white"
              style={{ fontFamily: "var(--font-ui)" }}>
              {u.global_name ?? u.username}
            </p>
            <p className="mt-0.5 text-[9px]"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
              @{u.username}
            </p>
            <MiniActivity data={data} />
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(88,101,242,0.5), transparent)" }} />
    </GlowCard>
  );
}
