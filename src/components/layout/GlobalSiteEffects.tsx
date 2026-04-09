"use client";

import { BackToTop } from "@/components/layout/BackToTop";
import { PageLoadNotification } from "@/components/layout/PageLoadNotification";
import { CommandPalette } from "@/components/layout/CommandPalette";

export function GlobalSiteEffects() {
  return (
    <>
      <CommandPalette />
      <BackToTop />
      <PageLoadNotification />
    </>
  );
}
