import { FilmGrain } from "./FilmGrain";
import { ScrollProgress } from "./ScrollProgress";
import { GoldArrowTrail } from "./GoldArrowTrail";
import { SiteLogo } from "./SiteLogo";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { SmoothScroll } from "./SmoothScroll";
import { GlobalLines } from "./GlobalLines";
import { GoldGlowBlob } from "./GoldGlowBlob";
import { SiteIntroLoader } from "./SiteIntroLoader";
import { AppDock } from "./AppDock";
import { LogoLoopStrip } from "./LogoLoopStrip";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteIntroLoader />
      <GoldGlowBlob />
      <GlobalLines />
      <SmoothScroll />
      <ScrollProgress />
      <FilmGrain />
      <GoldArrowTrail />
      <SiteLogo />
      <main className="relative z-[10] flex min-h-screen flex-col pb-12 pt-[calc(120px+env(safe-area-inset-top,0px))]">
        <PageTransition>{children}</PageTransition>
      </main>
      <LogoLoopStrip />
      <Footer />
      <AppDock />
    </>
  );
}
