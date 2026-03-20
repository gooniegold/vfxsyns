"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

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
      className="pointer-events-none fixed left-0 right-0 top-1/2 z-[99990] h-[2px] -translate-y-1/2"
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
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease }}
          className="relative w-full min-h-min shrink-0 flex-1 overflow-visible"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
