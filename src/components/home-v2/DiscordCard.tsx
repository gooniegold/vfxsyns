"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Types ─────────────────────────────────────────── */
interface LanyardActivity {
  name: string;
  details?: string;
  state?: string;
  type: number;
  application_id?: string;
  assets?: { large_image?: string; large_text?: string };
  timestamps?: { start?: number; end?: number };
}

interface SpotifyData {
  song: string;
  artist: string;
  album_art_url: string | null;
  timestamps: { start: number; end: number };
}

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  global_name?: string;
  display_name?: string;
  public_flags?: number;
  avatar_decoration_data?: { asset: string; sku_id: string } | null;
  collectibles?: {
    nameplate?: { asset: string; label: string; sku_id: string; palette: string } | null;
  };
  primary_guild?: { badge: string; identity_guild_id: string; tag: string } | null;
}

interface LanyardData {
  discord_user: DiscordUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
}

/* ─── Badge definitions ──────────────────────────────── */
const BADGE_FLAGS: Record<number, { label: string; img: string }> = {
  1:       { label: "Discord Staff",          img: "staff" },
  2:       { label: "Partnered Server Owner", img: "partner" },
  4:       { label: "HypeSquad Events",       img: "hypesquad" },
  8:       { label: "Bug Hunter",             img: "bug_hunter_1" },
  64:      { label: "HypeSquad Bravery",      img: "hypesquad_house_1" },
  128:     { label: "HypeSquad Brilliance",   img: "hypesquad_house_2" },
  256:     { label: "HypeSquad Balance",      img: "hypesquad_house_3" },
  512:     { label: "Early Supporter",        img: "early_supporter" },
  16384:   { label: "Bug Hunter Lv.2",        img: "bug_hunter_2" },
  131072:  { label: "Verified Bot Developer", img: "verified_developer" },
  4194304: { label: "Active Developer",       img: "active_developer" },
};

function parseBadges(flags: number) {
  return Object.entries(BADGE_FLAGS)
    .filter(([f]) => (flags & Number(f)) !== 0)
    .map(([, b]) => b);
}

/* ─── Status ─────────────────────────────────────────── */
const STATUS_DOT: Record<string, string> = {
  online:  "#23a559",
  idle:    "#f0b232",
  dnd:     "#f23f43",
  offline: "#80848e",
};

const STATUS_LABEL: Record<string, string> = {
  online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline",
};

