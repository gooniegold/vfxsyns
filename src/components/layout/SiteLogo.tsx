"use client";

import Link from "next/link";

export function SiteLogo() {
  return (
    <Link
      href="/"
      data-cursor="hover"
      className="fixed left-8 top-[max(1.25rem,env(safe-area-inset-top,0px))] z-[125] font-display text-[18px] tracking-[0.1em] text-[var(--gold)] transition-opacity hover:opacity-90 md:left-8"
    >
      VFXSYN
    </Link>
  );
}
