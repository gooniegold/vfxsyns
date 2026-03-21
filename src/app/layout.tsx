import type { Metadata } from "next";
import "./globals.css";
import { AppDock } from "@/components/layout/AppDock";
import { MagneticDockWrap } from "@/components/layout/MagneticDockWrap";
import { SiteShell } from "@/components/layout/SiteShell";
import { GlobalSiteEffects } from "@/components/layout/GlobalSiteEffects";

export const metadata: Metadata = {
  title: "SYN",
  description:
    "VFXSYN — Atlanta VFX artist. 3D animation, color grading, music videos, and VFX packs.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
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
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='%23B8BEC7'>S</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@700;800;900&family=Rajdhani:wght@700&family=Share+Tech+Mono&family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <GlobalSiteEffects />
        <MagneticDockWrap>
          <AppDock />
        </MagneticDockWrap>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
