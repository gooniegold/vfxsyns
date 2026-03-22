"use client";

/**
 * Showcase embeds from @/lib/portfolio-media (Drive `/preview` or direct CDN for 3D).
 */

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";
import ShinyText from "@/components/react-bits/ShinyText";
import { HoverSplitHeading } from "@/components/ui/HoverSplitHeading";
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
import { MOTION_TRANSITION } from "@/lib/motion-defaults";
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
    title: "Jakk Move",
    category: FILTERS[1],
    videoSrc: PORTFOLIO_VIDEO_1_MUSIC,
    artist: "LazerdIM700",
  },
  {
    title: "Dream",
    category: FILTERS[1],
    videoSrc: PORTFOLIO_VIDEO_2_MUSIC,
    artist: "SiyahXO",
  },
  {
    title: "Nine Vicious",
    category: FILTERS[2],
    videoSrc: PORTFOLIO_VIDEO_3_COLOR,
    artist: "Cosign",
  },
  {
    title: "BoofPaxkMooky",
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
  return (
    <div className="relative aspect-video overflow-hidden rounded-[20px] bg-black">
      <iframe
        src={src}
        title={title}
        allow="autoplay"
        className="absolute inset-0 h-full w-full border-0"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}

function GridCard({
  p,
  onOpen,
}: {
  p: (typeof PROJECTS)[0];
  onOpen: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="break-inside-avoid"
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
    <TiltGlare
      className="group/card w-full rounded-[20px] transition-colors duration-300"
      tiltAmount={8}
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
            <iframe
              src={p.videoSrc}
              title={`${p.title} preview`}
              loading="lazy"
              allow="autoplay"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "none",
              }}
            />
          </div>
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-[1] bg-black/0 transition-colors duration-300",
              hover ? "bg-black/15" : "",
            )}
          />
          <span className="font-mono absolute left-3 top-3 z-[3] rounded-full syn-glass px-3 py-1.5 text-[9px] uppercase tracking-[0.2em]">
            <ShinyText speed={3} className="font-mono text-[9px] uppercase tracking-[0.2em]">
              {p.category}
            </ShinyText>
          </span>
          <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-gold)] bg-[rgba(5,5,5,0.55)] text-[var(--gold)] shadow-[0_0_20px_rgba(184,190,199,0.2)] backdrop-blur-sm">
              <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" strokeWidth={0} aria-hidden />
            </span>
          </div>
          <ArrowUpRight
            className="pointer-events-none absolute right-3 top-3 z-[3] h-5 w-5 text-[var(--gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            strokeWidth={1.25}
            aria-hidden
          />
        </div>
            <div className="syn-glass space-y-1 p-5">
              <h3 className="font-ui text-[20px] tracking-[0.04em] text-[var(--text-primary)]">{p.title}</h3>
              {p.artist ? (
                <p className="font-mono mt-[2px] text-[10px] tracking-[0.2em] text-[var(--text-secondary)]">
                  {p.artist}
                </p>
              ) : null}
            </div>
          </button>
        </GlassCard>
      </StarBorder>
    </TiltGlare>
    </motion.div>
  );
}

export function PortfolioView({ pageHeader }: { pageHeader?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<PortfolioFilter>("ALL");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "ALL") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const active = PROJECTS.find((p) => p.title === openId) ?? null;
  const suppressAmbientAnimations = false;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative z-[5] text-[var(--text-primary)]">
      <PortfolioPageBackground activeFilter={filter} suppressAmbientAnimations={suppressAmbientAnimations} />

      {pageHeader}

      <div className="syn-glass border-b-0">
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

      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "60px 24px 100px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "var(--gold)",
            marginBottom: 16,
          }}
        >
          ● SHOWREEL
        </p>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            border: "1px solid rgba(184,190,199,0.15)",
            overflow: "hidden",
            borderRadius: 8,
          }}
        >
          <iframe
            src={SHOWREEL_2025_VIDEO}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="autoplay; fullscreen"
            title="Showreel"
          />
        </div>
      </section>

      <section className="relative z-[1] mx-auto max-w-[1200px] px-6 pb-[120px] pt-[100px] md:px-10">
        <div
          key={filter}
          className="columns-1 gap-0 [column-gap:1.25rem] sm:columns-2 lg:columns-3"
        >
          {filtered.map((p, i) => (
            <div
              key={p.title}
              className="portfolio-card-reveal mb-6 break-inside-avoid"
              style={{ "--i": i } as CSSProperties}
            >
              <GridCard p={p} onOpen={() => setOpenId(p.title)} />
            </div>
          ))}
        </div>
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
                <GlassCard
                  saber={false}
                  rounded={24}
                  className="syn-glass overflow-hidden border-0 shadow-none hover:bg-[rgba(10,10,10,0.45)]"
                >
                  <div className="p-2 md:p-3">
                    <ModalVideo src={active.videoSrc} title={active.title} />
                    <div className="p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        <ShinyText speed={3} className="font-mono text-[10px] uppercase tracking-[0.2em]">
                          {active.category}
                        </ShinyText>
                      </p>
                      <h2 className="font-display mt-2 text-[clamp(36px,6vw,72px)] text-[var(--text-primary)]">
                        <HoverSplitHeading
                          text={active.title}
                          speed={3}
                          className="font-display text-[clamp(36px,6vw,72px)]"
                        />
                      </h2>
                      {active.artist ? (
                        <p className="font-mono mt-[2px] text-[10px] tracking-[0.2em] text-[var(--text-secondary)]">
                          {active.artist}
                        </p>
                      ) : null}
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
