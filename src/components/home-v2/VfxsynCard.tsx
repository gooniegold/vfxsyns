"use client";

import { useEffect, useRef, useState } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";

const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID ?? "855141280945143828";

interface LanyardActivity {
  name: string;
  type: number;
  details?: string;
  state?: string;
  url?: string;
  assets?: { large_image?: string };
}
interface SpotifyData {
  song: string;
  artist: string;
  album_art_url: string | null;
  timestamps: { start: number; end: number };
}
export interface LanyardData {
  discord_user: {
    id: string;
    avatar: string | null;
    username: string;
    global_name?: string;
    public_flags?: number;
    premium_type?: number;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
}

const STATUS_COLOR: Record<string, string> = {
  online: "#23a559", idle: "#f0b232", dnd: "#f23f43", offline: "#80848e",
};

/* ── Wave canvas background ── */
function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let time = 0;

    const waves = Array.from({ length: 5 }).map((_, i) => ({
      freq:  0.15 + i * 0.06,
      amp:   0.04 + i * 0.015,
      speed: 0.008 + i * 0.003,
      phase: Math.random() * Math.PI * 2,
      r: 180 + i * 15,
      g: 10 + i * 5,
      b: 10 + i * 3,
    }));

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      resize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width;
      const cy = canvas.height;

      waves.forEach((w, i) => {
        ctx.beginPath();
        for (let x = 0; x <= cx; x++) {
          const nx = x / cx;
          const y = Math.sin(nx * 8 * w.freq + time * w.speed * 60 + w.phase) * w.amp * cy + cy * 0.5;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const alpha = 0.25 + i * 0.06;
        ctx.strokeStyle = `rgba(${w.r},${w.g},${w.b},${alpha})`;
        ctx.lineWidth = 1 + i * 0.4;
        ctx.shadowColor = `rgba(${w.r},${w.g},${w.b},0.4)`;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      time += 0.016;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

/* ── Activity pill ── */
function ActivityPill({ data }: { data: LanyardData }) {
  const { activities, listening_to_spotify, spotify } = data;
  const stream = activities.find((a) => a.type === 1);
  const game   = activities.find((a) => a.type === 0);

  if (listening_to_spotify && spotify) {
    return (
      <div className="mt-2.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5"
        style={{ background: "rgba(30,215,96,0.06)", border: "1px solid rgba(30,215,96,0.12)" }}>
        <svg className="h-2.5 w-2.5 shrink-0" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <p className="truncate text-[9px] font-medium text-white" style={{ fontFamily: "var(--font-ui)" }}>
          {spotify.song} <span style={{ color: "rgba(255,255,255,0.4)" }}>· {spotify.artist}</span>
        </p>
      </div>
    );
  }
  if (stream) {
    return (
      <div className="mt-2.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5"
        style={{ background: "rgba(145,70,255,0.06)", border: "1px solid rgba(145,70,255,0.15)" }}>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f23f43]" style={{ boxShadow: "0 0 4px #f23f43" }} />
        <p className="truncate text-[9px]" style={{ color: "#9146FF", fontFamily: "var(--font-mono)" }}>
          LIVE · {stream.name}
        </p>
        {stream.url && (
          <a href={stream.url} target="_blank" rel="noopener noreferrer"
            className="ml-auto shrink-0 text-[8px] transition-opacity hover:opacity-70"
            style={{ color: "#9146FF", fontFamily: "var(--font-mono)" }}>
            Watch ↗
          </a>
        )}
      </div>
    );
  }
  if (game) {
    return (
      <div className="mt-2.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <svg className="h-2.5 w-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2}>
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 12h4M8 10v4M15 11h2M15 13h2"/>
        </svg>
        <p className="truncate text-[9px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-ui)" }}>
          {game.assets?.large_image ? "Playing" : "Using"} {game.name}
        </p>
      </div>
    );
  }
  return null;
}

