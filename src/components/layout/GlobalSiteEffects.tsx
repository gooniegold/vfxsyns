"use client";

import { SynCustomCursor } from "@/components/react-bits/SynCustomCursor";
import { BackToTop } from "@/components/layout/BackToTop";
import { PageLoadNotification } from "@/components/layout/PageLoadNotification";
import { CommandPalette } from "@/components/layout/CommandPalette";

export function GlobalSiteEffects() {
  return (
    <>
      <SynCustomCursor />
      <CommandPalette />
      <BackToTop />
      <PageLoadNotification />
    </>
  );
}
