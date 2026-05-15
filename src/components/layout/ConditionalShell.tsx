"use client";

import { usePathname } from "next/navigation";
import { AppDock } from "./AppDock";
import { SiteShell } from "./SiteShell";

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    // Homepage gets no dock, no shell — just the raw children
    return <>{children}</>;
  }

  return (
    <>
      <AppDock />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
