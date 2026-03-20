"use client";

import Link from "next/link";

export function SiteLogo() {
  return (
    <Link
      href="/"
      data-cursor="hover"
      className="font-display text-[18px] tracking-[0.1em] text-[var(--gold)] transition-opacity hover:opacity-90"
      style={{
        position: "fixed",
        top: 24,
        left: 32,
        zIndex: 9999,
      }}
    >
      VFXSYN
    </Link>
  );
}
