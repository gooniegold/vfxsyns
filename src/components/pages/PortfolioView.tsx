"use client";

/**
 * All 6 showcase video sources are imported from @/lib/portfolio-media:
 * PORTFOLIO_VIDEO_1_MUSIC … PORTFOLIO_VIDEO_6_3D (+ SHOWREEL_2025_VIDEO).
 */

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { SaberBorder } from "@/components/ui/SaberBorder";
import { StarBorder } from "@/components/ui/StarBorder";
import { TiltGlare } from "@/components/ui/TiltGlare";
import {
  PortfolioPageBackground,
  type PortfolioFilter,
} from "@/components/portfolio/PortfolioPageBackground";
import { INSTAGRAM_URL } from "@/lib/constants";
import {
  PORTFOLIO_VIDEO_1_MUSIC,
  PORTFOLIO_VIDEO_2_MUSIC,
  PORTFOLIO_VIDEO_3_COLOR,
  PORTFOLIO_VIDEO_4_COLOR,
  PORTFOLIO_VIDEO_5_3D,
  PORTFOLIO_VIDEO_6_3D,
  SHOWREEL_2025_VIDEO,
} from "@/lib/portfolio-media";
import { useInViewVideoPlayback } from "@/hooks/useInViewVideoPlayback";
import { MOTION_TRANSITION } from "@/lib/motion-defaults";
import { SYN_VIDEO_BASE_STYLE, VIDEO_LOADING_LAZY } from "@/lib/video-presentation";
import { cn } from "@/lib/utils";

/** Tab labels; project `category` must use these exact strings (indices 1–3) for filtering. */
const FILTERS: readonly PortfolioFilter[] = [
  "ALL",
  "MUSIC VIDEO",
  "COLOR GRADE",
  "3D VFX",
];

const PROJECTS = [
  {
    title: "Video 1",
    category: FILTERS[1],
    videoSrc: PORTFOLIO_VIDEO_1_MUSIC,
  },
  {
    title: "Video 2",
    category: FILTERS[1],
    videoSrc: PORTFOLIO_VIDEO_2_MUSIC,
  },
  {
    title: "Color Grade 1",
    category: FILTERS[2],
    videoSrc: PORTFOLIO_VIDEO_3_COLOR,
  },
  {
    title: "Color Grade 2",
    category: FILTERS[2],
    videoSrc: PORTFOLIO_VIDEO_4_COLOR,
  },
  {
    title: "Showcase 1",
    category: FILTERS[3],
    videoSrc: PORTFOLIO_VIDEO_5_3D,
  },
  {
    title: "Showcase 2",
    category: FILTERS[3],
    videoSrc: PORTFOLIO_VIDEO_6_3D,
  },
].map((p) => ({
  ...p,
  desc: `Premium finish built for the track. ${p.title} pairs contrast, motion, and texture for a cinematic result.`,
}));

function ModalVideo({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || failed) return;
    void v.play().catch(() => {});
    return () => {
      v.pause();
    };
  }, [src, failed]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[20px] bg-black">
      {!failed ? (
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          style={SYN_VIDEO_BASE_STYLE}
          muted
          loop
          playsInline
          preload="none"
          {...VIDEO_LOADING_LAZY}
          onError={() => {
            console.warn("[VFXSYN] Modal video failed:", title, src);
            setFailed(true);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0c0c0c] px-4 text-center">
          <span className="font-mono text-[var(--text-secondary)]">{title}</span>
        </div>
      )}
    </div>
  );
}

