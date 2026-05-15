"use client";

import { useEffect, useRef, useState } from "react";

type SCWidgetInstance = {
  bind: (event: string, cb: (data?: unknown) => void) => void;
  getCurrentSound: (cb: (sound: { title?: string; artwork_url?: string; user?: { username?: string } }) => void) => void;
  getPosition: (cb: (pos: number) => void) => void;
  getDuration:  (cb: (dur: number) => void) => void;
  getVolume:    (cb: (vol: number) => void) => void;
  setVolume:    (vol: number) => void;
  play:  () => void;
  pause: () => void;
  load:  (url: string, options?: { auto_play?: boolean; hide_related?: boolean; show_comments?: boolean; show_user?: boolean; visual?: boolean }) => void;
};

type SCWidgetConstructor = {
  (el: HTMLIFrameElement): SCWidgetInstance;
  Events: Record<string, string>;
};

declare global {
  interface Window { SC?: { Widget: SCWidgetConstructor }; }
}

/* ── 15-track playlist ── */
const TRACKS = [
  "https://soundcloud.com/ninesomnia/molly-ecstacy",
  "https://soundcloud.com/ninesomnia/purple-swag",
  "https://soundcloud.com/ninesomnia/posing-tonight",
  "https://soundcloud.com/00015111-991843743/4ever",
  "https://soundcloud.com/user-267541570/feelings-patrick-mp3",
  "https://soundcloud.com/tezzus-music/duality",
  "https://soundcloud.com/wdfmilan/kashmustdie-new-level-recqn",
  "https://soundcloud.com/plaqueboymax/elastiboy",
  "https://soundcloud.com/seeingfaces/jumbo-5",
  "https://soundcloud.com/user-273803659/anime-diamond",
  "https://soundcloud.com/sk8star/nsd",
  "https://soundcloud.com/ninesomnia/raging-love",
  "https://soundcloud.com/user-267541570/tell-on-me-patrick-mp3",
  "https://soundcloud.com/00015111-991843743/whoa",
  "https://soundcloud.com/pocketsfullaguap/cake-batter-swish-hitec",
];

