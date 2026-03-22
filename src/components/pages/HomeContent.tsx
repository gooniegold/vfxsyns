"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { StatementStrip } from "@/components/sections/StatementStrip";
import GradientText from "@/components/react-bits/GradientText";
import { HeroVFXSynTitle } from "@/components/react-bits/HeroVFXSynTitle";
import { HeroTitleSpotlight } from "@/components/hero/HeroTitleSpotlight";
import { HeroHyperspeed } from "@/components/hero/HeroHyperspeed";
import { HeroAuroraLayer } from "@/components/hero/HeroAuroraLayer";
import ShinyText from "@/components/react-bits/ShinyText";
import { HoverSplitHeading } from "@/components/ui/HoverSplitHeading";
import { TextMorphHeading } from "@/components/react-bits/TextMorphHeading";
import { StarBorder } from "@/components/ui/StarBorder";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { MagneticButton } from "@/components/react-bits/MagneticButton";
import { BorderBeam } from "@/components/react-bits/BorderBeam";
import { ShimmerButton } from "@/components/react-bits/ShimmerButton";
import { RippleSurface } from "@/components/react-bits/RippleSurface";
import { TypingText } from "@/components/react-bits/TypingText";
import { WordRotate } from "@/components/react-bits/WordRotate";
import { useGoldConfettiOnce } from "@/components/react-bits/GoldConfettiBurst";
import { HeroFloatingShapes } from "@/components/hero/HeroFloatingShapes";
import { HeroMeteors } from "@/components/hero/HeroMeteors";
import { PackRibbon } from "@/components/react-bits/PackRibbon";
import { INSTAGRAM_URL } from "@/lib/constants";
import { SYN_STAT_GRADIENT } from "@/lib/syn-styles";
import {
  PORTFOLIO_VIDEO_1_MUSIC,
  PORTFOLIO_VIDEO_2_MUSIC,
  PORTFOLIO_VIDEO_3_COLOR,
  PORTFOLIO_VIDEO_4_COLOR,
  PORTFOLIO_VIDEO_5_3D,
  PORTFOLIO_VIDEO_6_3D,
} from "@/lib/portfolio-media";
import { useInViewVideoPlayback } from "@/hooks/useInViewVideoPlayback";
import { motionTransition } from "@/lib/motion-defaults";
import { SYN_VIDEO_BASE_STYLE, VIDEO_LOADING_LAZY } from "@/lib/video-presentation";
import { HomeScrollBG } from "@/components/backgrounds/HomeScrollBG";
import { HomeScrollSnap } from "@/components/home/HomeScrollSnap";
import { useMarqueeScrollSpeed } from "@/hooks/useMarqueeScrollSpeed";
import { ParallaxGhostNum } from "@/components/ui/ParallaxGhostNum";
import { cn } from "@/lib/utils";

const HeroBackground = dynamic(
  () => import("@/components/hero/HeroBackground").then((m) => m.HeroBackground),
  { ssr: false },
);

const MARQUEE = [
  "500+ PROJECTS",
  "·",
  "VFX PACKS",
  "·",
  "ATLANTA",
  "·",
  "90M+ VIEWS",
  "·",
  "VFXSYN",
  "·",
  "3D ANIMATION",
  "·",
  "COLOR GRADING",
  "·",
];

const FEATURED = [
  { title: "Jakk Move", category: "MUSIC VIDEO", videoSrc: PORTFOLIO_VIDEO_1_MUSIC, artist: "LazerdIM700" },
  { title: "Dream", category: "MUSIC VIDEO", videoSrc: PORTFOLIO_VIDEO_2_MUSIC, artist: "SiyahXO" },
  { title: "Nine Vicious", category: "COLOR GRADE", videoSrc: PORTFOLIO_VIDEO_3_COLOR, artist: "Cosign" },
  { title: "BoofPaxkMooky", category: "COLOR GRADE", videoSrc: PORTFOLIO_VIDEO_4_COLOR },
  { title: "Showcase 1", category: "3D VFX", videoSrc: PORTFOLIO_VIDEO_5_3D },
  { title: "Showcase 2", category: "3D VFX", videoSrc: PORTFOLIO_VIDEO_6_3D },
] as const;

