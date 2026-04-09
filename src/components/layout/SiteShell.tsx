import { VignetteOverlay } from "./VignetteOverlay";
import { ScrollProgress } from "./ScrollProgress";
import { SiteLogo } from "./SiteLogo";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { SiteIntroLoader } from "./SiteIntroLoader";
import { LogoLoopStrip } from "./LogoLoopStrip";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,78,54,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          animation: "gridDrift 24s linear infinite",
        }}
      />
      <SiteIntroLoader />
      <ScrollProgress />
      <VignetteOverlay />
      <SiteLogo />
      <main className="relative z-[10] flex min-h-screen flex-col pb-16 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] md:pb-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <LogoLoopStrip />
      <Footer />
    </>
  );
}
