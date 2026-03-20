import { FilmGrain } from "./FilmGrain";
import { ScrollProgress } from "./ScrollProgress";
import { GoldArrowTrail } from "./GoldArrowTrail";
import { SiteLogo } from "./SiteLogo";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { GlobalLines } from "./GlobalLines";
import { GoldGlowBlob } from "./GoldGlowBlob";
import { SiteIntroLoader } from "./SiteIntroLoader";
import { LogoLoopStrip } from "./LogoLoopStrip";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(184,190,199,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "gridDrift 20s linear infinite",
        }}
      />
      <SiteIntroLoader />
      <GoldGlowBlob />
      <GlobalLines />
      <ScrollProgress />
      <FilmGrain />
      <GoldArrowTrail />
      <SiteLogo />
      <main className="relative z-[10] flex min-h-screen flex-col pb-12 pt-[calc(120px+env(safe-area-inset-top,0px))]">
        <PageTransition>{children}</PageTransition>
      </main>
      <LogoLoopStrip />
      <Footer />
    </>
  );
}