function GridCard({
  p,
  onOpen,
  previewsLocked,
  onAmbientPreviewChange,
}: {
  p: (typeof PROJECTS)[0];
  onOpen: () => void;
  previewsLocked: boolean;
  onAmbientPreviewChange: (playing: boolean) => void;
}) {
  const [hover, setHover] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useInViewVideoPlayback(videoRef, {
    threshold: 0.3,
    enabled: !previewsLocked && !videoFailed,
    onPlayingChange: onAmbientPreviewChange,
  });

  return (
    <TiltGlare
      className="group/card w-full rounded-[20px] transition-colors duration-300"
      tiltAmount={7}
      tiltClassName="rounded-[20px] shadow-[0_12px_42px_rgba(0,0,0,0.5)]"
    >
      <StarBorder
        className="w-full !block rounded-[20px]"
        innerClassName="relative overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-transparent p-0 transition-colors duration-300 group-hover/card:border-[var(--border-gold)]"
      >
        <GlassCard saber={false} rounded={20} className="overflow-hidden border-0 border-transparent bg-transparent shadow-none">
          <button
            type="button"
            data-cursor="hover"
            onClick={onOpen}
            className="group relative w-full text-left"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
        <span
          className={cn(
            "pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-[400ms] group-hover:opacity-50",
            "bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]",
          )}
          aria-hidden
        />
        <div className="relative w-full overflow-hidden rounded-t-[20px] bg-[#0c0c0c]">
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
            {!videoFailed ? (
              <video
                ref={videoRef}
                src={p.videoSrc}
                muted
                loop
                playsInline
                preload="none"
                {...VIDEO_LOADING_LAZY}
                className="card-preview-video transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                style={SYN_VIDEO_BASE_STYLE}
                onError={() => {
                  console.warn("[VFXSYN] Video failed to load:", p.title, p.videoSrc);
                  setVideoFailed(true);
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0c0c0c] px-3">
                <span className="font-mono text-center text-[clamp(14px,3vw,22px)] text-[var(--text-secondary)]">
                  {p.title}
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-[1] bg-black/0 transition-colors duration-300",
              hover ? "bg-black/15" : "",
            )}
          />
          <span className="font-mono absolute left-3 top-3 z-[3] rounded-full border border-[var(--glass-border)] bg-[rgba(6,6,8,0.55)] px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[var(--gold)] backdrop-blur-md">
            {p.category}
          </span>
          <ArrowUpRight
            className="pointer-events-none absolute right-3 top-3 z-[3] h-5 w-5 text-[var(--gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            strokeWidth={1.25}
            aria-hidden
          />
        </div>
            <div className="space-y-1 p-5">
              <h3 className="font-ui text-[20px] tracking-[0.04em] text-[var(--text-primary)]">{p.title}</h3>
            </div>
          </button>
        </GlassCard>
      </StarBorder>
    </TiltGlare>
  );
}

export function PortfolioView({ pageHeader }: { pageHeader?: React.ReactNode }) {
  const [filter, setFilter] = useState<PortfolioFilter>("ALL");
  const [openId, setOpenId] = useState<string | null>(null);
  const [ambientVideoSessions, setAmbientVideoSessions] = useState(0);
  const showreelRef = useRef<HTMLVideoElement>(null);

  const onAmbientPreviewChange = useCallback((playing: boolean) => {
    setAmbientVideoSessions((n) => Math.max(0, n + (playing ? 1 : -1)));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "ALL") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const active = PROJECTS.find((p) => p.title === openId) ?? null;
  const previewsLocked = active != null;
  const suppressAmbientAnimations = ambientVideoSessions > 0 || previewsLocked;

  useInViewVideoPlayback(showreelRef, {
    threshold: 0.3,
    enabled: !previewsLocked,
    onPlayingChange: onAmbientPreviewChange,
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative z-[5] text-[var(--text-primary)]">
      <PortfolioPageBackground activeFilter={filter} suppressAmbientAnimations={suppressAmbientAnimations} />

      {pageHeader}

      <div className="sticky top-[calc(120px+env(safe-area-inset-top,0px))] z-[40] border-b border-[var(--glass-border)] bg-[rgba(6,6,8,0.72)] backdrop-blur-[20px]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap gap-3 px-6 py-4 md:px-10">
          {FILTERS.map((f, i) => (
            <GlassButton
              key={`portfolio-filter-${i}-${f}`}
              variant={filter === f ? "outline" : "glass"}
              onClick={() => setFilter(f)}
              size="sm"
              className={cn(
                "syn-filter-chip min-h-[44px] font-ui uppercase tracking-[0.12em]",
                filter === f && "syn-filter-active text-gradient border-[var(--gold)] bg-[rgba(184,190,199,0.08)]",
              )}
            >
              {f}
            </GlassButton>
          ))}
        </div>
      </div>

      <section className="relative z-[1] mx-auto max-w-[1200px] px-6 pb-[120px] pt-[100px] md:px-10">
        <div key={filter} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <div
              key={p.title}
              className="portfolio-card-reveal"
              style={{ "--i": i } as CSSProperties}
            >
              <GridCard
                p={p}
                onOpen={() => setOpenId(p.title)}
                previewsLocked={previewsLocked}
                onAmbientPreviewChange={onAmbientPreviewChange}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-[1] mx-auto max-w-[1100px] px-6 py-[100px] md:px-10">
        <TiltGlare
          className="w-full rounded-[20px]"
          tiltAmount={6}
          tiltClassName="rounded-[20px] shadow-[0_12px_42px_rgba(0,0,0,0.5)]"
        >
          <StarBorder
            className="w-full !block rounded-[20px]"
            innerClassName="relative overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-[#0a0a0c] p-0"
          >
            <div className="relative aspect-video">
              <video
                ref={showreelRef}
                src={SHOWREEL_2025_VIDEO}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                {...VIDEO_LOADING_LAZY}
                style={SYN_VIDEO_BASE_STYLE}
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  background: "rgba(5, 5, 5, 0.15)",
                }}
                aria-hidden
              />
            </div>
          </StarBorder>
        </TiltGlare>
      </section>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="motion-gpu-hint fixed inset-0 z-[10030] flex items-center justify-center bg-[rgba(6,6,8,0.95)] px-4 py-8 backdrop-blur-[28px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={MOTION_TRANSITION}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              role="dialog"
              aria-modal
              className="motion-gpu-hint relative max-h-[90vh] w-full max-w-[900px] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={MOTION_TRANSITION}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-2 top-2 z-20 rounded-full p-2 text-[var(--text-primary)] transition-colors hover:text-[var(--gold)] md:right-4 md:top-4"
                aria-label="Close"
                onClick={() => setOpenId(null)}
              >
                <X className="h-8 w-8 text-[var(--gold)]" strokeWidth={1.25} />
              </button>
              <SaberBorder active hoverOnly={false} borderRadius={24} intensity="high">
                <GlassCard saber={false} rounded={24} className="overflow-hidden shadow-none">
                  <div className="p-2 md:p-3">
                    <ModalVideo src={active.videoSrc} title={active.title} />
                    <div className="p-6">
                      <p className="font-mono text-gradient text-[10px] uppercase tracking-[0.2em]">{active.category}</p>
                      <h2 className="font-display mt-2 text-[clamp(36px,6vw,72px)] text-[var(--text-primary)]">
                        {active.title}
                      </h2>
                      <p className="font-mono mt-4 text-[13px] leading-[1.8] text-[var(--text-secondary)]">{active.desc}</p>
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <GlassButton variant="gold" href={INSTAGRAM_URL}>
                          DISCUSS A PROJECT
                        </GlassButton>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </SaberBorder>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
