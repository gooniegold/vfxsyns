"use client";

import { useEffect, useRef, useState } from "react";

interface LanyardActivity {
  name: string;
  details?: string;
  state?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
  };
  timestamps?: { start?: number; end?: number };
  application_id?: string;
  type: number;
}

interface SpotifyData {
  song: string;
  artist: string;
  album: string;
  album_art_url: string | null;
  track_id: string;
  timestamps: { start: number; end: number };
}

interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    display_name?: string;
    global_name?: string;
    public_flags?: number;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
  kv?: Record<string, string>;
}

const STATUS_COLOR: Record<string, string> = {
  online: "#22c55e",
  idle: "#eab308",
  dnd: "#ef4444",
  offline: "#71717a",
};

const STATUS_LABEL: Record<string, string> = {
  online: "online",
  idle: "idle",
  dnd: "do not disturb",
  offline: "offline",
};

function avatarUrl(user: LanyardData["discord_user"]) {
  if (!user.avatar) return `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}${user.avatar.startsWith("a_") ? ".gif" : ".png"}?size=128`;
}

function SpotifyBar({ spotify }: { spotify: SpotifyData }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const now = Date.now();
      const elapsed = now - spotify.timestamps.start;
      const total = spotify.timestamps.end - spotify.timestamps.start;
      setProgress(Math.min((elapsed / total) * 100, 100));
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [spotify]);

  function fmt(ms: number) {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  const elapsed = Date.now() - spotify.timestamps.start;
  const total = spotify.timestamps.end - spotify.timestamps.start;

  return (
    <div className="mt-3 rounded-lg border border-[rgba(34,197,94,0.15)] bg-[rgba(0,0,0,0.5)] p-3">
      <div className="flex items-center gap-3">
        {spotify.album_art_url && (
          <img src={spotify.album_art_url} alt={spotify.album} className="h-10 w-10 rounded-md object-cover" />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[11px] font-semibold text-[#4ade80]">{spotify.song}</p>
          <p className="truncate font-mono text-[10px] text-[rgba(255,255,255,0.5)]">{spotify.artist}</p>
        </div>
        <svg className="h-4 w-4 shrink-0 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </div>
      <div className="mt-2">
        <div className="h-[3px] w-full rounded-full bg-[rgba(255,255,255,0.1)]">
          <div
            className="h-full rounded-full bg-[#1DB954] transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[rgba(255,255,255,0.3)]">
          <span>{fmt(elapsed)}</span>
          <span>{fmt(total)}</span>
        </div>
      </div>
    </div>
  );
}

function GameActivity({ activity }: { activity: LanyardActivity }) {
  const imgSrc = activity.assets?.large_image
    ? activity.assets.large_image.startsWith("mp:")
      ? `https://media.discordapp.net/${activity.assets.large_image.replace("mp:", "")}`
      : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
    : null;

  return (
    <div className="mt-3 flex items-center gap-3 rounded-lg border border-[rgba(34,197,94,0.12)] bg-[rgba(0,0,0,0.4)] p-3">
      {imgSrc && (
        <img src={imgSrc} alt={activity.name} className="h-10 w-10 rounded-md object-cover" />
      )}
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[rgba(34,197,94,0.6)]">playing</p>
        <p className="truncate font-mono text-[11px] text-[rgba(255,255,255,0.85)]">{activity.name}</p>
        {activity.details && (
          <p className="truncate font-mono text-[10px] text-[rgba(255,255,255,0.4)]">{activity.details}</p>
        )}
      </div>
    </div>
  );
}

export function DiscordCard({ userId }: { userId: string }) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const hbRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!userId || userId === "YOUR_DISCORD_ID") return;

    function connect() {
      const ws = new WebSocket("wss://api.lanyard.rest/socket");
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);
      ws.onclose = () => {
        setConnected(false);
        if (hbRef.current) clearInterval(hbRef.current);
        setTimeout(connect, 3000);
      };

      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.op === 1) {
          // hello — start heartbeat
          hbRef.current = setInterval(() => {
            ws.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);
          // subscribe
          ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
        }
        if (msg.op === 0) {
          if (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") {
            setData(msg.d);
          }
        }
      };
    }

    connect();
    return () => {
      if (hbRef.current) clearInterval(hbRef.current);
      wsRef.current?.close();
    };
  }, [userId]);

  if (!userId || userId === "YOUR_DISCORD_ID") {
    return (
      <div className="rounded-xl border border-[rgba(34,197,94,0.15)] bg-[rgba(0,0,0,0.4)] p-4 text-center">
        <p className="font-mono text-[10px] text-[rgba(34,197,94,0.5)]">add discord id to .env.local</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border border-[rgba(34,197,94,0.15)] bg-[rgba(0,0,0,0.4)] p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 animate-pulse rounded-full bg-[rgba(34,197,94,0.1)]" />
          <div className="space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-[rgba(34,197,94,0.1)]" />
            <div className="h-2 w-16 animate-pulse rounded bg-[rgba(34,197,94,0.07)]" />
          </div>
        </div>
      </div>
    );
  }

  const status = data.discord_status ?? "offline";
  const user = data.discord_user;
  const gameActivity = data.activities?.find((a) => a.type === 0);
  const customStatus = data.activities?.find((a) => a.type === 4);

  return (
    <div className="rounded-xl border border-[rgba(34,197,94,0.18)] bg-[rgba(0,0,0,0.45)] p-4 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={avatarUrl(user)}
            alt={user.global_name ?? user.username}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-[rgba(34,197,94,0.3)]"
          />
          <span
            className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-black"
            style={{ backgroundColor: STATUS_COLOR[status] }}
            title={STATUS_LABEL[status]}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[13px] font-semibold text-white">
            {user.global_name ?? user.display_name ?? user.username}
          </p>
          <p className="font-mono text-[10px] text-[rgba(34,197,94,0.6)]">
            @{user.username} · <span className="text-[rgba(255,255,255,0.35)]">{STATUS_LABEL[status]}</span>
          </p>
        </div>
        {/* Connection indicator */}
        <div className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-[#22c55e]" : "bg-[#71717a]"}`} />
      </div>

      {/* Custom status */}
      {customStatus?.state && (
        <p className="mt-2 font-mono text-[10px] text-[rgba(255,255,255,0.4)]">
          {customStatus.state}
        </p>
      )}

      {/* Spotify */}
      {data.listening_to_spotify && data.spotify && (
        <SpotifyBar spotify={data.spotify} />
      )}

      {/* Game activity */}
      {!data.listening_to_spotify && gameActivity && (
        <GameActivity activity={gameActivity} />
      )}
    </div>
  );
}