/* ─── Avatar URL ─────────────────────────────────────── */
function avatarUrl(u: DiscordUser) {
  if (!u.avatar) return `https://cdn.discordapp.com/embed/avatars/0.png`;
  const ext = u.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${ext}?size=128`;
}

/* ─── Spotify progress bar ───────────────────────────── */
function SpotifyBar({ spotify }: { spotify: SpotifyData }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - spotify.timestamps.start;
      const total = spotify.timestamps.end - spotify.timestamps.start;
      setPct(Math.min((elapsed / total) * 100, 100));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [spotify]);

  function fmt(ms: number) {
    const s = Math.floor(Math.abs(ms) / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  const elapsed = Date.now() - spotify.timestamps.start;
  const total = spotify.timestamps.end - spotify.timestamps.start;

  return (
    <div className="mt-3 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-3">
        {spotify.album_art_url && (
          <img src={spotify.album_art_url} alt="" className="h-9 w-9 shrink-0 rounded-lg object-cover" />
        )}
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium text-white">{spotify.song}</p>
          <p className="truncate text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{spotify.artist}</p>
        </div>
        {/* Spotify logo */}
        <svg className="ml-auto h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
      <div className="mt-2.5">
        <div className="h-[3px] w-full rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div className="h-full rounded-full bg-[#1DB954] transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-[9px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
          <span>{fmt(elapsed)}</span><span>{fmt(total)}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Activity row ───────────────────────────────────── */
function ActivityRow({ activity }: { activity: LanyardActivity }) {
  return (
    <div className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
        {activity.type === 1 ? "streaming" : activity.type === 2 ? "listening" : "playing"}
      </span>
      <span className="truncate text-[11px] text-white">{activity.name}</span>
      {activity.details && (
        <span className="ml-auto shrink-0 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
          {activity.details}
        </span>
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────── */
export function DiscordCard({ userId }: { userId: string }) {
  const [data, setData] = useState<LanyardData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const hbRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!userId || userId === "YOUR_DISCORD_ID") return;
    let alive = true;

    function connect() {
      const ws = new WebSocket("wss://api.lanyard.rest/socket");
      wsRef.current = ws;

      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.op === 1) {
          hbRef.current = setInterval(() => ws.readyState === 1 && ws.send(JSON.stringify({ op: 3 })), msg.d.heartbeat_interval);
          ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
        }
        if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") && alive) {
          setData(msg.d);
        }
      };

      ws.onclose = () => {
        if (hbRef.current) clearInterval(hbRef.current);
        if (alive) setTimeout(connect, 3000);
      };
    }

    connect();
    return () => {
      alive = false;
      if (hbRef.current) clearInterval(hbRef.current);
      wsRef.current?.close();
    };
  }, [userId]);

  /* skeleton */
  if (!data) {
    return (
      <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="space-y-2">
            <div className="h-3 w-20 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="h-2 w-14 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
        </div>
      </div>
    );
  }

  const { discord_user: u, discord_status, activities, listening_to_spotify, spotify } = data;
  const badges = parseBadges(u.public_flags ?? 0);
  const customStatus = activities.find((a) => a.type === 4);
  const gameOrStream = activities.find((a) => a.type === 0 || a.type === 1);
  const scActivity = activities.find((a) => a.type === 2 && a.name === "SoundCloud");

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Top row: avatar + info */}
      <div className="flex items-start gap-3">
        {/* Avatar with status ring */}
        <div className="relative shrink-0">
          <img
            src={avatarUrl(u)}
            alt={u.global_name ?? u.username}
            className="h-12 w-12 rounded-full object-cover"
            style={{ outline: `2px solid ${STATUS_DOT[discord_status]}`, outlineOffset: "2px" }}
          />
          {/* status dot */}
          <span
            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full"
            style={{ background: STATUS_DOT[discord_status], border: "2px solid #0a0a0a" }}
            title={STATUS_LABEL[discord_status]}
          />
        </div>

        {/* Name + status + badges */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[14px] font-semibold text-white" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              {u.global_name ?? u.display_name ?? u.username}
            </span>
            {/* Clan tag */}
            {u.primary_guild?.tag && (
              <span
                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-medium"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}
              >
                {u.primary_guild.badge && (
                  <img
                    src={`https://cdn.discordapp.com/clan-badges/${u.primary_guild.identity_guild_id}/${u.primary_guild.badge}.png?size=16`}
                    alt=""
                    className="h-3 w-3 object-contain"
                  />
                )}
                {u.primary_guild.tag}
              </span>
            )}
          </div>

          {/* Username */}
          <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono)" }}>
            @{u.username}
          </p>

          {/* Badges row */}
          {badges.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              {badges.map((b) => (
                <img
                  key={b.img}
                  src={`https://cdn.discordapp.com/badge-icons/${b.img}.png`}
                  alt={b.label}
                  title={b.label}
                  className="h-4 w-4 object-contain"
                  style={{ imageRendering: "auto" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom status */}
      {customStatus?.state && (
        <p className="mt-3 text-[11px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter), sans-serif" }}>
          {customStatus.state}
        </p>
      )}

      {/* Spotify */}
      {listening_to_spotify && spotify && <SpotifyBar spotify={spotify} />}

      {/* Game / stream */}
      {!listening_to_spotify && gameOrStream && <ActivityRow activity={gameOrStream} />}

      {/* SoundCloud activity */}
      {!listening_to_spotify && !gameOrStream && scActivity && <ActivityRow activity={scActivity} />}
    </div>
  );
}
