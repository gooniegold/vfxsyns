import type { Metadata } from "next";
import "./globals.css";
import { AppDock } from "@/components/layout/AppDock";
import { SiteShell } from "@/components/layout/SiteShell";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Italiana&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <AppDock />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
