"use client";

import { SynCustomCursor } from "@/components/react-bits/SynCustomCursor";
import { BackToTop } from "@/components/layout/BackToTop";
import { PageLoadNotification } from "@/components/layout/PageLoadNotification";

export function GlobalSiteEffects() {
  return (
    <>
      <SynCustomCursor />
      <BackToTop />
      <PageLoadNotification />
    </>
  );
}
