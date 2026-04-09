"use client";

import Link from "next/link";

export function SiteLogo() {
  return (
    <Link
      href="/"
      data-cursor="hover"
      className="fixed left-5 top-6 z-[9999] transition-opacity hover:opacity-85 md:left-8 md:top-7"
    >
      <span className="font-display text-[1.35rem] leading-none tracking-[0.08em] text-[var(--text-primary)] md:text-[1.5rem]">
        VFXSYN
      </span>
      <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.35em] text-[var(--text-dim)]">
        studio
      </span>
    </Link>
  );
}
