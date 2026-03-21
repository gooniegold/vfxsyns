"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeMatchMedia } from "@/lib/safe-media";

export function PageLoadNotification() {
  const [open, setOpen] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    return subscribeMatchMedia("(prefers-reduced-motion: reduce)", setReduced);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 600);
    const dismiss = window.setTimeout(() => setOpen(false), 4600);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(dismiss);
    };
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="status"
          initial={reduced ? false : { opacity: 0, y: 24, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed bottom-6 right-6 z-[9997] max-w-[min(92vw,320px)] rounded-md border border-[var(--border-gold)] bg-[rgba(5,5,5,0.92)] px-4 py-3 shadow-[0_12px_48px_rgba(0,0,0,0.55)] backdrop-blur-md"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">
            VFXSYN — Now accepting projects
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
