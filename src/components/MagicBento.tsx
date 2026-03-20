"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import {
  BentoCardGrid,
  DEFAULT_GLOW_COLOR,
  DEFAULT_PARTICLE_COUNT,
  DEFAULT_SPOTLIGHT_RADIUS,
  GlobalSpotlight,
  ParticleCard,
  useMobileBentoDetection,
} from "@/components/magic-bento-core";

const cardData = [
  { color: "#050505", title: "Analytics", description: "Track user behavior", label: "Insights" },
  { color: "#050505", title: "Dashboard", description: "Centralized data view", label: "Overview" },
  { color: "#050505", title: "Collaboration", description: "Work together seamlessly", label: "Teamwork" },
  { color: "#050505", title: "Automation", description: "Streamline workflows", label: "Efficiency" },
  { color: "#050505", title: "Integration", description: "Connect favorite tools", label: "Connectivity" },
  { color: "#050505", title: "Security", description: "Enterprise-grade protection", label: "Protection" },
];

/** React Bits Magic Bento — default demo grid (scoped under `.magic-bento-demo`). */
export default function MagicBento({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}: {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileBentoDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      {enableSpotlight ? (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      ) : null}

      <BentoCardGrid gridRef={gridRef} className="magic-bento-demo">
        {cardData.map((card, index) => {
          const baseClassName = `magic-bento-card ${textAutoHide ? "magic-bento-card--text-autohide" : ""} ${enableBorderGlow ? "magic-bento-card--border-glow" : ""}`;
          const styleWithGlow: CSSProperties = {
            backgroundColor: card.color,
            ...({ "--glow-color": glowColor } as CSSProperties),
          };

          if (enableStars) {
            return (
              <ParticleCard
                key={index}
                className={baseClassName}
                style={styleWithGlow}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                <div className="magic-bento-card__header">
                  <div className="magic-bento-card__label">{card.label}</div>
                </div>
                <div className="magic-bento-card__content">
                  <h2 className="magic-bento-card__title">{card.title}</h2>
                  <p className="magic-bento-card__description">{card.description}</p>
                </div>
              </ParticleCard>
            );
          }

          return (
            <div key={index} className={baseClassName} style={styleWithGlow}>
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">{card.label}</div>
              </div>
              <div className="magic-bento-card__content">
                <h2 className="magic-bento-card__title">{card.title}</h2>
                <p className="magic-bento-card__description">{card.description}</p>
              </div>
            </div>
          );
        })}
      </BentoCardGrid>
    </>
  );
}
