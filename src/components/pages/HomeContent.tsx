"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play, Shield } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CapabilitiesBento } from "@/components/sections/CapabilitiesBento";
import { MarqueeLogos } from "../sections/MarqueeLogos";
import GradientText from "@/components/react-bits/GradientText";
import ShinyText from "@/components/react-bits/ShinyText";
import { HoverSplitHeading } from "@/components/ui/HoverSplitHeading";
import { TextMorphHeading } from "@/components/react-bits/TextMorphHeading";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { BorderBeam } from "@/components/react-bits/BorderBeam";
import { PackRibbon } from "@/components/react-bits/PackRibbon";
import { TiltedCard } from "@/components/react-bits/TiltedCard";
import { INSTAGRAM_URL } from "@/lib/constants";
import { SYN_STAT_GRADIENT } from "@/lib/syn-styles";
import {
  SHOWREEL_VIDEO,
  LAZERDIM_JAKKMOVE,
  SIYAH_XO,
  ABOUT_ME_PHOTO,
} from "@/lib/portfolio-media";
import { motionTransition } from "@/lib/motion-defaults";
import { HomeScrollBG } from "@/components/backgrounds/HomeScrollBG";
import { HomeScrollSnap } from "@/components/home/HomeScrollSnap";
import { useMarqueeScrollSpeed } from "@/hooks/useMarqueeScrollSpeed";
import { ParallaxGhostNum } from "@/components/ui/ParallaxGhostNum";
import { cn } from "@/lib/utils";

import { Hero as ShaderHero } from "@/components/ui/animated-shader-hero";
import ShaderBackground from "@/components/ui/animated-shader-background";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { Component as AboutHoverCard } from "@/components/ui/avatar-hover-card";

const MARQUEE = [
  "500+ PROJECTS",
  "|",
  "VFX PACKS",
  "|",
  "ATLANTA",
  "|",
  "90M+ VIEWS",
  "|",
  "VFXSYN",
  "|",
  "3D ANIMATION",
  "|",
  "COLOR GRADING",
  "|",
];

const FEATURED = [
  { title: "JAKK MOVE", category: "MUSIC VIDEO", videoSrc: LAZERDIM_JAKKMOVE, artist: "LAZERDIM700" },
  { title: "DIAMOND", category: "MUSIC VIDEO", videoSrc: SIYAH_XO, artist: "SIYAH XO" },
  { title: "SHOWREEL", category: "VFX SHOWCASE", videoSrc: SHOWREEL_VIDEO, artist: "VFXSYN" },
] as const;

const PACKS = [
  { name: "CINEMATIC DUST", desc: "Particles, dust, debris", assets: "38 ASSETS", isNew: false },
  { name: "GLITCH PACK VOL.1", desc: "Glitch transitions", assets: "24 ASSETS", isNew: true },
  { name: "MUSIC VID ESSENTIALS", desc: "Leaks, overlays, grades", assets: "52 ASSETS", isNew: false },
] as const;

