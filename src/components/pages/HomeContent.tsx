"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
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
import { BorderBeam } from "@/components/react-bits/BorderBeam";
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
import { cn } from "@/lib/utils";
import { FeaturedProductCard } from "@/components/home/FeaturedProductCard";
import { Component as AboutHoverCard } from "@/components/ui/avatar-hover-card";

const MARQUEE = ["ATL", "VFX", "COLOR", "MUSIC VIDEO", "3D", "VFXSYN", "SHOP", "AUTO-MVE"] as const;

const FEATURED = [
  { title: "JAKK MOVE", category: "MUSIC VIDEO", videoSrc: LAZERDIM_JAKKMOVE, artist: "LAZERDIM700" },
  { title: "DIAMOND", category: "MUSIC VIDEO", videoSrc: SIYAH_XO, artist: "SIYAH XO" },
  { title: "SHOWREEL", category: "VFX SHOWCASE", videoSrc: SHOWREEL_VIDEO, artist: "VFXSYN" },
] as const;

function HeroSection() {
  return (
    <section className="relative z-[1] min-h-[100svh] w-full px-5 pb-16 pt-8 md:px-10 md:pb-24 md:pt-12">
      <div className="mx-auto grid max-w-[1400px] min-h-[min(100svh,920px)] gap-10 lg:grid-cols-[1fr_min(420px,38vw)] lg:items-center lg:gap-14">
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--accent)]">
            Atlanta · post house
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92] tracking-[0.02em] text-[var(--text-primary)]">
            VISUAL
            <br />
            <span className="text-[var(--accent)]">FINISHING</span>
          </h1>
          <p className="mt-6 max-w-md font-body text-[15px] leading-relaxed text-[var(--text-secondary)] md:text-[16px]">
            Portfolio-first site with a real shop lane. Same team: color, comp, CG when it counts—and{" "}
            <span className="text-[var(--text-primary)]">AUTO-MVE</span> when we ship the plugin line.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              data-cursor="hover"
              className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-[var(--accent)] px-8 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0c] transition hover:bg-[var(--accent-bright)]"
            >
              View work
            </Link>
            <Link
              href="/shop"
              data-cursor="hover"
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] px-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-primary)] transition hover:border-[var(--border-accent)]"
            >
              Shop
            </Link>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex min-h-[48px] items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold)] underline-offset-4 hover:underline"
            >
              @vfxsyn
            </a>
          </div>
        </div>

        <div className="flex items-stretch lg:min-h-[420px]">
          <FeaturedProductCard className="w-full" />
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const prefersReducedMotion = useReducedMotion();
  const marqueeSec = useMarqueeScrollSpeed(36);
  return (
    <ScrollReveal>
      <section
        className="relative z-[1] border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-4"
        aria-label="Ticker"
      >
        <div className="overflow-hidden">
          <div
            className="flex w-max gap-8 motion-reduce:transform-none md:gap-12"
            style={{
              animation: prefersReducedMotion
                ? "vfxsyn-marquee 40s linear infinite"
                : `vfxsyn-marquee ${marqueeSec}s linear infinite`,
            }}
          >
            {[0, 1].map((c) => (
              <div key={c} className="flex gap-8 pr-8 md:gap-12 md:pr-12">
                {MARQUEE.map((t, i) => (
                  <span
                    key={`${c}-${i}-${t}`}
                    className="font-display text-[clamp(1.25rem,3vw,1.75rem)] tracking-[0.12em] text-[var(--text-dim)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
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
      <section className="relative z-[1] px-5 py-20 md:px-10" aria-label="Stats">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-[var(--glass-elev-shadow)]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                el: (
                  <GradientText
                    className={cn(
                      "font-ui text-[clamp(40px,8vw,64px)] font-bold tabular-nums",
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
                label: "Views (est.)",
              },
              {
                el: (
                  <GradientText
                    className={cn(
                      "font-ui text-[clamp(40px,8vw,64px)] font-bold tabular-nums",
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
                label: "Shipped pieces",
              },
              {
                el: (
                  <GradientText
                    className={cn(
                      "font-ui text-[clamp(40px,8vw,64px)] font-bold tabular-nums",
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
                label: "Years in post",
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
                    <ShinyText speed={3} className="font-ui text-[clamp(36px,7vw,52px)] font-bold">
                      @vfxsyn
                    </ShinyText>
                  </a>
                ),
                label: "Instagram",
              },
            ].map((row, i) => (
              <ScrollReveal
                key={row.label}
                delay={i * 0.06}
                className={cn(
                  "flex flex-col gap-2 border-[var(--border-subtle)] p-8 md:p-10",
                  i > 0 && "sm:border-l",
                  i >= 2 ? "pointer-events-auto" : "pointer-events-none",
                )}
              >
                {row.el}
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-dim)]">
                  {row.label}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

function FeaturedCard({ p, delay, large }: { p: (typeof FEATURED)[number]; delay: number; large?: boolean }) {
  return (
    <ScrollReveal delay={delay}>
      <TiltedCard
        className={cn("group/card w-full rounded-2xl", large && "min-h-[320px] lg:min-h-[480px]")}
        rotateAmount={8}
        scaleOnHover={1.01}
        glareOpacity={0.15}
      >
        <div className="syn-card-premium !block overflow-hidden border border-[var(--border-accent)] bg-[var(--bg-card)] backdrop-blur-xl">
          <Link href="/portfolio" data-cursor="hover" className="group relative block text-left no-underline">
            <div className="relative w-full overflow-hidden bg-[#050508]">
              <div
                className={cn("relative w-full overflow-hidden", large ? "aspect-[21/9] lg:aspect-auto lg:min-h-[360px]" : "aspect-video")}
              >
                <iframe
                  src={p.videoSrc}
                  title={`${p.title} preview`}
                  loading="lazy"
                  allow="autoplay"
                  className="pointer-events-none absolute inset-0 h-full w-full border-0 [transform:scale(1.04)]"
                />
              </div>
              <div className="absolute left-4 top-4 z-[4]">
                <span className="font-mono border border-[var(--border-subtle)] bg-black/70 px-3 py-1.5 text-[8px] uppercase tracking-[0.28em] text-[var(--accent-bright)] backdrop-blur-md">
                  {p.category}
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md">
                  <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" strokeWidth={0} aria-hidden />
                </div>
              </div>
              <ArrowUpRight className="absolute right-4 top-4 z-[4] h-5 w-5 text-[var(--accent)] opacity-0 transition-all group-hover:opacity-100" strokeWidth={1.5} />
            </div>
            <div className="relative z-[1] p-6 md:p-8">
              <h3 className="font-display text-[1.35rem] tracking-[0.03em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] md:text-[1.5rem]">
                {p.title}
              </h3>
              {"artist" in p ? (
                <p className="font-mono mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">{p.artist}</p>
              ) : null}
            </div>
          </Link>
          <BorderBeam size={160} duration={6} delay={delay + 0.5} colorFrom="var(--accent)" colorTo="var(--accent-secondary)">
            <div className="absolute inset-0" />
          </BorderBeam>
        </div>
      </TiltedCard>
    </ScrollReveal>
  );
}

function FeaturedWorkSection() {
  const [a, b, c] = FEATURED;
  return (
    <ScrollReveal>
      <section className="relative z-[1] px-5 py-24 md:px-10 md:py-32">
        <div className="relative mx-auto max-w-[1400px]">
          <div className="mb-14 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">Portfolio</p>
            <motion.h2
              className="font-display mt-3 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[0.02em]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={motionTransition()}
            >
              <HoverSplitHeading
                text="SELECTED CUTS"
                speed={2.5}
                className="font-display text-[clamp(2.5rem,6vw,4.5rem)] tracking-[0.02em]"
              />
            </motion.h2>
            <p className="mt-4 font-body text-[15px] text-[var(--text-secondary)]">
              Three recent pieces—full grid lives on the work page.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:gap-8">
            <div className="lg:col-span-2 lg:row-span-2">
              <FeaturedCard p={a} delay={0} large />
            </div>
            <div className="lg:col-span-1">
              <FeaturedCard p={b} delay={0.08} />
            </div>
            <div className="lg:col-span-1">
              <FeaturedCard p={c} delay={0.12} />
            </div>
          </div>

          <div className="mt-12 flex justify-end">
            <Link
              href="/portfolio"
              data-cursor="hover"
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)] hover:text-[var(--accent-bright)]"
            >
              All projects →
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

function AboutSection() {
  return (
    <ScrollReveal>
      <section id="about" className="relative z-[1] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-16 lg:flex-row-reverse lg:items-center lg:gap-20">
          <div className="flex w-full justify-center lg:w-1/2">
            <AboutHoverCard
              imageSrc={ABOUT_ME_PHOTO}
              name="VFXSYN"
              username="vfxsyn"
              description="VFX, color, finishing—music work first, brand when it fits."
              buttonText="Open portfolio"
              variant="glass"
              size="xl"
              onButtonClick={() => {
                window.location.href = "/portfolio";
              }}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">Studio</p>
            <h2 className="font-display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95] tracking-[0.02em]">
              POST FOR RELEASES
            </h2>
            <div className="mt-8 space-y-5 font-body text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <p>
                Remote-friendly, Atlanta-based. We care about how the grade sits in the chorus and whether the comp survives
                full-screen—not deck slides.
              </p>
              <div className="grid grid-cols-2 gap-10 pt-2">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Scope</span>
                  <ul className="mt-3 space-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                    <li>3D · comp · grade</li>
                    <li>MV + rollout</li>
                  </ul>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Tools</span>
                  <ul className="mt-3 space-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                    <li>AE · Resolve · Blender</li>
                    <li>Premiere · MD</li>
                  </ul>
                </div>
              </div>
            </div>
            <Link
              href="/shop"
              data-cursor="hover"
              className="mt-10 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] hover:underline"
            >
              Shop tools →
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

function ShopTeaserStrip() {
  return (
    <ScrollReveal>
      <section className="relative z-[1] px-5 py-20 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 rounded-2xl border border-[var(--border-subtle)] bg-[linear-gradient(135deg,rgba(255,78,54,0.08),rgba(99,102,241,0.06))] p-10 md:flex-row md:items-center md:p-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-dim)]">Digital</p>
            <h3 className="font-display mt-2 text-[clamp(1.75rem,4vw,2.5rem)] tracking-[0.02em]">QuickDraft + packs</h3>
            <p className="mt-3 max-w-xl font-body text-[14px] text-[var(--text-secondary)]">
              Licenses, checkout, downloads—AUTO-MVE will live here too when it ships.
            </p>
          </div>
          <Link
            href="/shop"
            data-cursor="hover"
            className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-md border border-[var(--border-accent)] bg-[var(--bg-elevated)] px-10 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-primary)] transition hover:bg-[var(--accent)] hover:text-[#0a0a0c]"
          >
            Enter shop
          </Link>
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
      <StatsBar />
      <FeaturedWorkSection />
      <AboutSection />
      <CapabilitiesBento />
      <ProcessSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ShopTeaserStrip />
      <FAQSection />
    </div>
  );
}
