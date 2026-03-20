"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { StatementStrip } from "@/components/sections/StatementStrip";
import BorderGlow from "@/components/react-bits/BorderGlow";
import GradientText from "@/components/react-bits/GradientText";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { INSTAGRAM_URL } from "@/lib/constants";
import { SYN_BORDER_GLOW_HSL, SYN_GOLD_GRADIENT, SYN_GOLD_MESH } from "@/lib/syn-styles";
import {
  PORTFOLIO_VIDEO_1_MUSIC,
  PORTFOLIO_VIDEO_2_MUSIC,
  PORTFOLIO_VIDEO_3_COLOR,
  PORTFOLIO_VIDEO_4_COLOR,
  PORTFOLIO_VIDEO_5_3D,
  PORTFOLIO_VIDEO_6_3D,
} from "@/lib/portfolio-media";
import { cn } from "@/lib/utils";

const HeroBackground = dynamic(
  () => import("@/components/hero/HeroBackground").then((m) => m.HeroBackground),
  { ssr: false },
);

const ease = [0.16, 1, 0.3, 1] as const;

const MARQUEE = [
  "MUSIC VIDEOS",
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
  { title: "Video 1", category: "MUSIC VIDEO", videoSrc: PORTFOLIO_VIDEO_1_MUSIC },
  { title: "Video 2", category: "MUSIC VIDEO", videoSrc: PORTFOLIO_VIDEO_2_MUSIC },
  { title: "Color Grade 1", category: "COLOR GRADE", videoSrc: PORTFOLIO_VIDEO_3_COLOR },
  { title: "Color Grade 2", category: "COLOR GRADE", videoSrc: PORTFOLIO_VIDEO_4_COLOR },
  { title: "Showcase 1", category: "3D VFX", videoSrc: PORTFOLIO_VIDEO_5_3D },
  { title: "Showcase 2", category: "3D VFX", videoSrc: PORTFOLIO_VIDEO_6_3D },
] as const;

const PACKS = [
  { name: "CINEMATIC DUST", desc: "Particles, dust, debris", tag: "38 ASSETS" },
  { name: "GLITCH PACK VOL.1", desc: "Glitch transitions", tag: "24 ASSETS" },
  { name: "MUSIC VID ESSENTIALS", desc: "Leaks, overlays, grades", tag: "52 ASSETS" },
];

