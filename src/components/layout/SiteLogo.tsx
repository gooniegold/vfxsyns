"use client";

import Link from "next/link";
import ShinyText from "@/components/react-bits/ShinyText";

export function SiteLogo() {
  return (
    <Link
      href="/"
      data-cursor="hover"
      className="transition-opacity hover:opacity-90"
      style={{
        position: "fixed",
        top: 24,
        left: 32,
        zIndex: 9999,
      }}
    >
      <span className="syn-logo-pill">
        <ShinyText speed={3} className="font-display text-[18px] tracking-[0.1em]">
          VFXSYN
        </ShinyText>
      </span>
    </Link>
  );
}