const PACKS = [
  { name: "CINEMATIC DUST", desc: "Particles, dust, debris", assets: "38 ASSETS", isNew: false },
  { name: "GLITCH PACK VOL.1", desc: "Glitch transitions", assets: "24 ASSETS", isNew: true },
  { name: "MUSIC VID ESSENTIALS", desc: "Leaks, overlays, grades", assets: "52 ASSETS", isNew: false },
] as const;

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const burst = useGoldConfettiOnce();

  return (
    <ScrollReveal>
      <section
        ref={sectionRef}
        data-home-bg="hero"
        className="syn-home-snap-section relative z-[1] flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      >
        <motion.div
          style={{ y: bgY }}
          className="pointer-events-none absolute inset-0 z-0 min-h-full w-full"
          aria-hidden
        >
          <HeroBackground />
        </motion.div>
        <HeroHyperspeed />
        <HeroAuroraLayer />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(184,190,199,0.06)_0%,transparent_70%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.7)_100%)]"
          aria-hidden
        />
        <HeroFloatingShapes />
        <HeroMeteors />
        <div className="relative z-[10] flex min-h-screen w-full max-w-[1100px] flex-col items-center justify-center px-6 py-24">
          <motion.p
            className="motion-gpu-hint font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={motionTransition()}
          >
            <TypingText
              text="● ATLANTA, GA — VFX ARTIST"
              speedMs={38}
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
            />
          </motion.p>

          <div className="mx-auto mt-4 flex max-w-[95vw] flex-wrap justify-center gap-[0.04em]">
            <HeroTitleSpotlight>
              <HeroVFXSynTitle />
            </HeroTitleSpotlight>
          </div>

          <motion.p
            className="motion-gpu-hint font-body mt-6 max-w-2xl px-2 text-[clamp(14px,1.8vw,20px)] italic leading-relaxed text-[var(--text-secondary)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransition(0.5)}
          >
            <WordRotate
              words={["3D Animations", "Color Grading", "Music Videos"]}
              intervalMs={2000}
              startDelayMs={500}
              className="min-h-[1.4em] justify-center text-[clamp(14px,1.8vw,20px)]"
            />
          </motion.p>

          <motion.div
            className="motion-gpu-hint hero-gold-line mx-auto mt-7 h-px w-10 bg-[var(--gold)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={motionTransition(0.65)}
            style={{ transformOrigin: "center" }}
          />

          <motion.div
            className="motion-gpu-hint mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransition(0.8)}
          >
            <MagneticButton className="w-full max-w-[260px] sm:w-auto">
              <RippleSurface className="w-full rounded-[2px]">
                <ShimmerButton
                  className="w-full min-h-[44px] rounded-[2px]"
                  background="#050505"
                  shimmerColor="#B8BEC7"
                >
                  <Link
                    href="/portfolio"
                    data-cursor="hover"
                    className="btn-gold-glow font-strong flex min-h-[44px] w-full items-center justify-center border border-[var(--border-gold)] bg-transparent px-7 py-[14px] text-[10px] font-bold tracking-[0.25em] text-[var(--text-gold)] transition-all duration-200 hover:border-[var(--gold)] hover:bg-[var(--gold-glow)]"
                  >
                    VIEW WORK
                  </Link>
                </ShimmerButton>
              </RippleSurface>
            </MagneticButton>
            <MagneticButton className="w-full max-w-[260px] sm:w-auto">
              <BorderBeam className="w-full rounded-[2px]">
                <ShimmerButton
                  className="w-full min-h-[44px] rounded-[2px]"
                  background="var(--gold)"
                  shimmerColor="rgba(5,5,5,0.28)"
                >
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    onClick={burst}
                    className="btn-gold-glow font-strong flex min-h-[44px] w-full items-center justify-center px-9 py-[14px] text-[10px] font-bold tracking-[0.25em] text-[#050505] transition-transform duration-200 hover:scale-[1.02] hover:bg-[var(--gold-bright)]"
                  >
                    GET IN TOUCH
                  </a>
                </ShimmerButton>
              </BorderBeam>
            </MagneticButton>
            <MagneticButton className="w-full max-w-[260px] sm:w-auto">
              <RippleSurface className="w-full rounded-[2px]">
                <ShimmerButton
                  className="w-full min-h-[44px] rounded-[2px]"
                  background="#050505"
                  shimmerColor="#B8BEC7"
                >
                  <Link
                    href="/shop"
                    data-cursor="hover"
                    className="btn-gold-glow font-strong flex min-h-[44px] w-full items-center justify-center border border-[var(--border-subtle)] bg-transparent px-7 py-[14px] text-[10px] font-bold tracking-[0.25em] text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--border-gold)] hover:text-[var(--text-gold)]"
                  >
                    VIEW SHOP
                  </Link>
                </ShimmerButton>
              </RippleSurface>
            </MagneticButton>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-12 left-1/2 z-[10] flex -translate-x-1/2 flex-col items-center gap-2">
          <motion.span
            className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
            style={{ animation: "vfxsyn-scroll-line 2s ease-in-out infinite" }}
          >
            SCROLL
          </motion.span>
          <div className="h-10 w-px bg-[var(--gold)]" style={{ animation: "vfxsyn-scroll-line 2s ease-in-out infinite" }} />
        </div>
      </section>
    </ScrollReveal>
  );
}

