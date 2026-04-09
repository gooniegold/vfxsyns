"use client";

import { useEffect } from "react";

/** Keep native browser scrolling behavior. */
export function HomeScrollSnap() {
  useEffect(() => {
    // Ensure no stale class remains from older builds.
    document.documentElement.classList.remove("syn-home-snap");

    return () => {
      document.documentElement.classList.remove("syn-home-snap");
    };
  }, []);
  return null;
}
