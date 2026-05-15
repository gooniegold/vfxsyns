"use client";

import { useEffect, useRef, useState } from "react";

/* ── Live Discord presence via Lanyard ── */
const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID ?? "855141280945143828";

interface LanyardActivity {
  name: string;
  type: number;
  details?: string;
  state?: string;
  url?: string;
  application_id?: string;
  assets?: { large_image?: string; large_text?: string };
}
interface SpotifyData {
  song: string;
  artist: string;
  album_art_url: string | null;
  timestamps: { start: number; end: number };
}
interface LanyardData {
  discord_user: { avatar: string | null; id: string };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
}

const STATUS_COLOR: Record<string, string> = {
  online: "#23a559",
  idle:   "#f0b232",
  dnd:    "#f23f43",
  offline:"#80848e",
};
const STATUS_LABEL: Record<string, string> = {
  online: "Online",
  idle:   "Idle",
  dnd:    "Do Not Disturb",
  offline:"Offline",
};

/* ── HypeSquad Bravery badge — inline SVG so no CDN issues ── */
function BraveryBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-label="HypeSquad Bravery"
      style={{ filter: "drop-shadow(0 0 4px rgba(180,80,200,0.6))" }}
    >
      <defs>
        <linearGradient id="bravery-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e879f9"/>
          <stop offset="100%" stopColor="#9333ea"/>
        </linearGradient>
      </defs>
      {/* House shape */}
      <path
        d="M12 2 L22 10 V21 H15 V15 H9 V21 H2 V10 Z"
        fill="url(#bravery-g)"
      />
    </svg>
  );
}

/* ── Activity pill ── */
function ActivityPill({ data }: { data: LanyardData }) {
  const { activities, listening_to_spotify, spotify } = data;
  const stream  = activities.find((a) => a.type === 1);
  const game    = activities.find((a) => a.type === 0);

  if (listening_to_spotify && spotify) {
    return (
      <div
        className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
        style={{ background: "rgba(30,215,96,0.07)", border: "1px solid rgba(30,215,96,0.15)" }}
      >
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-medium text-white" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {spotify.song}
          </p>
          <p className="truncate text-[9px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)" }}>
            {spotify.artist}
          </p>
        </div>
      </div>
    );
  }
  if (stream) {
    return (
      <div
        className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
        style={{ background: "rgba(145,70,255,0.07)", border: "1px solid rgba(145,70,255,0.2)" }}
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#f23f43]" style={{ boxShadow: "0 0 5px #f23f43" }} />
        <p className="truncate text-[10px] font-medium" style={{ color: "#9146FF", fontFamily: "var(--font-inter), sans-serif" }}>
          Live · {stream.name}
        </p>
        {stream.url && (
          <a
            href={stream.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 text-[9px] transition-opacity hover:opacity-70"
            style={{ color: "#9146FF", fontFamily: "var(--font-mono)" }}
          >
            Watch ↗
          </a>
        )}
      </div>
    );
  }
  if (game) {
    return (
      <div
        className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={2}>
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 12h4M8 10v4M15 11h2M15 13h2"/>
        </svg>
        <p className="truncate text-[10px]" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter), sans-serif" }}>
          {game.assets?.large_image ? "Playing" : "Using"} {game.name}
        </p>
      </div>
    );
  }
  return null;
}

/* ── Wave bars animation ── */
function WaveBars({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="flex items-end gap-[2px]">
      {[0,1,2].map((i) => (
        <div
          key={i}
          className="rounded-full bg-[#23a559]"
          style={{
            width: 2,
            height: 8,
            animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite alternate`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}

/* ── Main card ── */
export function VfxsynCard() {
  const [presence, setPresence] = useState<LanyardData | null>(null);
  const wsRef  = useRef<WebSocket | null>(null);
  const hbRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let alive = true;

    // REST first for instant data
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then((r) => r.json())
      .then((d: { success?: boolean; data?: LanyardData }) => {
        if (alive && d.success && d.data) setPresence(d.data);
      })
      .catch(() => {});

    function connect() {
      const ws = new WebSocket("wss://api.lanyard.rest/socket");
      wsRef.current = ws;
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data as string) as { op: number; d: unknown; t?: string };
        if (msg.op === 1) {
          const hbi = ((msg.d as { heartbeat_interval?: number }).heartbeat_interval) ?? 30000;
          hbRef.current = setInterval(
            () => ws.readyState === 1 && ws.send(JSON.stringify({ op: 3 })),
            hbi,
          );
          ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
        }
        if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") && alive) {
          setPresence(msg.d as LanyardData);
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
  }, []);

  const status      = presence?.discord_status ?? "offline";
  const statusColor = STATUS_COLOR[status];
  const isOnline    = status !== "offline";

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
        animation: "float 6s ease-in-out infinite",
      }}
    >
      {/* ── Top shimmer line ── */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(180,20,20,0.6), rgba(255,80,80,0.4), rgba(180,20,20,0.6), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s linear infinite",
        }}
      />

      <div className="p-4">
        {/* ── Avatar row ── */}
        <div className="flex items-start gap-3">
          {/* Pfp */}
          <div className="relative shrink-0">
            <div
              className="h-14 w-14 rounded-full overflow-hidden"
              style={{
                boxShadow: `0 0 0 2px rgba(180,20,20,0.5), 0 0 16px rgba(180,20,20,0.25)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pfp.jpg"
                alt="vfxsyn"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Status dot */}
            <span
              className="absolute -bottom-[1px] -right-[1px] block h-3.5 w-3.5 rounded-full"
              style={{
                background: statusColor,
                border: "2.5px solid rgba(8,8,10,0.9)",
                boxShadow: `0 0 8px ${statusColor}80`,
              }}
              title={STATUS_LABEL[status]}
            />
          </div>

          {/* Name + handle */}
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-2">
              <span
                className="text-[16px] font-semibold leading-none text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                vfxsyn
              </span>
              {/* HypeSquad Bravery badge — always shown, hardcoded */}
              <BraveryBadge />
              {/* Online wave bars */}
              <WaveBars active={isOnline} />
            </div>
            <p
              className="mt-[3px] text-[10px]"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono)" }}
            >
              vfx / 3D · web &amp; C++ dev
            </p>
            <p
              className="mt-[2px] text-[9px] uppercase tracking-[0.15em]"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono)" }}
            >
              ATL, GA · EST
            </p>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div
          className="mt-3 grid grid-cols-3 gap-1 rounded-xl p-2.5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { v: "90M+",  l: "views"  },
            { v: "500+",  l: "videos" },
            { v: "6+",    l: "years"  },
          ].map(({ v, l }) => (
            <div key={l} className="flex flex-col items-center py-1">
              <span
                className="text-[14px] font-semibold leading-none text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {v}
              </span>
              <span
                className="mt-1 text-[8px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}
              >
                {l}
              </span>
            </div>
          ))}
        </div>

        {/* ── Live activity (Spotify / Stream / Game) ── */}
        {presence && <ActivityPill data={presence} />}
      </div>

      {/* ── Bottom shimmer line ── */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(180,20,20,0.3), transparent)",
        }}
      />
    </div>
  );
}
