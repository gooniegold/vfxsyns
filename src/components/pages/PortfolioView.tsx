"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";
import ShinyText from "@/components/react-bits/ShinyText";
import { HoverSplitHeading } from "@/components/ui/HoverSplitHeading";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { SaberBorder } from "@/components/ui/SaberBorder";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { BorderBeam } from "@/components/react-bits/BorderBeam";
import {
  PortfolioPageBackground,
  type PortfolioFilter,
} from "@/components/portfolio/PortfolioPageBackground";
import { INSTAGRAM_URL } from "@/lib/constants";
import { MOTION_TRANSITION } from "@/lib/motion-defaults";
import { cn } from "@/lib/utils";
import { PortfolioVideoPreview } from "@/components/portfolio/PortfolioVideoPreview";

/** Tab labels; project `category` must use these exact strings (indices 1–3) for filtering. */
const FILTERS: readonly PortfolioFilter[] = [
  "ALL",
  "MUSIC VIDEO",
  "COLOR GRADE",
];

type PortfolioProject = {
  title: string;
  category: Exclude<PortfolioFilter, "ALL">;
  videoSrc: string;
  desc: string;
  artist?: string;
};

function isDirectVideo(src: string): boolean {
  return /\.(mp4|mov|webm|m4v)$/i.test(src) || src.includes("/api/portfolio-media/");
}

function ModalVideo({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-[20px] bg-black">
      <video
        src={src}
        title={title}
        controls
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function GridCard({
  p,
  onOpen,
}: {
  p: PortfolioProject;
  onOpen: () => void;
}) {
  return (
    <motion.div
      className="break-inside-avoid"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={MOTION_TRANSITION}
    >
      <TiltGlare
        className="group/card w-full rounded-[24px] transition-colors duration-300"
        tiltAmount={6}
        tiltClassName="rounded-[24px] shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
      >
        <div className="syn-card-premium group !block overflow-hidden min-h-[400px]">
          <button
            type="button"
            data-cursor="hover"
            onClick={onOpen}
            className="group relative w-full text-left"
          >
            <div className="hud-scanline relative w-full overflow-hidden bg-[#030308]">
              <div className="relative w-full overflow-hidden [aspect-ratio:16/9]">
                <PortfolioVideoPreview
                  src={p.videoSrc}
                  title={`${p.title} preview`}
                  playInView
                />
              </div>
              <div className="absolute left-4 top-4 z-[4] flex items-center gap-2">
                <span className="font-mono bg-[var(--bg-base)] border border-[var(--border-accent)] px-3 py-1.5 text-[8px] uppercase tracking-[0.3em] font-bold text-[var(--accent-bright)] backdrop-blur-md">
                  {p.category}
                </span>
                <span className="hud-text-sm hidden group-hover:block animate-in fade-in slide-in-from-left-2">
                  4K MASTER
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border-accent)] bg-[rgba(99,102,241,0.2)] text-white shadow-[0_0_40px_rgba(99,102,241,0.3)] backdrop-blur-md">
                  <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" strokeWidth={0} aria-hidden />
                </div>
              </div>
              <ArrowUpRight
                className="absolute right-4 top-4 z-[4] h-6 w-6 text-[var(--accent-bright)] opacity-0 transition-all duration-400 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                strokeWidth={1.5}
              />
            </div>
            <div className="relative z-[1] p-8">
              <div className="hud-text-sm mb-2 opacity-40 flex items-center gap-2">
                <span className="h-1 w-1 bg-[var(--accent)] rounded-full" />
                PROJECT
              </div>
              <h3 className="font-ui text-[24px] font-bold tracking-[0.05em] text-[var(--text-primary)] transition-colors duration-400 group-hover:text-[var(--accent-bright)] uppercase">
                {p.title}
              </h3>
              {p.artist ? (
                <p className="font-mono mt-1 text-[11px] tracking-[0.3em] text-[var(--text-secondary)] uppercase">
                  ● {p.artist}
                </p>
              ) : null}
              <div className="mt-8 flex items-center gap-2">
                <div className="h-[2px] w-8 bg-[var(--accent)]" />
                <span className="font-mono text-[8px] tracking-[0.4em] text-[var(--accent-dim)] group-hover:text-[var(--accent-bright)] transition-colors">DETAILS</span>
              </div>
            </div>
          </button>
          <BorderBeam size={200} duration={5} colorFrom="var(--accent)" colorTo="var(--gold)">
            <div className="absolute inset-0" />
          </BorderBeam>
        </div>
      </TiltGlare>
    </motion.div>
  );
}

export function PortfolioView({ pageHeader }: { pageHeader?: React.ReactNode }) {
  const [filter, setFilter] = useState<PortfolioFilter>("ALL");
  const [openId, setOpenId] = useState<string | null>(null);
  const [uploadedProjects, setUploadedProjects] = useState<PortfolioProject[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch("/api/portfolio-files", { cache: "no-store" });
        const data = (await response.json()) as { ok?: boolean; items?: PortfolioProject[] };
        if (!cancelled && data.ok && Array.isArray(data.items)) {
          setUploadedProjects(data.items.length > 0 ? data.items : []);
        }
      } catch {
        if (!cancelled) setUploadedProjects([]);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const projectSource = uploadedProjects || [];
  const showreel = projectSource[0] || null;

  const filtered = useMemo(() => {
    if (filter === "ALL") return projectSource;
    return projectSource.filter((p) => p.category === filter);
  }, [filter, projectSource]);

  const active = projectSource.find((p) => p.title === openId) ?? null;
  const suppressAmbientAnimations = false;

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
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_16%_10%,rgba(168,85,247,0.16),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(139,92,246,0.12),transparent_24%)]" />
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
                "syn-filter-chip min-h-[44px] font-ui uppercase tracking-[0.15em] border-[var(--border-accent)]",
                filter === f && "syn-filter-active bg-[rgba(99,102,241,0.1)] text-[var(--accent-bright)] border-[var(--accent)]",
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
        <div className="relative w-full aspect-video syn-card-premium overflow-hidden border-[var(--border-accent)]">
          {showreel && isDirectVideo(showreel.videoSrc) ? (
            <video
              src={showreel.videoSrc}
              preload="metadata"
              muted
              loop
              playsInline
              autoPlay
              controls
              className="pointer-events-auto absolute inset-0 h-full w-full object-cover"
              title="Showreel"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[var(--text-secondary)]">
              Upload videos to src/components/portfolio
            </div>
          )}
          <BorderBeam size={100} duration={6} colorFrom="var(--accent)" colorTo="var(--gold)">
            <div className="absolute inset-0" />
          </BorderBeam>
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
