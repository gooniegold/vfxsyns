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
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { MarqueeLogos } from "@/components/sections/MarqueeLogos";
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
import { motionTransition } from "@/lib/motion-defaults";
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
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const burst = useGoldConfettiOnce();

  return (
    <ScrollReveal>
      <section
        ref={sectionRef}
        data-home-bg="hero"
        className="syn-home-snap-section relative z-[1] flex min-h-[96vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
      >
        <motion.div
          style={{ y: bgY }}
          className="pointer-events-none absolute inset-0 z-0 min-h-full w-full"
          aria-hidden
        >
          <HeroBackground videoSrc={PORTFOLIO_VIDEO_5_3D} />
        </motion.div>
        
        <HeroHyperspeed />
        <HeroAuroraLayer />
        
        {/* premium overlays */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.12)_0%,transparent_70%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(3,3,8,0.85)_100%)]"
          aria-hidden
        />
        
        <HeroFloatingShapes />
        <HeroMeteors />

        <div className="relative z-[10] flex min-h-[96vh] w-full max-w-[1200px] flex-col items-center justify-center px-6 py-24">
          <motion.p
            className="motion-gpu-hint font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--accent-bright)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransition(0.2)}
          >
            <TypingText
              text="● ATLANTA, GA — DISRUPTING VISUALS"
              speedMs={35}
              className="font-mono text-[10px] uppercase tracking-[0.4em]"
            />
          </motion.p>

          <div className="mx-auto mt-6 flex max-w-[95vw] flex-wrap justify-center gap-[0.04em]">
            <HeroTitleSpotlight>
              <HeroVFXSynTitle />
            </HeroTitleSpotlight>
          </div>

          <motion.div
            className="motion-gpu-hint mt-6 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={motionTransition(1)}
          >
            <p className="font-ui text-[clamp(14px,1.8vw,22px)] font-bold tracking-[0.1em] text-[var(--text-primary)]">
              CRAFTING THE FUTURE OF VFX
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent-bright)] to-transparent" />
          </motion.div>

          <motion.div
            className="motion-gpu-hint mt-10 flex w-full max-w-2xl flex-col items-center justify-center gap-6 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransition(1.2)}
          >
            <MagneticButton className="w-full max-w-[280px] sm:w-auto">
              <BorderBeam className="w-full rounded-[4px]" colorFrom="#6366F1" colorTo="#B8BEC7">
                <ShimmerButton
                  className="syn-btn-accent-glow w-full min-h-[52px] rounded-[4px]"
                  background="var(--bg-card)"
                  shimmerColor="var(--accent)"
                >
                  <Link
                    href="/portfolio"
                    data-cursor="hover"
                    className="font-strong flex min-h-[52px] w-full items-center justify-center px-10 py-[16px] text-[11px] font-bold tracking-[0.3em] text-white transition-all duration-300 hover:scale-[1.02]"
                  >
                    EXPLOIT WORK
                  </Link>
                </ShimmerButton>
              </BorderBeam>
            </MagneticButton>

            <MagneticButton className="w-full max-w-[280px] sm:w-auto">
              <StarBorder className="w-full rounded-[4px]">
                <ShimmerButton
                  className="w-full min-h-[52px] rounded-[4px]"
                  background="rgba(184, 190, 199, 0.08)"
                  shimmerColor="white"
                >
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    onClick={burst}
                    className="font-strong flex min-h-[52px] w-full items-center justify-center px-10 py-[16px] text-[11px] font-bold tracking-[0.3em] text-[var(--gold)] transition-colors duration-300 hover:text-white"
                  >
                    GET STARTED
                  </a>
                </ShimmerButton>
              </StarBorder>
            </MagneticButton>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-12 left-1/2 z-[10] flex -translate-x-1/2 flex-col items-center gap-3">
          <motion.div 
            className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--accent-bright)]">
              SHAPE REALITY
            </span>
            <div className="mt-2 h-12 w-[1px] bg-gradient-to-b from-[var(--accent-bright)] to-transparent" />
          </motion.div>
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
  return (
    <ScrollReveal delay={delay}>
      <TiltGlare
        className="group/card w-full rounded-[20px] transition-colors duration-300"
        tiltAmount={6}
        tiltClassName="rounded-[20px] shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
      >
        <div className="syn-card-premium !block overflow-hidden">
          <Link
            href="/portfolio"
            data-cursor="hover"
            className="group relative block text-left no-underline"
          >
            <div className="relative w-full overflow-hidden bg-[#030308]">
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
                    scale: "1.05",
                  }}
                />
              </div>
              <span className="font-mono absolute left-4 top-4 z-[4] bg-[var(--bg-base)] border border-[var(--border-accent)] px-3 py-1.5 text-[8px] uppercase tracking-[0.3em] font-bold text-[var(--accent-bright)] backdrop-blur-md">
                {p.category}
              </span>
              
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
              <h3 className="font-ui text-[24px] font-bold tracking-[0.05em] text-[var(--text-primary)] transition-colors duration-400 group-hover:text-[var(--accent-bright)]">
                {p.title}
              </h3>
              {"artist" in p ? (
                <p className="font-mono mt-1 text-[11px] tracking-[0.2em] text-[var(--text-secondary)] uppercase">
                  {p.artist}
                </p>
              ) : null}
              <div className="mt-6 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-accent)] to-transparent" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--accent-dim)]">EXPLORE PROJECT</span>
              </div>
            </div>
          </Link>
          <BorderBeam size={150} duration={4} delay={delay + 1} colorFrom="var(--accent)" colorTo="var(--gold)">
            <div className="absolute inset-0" />
          </BorderBeam>
        </div>
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
                <div className="syn-card-premium !block overflow-hidden min-h-[220px]">
                  <div className="pack-card-animated-bg" aria-hidden />
                  <PackRibbon />
                  {p.isNew ? (
                    <span className="font-syne-mono pointer-events-none absolute right-3 top-3 z-[2] bg-[var(--accent)] px-2 py-1 text-[8px] uppercase tracking-[0.2em] text-white">
                      NEW
                    </span>
                  ) : null}
                  <div className="relative z-[1] p-6">
                    <span className="font-syne-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-bright)]">{p.assets}</span>
                    <h3 className="font-ui mt-3 text-[22px] text-[var(--text-primary)]">{p.name}</h3>
                    <p className="font-body mt-2 text-[12px] text-[var(--text-secondary)]">{p.desc}</p>
                    <button type="button" disabled className="pack-coming-soon-btn disabled:cursor-not-allowed disabled:opacity-100 border-[var(--border-accent)] text-[var(--accent-bright)]">
                      COMING SOON
                    </button>
                  </div>
                </div>
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
      <MarqueeLogos />
      <MarqueeStrip />
      <hr className="syn-section-divider" />
      <hr className="syn-section-divider" />
      <FeaturedWorkSection />
      <hr className="syn-section-divider" />
      <StatsBar />
      <ProcessSection />
      <hr className="syn-section-divider" />
      <StatementStrip />
      <WhyChooseUsSection />
      <hr className="syn-section-divider" />
      <TestimonialsSection />
      <PacksTeaser />
      <hr className="syn-section-divider" />
      <FAQSection />
    </div>
  );
}
