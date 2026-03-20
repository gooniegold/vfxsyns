"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FuzzyText from "@/components/react-bits/FuzzyText";

const SESSION_KEY = "vfxsyn-session-loaded";

export function SiteIntroLoader() {
  const [show, setShow] = useState(false);
  const [fuzzyPhase, setFuzzyPhase] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }
    setShow(true);
  }, []);

  const close = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  useEffect(() => {
    if (!fuzzyPhase) return;
    const t = window.setTimeout(() => close(), 520);
    return () => clearTimeout(t);
  }, [fuzzyPhase]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--bg-base)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {!fuzzyPhase ? (
            <>
              <motion.p
                className="font-hero text-[var(--gold)]"
                style={{ fontSize: "clamp(80px, 16vw, 200px)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                VFXSYN
              </motion.p>
              <div className="mt-10 h-px w-[220px] max-w-[70vw] overflow-hidden bg-[rgba(191,160,106,0.25)]">
                <motion.div
                  className="hero-gold-line h-full w-full bg-[var(--gold)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left center" }}
                  onAnimationComplete={() => setFuzzyPhase(true)}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <FuzzyText
                fontSize={72}
                fontWeight={400}
                fontFamily="var(--font-hero), sans-serif"
                color="var(--gold)"
                enableHover
                baseIntensity={0.22}
                hoverIntensity={0.52}
                glitchMode
                glitchInterval={280}
                glitchDuration={160}
                fuzzRange={22}
                className="mx-auto block max-w-[90vw]"
              >
                VFXSYN
              </FuzzyText>
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
