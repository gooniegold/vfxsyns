"use client";

import Link from "next/link";
import ShinyText from "@/components/react-bits/ShinyText";

export function SiteLogo() {
  return (
    <Link
      href="/"
      data-cursor="hover"
      className="transition-opacity duration-300 hover:scale-[1.03] hover:opacity-90"
      style={{
        position: "fixed",
        top: 24,
        left: 32,
        zIndex: 9999,
      }}
    >
      <span className="syn-logo-pill border-[var(--border-accent)] shadow-[0_0_22px_rgba(36,210,155,0.22)]">
        <ShinyText speed={3} className="font-display text-[18px] tracking-[0.1em] text-[var(--text-primary)]">
          VFXSYN
        </ShinyText>
      </span>
    </Link>
  );
}
