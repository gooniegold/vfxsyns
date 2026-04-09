import type { Metadata } from "next";
import "./globals.css";
import { AppDock } from "@/components/layout/AppDock";
import { SiteShell } from "@/components/layout/SiteShell";
import { GlobalSiteEffects } from "@/components/layout/GlobalSiteEffects";
import MaintenancePage from "@/components/pages/MaintenancePage";

/* ─── flip to false when the revamp is done ─── */
const MAINTENANCE_MODE = false;

export const metadata: Metadata = {
  title: "VFXSYN — Portfolio & Shop",
  description:
    "Atlanta-based VFX, color, and finishing for music videos and releases. Portfolio work plus QuickDraft tools—one-off purchase, instant download.",
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
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%2324d29b'/><stop offset='1' stop-color='%2370d8ff'/></linearGradient></defs><rect width='100' height='100' rx='20' fill='%2305070a'/><rect x='6' y='6' width='88' height='88' rx='16' fill='none' stroke='url(%23g)' stroke-width='3' opacity='.8'/><path d='M28 72 L50 30 L72 72' stroke='url(%23g)' stroke-width='8' fill='none' stroke-linejoin='round'/></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col">
        {MAINTENANCE_MODE ? (
          <MaintenancePage />
        ) : (
          <>
            <GlobalSiteEffects />
            <AppDock />
            <SiteShell>{children}</SiteShell>
          </>
        )}
      </body>
    </html>
  );
}
