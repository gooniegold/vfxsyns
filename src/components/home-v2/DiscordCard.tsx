"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Types ──────────────────────────────────────────────── */
interface LanyardActivity {
  name: string;
  details?: string;
  state?: string;
  type: number;
  application_id?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
  };
  timestamps?: { start?: number; end?: number };
}

interface SpotifyData {
  song: string;
  artist: string;
  album: string;
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
  primary_guild?: {
    badge: string;
    identity_guild_id: string;
    tag: string;
  } | null;
}

interface LanyardData {
  discord_user: DiscordUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
}

/* ─── Badge flags ────────────────────────────────────────── */
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
  131072:  { label: "Verified Bot Dev",       img: "verified_developer" },
  4194304: { label: "Active Developer",       img: "active_developer" },
};

function parseBadges(flags: number) {
  return Object.entries(BADGE_FLAGS)
    .filter(([bit]) => (flags & Number(bit)) !== 0)
    .map(([, b]) => b);
}

/* ─── Status colours ─────────────────────────────────────── */
const STATUS_COLOR: Record<string, string> = {
  online:  "#23a559",
  idle:    "#f0b232",
  dnd:     "#f23f43",
  offline: "#80848e",
};

const STATUS_LABEL: Record<string, string> = {
  online:  "Online",
  idle:    "Idle",
  dnd:     "Do Not Disturb",
  offline: "Offline",
};