function HeroSection() {
  return (
    <ScrollReveal>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <HeroBackground />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(191,160,106,0.06)_0%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.7)_100%)]"
        aria-hidden
      />
      <div className="relative z-[10] flex min-h-screen w-full max-w-[1100px] flex-col items-center justify-center px-6 py-24">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          ● ATLANTA, GA — VFX ARTIST
        </motion.p>

        <div className="mx-auto mt-4 flex max-w-[95vw] flex-wrap justify-center gap-[0.04em]">
          {"VFXSYN".split("").map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              className="font-hero inline-block text-[clamp(100px,18vw,240px)] text-gradient"
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.55, ease, delay: 0.12 + i * 0.06 }}
            >
              {ch}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="font-body mt-6 max-w-2xl px-2 text-[clamp(14px,1.8vw,20px)] italic leading-relaxed text-[var(--text-secondary)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.5 }}
        >
          3D Animations · Color Grading · Music Videos
        </motion.p>

        <motion.div
          className="hero-gold-line mx-auto mt-7 h-px w-10 bg-[var(--gold)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.65 }}
          style={{ transformOrigin: "center" }}
        />

        <motion.div
          className="mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.8 }}
        >
          <Link
            href="/portfolio"
            data-cursor="hover"
            className="btn-gold-glow font-strong min-h-[44px] w-full max-w-[260px] border border-[var(--border-gold)] bg-transparent px-7 py-[14px] text-[10px] font-bold tracking-[0.25em] text-[var(--text-gold)] transition-all duration-200 hover:border-[var(--gold)] hover:bg-[var(--gold-glow)] sm:w-auto"
          >
            VIEW WORK
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="btn-gold-glow font-strong min-h-[44px] w-full max-w-[260px] bg-[var(--gold)] px-9 py-[14px] text-[10px] font-bold tracking-[0.25em] text-[#050505] transition-transform duration-200 hover:scale-[1.02] hover:bg-[var(--gold-bright)] sm:w-auto"
          >
            GET IN TOUCH
          </a>
          <Link
            href="/shop"
            data-cursor="hover"
            className="btn-gold-glow font-strong min-h-[44px] w-full max-w-[260px] border border-[var(--border-subtle)] bg-transparent px-7 py-[14px] text-[10px] font-bold tracking-[0.25em] text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--border-gold)] hover:text-[var(--text-gold)] sm:w-auto"
          >
            VIEW SHOP
          </Link>
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
  return (
    <ScrollReveal>
      <section
        className="group border-y border-[var(--border-gold)] bg-[rgba(191,160,106,0.04)] py-5"
        aria-label="Ticker"
      >
        <div className="syn-curved-marquee overflow-hidden">
          <div className="syn-curved-marquee-track">
            <div className="flex w-max gap-10 [animation:vfxsyn-marquee_40s_linear_infinite] motion-reduce:transform-none group-hover:[animation-play-state:paused] md:gap-12">
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
                        "font-ui inline-block text-[13px] uppercase tracking-[0.22em] text-[var(--gold)] md:text-[15px]",
                        t === "·" && "syn-marquee-bullet px-1 font-bold",
                      )}
                    >
                      {t}
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
  const [flash30, setFlash30] = useState(false);

  return (
    <ScrollReveal>
    <section
      className="pointer-events-none relative border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-20"
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
                colors={[...SYN_GOLD_GRADIENT]}
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
                  flash30 && "stat-count-flash",
                )}
                colors={[...SYN_GOLD_GRADIENT]}
                direction="diagonal"
                gradientAngle={135}
              >
                <span className="inline-block">
                  <CountUp end={30} suffix="+" duration={2} onComplete={() => setFlash30(true)} />
                </span>
              </GradientText>
            ),
            label: "MUSIC VIDEOS",
          },
          {
            el: (
              <Link href="/shop" data-cursor="hover" className="inline-block transition-opacity hover:opacity-90">
                <GradientText
                  className="font-ui text-[clamp(32px,7vw,56px)] font-bold leading-tight tracking-tight md:text-[clamp(40px,8vw,64px)]"
                  colors={[...SYN_GOLD_GRADIENT]}
                  direction="diagonal"
                  gradientAngle={135}
                >
                  VFX PACKS
                </GradientText>
              </Link>
            ),
            label: "AVAILABLE",
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
                <GradientText
                  className="font-ui text-[clamp(40px,8vw,56px)] font-bold"
                  colors={[...SYN_GOLD_GRADIENT]}
                  direction="diagonal"
                  gradientAngle={135}
                >
                  @vfxsyn
                </GradientText>
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
  return (
    <ScrollReveal delay={delay}>
      <BorderGlow
        borderRadius={16}
        backgroundColor="var(--bg-card)"
        glowColor={SYN_BORDER_GLOW_HSL}
        colors={[...SYN_GOLD_MESH]}
        glowIntensity={0.5}
        coneSpread={22}
        edgeSensitivity={26}
        fillOpacity={0.3}
        className="group border-[var(--border-subtle)] !shadow-none transition-colors duration-300 hover:border-[var(--border-gold)]"
      >
        <TiltGlare className="rounded-[inherit]" tiltAmount={7}>
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
            <div className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] bg-gradient-to-br from-[rgba(191,160,106,0.04)_0%,transparent_50%] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative w-full overflow-hidden bg-[#0a0a0a]">
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                {!videoFailed ? (
                  <video
                    src={p.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="card-preview-video h-full w-full transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={() => {
                      console.warn("[VFXSYN] Featured video failed:", p.title, p.videoSrc);
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
              <span className="font-mono absolute left-3 top-3 z-[3] bg-[rgba(5,5,5,0.75)] px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-[var(--gold)]">
                {p.category}
              </span>
              <ArrowUpRight
                className="absolute right-3 top-3 z-[3] h-5 w-5 text-[var(--gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                strokeWidth={1.5}
              />
            </div>
            <div className="relative z-[1] p-6">
              <h3 className="font-strong text-[22px] text-[var(--text-primary)]">{p.title}</h3>
            </div>
          </Link>
        </TiltGlare>
      </BorderGlow>
    </ScrollReveal>
  );
}

function FeaturedWorkSection() {
  return (
    <ScrollReveal>
    <section className="relative px-6 py-[120px] md:px-10">
      <div className="relative mx-auto max-w-[1400px]">
        <span className="section-ghost-num">01</span>
        <ScrollReveal>
          <p className="font-mono relative z-[1] text-[10px] tracking-[0.4em] text-[var(--gold)]">
            <span className="text-gradient">● SELECTED WORK</span>
          </p>
          <motion.div
            className="relative z-[1] mt-4"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
          >
            <GradientText
              className="font-display text-[clamp(56px,8vw,120px)] tracking-[0.05em]"
              colors={[...SYN_GOLD_GRADIENT]}
              direction="diagonal"
              gradientAngle={135}
            >
              WORK WITH ME
            </GradientText>
          </motion.div>
        </ScrollReveal>
        <div className="relative z-[1] mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED.slice(0, 3).map((p, i) => (
            <FeaturedCard key={p.title} p={p} delay={i * 0.06} />
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
    <section className="relative px-6 py-[120px] md:px-10">
      <div className="relative mx-auto max-w-[1400px]">
        <span className="section-ghost-num">02</span>
        <ScrollReveal>
          <p className="font-mono relative z-[1] text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
            <span className="text-gradient">● DIGITAL PRODUCTS</span>
          </p>
          <motion.h2
            className="font-display text-gradient relative z-[1] mt-4 text-[clamp(56px,8vw,120px)]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
          >
            VFX PACKS
          </motion.h2>
          <p className="font-body relative z-[1] mt-4 max-w-lg text-[13px] text-[var(--text-secondary)]">
            Instant delivery via Shopify checkout — powered by Stripe.
          </p>
        </ScrollReveal>
        <div className="relative z-[1] mt-14 grid gap-8 md:grid-cols-3">
          {PACKS.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.1}>
              <BorderGlow
                borderRadius={16}
                backgroundColor="var(--bg-card)"
                glowColor={SYN_BORDER_GLOW_HSL}
                colors={[...SYN_GOLD_MESH]}
                glowIntensity={0.5}
                coneSpread={22}
                edgeSensitivity={26}
                fillOpacity={0.28}
                className="border-[var(--border-subtle)] !shadow-none"
              >
                <TiltGlare className="rounded-[inherit]" tiltAmount={7}>
                  <div className="p-6">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--gold)]">{p.tag}</span>
                    <h3 className="font-ui mt-3 text-[22px] text-[var(--text-primary)]">{p.name}</h3>
                    <p className="font-body mt-2 text-[12px] text-[var(--text-secondary)]">{p.desc}</p>
                    <Link
                      href="/shop"
                      data-cursor="hover"
                      className="font-ui btn-gold-glow mt-6 inline-block border border-[var(--border-gold)] px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[var(--gold)] hover:bg-[var(--gold-glow)]"
                    >
                      OPEN SHOP →
                    </Link>
                  </div>
                </TiltGlare>
              </BorderGlow>
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
    <>
      <HeroSection />
      <MarqueeStrip />
      <FeaturedWorkSection />
      <StatsBar />
      <StatementStrip />
      <WhyChooseUsSection />
      <PacksTeaser />
      <FAQSection />
    </>
  );
}
