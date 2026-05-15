"use client";

import { useLanyard, type LanyardData } from "./VfxsynCard";
import { GlowCard } from "@/components/ui/spotlight-card";

const STATUS_COLOR: Record<string, string> = {
  online: "#23a559", idle: "#f0b232", dnd: "#f23f43", offline: "#80848e",
};
const STATUS_LABEL: Record<string, string> = {
  online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline",
};

/* ─── Inline badge SVGs — no CDN needed ─── */
function NitroBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-label="Nitro"
      style={{ filter: "drop-shadow(0 0 3px rgba(100,130,255,0.8))" }}>
      <defs>
        <linearGradient id="nitro-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7289da"/>
          <stop offset="100%" stopColor="#5865f2"/>
        </linearGradient>
      </defs>
      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="url(#nitro-g)"/>
    </svg>
  );
}

function BraveryBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-label="HypeSquad Bravery"
      style={{ filter: "drop-shadow(0 0 3px rgba(200,80,240,0.7))" }}>
      <defs>
        <linearGradient id="bravery2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e879f9"/>
          <stop offset="100%" stopColor="#9333ea"/>
        </linearGradient>
      </defs>
      <path d="M12 2 L22 10 V21 H15 V15 H9 V21 H2 V10 Z" fill="url(#bravery2)"/>
    </svg>
  );
}

function EarlySupporterBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-label="Early Supporter"
      style={{ filter: "drop-shadow(0 0 3px rgba(160,120,255,0.6))" }}>
      <defs>
        <linearGradient id="early-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
      </defs>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
        fill="url(#early-g)"/>
    </svg>
  );
}

function ActiveDevBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-label="Active Developer"
      style={{ filter: "drop-shadow(0 0 3px rgba(80,200,120,0.6))" }}>
      <defs>
        <linearGradient id="dev-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80"/>
          <stop offset="100%" stopColor="#16a34a"/>
        </linearGradient>
      </defs>
      <path d="M8.5 16.586L4.707 12.793A1 1 0 0 0 3.293 14.207l4.5 4.5a1 1 0 0 0 1.414 0l9-9A1 1 0 0 0 16.793 8.293L8.5 16.586z"
        fill="none"/>
      <path d="M9.4 16.6L4.8 12 9.4 7.4 8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
        fill="url(#dev-g)"/>
    </svg>
  );
}

function BadgeRow({ data }: { data: LanyardData }) {
  const flags = data.discord_user.public_flags ?? 0;
  const premium = data.discord_user.premium_type ?? 0;
  const hasAnimatedAvatar = data.discord_user.avatar?.startsWith("a_") ?? false;
  const hasNitro = premium > 0 || hasAnimatedAvatar;
  const hasBravery = (flags & 64) !== 0;
  const hasEarlySupporter = (flags & 512) !== 0;
  const hasActiveDev = (flags & 4194304) !== 0;

  const badges = [];
  if (hasNitro) badges.push(<NitroBadge key="nitro" />);
  if (hasBravery) badges.push(<BraveryBadge key="bravery" />);
  if (hasEarlySupporter) badges.push(<EarlySupporterBadge key="early" />);
  if (hasActiveDev) badges.push(<ActiveDevBadge key="dev" />);

  /* Always show bravery since we know this user has it (public_flags: 64) */
  if (badges.length === 0) badges.push(<BraveryBadge key="bravery-fallback" />);

  return (
    <div className="flex items-center gap-1">
      {badges}
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
      <p className="mt-1 text-[9px] truncate"
        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono)" }}>
        {customStatus.state}
      </p>
    );
  }
  if (listening_to_spotify && spotify) {
    return (
      <p className="mt-1 text-[9px] truncate"
        style={{ color: "rgba(30,215,96,0.7)", fontFamily: "var(--font-mono)" }}>
        ♪ {spotify.song}
      </p>
    );
  }
  if (stream) {
    return (
      <p className="mt-1 text-[9px]"
        style={{ color: "rgba(145,70,255,0.8)", fontFamily: "var(--font-mono)" }}>
        🔴 Live · {stream.name}
      </p>
    );
  }
  if (game) {
    return (
      <p className="mt-1 text-[9px] truncate"
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
      <div className="rounded-xl p-3" style={{ background: "rgba(88,101,242,0.06)", border: "1px solid rgba(88,101,242,0.12)" }}>
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full animate-pulse" style={{ background: "rgba(88,101,242,0.2)" }} />
          <div className="space-y-1.5">
            <div className="h-2 w-16 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="h-2 w-10 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
        </div>
      </div>
    );
  }

  const u = data.discord_user;
  const status = data.discord_status;
  const statusColor = STATUS_COLOR[status];

  return (
    <GlowCard glowColor="blue" className="w-full" customSize>
      <div className="relative z-10 px-3 py-2.5">
        {/* Header label */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {/* Discord logo */}
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="#5865f2">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.133 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            <span className="text-[8px] uppercase tracking-[0.2em]"
              style={{ color: "rgba(88,101,242,0.7)", fontFamily: "var(--font-mono)" }}>
              discord
            </span>
          </div>
          <BadgeRow data={data} />
        </div>

        {/* Avatar + info */}
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl(u)} alt={u.global_name ?? u.username}
              className="h-9 w-9 rounded-full object-cover"
              style={{ boxShadow: `0 0 0 2px rgba(88,101,242,0.3), 0 0 12px rgba(88,101,242,0.15)` }} />
            <span className="absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full"
              style={{ background: statusColor, border: "2px solid rgba(8,8,12,0.95)", boxShadow: `0 0 6px ${statusColor}70` }}
              title={STATUS_LABEL[status]} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold leading-none text-white"
              style={{ fontFamily: "var(--font-ui)" }}>
              {u.global_name ?? u.username}
            </p>
            <p className="mt-0.5 text-[9px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
              @{u.username}
            </p>
            <MiniActivity data={data} />
          </div>
        </div>
      </div>

      {/* Discord blue bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(88,101,242,0.4), rgba(88,101,242,0.6), rgba(88,101,242,0.4), transparent)" }} />
    </GlowCard>
  );
}
