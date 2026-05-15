"use client";

import { useEffect, useRef, useState } from "react";

type SCWidgetInstance = {
  bind: (event: string, cb: (data?: unknown) => void) => void;
  getCurrentSound: (cb: (sound: { title?: string; artwork_url?: string; user?: { username?: string } }) => void) => void;
  getPosition: (cb: (pos: number) => void) => void;
  getDuration: (cb: (dur: number) => void) => void;
  play: () => void;
  pause: () => void;
  skip: (index: number) => void;
  next: () => void;
  prev: () => void;
};

type SCWidgetConstructor = {
  (el: HTMLIFrameElement): SCWidgetInstance;
  Events: Record<string, string>;
};

declare global {
  interface Window {
    SC?: {
      Widget: SCWidgetConstructor;
    };
  }
}

const SC_USERNAME = "vfxsyn";
const WIDGET_URL = `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/${SC_USERNAME}&color=%2322c55e&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function SoundCloudWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SCWidgetInstance | null>(null);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState<{ title: string; artist: string; art: string } | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Load SC Widget API
    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    script.onload = () => {
      if (!iframeRef.current || !window.SC) return;
      const widget = window.SC.Widget(iframeRef.current);
      widgetRef.current = widget;

      widget.bind(window.SC.Widget.Events.READY, () => {
        setReady(true);
        widget.getCurrentSound((sound) => {
          if (sound) {
            setTrack({
              title: sound.title ?? "Unknown",
              artist: sound.user?.username ?? SC_USERNAME,
              art: (sound.artwork_url ?? "").replace("-large", "-t300x300"),
            });
          }
        });
        widget.getDuration((d) => setDuration(d));
      });

      widget.bind(window.SC.Widget.Events.PLAY, () => {
        setPlaying(true);
        widget.getCurrentSound((sound) => {
          if (sound) {
            setTrack({
              title: sound.title ?? "Unknown",
              artist: sound.user?.username ?? SC_USERNAME,
              art: (sound.artwork_url ?? "").replace("-large", "-t300x300"),
            });
          }
        });
        widget.getDuration((d) => setDuration(d));
      });

      widget.bind(window.SC.Widget.Events.PAUSE, () => setPlaying(false));
      widget.bind(window.SC.Widget.Events.FINISH, () => setPlaying(false));

      widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, () => {
        widget.getPosition((p) => setPosition(p));
      });
    };
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  const progress = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <div className="rounded-xl border border-[rgba(34,197,94,0.18)] bg-[rgba(0,0,0,0.45)] p-4 backdrop-blur-sm">
      {/* Hidden SC iframe */}
      <iframe
        ref={iframeRef}
        src={WIDGET_URL}
        allow="autoplay"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        aria-hidden
      />

      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-3.5 w-3.5 text-[#f47521]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.175 12.225C.528 12.225 0 12.75 0 13.39v.214c0 .639.528 1.163 1.175 1.163.646 0 1.175-.524 1.175-1.163v-.214c0-.638-.53-1.165-1.175-1.165zm2.138 0c-.646 0-1.174.527-1.174 1.165v1.34c0 .64.528 1.164 1.174 1.164.647 0 1.175-.525 1.175-1.164v-1.34c0-.638-.528-1.165-1.175-1.165zm2.138-.878c-.647 0-1.175.525-1.175 1.164v2.218c0 .638.528 1.163 1.175 1.163.646 0 1.174-.525 1.174-1.163v-2.218c0-.64-.528-1.164-1.174-1.164zm2.138-1.006c-.646 0-1.174.525-1.174 1.164v3.224c0 .638.528 1.163 1.174 1.163.648 0 1.175-.525 1.175-1.163V11.505c0-.639-.527-1.164-1.175-1.164zm2.165-.7c-.648 0-1.175.525-1.175 1.163v3.924c0 .639.527 1.164 1.175 1.164.646 0 1.174-.525 1.174-1.164V10.804c0-.638-.528-1.163-1.174-1.163zm2.138.234c-.647 0-1.175.526-1.175 1.164v3.689c0 .638.528 1.163 1.175 1.163.647 0 1.174-.525 1.174-1.163v-3.69c0-.637-.527-1.163-1.174-1.163zm2.137-.584c-.647 0-1.174.526-1.174 1.164v4.274c0 .638.527 1.163 1.174 1.163.648 0 1.175-.525 1.175-1.163V10.459c0-.638-.527-1.164-1.175-1.164zM24 9.34c0-2.474-2.014-4.48-4.5-4.48-1.213 0-2.31.48-3.124 1.261A6.978 6.978 0 0 0 12 4.86a6.967 6.967 0 0 0-6.975 6.952c0 .24.015.476.042.708a1.163 1.163 0 1 0 .008 2.326h15.85A3.597 3.597 0 0 0 24 11.25v-1.91z"/>
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f47521]">soundcloud</span>
        </div>
        <a
          href={`https://soundcloud.com/${SC_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] text-[rgba(255,255,255,0.3)] hover:text-[rgba(34,197,94,0.7)] transition-colors"
        >
          @{SC_USERNAME} ↗
        </a>
      </div>

      {/* Track info */}
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[rgba(34,197,94,0.08)]">
          {track?.art ? (
            <img src={track.art} alt={track.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-5 w-5 text-[rgba(34,197,94,0.3)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14.5v-9l7 4.5-7 4.5z"/>
              </svg>
            </div>
          )}
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="flex gap-[2px]">
                {[0,1,2].map((i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-[#f47521]"
                    style={{
                      height: `${10 + Math.random() * 6}px`,
                      animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[11px] font-medium text-[rgba(255,255,255,0.85)]">
            {track?.title ?? (ready ? "select a track" : "loading...")}
          </p>
          <p className="font-mono text-[10px] text-[rgba(255,255,255,0.35)]">
            {track?.artist ?? SC_USERNAME}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="h-[3px] w-full rounded-full bg-[rgba(255,255,255,0.08)]">
          <div
            className="h-full rounded-full bg-[#f47521] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[rgba(255,255,255,0.25)]">
          <span>{fmt(position)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-5">
        <button
          onClick={() => widgetRef.current?.prev()}
          className="text-[rgba(255,255,255,0.35)] transition-colors hover:text-[rgba(34,197,94,0.8)]"
          aria-label="Previous"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
          </svg>
        </button>
        <button
          onClick={() => playing ? widgetRef.current?.pause() : widgetRef.current?.play()}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(244,117,33,0.4)] bg-[rgba(244,117,33,0.1)] text-[#f47521] transition-all hover:bg-[rgba(244,117,33,0.2)] hover:shadow-[0_0_12px_rgba(244,117,33,0.4)]"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="h-3.5 w-3.5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        <button
          onClick={() => widgetRef.current?.next()}
          className="text-[rgba(255,255,255,0.35)] transition-colors hover:text-[rgba(34,197,94,0.8)]"
          aria-label="Next"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14 4.72 3.36L8 16.28V9.86zM16 6h2v12h-2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
