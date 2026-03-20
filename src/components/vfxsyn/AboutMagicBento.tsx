"use client";

import { useRef, useState, type CSSProperties } from "react";
import {
  BentoCardGrid,
  DEFAULT_SPOTLIGHT_RADIUS,
  GlobalSpotlight,
  ParticleCard,
  useMobileBentoDetection,
} from "@/components/magic-bento-core";
import { StarBorder } from "@/components/ui/StarBorder";
import { INSTAGRAM_URL } from "@/lib/constants";
import "@/components/MagicBento.css";

const PROFILE_PHOTO_SRC =
  "https://cdn.discordapp.com/attachments/1151336465805086720/1484370407870959666/IMG_0588.jpg?ex=69bdfb2b&is=69bca9ab&hm=acf1eb5b68f306a4b562e9ec76add7daaef16d614e4cbed5f82ff251d773531&";

const BENTO_GLOW_RGB = "200, 169, 110";

const PROFILE_QUOTE =
  "Born in Egypt, raised with a vision. I picked up editing in 2019 and never stopped. What started as curiosity became a craft — and that craft became VFXSYN. Six years of building, experimenting, and pushing visuals to places they have never been. From Cairo to Atlanta, every project carries that hunger. 3D animation, color grading, music videos — this is not just work. This is the language I speak.";

function bentoCardBase(extra: string) {
  return `magic-bento-card magic-bento-card--border-glow ${extra}`;
}

export function AboutMagicBento() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileBentoDetection();
  const disableFx = isMobile;
  const [photoFailed, setPhotoFailed] = useState(false);

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
          className={bentoCardBase("about-bento-profile")}
          style={{ "--glow-color": BENTO_GLOW_RGB } as CSSProperties}
          disableAnimations={disableFx}
          particleCount={8}
          glowColor={BENTO_GLOW_RGB}
          enableTilt={false}
          clickEffect={false}
          enableMagnetism={false}
        >
          <StarBorder
            className="h-full min-h-0 w-full !block rounded-[8px]"
            innerClassName="flex h-full min-h-0 flex-col gap-4 rounded-[8px] border-0 bg-[var(--bg-card)] p-4 sm:flex-row sm:items-center"
          >
            <div
              className="relative mx-auto h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[8px] border border-[var(--border-gold)] bg-[var(--bg-elevated)] sm:mx-0 sm:h-[120px] sm:w-[120px]"
              aria-hidden
            >
              {!photoFailed ? (
                <img
                  src={PROFILE_PHOTO_SRC}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <span className="font-ui flex h-full w-full items-center justify-center text-[22px] uppercase tracking-[0.12em] text-[var(--gold)]">
                  VS
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h3 className="font-display text-[clamp(22px,3vw,30px)] tracking-[0.08em] text-[var(--text-primary)]">
                VFXSYN
              </h3>
              <p className="font-body mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                VFX Artist · Colorist · Director
              </p>
              <p className="font-mono mt-3 text-[10px] tracking-[0.25em] text-[var(--gold)]">ATLANTA, GA</p>
            </div>
          </StarBorder>
        </ParticleCard>

        <div className={bentoCardBase("about-bento-quote flex justify-center")}>
          <p className="font-display m-0 max-w-none p-5 italic leading-[1.85] text-[clamp(14px,1.35vw,17px)] text-[var(--text-secondary)]">
            {PROFILE_QUOTE}
          </p>
        </div>

        <div className={bentoCardBase("about-bento-s1 flex flex-col justify-center p-5")}>
          <p className="font-display text-gradient m-0 text-[clamp(28px,4vw,40px)] leading-none">90M+</p>
          <p className="font-ui mt-2 text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">Views</p>
        </div>

        <div className={bentoCardBase("about-bento-s2 flex flex-col justify-center p-5")}>
          <p className="font-display text-gradient m-0 text-[clamp(28px,4vw,40px)] leading-none">500+</p>
          <p className="font-ui mt-2 text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">Projects</p>
        </div>

        <div className={bentoCardBase("about-bento-s3 flex flex-col justify-center p-5")}>
          <p className="font-display text-gradient m-0 text-[clamp(28px,4vw,40px)] leading-none">6+</p>
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
            innerClassName="h-full rounded-[8px] border border-[var(--border-gold)] bg-[var(--bg-card)] p-0 shadow-[0_0_28px_rgba(200,169,110,0.14)]"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="flex h-full min-h-[120px] flex-col items-center justify-center gap-2 p-6 text-center no-underline transition-colors hover:opacity-95"
            >
              <span className="font-display text-[clamp(28px,4vw,42px)] tracking-[0.06em] text-[var(--gold)]">
                @vfxsyn
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
