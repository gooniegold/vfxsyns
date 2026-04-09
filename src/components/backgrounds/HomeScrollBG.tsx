"use client";

import { useEffect, useState } from "react";
import { SoftAuroraBG } from "@/components/backgrounds/SoftAuroraBG";
import { LightPillarBG } from "@/components/backgrounds/LightPillarBG";
import { FloatingLinesBG } from "@/components/backgrounds/FloatingLinesBG";

type Zone = "hero" | "work" | "stats" | "about" | "difference" | "packs" | "faq";

function zoneFromScroll(): Zone {
  const y = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const h = Math.max(1, scrollable);
  const pct = y / h;
  if (pct < 0.12) return "hero";
  if (pct < 0.25) return "work";
  if (pct < 0.38) return "stats";
  if (pct < 0.52) return "about";
  if (pct < 0.65) return "difference";
  if (pct < 0.78) return "packs";
  return "faq";
}

export function HomeScrollBG() {
  const [zone, setZone] = useState<Zone>("hero");

  useEffect(() => {
    let ticking = false;
    let last: Zone = "hero";

    const commit = () => {
      ticking = false;
      const next = zoneFromScroll();
      if (next !== last) {
        last = next;
        setZone(next);
      }
    };

    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(commit);
    };

    commit();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler, { passive: true });
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        transition: "opacity 0.8s ease",
      }}
      aria-hidden
    >
      {/* Hero — existing particles in HeroSection; no extra layer */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: zone === "work" ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
        }}
      >
        <LightPillarBG />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: zone === "stats" || zone === "about" ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
        }}
      >
        <SoftAuroraBG />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: zone === "difference" ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
        }}
      >
        <FloatingLinesBG />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: zone === "packs" ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
        }}
      >
        <LightPillarBG />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: zone === "faq" ? 0.5 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
        }}
      >
        <SoftAuroraBG />
      </div>
    </div>
  );
}
