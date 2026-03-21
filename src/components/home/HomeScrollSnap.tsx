"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Enables vertical scroll snap on the home route only */
export function HomeScrollSnap() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") return;
    document.documentElement.classList.add("syn-home-snap");
    return () => document.documentElement.classList.remove("syn-home-snap");
  }, [pathname]);
  return null;
}