/* ─── Helpers ────────────────────────────────────────────── */
function avatarUrl(u: DiscordUser) {
  if (!u.avatar) return `https://cdn.discordapp.com/embed/avatars/0.png`;
  const ext = u.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${ext}?size=128`;
}

function fmtMs(ms: number) {
  const s = Math.floor(Math.abs(ms) / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/* ─── Spotify progress bar ───────────────────────────────── */
function SpotifySection({ spotify }: { spotify: SpotifyData }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - spotify.timestamps.start;
      const total   = spotify.timestamps.end - spotify.timestamps.start;
      setPct(Math.min((elapsed / total) * 100, 100));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [spotify]);

  const elapsed = Date.now() - spotify.timestamps.start;
  const total   = spotify.timestamps.end - spotify.timestamps.start;
  const artists = spotify.artist; // "Artist; Artist2" format from lanyard

  return (
    <div>
      {/* label */}
      <p
        className="mb-2 text-[9px] uppercase tracking-[0.25em]"
        style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}
      >
        Now Listening To
      </p>

      <div className="flex items-start gap-3">
        {/* album art */}
        {spotify.album_art_url && (
          <img
            src={spotify.album_art_url}
            alt={spotify.album}
            className="h-12 w-12 shrink-0 rounded-lg object-cover"
          />
        )}

        <div className="min-w-0 flex-1">
          {/* track */}
          <p className="truncate text-[13px] font-semibold leading-tight text-white"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {spotify.song}
          </p>
          {/* album */}
          <p className="mt-0.5 truncate text-[9px] uppercase tracking-[0.15em]"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono)" }}>
            {spotify.album}
          </p>
          {/* artist */}
          <p className="mt-0.5 truncate text-[10px]"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter), sans-serif" }}>
            by {artists}
          </p>

          {/* progress */}
          <div className="mt-2">
            <div className="h-[2px] w-full rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div
                className="h-full rounded-full bg-[#1DB954] transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div
              className="mt-1 flex justify-between text-[9px]"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono)" }}
            >
              <span>{fmtMs(elapsed)}</span>
              <span>{fmtMs(total)}</span>
            </div>
          </div>
        </div>

        {/* Spotify icon */}
        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
    </div>
  );
}

/* ─── Game / stream activity ─────────────────────────────── */
function ActivitySection({ activity }: { activity: LanyardActivity }) {
  const typeLabel =
    activity.type === 1 ? "Streaming" :
    activity.type === 2 ? "Listening to" :
    "Playing";

  return (
    <div>
      <p
        className="mb-2 text-[9px] uppercase tracking-[0.25em]"
        style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}
      >
        {typeLabel}
      </p>
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
            <path d="M21 6H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 10H4V8h16v8zm-8-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
          </svg>
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-white"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {activity.name}
          </p>
          {activity.details && (
            <p className="mt-0.5 truncate text-[10px]"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter), sans-serif" }}>
              {activity.details}
            </p>
          )}
          {activity.state && (
            <p className="mt-0.5 truncate text-[10px]"
              style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-inter), sans-serif" }}>
              {activity.state}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export function DiscordCard({ userId }: { userId: string }) {
  const [data, setData] = useState<LanyardData | null>(null);
  const wsRef  = useRef<WebSocket | null>(null);
  const hbRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!userId || userId === "YOUR_DISCORD_ID") return;
    let alive = true;

    function connect() {
      const ws = new WebSocket("wss://api.lanyard.rest/socket");
      wsRef.current = ws;

      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data as string);
        if (msg.op === 1) {
          hbRef.current = setInterval(
            () => ws.readyState === 1 && ws.send(JSON.stringify({ op: 3 })),
            msg.d.heartbeat_interval,
          );
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

  /* ── Skeleton ── */
  if (!data) {
    return (
      <div
        className="rounded-2xl p-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 shrink-0 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="space-y-2">
            <div className="h-3 w-24 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="h-2 w-16 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
          </div>
        </div>
      </div>
    );
  }

  const { discord_user: u, discord_status, activities, listening_to_spotify, spotify } = data;
  const badges       = parseBadges(u.public_flags ?? 0);
  const customStatus = activities.find((a) => a.type === 4);
  const gameOrStream = activities.find((a) => a.type === 0 || a.type === 1);
  const statusColor  = STATUS_COLOR[discord_status] ?? STATUS_COLOR.offline;

  /* determine activity section to show */
  const showSpotify  = listening_to_spotify && !!spotify;
  const showActivity = !showSpotify && !!gameOrStream;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* ── Top: Avatar + Identity ── */}
      <div className="p-4">
        <div className="flex items-start gap-3.5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={avatarUrl(u)}
              alt={u.global_name ?? u.username}
              className="h-14 w-14 rounded-full object-cover"
            />
            {/* Status dot */}
            <span
              className="absolute -bottom-[1px] -right-[1px] block h-3.5 w-3.5 rounded-full"
              style={{
                background: statusColor,
                border: "2px solid rgba(10,10,10,0.92)",
                boxShadow: `0 0 6px ${statusColor}80`,
              }}
              title={STATUS_LABEL[discord_status]}
            />
          </div>

          {/* Name + handle + badge */}
          <div className="min-w-0 flex-1 pt-0.5">
            {/* Username + clan tag */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className="text-[15px] font-semibold text-white leading-none"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {u.global_name ?? u.display_name ?? u.username}
              </span>

              {u.primary_guild?.tag && (
                <span
                  className="inline-flex items-center gap-1 rounded px-1.5 py-[3px] text-[8px] font-medium uppercase tracking-[0.15em]"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {u.primary_guild.badge && (
                    <img
                      src={`https://cdn.discordapp.com/clan-badges/${u.primary_guild.identity_guild_id}/${u.primary_guild.badge}.png?size=16`}
                      alt=""
                      className="h-2.5 w-2.5 object-contain"
                    />
                  )}
                  {u.primary_guild.tag}
                </span>
              )}
            </div>

            {/* @handle */}
            <p
              className="mt-0.5 text-[10px]"
              style={{ color: "rgba(255,255,255,0.32)", fontFamily: "var(--font-mono)" }}
            >
              @{u.username}
            </p>

            {/* Custom status pill */}
            {customStatus?.state && (
              <span
                className="mt-2 inline-block rounded px-2 py-[3px] text-[9px]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.05em",
                }}
              >
                {customStatus.state}
              </span>
            )}
          </div>

          {/* Badges — top right */}
          {badges.length > 0 && (
            <div className="flex shrink-0 items-center gap-1 pt-0.5">
              {badges.map((b) => (
                <img
                  key={b.img}
                  src={`https://cdn.discordapp.com/badge-icons/${b.img}.png`}
                  alt={b.label}
                  title={b.label}
                  className="h-4 w-4 object-contain"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Divider + Activity ── */}
      {(showSpotify || showActivity) && (
        <>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
          <div className="p-4">
            {showSpotify && <SpotifySection spotify={spotify!} />}
            {showActivity && <ActivitySection activity={gameOrStream!} />}
          </div>
        </>
      )}
    </div>
  );
}
