"use client";

import { useEffect, useRef, useState } from "react";

type SCWidgetInstance = {
  bind: (event: string, cb: (data?: unknown) => void) => void;
  getCurrentSound: (cb: (sound: { title?: string; artwork_url?: string; user?: { username?: string } }) => void) => void;
  getPosition: (cb: (pos: number) => void) => void;
  getDuration: (cb: (dur: number) => void) => void;
  setVolume: (vol: number) => void;
  play: () => void;
  pause: () => void;
};

type SCWidgetConstructor = {
  (el: HTMLIFrameElement): SCWidgetInstance;
  Events: Record<string, string>;
};

declare global {
  interface Window {
    SC?: { Widget: SCWidgetConstructor };
  }
}

// Rolling Loud by nine vicious (fallback to posing tonight if not found)
const TRACK_URL = "https://soundcloud.com/ninesomnia/rolling-loud";
const WIDGET_URL = `https://w.soundcloud.com/player/?url=${encodeURIComponent(TRACK_URL)}&color=%23ffffff&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;

function fmt(ms: number) {
  const s = Math.floor(Math.max(ms, 0) / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function SoundCloudWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SCWidgetInstance | null>(null);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState<{ title: string; artist: string; art: string } | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showVolume, setShowVolume] = useState(false);
  const [needsClick, setNeedsClick] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    script.onload = () => {
      if (!iframeRef.current || !window.SC) return;
      const widget = window.SC.Widget(iframeRef.current);
      widgetRef.current = widget;

      const loadTrack = () => {
        widget.getCurrentSound((sound) => {
          if (sound) {
            setTrack({
              title: sound.title ?? "rolling loud",
              artist: sound.user?.username ?? "ninesomnia",
              art: (sound.artwork_url ?? "").replace("-large", "-t300x300"),
            });
          }
        });
        widget.getDuration((d) => setDuration(d));
      };

      widget.bind(window.SC.Widget.Events.READY, () => {
        loadTrack();
        widget.setVolume(80);
        // Attempt autoplay — browsers may block it
        try {
          widget.play();
        } catch {
          setNeedsClick(true);
        }
      });
      widget.bind(window.SC.Widget.Events.PLAY, () => {
        setPlaying(true);
        setNeedsClick(false);
        loadTrack();
      });
      widget.bind(window.SC.Widget.Events.PAUSE, () => setPlaying(false));
      widget.bind(window.SC.Widget.Events.FINISH, () => setPlaying(false));
      widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, () => {
        widget.getPosition((p) => setPosition(p));
      });
      // If not playing after 2s, assume blocked
      setTimeout(() => {
        if (!playing) setNeedsClick(true);
      }, 2000);
    };
    document.head.appendChild(script);
    return () => { script.remove(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    widgetRef.current?.setVolume(v);
  };

  const handlePlayPause = () => {
    if (needsClick || !playing) {
      widgetRef.current?.play();
      setNeedsClick(false);
    } else {
      widgetRef.current?.pause();
    }
  };

  const pct = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <div
      className="rounded-xl p-3"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Hidden iframe */}
      <iframe
        ref={iframeRef}
        src={WIDGET_URL}
        allow="autoplay"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        aria-hidden
      />

      {/* Row: art + info + SC icon */}
      <div className="flex items-center gap-3">
        {/* Album art */}
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }}>
          {track?.art ? (
            <img src={track.art} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="rgba(255,255,255,0.2)">
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14.5v-9l7 4.5-7 4.5z"/>
              </svg>
            </div>
          )}
          {playing && (
            <div className="absolute inset-0 flex items-end justify-center gap-[2px] pb-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-[2px] rounded-full bg-white"
                  style={{
                    height: "8px",
                    animation: `bounce 0.7s ease-in-out ${i * 0.12}s infinite alternate`,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Track info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium text-white">
            {track?.title ?? "rolling loud"}
          </p>
          <p className="truncate text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
            {track?.artist ?? "ninesomnia"}
          </p>
        </div>

        {/* SoundCloud logo */}
        <a
          href="https://soundcloud.com/vfxsyn"
          target="_blank"
          rel="noopener noreferrer"
          title="soundcloud.com/vfxsyn"
          className="ml-auto shrink-0 transition-opacity hover:opacity-80"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="#f47521">
            <path d="M1.175 12.225C.528 12.225 0 12.75 0 13.39v.214c0 .639.528 1.163 1.175 1.163.646 0 1.175-.524 1.175-1.163v-.214c0-.638-.53-1.165-1.175-1.165zm2.138 0c-.646 0-1.174.527-1.174 1.165v1.34c0 .64.528 1.164 1.174 1.164.647 0 1.175-.525 1.175-1.164v-1.34c0-.638-.528-1.165-1.175-1.165zm2.138-.878c-.647 0-1.175.525-1.175 1.164v2.218c0 .638.528 1.163 1.175 1.163.646 0 1.174-.525 1.174-1.163v-2.218c0-.64-.528-1.164-1.174-1.164zm2.138-1.006c-.646 0-1.174.525-1.174 1.164v3.224c0 .638.528 1.163 1.174 1.163.648 0 1.175-.525 1.175-1.163V11.505c0-.639-.527-1.164-1.175-1.164zm2.165-.7c-.648 0-1.175.525-1.175 1.163v3.924c0 .639.527 1.164 1.175 1.164.646 0 1.174-.525 1.174-1.164V10.804c0-.638-.528-1.163-1.174-1.163zm2.138.234c-.647 0-1.175.526-1.175 1.164v3.689c0 .638.528 1.163 1.175 1.163.647 0 1.174-.525 1.174-1.163v-3.69c0-.637-.527-1.163-1.174-1.163zm2.137-.584c-.647 0-1.174.526-1.174 1.164v4.274c0 .638.527 1.163 1.174 1.163.648 0 1.175-.525 1.175-1.163V10.459c0-.638-.527-1.164-1.175-1.164zM24 9.34c0-2.474-2.014-4.48-4.5-4.48-1.213 0-2.31.48-3.124 1.261A6.978 6.978 0 0 0 12 4.86a6.967 6.967 0 0 0-6.975 6.952c0 .24.015.476.042.708a1.163 1.163 0 1 0 .008 2.326h15.85A3.597 3.597 0 0 0 24 11.25v-1.91z"/>
          </svg>
        </a>
      </div>

      {/* Progress bar */}
      <div className="mt-2.5">
        <div className="h-[3px] w-full rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct}%`, background: "#f47521" }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[9px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
          <span>{fmt(position)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-2.5 flex items-center gap-3">
        {/* Play/pause */}
        <button
          onClick={handlePlayPause}
          className="flex h-7 w-7 items-center justify-center rounded-full transition-all"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="h-3 w-3 translate-x-[1px] text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {needsClick && !playing && (
          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
            click ▶ to play
          </span>
        )}

        {/* Volume */}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setShowVolume((v) => !v)}
            className="transition-opacity hover:opacity-80"
            aria-label="Volume"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2}>
              {volume === 0 ? (
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  {volume > 50 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>}
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </>
              )}
            </svg>
          </button>
          {showVolume && (
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="h-1 w-20 cursor-pointer appearance-none rounded-full"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.7) ${volume}%, rgba(255,255,255,0.12) ${volume}%)`,
                outline: "none",
              }}
              aria-label="Volume slider"
            />
          )}
        </div>
      </div>
    </div>
  );
}
