import type { Metadata } from "next";
import { Oswald, Outfit, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { getSiteOrigin } from "@/lib/site";
import "./globals.css";
import { AppDock } from "@/components/layout/AppDock";
import { SiteShell } from "@/components/layout/SiteShell";
import { GlobalSiteEffects } from "@/components/layout/GlobalSiteEffects";
import MaintenancePage from "@/components/pages/MaintenancePage";
import { Analytics } from "@vercel/analytics/next";

const fontDisplay = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["400", "500", "600", "700"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

/* ─── flip to false when the revamp is done ─── */
const MAINTENANCE_MODE = false;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
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
    <html
      lang="en"
      className={cn(
        "h-full scroll-smooth",
        fontDisplay.variable,
        fontSans.variable,
        fontMono.variable,
      )}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23a855f7'/><stop offset='1' stop-color='%238b5cf6'/></linearGradient></defs><rect width='100' height='100' rx='20' fill='%2306040f'/><rect x='6' y='6' width='88' height='88' rx='16' fill='none' stroke='url(%23g)' stroke-width='3' opacity='.9'/><path d='M28 72 L50 30 L72 72' stroke='url(%23g)' stroke-width='8' fill='none' stroke-linejoin='round'/></svg>"
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
        <Analytics />
      </body>
    </html>
  );
}
