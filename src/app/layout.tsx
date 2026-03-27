import type { Metadata } from "next";
import "./globals.css";
import { AppDock } from "@/components/layout/AppDock";
import { SiteShell } from "@/components/layout/SiteShell";
import { GlobalSiteEffects } from "@/components/layout/GlobalSiteEffects";
import MaintenancePage from "@/components/pages/MaintenancePage";
import { FuturisticHUD } from "@/components/ui/FuturisticHUD";
import { Analytics } from "@vercel/analytics/next";

/* ─── flip to false when the revamp is done ─── */
const MAINTENANCE_MODE = false;

export const metadata: Metadata = {
  title: "VFXSYN // VISUAL ARCHITECT",
  description:
    "VFX Artist based in Atlanta, GA. High-end 3D animation, color grading, and music video visuals. 100M+ views generated. Redefining the aesthetic.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23020205'/><path d='M30 70 L50 30 L70 70' stroke='%236366f1' stroke-width='8' fill='none' stroke-linejoin='round'/></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@700;800;900&family=Rajdhani:wght@700&family=Share+Tech+Mono&family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col">
        {MAINTENANCE_MODE ? (
          <MaintenancePage />
        ) : (
          <>
            <FuturisticHUD />
            <GlobalSiteEffects />
            <AppDock />
            <SiteShell>{children}</SiteShell>
          </>
        )}
        <Analytics />
      </body>
    </html>
  );
}
