"use client";

import { useState } from "react";
import { StarBorder } from "@/components/ui/StarBorder";
import { TiltGlare } from "@/components/ui/TiltGlare";

/** Discord CDN — if this 404s, initials fallback shows. */
export const PROFILE_CARD_PHOTO_URL =
  "https://cdn.discordapp.com/attachments/1151336465805086720/1484370407870959666/IMG_0588.jpg?ex=69bdfb2b&is=69bca9ab&hm=acf1eb5b68f306a4b562e9ec76add7daaef16d614e4c30ed5f82ff251d773531&";

export function AboutProfileCard() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <TiltGlare
      className="h-full min-h-0 w-full rounded-[8px]"
      tiltClassName="h-full min-h-0 rounded-[8px] [transform-style:preserve-3d]"
      tiltAmount={7}
      glareColor="rgba(184,190,199,0.18)"
    >
      <StarBorder
        className="group/profile h-full min-h-0 w-full !block rounded-[8px]"
        innerClassName="flex h-full min-h-0 flex-col gap-4 rounded-[8px] border border-[rgba(184,190,199,0.08)] bg-[rgba(14,14,14,0.6)] p-4 backdrop-blur-[12px] transition-[box-shadow] duration-300 sm:flex-row sm:items-center"
      >
        <div className="relative mx-auto h-[100px] w-[100px] shrink-0 sm:mx-0 sm:h-[120px] sm:w-[120px]">
          <div
            className="pointer-events-none absolute -inset-[2px] z-[2] rounded-[10px] border border-[rgba(184,190,199,0.06)] opacity-70"
            aria-hidden
          />
          <div
            className="relative h-full w-full overflow-hidden rounded-[8px] border border-[rgba(184,190,199,0.08)] bg-[rgba(10,10,10,0.5)]"
            aria-hidden
          >
            <div className="profile-photo-gold-shimmer" aria-hidden />
            {!photoFailed ? (
              <img
                src={PROFILE_CARD_PHOTO_URL}
                alt=""
                className="relative z-[1] h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  setPhotoFailed(true);
                }}
              />
            ) : (
              <span className="font-ui relative z-[1] flex h-full w-full items-center justify-center text-[22px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                VS
              </span>
            )}
          </div>
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="font-display text-[clamp(22px,3vw,30px)] tracking-[0.08em] text-[var(--text-primary)]">
            VFXSYN
          </p>
          <p className="font-body mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
            VFX Artist · Colorist · Director
          </p>
          <p className="font-mono mt-3 text-[10px] tracking-[0.25em] text-[var(--text-secondary)]">ATLANTA, GA</p>
        </div>
      </StarBorder>
    </TiltGlare>
  );
}

export { AboutProfileCard as ProfileCard };