/* ── HypeSquad Bravery badge ── */
function BraveryBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-label="HypeSquad Bravery"
      style={{ filter: "drop-shadow(0 0 3px rgba(200,80,240,0.7))" }}>
      <defs>
        <linearGradient id="bravery" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e879f9"/>
          <stop offset="100%" stopColor="#9333ea"/>
        </linearGradient>
      </defs>
      <path d="M12 2 L22 10 V21 H15 V15 H9 V21 H2 V10 Z" fill="url(#bravery)"/>
    </svg>
  );
}

/* ── Lanyard hook ── */
export function useLanyard() {
  const [data, setData] = useState<LanyardData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const hbRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then((r) => r.json())
      .then((d: { success?: boolean; data?: LanyardData }) => {
        if (alive && d.success && d.data) setData(d.data);
      })
      .catch(() => {});

    function connect() {
      const ws = new WebSocket("wss://api.lanyard.rest/socket");
      wsRef.current = ws;
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data as string) as { op: number; d: unknown; t?: string };
        if (msg.op === 1) {
          const hbi = ((msg.d as { heartbeat_interval?: number }).heartbeat_interval) ?? 30000;
          hbRef.current = setInterval(() => ws.readyState === 1 && ws.send(JSON.stringify({ op: 3 })), hbi);
          ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
        }
        if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") && alive) {
          setData(msg.d as LanyardData);
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

  return data;
}

/* ── Main VfxsynCard ── */
export function VfxsynCard() {
  const presence = useLanyard();
  const status      = presence?.discord_status ?? "offline";
  const statusColor = STATUS_COLOR[status];
  const isOnline    = status !== "offline";

  return (
    <GlowCard glowColor="red" className="w-full" customSize>
      {/* Wave canvas background */}
      <div className="pointer-events-none absolute inset-0">
        <WaveCanvas />
        {/* Red gradient overlay */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(140,10,10,0.25), transparent 60%)",
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        {/* Avatar + identity */}
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <div className="h-16 w-16 overflow-hidden rounded-full"
              style={{ boxShadow: "0 0 0 2px rgba(180,20,20,0.6), 0 0 20px rgba(180,20,20,0.3), 0 0 40px rgba(180,20,20,0.1)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pfp.jpg" alt="vfxsyn" className="h-full w-full object-cover" />
            </div>
            {/* Status dot */}
            <span className="absolute -bottom-0.5 -right-0.5 block h-4 w-4 rounded-full"
              style={{ background: statusColor, border: "2.5px solid rgba(8,8,12,0.95)", boxShadow: `0 0 8px ${statusColor}80` }}
              title={status} />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[18px] font-bold leading-none text-white"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                vfxsyn
              </span>
              <BraveryBadge />
              {/* Live pulse when online */}
              {isOnline && (
                <div className="flex items-end gap-[2px]">
                  {[0,1,2].map((i) => (
                    <div key={i} className="rounded-full bg-[#23a559]"
                      style={{ width: 2, height: 7, animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite alternate`, opacity: 0.8 }} />
                  ))}
                </div>
              )}
            </div>
            <p className="mt-0.5 text-[10px]"
              style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-mono)" }}>
              vfx / 3D · web &amp; C++ dev
            </p>
            <p className="text-[9px] uppercase tracking-[0.15em]"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>
              ATL, GA
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-3 rounded-xl overflow-hidden"
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { v: "90M+", l: "views" },
            { v: "500+", l: "videos" },
            { v: "6+",   l: "years" },
          ].map(({ v, l }) => (
            <div key={l} className="flex flex-col items-center py-2.5"
              style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-[15px] font-bold leading-none text-white"
                style={{ fontFamily: "var(--font-display)" }}>{v}</span>
              <span className="mt-1 text-[7px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Live activity */}
        {presence && <ActivityPill data={presence} />}
      </div>

      {/* Bottom shimmer */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(180,20,20,0.5), rgba(255,80,80,0.3), rgba(180,20,20,0.5), transparent)", animation: "shimmer 3s linear infinite", backgroundSize: "200% 100%" }} />
    </GlowCard>
  );
}
