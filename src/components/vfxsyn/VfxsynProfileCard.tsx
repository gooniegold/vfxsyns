"use client";

import { useState } from "react";
import BorderGlow from "@/components/react-bits/BorderGlow";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { SYN_BORDER_GLOW_HSL, SYN_GOLD_MESH } from "@/lib/syn-styles";

const PROFILE_PHOTO_SRC =
  "https://cdn.discordapp.com/attachments/1151336465805086720/1484370407870959666/IMG_0588.jpg?ex=69bdfb2b&is=69bca9ab&hm=acf1eb5b68f306a4b562e9ec76add7daaef16d614e4c30ed5f82ff251d773531&";

export function VfxsynProfileCard() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <BorderGlow
      borderRadius={20}
      backgroundColor="var(--bg-card)"
      glowColor={SYN_BORDER_GLOW_HSL}
      colors={[...SYN_GOLD_MESH]}
      glowIntensity={0.55}
      coneSpread={22}
      edgeSensitivity={26}
      fillOpacity={0.35}
      className="max-w-md border-[var(--border-subtle)]"
    >
      <TiltGlare className="rounded-[inherit]" tiltAmount={7}>
        <div className="rounded-[inherit] p-8">
          <div className="flex gap-5">
            <div
              className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-card)]"
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
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[26px] tracking-[0.08em] text-[var(--text-primary)]">
                VFXSYN
              </h3>
              <p className="font-body mt-2 text-[12px] leading-relaxed text-[var(--text-secondary)]">
                VFX Artist · Colorist · Director
              </p>
              <p className="font-mono mt-3 text-[10px] tracking-[0.25em] text-[var(--gold)]">ATLANTA, GA</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--border-subtle)] pt-6">
            <div>
              <p className="font-ui text-[28px] font-bold tracking-wide text-[var(--gold)]">90M+</p>
              <p className="font-ui mt-1 text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">VIEWS</p>
            </div>
            <div>
              <p className="font-ui text-[28px] font-bold tracking-wide text-[var(--gold)]">8+ Years</p>
              <p className="font-ui mt-1 text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                Experience
              </p>
            </div>
          </div>
        </div>
      </TiltGlare>
    </BorderGlow>
  );
}