function HeroSection() {
  return (
    <section data-home-bg="hero" className="syn-home-snap-section relative z-[1] w-full min-h-[100svh]">
      <ShaderHero
        className="h-[100svh]"
        trustBadge={{
          text: "VERIFIED_VFX_ARCHITECT",
          icons: [<Shield key="shield" className="w-3 h-3" />] 
        }}
        headline={{
          line1: "ELEVATING THE",
          line2: "VISUAL STANDARD"
        }}
        subtitle="Creative direction, 3D animation, and hyper-stylized VFX for the artists. Based in Atlanta, GA."
        buttons={{
          primary: {
            text: "EXPLOIT WORK",
            href: "/portfolio"
          },
          secondary: {
            text: "INSTAGRAM",
            href: INSTAGRAM_URL
          }
        }}
      />
    </section>
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
                  : \`vfxsyn-marquee \${marqueeSec}s linear infinite\`,
              }}
            >
              {[0, 1].map((c) => (
                <div key={c} className="flex gap-10 pr-10 md:gap-12 md:pr-12">
                  {MARQUEE.map((t, i) => (
                    <span
                      key={\`\${c}-\${i}\`}
                      style={
                        {
                          "--i": i,
                          animation: "marqueeFloat 3s ease-in-out infinite",
                          animationDelay: \`calc(var(--i) * 0.35s)\`,
                        } as React.CSSProperties
                      }
                      className={cn(
                        "font-ui inline-block text-[13px] uppercase tracking-[0.22em] md:text-[15px]",
                        t === "|" && "syn-marquee-bullet px-1 font-bold text-[var(--accent)]",
                      )}
                    >
                      {t === "|" ? (
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
      <TiltedCard
        className="group/card w-full rounded-[24px]"
        rotateAmount={12}
        scaleOnHover={1.02}
        glareOpacity={0.2}
      >
        <div className="syn-card-premium !block overflow-hidden border border-[var(--border-accent)] bg-[var(--bg-card)] backdrop-blur-xl">
          <Link
            href="/portfolio"
            data-cursor="hover"
            className="group relative block text-left no-underline"
          >
            <div className="hud-scanline relative w-full overflow-hidden bg-[#030308]">
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                <iframe
                  src={p.videoSrc}
                  title={\`\${p.title} preview\`}
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
              <div className="absolute left-4 top-4 z-[4] flex items-center gap-2">
                <span className="font-mono bg-[rgba(3,3,8,0.8)] border border-[var(--border-accent)] px-3 py-1.5 text-[8px] uppercase tracking-[0.3em] font-bold text-[var(--accent)] backdrop-blur-md">
                  {p.category}
                </span>
              </div>
              
              <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border-accent)] bg-[rgba(139,92,246,0.2)] text-white shadow-[0_0_40px_rgba(139,92,246,0.3)] backdrop-blur-md">
                  <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" strokeWidth={0} aria-hidden />
                </div>
              </div>
              
              <ArrowUpRight
                className="absolute right-4 top-4 z-[4] h-6 w-6 text-[var(--accent)] opacity-0 transition-all duration-400 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                strokeWidth={1.5}
              />
            </div>
            <div className="relative z-[1] p-8">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="font-mono text-[8px] tracking-[0.3em] text-[var(--accent)] uppercase opacity-60">VERIFIED_CLIENT</span>
              </div>
              <h3 className="font-ui text-[24px] font-bold tracking-[0.05em] text-[var(--text-primary)] transition-colors duration-400 group-hover:text-[var(--accent)]">
                {p.title}
              </h3>
              {"artist" in p ? (
                <p className="font-mono mt-1 text-[11px] tracking-[0.2em] text-[var(--text-secondary)] uppercase">
                  | {p.artist}
                </p>
              ) : null}
              <div className="mt-8 flex items-center gap-2">
                <div className="h-[2px] w-8 bg-gradient-to-r from-[var(--accent)] to-transparent" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors">DECRYPT_DATA</span>
              </div>
            </div>
          </Link>
          <BorderBeam size={180} duration={6} delay={delay + 1} colorFrom="var(--accent)" colorTo="var(--accent-secondary)">
            <div className="absolute inset-0" />
          </BorderBeam>
        </div>
      </TiltedCard>
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
          <p className="font-mono relative z-[1] text-[10px] tracking-[0.4em] text-[var(--accent)]">
            <ShinyText speed={3} className="font-mono text-[10px] tracking-[0.4em]">
              PORTFOLIO
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
          <p className="font-mono relative z-[1] text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
            <ShinyText speed={3} className="font-mono text-[10px] uppercase tracking-[0.2em]">
              DIGITAL PRODUCTS
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

function AboutSection() {
  return (
    <ScrollReveal>
      <section id="about" className="syn-home-snap-section relative z-[1] px-6 py-[120px] md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-16 lg:flex-row">
          <div className="relative w-full max-w-[500px] lg:w-1/2 flex justify-center items-center">
            
            <AboutHoverCard
              imageSrc={ABOUT_ME_PHOTO}
              name="VFXSYN"
              username="vfxsyn"
              description="Creative direction, 3D animation, and heavy color grading. Shaping reality from Atlanta, GA."
              buttonText="EXPLORE WORK"
              variant="glass"
              size="xl"
              onButtonClick={() => { window.location.href = '/portfolio' }}
            />
            {/* HUD flair for photo */}
            <div className="absolute -right-6 -top-6 hud-text-sm rotate-90 opacity-20 hidden md:block">
              SCANNING_BIOMETRICS_OK
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <ParallaxGhostNum n="02" />
            <ScrollReveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">
                THE ARCHITECT
              </p>
              <h2 className="font-display mt-6 text-[clamp(48px,6vw,96px)] leading-none tracking-tight">
                ABOUT <span className="text-[var(--accent-bright)]">ME</span>
              </h2>
              <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                <p>
                  Specializing in advanced 3D visual effects and high-end color grading. Based in Atlanta, 
                  working globally with labels and independent artists to define the next generation of visual aesthetics.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <span className="hud-text-sm block">CAPABILITIES</span>
                    <ul className="mt-2 space-y-1 font-ui text-[13px] font-bold tracking-wider">
                      <li>| 3D ANIMATION</li>
                      <li>| COMPOSITING</li>
                      <li>| COLOR GRADING</li>
                      <li>| SOUND DESIGN</li>
                    </ul>
                  </div>
                  <div>
                    <span className="hud-text-sm block">HARDWARE</span>
                    <ul className="mt-2 space-y-1 font-ui text-[13px] font-bold tracking-wider opacity-60">
                      <li>| RTX 4099 SIGMA</li>
                      <li>| 128GB DDR5 PRO</li>
                      <li>| RED GIANT SUITE</li>
                      <li>| UNREAL ENGINE 5.4</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

function RobotCTA() {
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";
  return (
    <ScrollReveal>
      <section className="syn-home-snap-section relative z-[1] w-full h-[70vh] min-h-[500px] overflow-hidden bg-black px-6 py-10">
        <InteractiveRobotSpline
          scene={ROBOT_SCENE_URL}
          className="absolute inset-0 z-0 opacity-70 mix-blend-screen" 
        />
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-start pt-[10vh] px-4 bg-gradient-to-b from-black/80 via-transparent to-black/80">
          <div className="text-center text-white drop-shadow-xl w-full max-w-2xl mx-auto">
            <p className="font-mono text-[10px] tracking-[0.4em] text-[var(--accent-bright)] mb-4">
              INTERACTIVE 3D
            </p>
            <h1 className="font-display text-[clamp(40px,6vw,80px)] font-black uppercase tracking-widest text-[var(--text-primary)]">
              MEET <span className="text-[var(--accent)]">WHOBEE</span>
            </h1>
            <p className="font-mono text-[10px] mt-4 tracking-[0.2em] text-[var(--text-secondary)] uppercase">
              DRAG TO ROTATE
            </p>
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
      <AboutSection />
      <hr className="syn-section-divider" />
      <CapabilitiesBento />
      <hr className="syn-section-divider" />
      <FeaturedWorkSection />
      <hr className="syn-section-divider" />
      <StatsBar />
      <ProcessSection />
      <hr className="syn-section-divider" />
      <WhyChooseUsSection />
      <hr className="syn-section-divider" />
      
      <div className="relative w-full">
        <ShaderBackground />
        <div className="relative z-10">
          <TestimonialsSection />
          <PacksTeaser />
          <hr className="syn-section-divider" />
          <FAQSection />
        </div>
      </div>
      <hr className="syn-section-divider" />
      <RobotCTA />
    </div>
  );
}