function shuffled(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmt(ms: number) {
  const s = Math.floor(Math.max(ms, 0) / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function buildWidgetUrl(trackUrl: string) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=%23ffffff&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;
}

export function SoundCloudWidget() {
  const iframeRef   = useRef<HTMLIFrameElement>(null);
  const widgetRef   = useRef<SCWidgetInstance | null>(null);
  /* Shuffle once per component mount — useState lazy init guarantees client-side random */
  const [playlist]  = useState<string[]>(() => shuffled(TRACKS));
  const playlistRef = useRef<string[]>([]);
  const indexRef    = useRef(0);
  const playingRef  = useRef(false);
  const volumeRef   = useRef(75);
  const fadingRef   = useRef(false);

  // Keep playlistRef in sync
  playlistRef.current = playlist;

  const [playing,    setPlaying]    = useState(false);
  const [track,      setTrack]      = useState<{ title: string; artist: string; art: string } | null>(null);
  const [position,   setPosition]   = useState(0);
  const [duration,   setDuration]   = useState(0);
  const [volume,     setVolume]     = useState(75);
  const [showVolume, setShowVolume] = useState(false);
  const [needsClick, setNeedsClick] = useState(false);

  function setPlayingBoth(val: boolean) {
    playingRef.current = val;
    setPlaying(val);
  }

  function loadTrackMeta(widget: SCWidgetInstance) {
    setTimeout(() => {
      widget.getCurrentSound((sound) => {
        if (sound) {
          setTrack({
            title:  sound.title ?? "—",
            artist: sound.user?.username ?? "—",
            art:    (sound.artwork_url ?? "").replace("-large", "-t300x300"),
          });
        }
      });
      widget.getDuration((d) => setDuration(d));
    }, 350);
    setPosition(0);
  }

  function loadNextTrack(widget: SCWidgetInstance) {
    indexRef.current = (indexRef.current + 1) % playlistRef.current.length;
    widget.load(playlistRef.current[indexRef.current], {
      auto_play: true,
      hide_related: true,
      show_comments: false,
      show_user: false,
      visual: false,
    });
  }

  /* ── Smooth volume fade helper ── */
  function fadeVolumeTo(widget: SCWidgetInstance, target: number, durationMs = 800, onDone?: () => void) {
    const steps = 20;
    const interval = durationMs / steps;
    let step = 0;
    const start = volumeRef.current;
    const id = setInterval(() => {
      step++;
      const v = start + (target - start) * (step / steps);
      widget.setVolume(Math.max(0, Math.min(100, v)));
      if (step >= steps) {
        clearInterval(id);
        onDone?.();
      }
    }, interval);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src   = "https://w.soundcloud.com/player/api.js";
    script.async = true;

    script.onload = () => {
      if (!iframeRef.current || !window.SC) return;
      const widget = window.SC.Widget(iframeRef.current);
      widgetRef.current = widget;

      widget.bind(window.SC.Widget.Events.READY, () => {
        widget.setVolume(75);
        /* Force-load the shuffled track 0 so SC doesn't play its cached state */
        widget.load(playlistRef.current[0], {
          auto_play: true,
          hide_related: true,
          show_comments: false,
          show_user: false,
          visual: false,
        });
        loadTrackMeta(widget);
      });

      widget.bind(window.SC.Widget.Events.PLAY, () => {
        setPlayingBoth(true);
        setNeedsClick(false);
        loadTrackMeta(widget);
      });

      widget.bind(window.SC.Widget.Events.PAUSE, () => setPlayingBoth(false));

      widget.bind(window.SC.Widget.Events.FINISH, () => {
        setPlayingBoth(false);
        loadNextTrack(widget);
      });

      widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, () => {
        widget.getPosition((p) => setPosition(p));
      });

      /* Force autoplay on first user interaction — bypasses browser autoplay policy */
      const tryPlay = () => {
        if (!playingRef.current && widgetRef.current) {
          fadingRef.current = false;
          widgetRef.current.setVolume(volumeRef.current);
          try { widgetRef.current.play(); } catch { /* blocked */ }
        }
        document.removeEventListener("pointerdown", tryPlay, { capture: true });
        document.removeEventListener("keydown",     tryPlay, { capture: true });
      };
      document.addEventListener("pointerdown", tryPlay, { capture: true, once: true });
      document.addEventListener("keydown",     tryPlay, { capture: true, once: true });

      setTimeout(() => {
        if (!playingRef.current) setNeedsClick(true);
      }, 2800);
    };

    document.head.appendChild(script);

    /* ── Fade out on navigation (page hide / beforeunload) ── */
    const handleHide = () => {
      const w = widgetRef.current;
      if (w && playingRef.current && !fadingRef.current) {
        fadingRef.current = true;
        fadeVolumeTo(w, 0, 600);
      }
    };

    /* Intercept any anchor click that navigates away */
    const handleLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const isInternal = href.startsWith("/") || href.startsWith("#");
      const isSamePage = href === window.location.pathname;
      if (isInternal && !isSamePage) {
        const w = widgetRef.current;
        if (w && playingRef.current && !fadingRef.current) {
          fadingRef.current = true;
          fadeVolumeTo(w, 0, 700);
        }
      }
    };

    window.addEventListener("pagehide",      handleHide);
    window.addEventListener("beforeunload",   handleHide);
    document.addEventListener("click",        handleLinkClick, true);

    return () => {
      script.remove();
      window.removeEventListener("pagehide",    handleHide);
      window.removeEventListener("beforeunload", handleHide);
      document.removeEventListener("click",      handleLinkClick, true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVolumeChange = (v: number) => {
    volumeRef.current = v;
    setVolume(v);
    widgetRef.current?.setVolume(v);
  };

  const handlePlayPause = () => {
    fadingRef.current = false;
    if (!playingRef.current) {
      widgetRef.current?.setVolume(volumeRef.current);
      widgetRef.current?.play();
      setNeedsClick(false);
    } else {
      widgetRef.current?.pause();
    }
  };

  const handleNext = () => {
    if (widgetRef.current) loadNextTrack(widgetRef.current);
  };

  const pct = duration > 0 ? (position / duration) * 100 : 0;

  /* Use playlist[0] as iframe src — on READY we force-load it anyway */
  const seedUrl = playlist[0] ?? TRACKS[0];

  return (
    <div
      className="rounded-xl p-3"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Hidden SC iframe */}
      <iframe
        ref={iframeRef}
        src={buildWidgetUrl(seedUrl)}
        allow="autoplay"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        aria-hidden
      />

      {/* Art + info + SC logo */}
      <div className="flex items-center gap-3">
        <div
          className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {track?.art ? (
            <img src={track.art} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="rgba(255,255,255,0.2)">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          )}
          {playing && (
            <div className="absolute inset-0 flex items-end justify-center gap-[2px] bg-black/30 pb-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-[2px] rounded-full bg-white opacity-80"
                  style={{ height: "8px", animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite alternate` }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[11px] font-medium leading-tight text-white"
            style={{ fontFamily: "var(--font-ui), sans-serif" }}
          >
            {track?.title ?? "loading…"}
          </p>
          <p
            className="truncate text-[10px] leading-tight"
            style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-mono)" }}
          >
            {track?.artist ?? "—"}
          </p>
        </div>

        <a
          href="https://soundcloud.com/vfxsyn"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-0.5 transition-opacity hover:opacity-70"
          style={{ lineHeight: 0 }}
        >
          <svg className="h-4 w-4 overflow-visible" viewBox="0 0 24 24" fill="#f47521">
            <path d="M1.175 12.225C.528 12.225 0 12.75 0 13.39v.214c0 .639.528 1.163 1.175 1.163.646 0 1.175-.524 1.175-1.163v-.214c0-.638-.53-1.165-1.175-1.165zm2.138 0c-.646 0-1.174.527-1.174 1.165v1.34c0 .64.528 1.164 1.174 1.164.647 0 1.175-.525 1.175-1.164v-1.34c0-.638-.528-1.165-1.175-1.165zm2.138-.878c-.647 0-1.175.525-1.175 1.164v2.218c0 .638.528 1.163 1.175 1.163.646 0 1.174-.525 1.174-1.163v-2.218c0-.64-.528-1.164-1.174-1.164zm2.138-1.006c-.646 0-1.174.525-1.174 1.164v3.224c0 .638.528 1.163 1.174 1.163.648 0 1.175-.525 1.175-1.163V11.505c0-.639-.527-1.164-1.175-1.164zm2.165-.7c-.648 0-1.175.525-1.175 1.163v3.924c0 .639.527 1.164 1.175 1.164.646 0 1.174-.525 1.174-1.164V10.804c0-.638-.528-1.163-1.174-1.163zm2.138.234c-.647 0-1.175.526-1.175 1.164v3.689c0 .638.528 1.163 1.175 1.163.647 0 1.174-.525 1.174-1.163v-3.69c0-.637-.527-1.163-1.174-1.163zm2.137-.584c-.647 0-1.174.526-1.174 1.164v4.274c0 .638.527 1.163 1.174 1.163.648 0 1.175-.525 1.175-1.163V10.459c0-.638-.527-1.164-1.175-1.164zM24 9.34c0-2.474-2.014-4.48-4.5-4.48-1.213 0-2.31.48-3.124 1.261A6.978 6.978 0 0 0 12 4.86a6.967 6.967 0 0 0-6.975 6.952c0 .24.015.476.042.708a1.163 1.163 0 1 0 .008 2.326h15.85A3.597 3.597 0 0 0 24 11.25v-1.91z"/>
          </svg>
        </a>
      </div>

      {/* Progress */}
      <div className="mt-2.5">
        <div className="h-[2px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct}%`, background: "rgba(255,255,255,0.65)" }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[9px]" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>
          <span>{fmt(position)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={handlePlayPause}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)" }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="h-2.5 w-2.5 translate-x-[1px] text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <button
          onClick={handleNext}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          aria-label="Next track"
        >
          <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
          </svg>
        </button>

        {needsClick && !playing && (
          <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono)" }}>
            tap ▶ to play
          </span>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setShowVolume((v) => !v)}
            className="transition-opacity hover:opacity-70"
            aria-label="Volume"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={2}>
              {volume === 0 ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  {volume > 50 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>}
                </>
              )}
            </svg>
          </button>
          {showVolume && (
            <input
              type="range" min={0} max={100} value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="h-0.5 w-16 cursor-pointer appearance-none rounded-full"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.55) ${volume}%, rgba(255,255,255,0.1) ${volume}%)`,
                outline: "none",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
