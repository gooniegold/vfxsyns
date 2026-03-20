"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function RouteGoldSweep({ pathname }: { pathname: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (first.current) {
      first.current = false;
      return;
    }
    host.classList.remove("syn-route-sweep-active");
    requestAnimationFrame(() => {
      void host.offsetWidth;
      host.classList.add("syn-route-sweep-active");
    });
  }, [pathname]);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none fixed left-0 right-0 z-[99990] h-[2px]"
      style={{ top: "50%", marginTop: -1 }}
      aria-hidden
    >
      <div className="syn-route-sweep-inner" />
    </div>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <RouteGoldSweep pathname={pathname} />
      <div className="relative w-full min-h-min shrink-0 flex-1 overflow-visible">{children}</div>
    </>
  );
}
