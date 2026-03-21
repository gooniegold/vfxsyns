"use client";

import { useRef, type CSSProperties } from "react";
import {
  BentoCardGrid,
  DEFAULT_SPOTLIGHT_RADIUS,
  GlobalSpotlight,
  ParticleCard,
  useMobileBentoDetection,
} from "@/components/magic-bento-core";
import GradientText from "@/components/react-bits/GradientText";
import ShinyText from "@/components/react-bits/ShinyText";
import { StarBorder } from "@/components/ui/StarBorder";
import { CountUp } from "@/components/ui/CountUp";
import { AboutProfileCard } from "@/components/vfxsyn/AboutProfileCard";
import { INSTAGRAM_URL } from "@/lib/constants";
import { SYN_STAT_GRADIENT } from "@/lib/syn-styles";
import "@/components/MagicBento.css";

const BENTO_GLOW_RGB = "184, 190, 199";

const PROFILE_QUOTE =
  "Born in Egypt, raised with a vision. I picked up editing in 2019 and never stopped. What started as curiosity became a craft — and that craft became VFXSYN. Six years of building, experimenting, and pushing visuals to places they have never been. From Cairo to Atlanta, every project carries that hunger. 3D animation, color grading, music videos — this is not just work. This is the language I speak.";

function bentoCardBase(extra: string) {
  return `magic-bento-card magic-bento-card--border-glow ${extra}`;
}

export function AboutMagicBento() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileBentoDetection();
  const disableFx = isMobile;
  return (
    <>
      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={disableFx}
        enabled
        spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
        glowColor={BENTO_GLOW_RGB}
      />
      <BentoCardGrid gridRef={gridRef} className="vfxsyn-about-bento">
        <ParticleCard
          className={bentoCardBase("about-bento-profile p-0")}
          style={{ "--glow-color": BENTO_GLOW_RGB } as CSSProperties}
          disableAnimations={disableFx}
          particleCount={8}
          glowColor={BENTO_GLOW_RGB}
          enableTilt={false}
          clickEffect={false}
          enableMagnetism={false}
        >
          <AboutProfileCard />
        </ParticleCard>

        <div className={bentoCardBase("about-bento-quote flex justify-center")}>
          <p className="font-display m-0 max-w-none p-5 italic leading-[1.85] text-[clamp(14px,1.35vw,17px)] text-[var(--text-secondary)]">
            {PROFILE_QUOTE}
          </p>
        </div>

        <div className={bentoCardBase("about-bento-s1 flex flex-col justify-center p-5")}>
          <p className="font-display m-0 text-[clamp(28px,4vw,40px)] leading-none">
            <GradientText
              className="font-display text-[clamp(28px,4vw,40px)] leading-none font-normal"
              colors={[...SYN_STAT_GRADIENT]}
              direction="diagonal"
              gradientAngle={135}
              animationSpeed={12}
            >
              <CountUp end={90} suffix="M+" duration={2} />
            </GradientText>
          </p>
          <p className="font-ui mt-2 text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">Views</p>
        </div>

        <div className={bentoCardBase("about-bento-s2 flex flex-col justify-center p-5")}>
          <p className="font-display m-0 text-[clamp(28px,4vw,40px)] leading-none">
            <GradientText
              className="font-display text-[clamp(28px,4vw,40px)] leading-none font-normal"
              colors={[...SYN_STAT_GRADIENT]}
              direction="diagonal"
              gradientAngle={135}
              animationSpeed={12}
            >
              <CountUp end={500} suffix="+" duration={2} />
            </GradientText>
          </p>
          <p className="font-ui mt-2 text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">Projects</p>
        </div>

        <div className={bentoCardBase("about-bento-s3 flex flex-col justify-center p-5")}>
          <p className="font-display m-0 text-[clamp(28px,4vw,40px)] leading-none">
            <GradientText
              className="font-display text-[clamp(28px,4vw,40px)] leading-none font-normal"
              colors={[...SYN_STAT_GRADIENT]}
              direction="diagonal"
              gradientAngle={135}
              animationSpeed={12}
            >
              <CountUp end={6} suffix="+" duration={2} />
            </GradientText>
          </p>
          <p className="font-ui mt-2 text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">Since 2019</p>
        </div>

        <ParticleCard
          className={bentoCardBase("about-bento-ig p-0")}
          style={{ "--glow-color": BENTO_GLOW_RGB } as CSSProperties}
          disableAnimations={disableFx}
          particleCount={8}
          glowColor={BENTO_GLOW_RGB}
          enableTilt={false}
          clickEffect={false}
          enableMagnetism={false}
        >
          <StarBorder
            className="h-full min-h-[120px] w-full !block rounded-[8px]"
            innerClassName="about-bento-ig-pulse h-full rounded-[8px] border border-[var(--border-gold)] bg-transparent p-0"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="flex h-full min-h-[120px] flex-col items-center justify-center gap-2 p-6 text-center no-underline transition-colors hover:opacity-95"
            >
              <span className="font-display text-[clamp(28px,4vw,42px)] tracking-[0.06em]">
                <ShinyText speed={3} className="font-display text-[clamp(28px,4vw,42px)] tracking-[0.06em]">
                  @vfxsyn
                </ShinyText>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                DM for bookings
              </span>
            </a>
          </StarBorder>
        </ParticleCard>
      </BentoCardGrid>
    </>
  );
}
