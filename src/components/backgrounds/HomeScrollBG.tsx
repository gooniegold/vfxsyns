"use client";

import { useEffect, useState } from "react";
import { SoftAuroraBG } from "@/components/backgrounds/SoftAuroraBG";
import { LightPillarBG } from "@/components/backgrounds/LightPillarBG";
import { FloatingLinesBG } from "@/components/backgrounds/FloatingLinesBG";

type Zone = "hero" | "work" | "stats" | "about" | "difference" | "packs" | "faq";

export function HomeScrollBG() {
  const [zone, setZone] = useState<Zone>("hero");

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const h = Math.max(1, scrollable);
      const pct = y / h;

      if (pct < 0.12) setZone("hero");
      else if (pct < 0.25) setZone("work");
      else if (pct < 0.38) setZone("stats");
      else if (pct < 0.52) setZone("about");
      else if (pct < 0.65) setZone("difference");
      else if (pct < 0.78) setZone("packs");
      else setZone("faq");
    };

    handler();
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