function MarqueeStrip() {
  const prefersReducedMotion = useReducedMotion();
  const marqueeSec = useMarqueeScrollSpeed(40);
  return (
    <ScrollReveal>
      <section
        data-home-bg="marquee"
        className="syn-home-snap-section group relative z-[1] border-y border-[var(--border-gold)] bg-[rgba(184,190,199,0.04)] py-5"
        aria-label="Ticker"
      >
        <div className="syn-curved-marquee overflow-hidden">
          <div className="syn-curved-marquee-track">
            <div
              className="flex w-max gap-10 motion-reduce:transform-none group-hover:[animation-play-state:paused] md:gap-12"
              style={{
                animation: prefersReducedMotion
                  ? "vfxsyn-marquee 40s linear infinite"
                  : `vfxsyn-marquee ${marqueeSec}s linear infinite`,
              }}
            >
              {[0, 1].map((c) => (
                <div key={c} className="flex gap-10 pr-10 md:gap-12 md:pr-12">
                  {MARQUEE.map((t, i) => (
                    <span
                      key={`${c}-${i}`}
                      style={
                        {
                          "--i": i,
                          animation: "marqueeFloat 3s ease-in-out infinite",
                          animationDelay: `calc(var(--i) * 0.35s)`,
                        } as React.CSSProperties
                      }
                      className={cn(
                        "font-ui inline-block text-[13px] uppercase tracking-[0.22em] md:text-[15px]",
                        t === "·" && "syn-marquee-bullet px-1 font-bold text-[var(--gold)]",
                      )}
                    >
                      {t === "·" ? (
                        t
                      ) : (
                        <ShinyText speed={3} className="font-ui text-[13px] uppercase tracking-[0.22em] md:text-[15px]">
                          {t}
                        </ShinyText>
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

function StatsBar() {
  const [flash90, setFlash90] = useState(false);
  const [flash500, setFlash500] = useState(false);
  const [flash6, setFlash6] = useState(false);

  return (
    <ScrollReveal>
    <section
      data-home-bg="stats"
      className="syn-home-snap-section pointer-events-none relative z-[1] border-y border-[var(--border-subtle)] syn-glass py-20"
      aria-label="Stats"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 md:px-10">
        {[
          {
            el: (
              <GradientText
                className={cn(
                  "font-ui text-[clamp(48px,10vw,72px)] font-bold tabular-nums",
                  flash90 && "stat-count-flash",
                )}
                colors={[...SYN_STAT_GRADIENT]}
                direction="diagonal"
                gradientAngle={135}
              >
                <span className="inline-block">
                  <CountUp end={90} suffix="M+" duration={2} onComplete={() => setFlash90(true)} />
                </span>
              </GradientText>
            ),
            label: "VIEWS GENERATED",
          },
          {
            el: (
              <GradientText
                className={cn(
                  "font-ui text-[clamp(48px,10vw,72px)] font-bold tabular-nums",
                  flash500 && "stat-count-flash",
                )}
                colors={[...SYN_STAT_GRADIENT]}
                direction="diagonal"
                gradientAngle={135}
              >
                <span className="inline-block">
                  <CountUp end={500} suffix="+" duration={2} onComplete={() => setFlash500(true)} />
                </span>
              </GradientText>
            ),
            label: "PROJECTS",
          },
          {
            el: (
              <GradientText
                className={cn(
                  "font-ui text-[clamp(48px,10vw,72px)] font-bold tabular-nums",
                  flash6 && "stat-count-flash",
                )}
                colors={[...SYN_STAT_GRADIENT]}
                direction="diagonal"
                gradientAngle={135}
              >
                <span className="inline-block">
                  <CountUp end={6} suffix="+" duration={2} onComplete={() => setFlash6(true)} />
                </span>
              </GradientText>
            ),
            label: "6+ YEARS EDITING",
          },
          {
            el: (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-block transition-opacity hover:opacity-90"
              >
                <ShinyText speed={3} className="font-ui text-[clamp(40px,8vw,56px)] font-bold">
                  @vfxsyn
                </ShinyText>
              </a>
            ),
            label: "INSTAGRAM",
          },
        ].map((row, i) => (
          <ScrollReveal
            key={row.label}
            delay={i * 0.08}
            className={cn(
              "flex flex-col gap-2 px-4",
              i > 0 ? "lg:border-l lg:border-[var(--border-subtle)]" : "",
              i >= 2 ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            {row.el}
            <span className="font-ui text-[10px] uppercase tracking-[0.25em] text-[var(--text-secondary)]">{row.label}</span>
          </ScrollReveal>
        ))}
      </div>
    </section>
    </ScrollReveal>
  );
}

function FeaturedCard({ p, delay }: { p: (typeof FEATURED)[number]; delay: number }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useInViewVideoPlayback(videoRef, {
    threshold: 0.3,
    rootMargin: "200px 0px",
    enabled: !videoFailed,
  });

  return (
    <ScrollReveal delay={delay}>
      <TiltGlare
        className="group/card w-full rounded-[16px] transition-colors duration-300"
        tiltAmount={8}
        tiltClassName="rounded-[16px] shadow-[0_12px_42px_rgba(0,0,0,0.5)]"
      >
        <StarBorder
          className="w-full !block rounded-[16px]"
          innerClassName="relative overflow-hidden rounded-[16px] border border-[var(--border-subtle)] bg-transparent p-0 transition-colors duration-300 group-hover/card:border-[var(--border-gold)]"
        >
          <Link
            href="/portfolio"
            data-cursor="hover"
            className="group relative block text-left no-underline"
          >
            <span
              className="pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-[400ms] group-hover:opacity-50"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
              }}
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] bg-gradient-to-br from-[rgba(184,190,199,0.04)_0%,transparent_50%] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative w-full overflow-hidden bg-[#0c0c0c]">
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                {!videoReady && !videoFailed ? (
                  <div
                    className="absolute inset-0 z-[2] animate-pulse bg-gradient-to-br from-[#141414] via-[#0a0a0a] to-[#050505]"
                    aria-hidden
                  />
                ) : null}
                {!videoFailed ? (
                  <video
                    ref={videoRef}
                    src={p.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="none"
                    {...VIDEO_LOADING_LAZY}
                    className="card-preview-video h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    style={SYN_VIDEO_BASE_STYLE}
                    onLoadedData={() => setVideoReady(true)}
                    onError={() => {
                      setVideoFailed(true);
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0c0c0c] px-3">
                    <span className="font-mono text-center text-[clamp(12px,2.5vw,18px)] text-[var(--text-secondary)]">
                      {p.title}
                    </span>
                  </div>
                )}
              </div>
              <span className="font-mono absolute left-3 top-3 z-[3] bg-[rgba(5,5,5,0.75)] px-2.5 py-1 text-[8px] uppercase tracking-[0.2em]">
                <ShinyText speed={3} className="font-mono text-[8px] uppercase tracking-[0.2em]">
                  {p.category}
                </ShinyText>
              </span>
              <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-gold)] bg-[rgba(5,5,5,0.55)] text-[var(--gold)] shadow-[0_0_24px_rgba(184,190,199,0.2)] backdrop-blur-sm">
                  <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" strokeWidth={0} aria-hidden />
                </span>
              </div>
              <ArrowUpRight
                className="absolute right-3 top-3 z-[3] h-5 w-5 text-[var(--gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                strokeWidth={1.5}
              />
            </div>
            <div className="relative z-[1] syn-glass p-6">
              <h3 className="font-strong text-[22px] text-[var(--text-primary)]">{p.title}</h3>
              {"artist" in p ? (
                <p className="font-mono mt-[2px] text-[10px] tracking-[0.2em] text-[var(--text-secondary)]">{p.artist}</p>
              ) : null}
            </div>
          </Link>
        </StarBorder>
      </TiltGlare>
    </ScrollReveal>
  );
}

function FeaturedWorkSection() {
  return (
    <ScrollReveal>
    <section data-home-bg="featured" className="syn-home-snap-section relative z-[1] px-6 py-[120px] md:px-10">
      <div className="relative mx-auto max-w-[1400px]">
        <ParallaxGhostNum n="01" />
        <ScrollReveal>
          <p className="font-mono relative z-[1] text-[10px] tracking-[0.4em] text-[var(--gold)]">
            <ShinyText speed={3} className="font-mono text-[10px] tracking-[0.4em]">
              ● PORTFOLIO
            </ShinyText>
          </p>
          <motion.div
            className="motion-gpu-hint relative z-[1] mt-4"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={motionTransition()}
          >
            <TextMorphHeading
              text="WORK WITH ME"
              className="font-display text-[clamp(56px,8vw,120px)] tracking-[0.05em]"
            />
          </motion.div>
        </ScrollReveal>
        <div className="relative z-[1] mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-visible pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {FEATURED.slice(0, 3).map((p, i) => (
            <div
              key={p.title}
              className="w-[min(88vw,380px)] shrink-0 snap-center md:w-auto md:shrink md:snap-none"
            >
              <FeaturedCard p={p} delay={i * 0.06} />
            </div>
          ))}
        </div>
        <ScrollReveal className="mt-12 flex justify-end">
          <Link
            href="/portfolio"
            data-cursor="hover"
            className="font-mono gold-text-glow text-[10px] tracking-[0.2em] text-[var(--gold)] transition-colors hover:text-[var(--gold-bright)]"
          >
            VIEW ALL WORK →
          </Link>
        </ScrollReveal>
      </div>
    </section>
    </ScrollReveal>
  );
}

function PacksTeaser() {
  return (
    <ScrollReveal>
    <section data-home-bg="packs" className="syn-home-snap-section relative z-[1] px-6 py-[120px] md:px-10">
      <div className="relative mx-auto max-w-[1400px]">
        <ParallaxGhostNum n="02" />
        <ScrollReveal>
          <p className="font-mono relative z-[1] text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
            <ShinyText speed={3} className="font-mono text-[10px] uppercase tracking-[0.2em]">
              ● DIGITAL PRODUCTS
            </ShinyText>
          </p>
          <motion.h2
            className="motion-gpu-hint font-display relative z-[1] mt-4 text-[clamp(56px,8vw,120px)]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={motionTransition()}
          >
            <HoverSplitHeading
              text="VFX PACKS"
              speed={3}
              className="font-display text-[clamp(56px,8vw,120px)]"
            />
          </motion.h2>
          <p className="font-body relative z-[1] mt-4 max-w-lg text-[13px] text-[var(--text-secondary)]">
            Instant delivery via Shopify checkout — powered by Stripe.
          </p>
        </ScrollReveal>
        <div className="relative z-[1] mt-14 grid gap-8 md:grid-cols-3">
          {PACKS.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.1}>
              <TiltGlare
                className="w-full rounded-[16px]"
                tiltAmount={8}
                glareColor="rgba(184,190,199,0.15)"
                tiltClassName="rounded-[16px] shadow-[0_12px_42px_rgba(0,0,0,0.48)] [transform-style:preserve-3d]"
              >
                <StarBorder
                  className="w-full !block rounded-[16px]"
                  innerClassName="relative min-h-[220px] overflow-hidden rounded-[16px] syn-glass p-0"
                >
                  <div className="pack-card-animated-bg" aria-hidden />
                  <PackRibbon />
                  {p.isNew ? (
                    <span className="font-syne-mono pointer-events-none absolute right-3 top-3 z-[2] bg-[var(--gold)] px-2 py-1 text-[8px] uppercase tracking-[0.2em] text-[#050505]">
                      NEW
                    </span>
                  ) : null}
                  <div className="relative z-[1] p-6">
                    <span className="font-syne-mono text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">{p.assets}</span>
                    <h3 className="font-ui mt-3 text-[22px] text-[var(--text-primary)]">{p.name}</h3>
                    <p className="font-body mt-2 text-[12px] text-[var(--text-secondary)]">{p.desc}</p>
                    <button type="button" disabled className="pack-coming-soon-btn disabled:cursor-not-allowed disabled:opacity-100">
                      COMING SOON
                    </button>
                  </div>
                </StarBorder>
              </TiltGlare>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}

export function HomeContent() {
  return (
    <div id="home-page-root" className="relative">
      <HomeScrollBG />
      <HomeScrollSnap />
      <HeroSection />
      <MarqueeStrip />
      <FeaturedWorkSection />
      <StatsBar />
      <StatementStrip />
      <WhyChooseUsSection />
      <PacksTeaser />
      <FAQSection />
    </div>
  );
}
