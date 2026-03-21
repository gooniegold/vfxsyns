"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import ShinyText from "@/components/react-bits/ShinyText";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { StarBorder } from "@/components/ui/StarBorder";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { ContactAuroraBackdrop } from "@/components/backgrounds/ContactAuroraBackdrop";
import { INSTAGRAM_URL } from "@/lib/constants";
import { MOTION_TRANSITION } from "@/lib/motion-defaults";
import { SynAnimatedList } from "@/components/ui/SynAnimatedList";

const AVAILABLE = true;

const PROJECT_TYPES = [
  "Music Video",
  "Color Grading",
  "3D VFX",
  "VFX Pack Inquiry",
  "Other",
] as const;

export function ContactView({ pageHeader }: { pageHeader?: ReactNode }) {
  const [submitted, setSubmitted] = useState(false);
  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  const [f3, setF3] = useState(false);
  const [f4, setF4] = useState(false);

  const line = (on: boolean) => ({
    borderBottomWidth: 1,
    borderBottomStyle: "solid" as const,
    borderBottomColor: on ? "var(--gold)" : "rgba(255,255,255,0.08)",
  });

  return (
    <div className="relative bg-[var(--bg-base)]">
      <ContactAuroraBackdrop />
      <div className="relative z-[1] px-6 pb-[120px] md:px-10">
      {pageHeader}

      <div className="mx-auto mt-16 grid max-w-[1200px] gap-16 lg:grid-cols-[40%_60%]">
        <aside className="relative lg:pr-12">
          <div
            className={`inline-flex min-h-[44px] items-center gap-2 border border-[var(--border-subtle)] px-4 py-2 ${
              AVAILABLE ? "text-[var(--gold)]" : "text-[var(--text-secondary)]"
            }`}
          >
            <span>●</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              {AVAILABLE ? "AVAILABLE" : "BOOKED"}
            </span>
          </div>

          <SynAnimatedList
            className="mt-10 max-w-md"
            trigger="mount"
            bullet="dot"
            items={[
              "● Based in Atlanta, GA",
              "● Started 2019",
              "● 90M+ Views Generated",
              "● 500+ Projects Completed",
              "● Available Worldwide",
            ]}
          />

          <div className="mt-12">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em]">
              <ShinyText speed={3} className="font-mono text-[9px] uppercase tracking-[0.2em]">
                INSTAGRAM
              </ShinyText>
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="gold-text-glow mt-2 inline-block underline decoration-[var(--gold)] decoration-1 underline-offset-[6px] transition-all"
            >
              <ShinyText speed={3} className="font-display text-[36px] tracking-[0.06em]">
                @vfxsyn
              </ShinyText>
            </a>
          </div>

          <p className="font-body mt-10 text-[12px] text-[var(--text-secondary)]">
            Fastest response is always Instagram DM.
          </p>

          <div
            className="pointer-events-none absolute right-0 top-[5%] hidden h-[90%] w-[2px] overflow-hidden rounded-full lg:block"
            style={{
              background:
                "linear-gradient(180deg, transparent, #D4D9E0, #B8BEC7, #6B7280, transparent)",
              backgroundSize: "100% 300%",
              animation: "saberRotate 3.5s linear infinite",
            }}
            aria-hidden
          />
        </aside>

        <div>
          <TiltGlare
            className="w-full rounded-[24px]"
            tiltAmount={6}
            tiltClassName="rounded-[24px] shadow-[0_12px_42px_rgba(0,0,0,0.5)]"
          >
            <StarBorder
              className="w-full !block rounded-[24px]"
              innerClassName="relative overflow-hidden rounded-[24px] syn-glass p-0"
            >
              <GlassCard saber={false} rounded={24} className="overflow-hidden border-0 border-transparent bg-transparent shadow-none">
                <div className="p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={MOTION_TRANSITION}
                      className="motion-gpu-hint flex min-h-[280px] flex-col items-center justify-center py-8 text-center"
                    >
                      <CheckCircle className="h-12 w-12 text-[var(--gold)]" strokeWidth={1.25} />
                      <p className="mt-6 font-display text-[60px] leading-none tracking-[0.08em] text-[var(--gold)]">
                        SENT.
                      </p>
                      <p className="font-mono mt-4 text-[13px] text-[var(--text-secondary)]">
                        I&apos;ll be in touch on Instagram soon.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { ...MOTION_TRANSITION, staggerChildren: 0.1, delayChildren: 0.05 },
                        },
                      }}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-8"
                    >
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, x: -28 },
                          show: { opacity: 1, x: 0, transition: MOTION_TRANSITION },
                        }}
                      >
                        <motion.label
                          htmlFor="nm"
                          className="font-mono mb-2 block text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                          animate={{ y: f1 ? -4 : 0, scale: f1 ? 0.92 : 1 }}
                          transition={MOTION_TRANSITION}
                          style={{ transformOrigin: "left center" }}
                        >
                          NAME
                        </motion.label>
                        <div className="syn-glass rounded px-3 py-1">
                          <input
                            id="nm"
                            name="name"
                            required
                            onFocus={() => setF1(true)}
                            onBlur={() => setF1(false)}
                            className="font-mono w-full border-0 bg-transparent py-3 text-[12px] text-[var(--text-primary)] outline-none transition-[border-color] duration-300"
                            style={line(f1)}
                          />
                        </div>
                      </motion.div>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, x: -28 },
                          show: { opacity: 1, x: 0, transition: MOTION_TRANSITION },
                        }}
                      >
                        <motion.label
                          htmlFor="ct"
                          className="font-mono mb-2 block text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                          animate={{ y: f2 ? -4 : 0, scale: f2 ? 0.92 : 1 }}
                          transition={MOTION_TRANSITION}
                          style={{ transformOrigin: "left center" }}
                        >
                          INSTAGRAM OR EMAIL
                        </motion.label>
                        <div className="syn-glass rounded px-3 py-1">
                          <input
                            id="ct"
                            name="contact"
                            required
                            onFocus={() => setF2(true)}
                            onBlur={() => setF2(false)}
                            className="font-mono w-full border-0 bg-transparent py-3 text-[12px] text-[var(--text-primary)] outline-none"
                            style={line(f2)}
                          />
                        </div>
                      </motion.div>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, x: -28 },
                          show: { opacity: 1, x: 0, transition: MOTION_TRANSITION },
                        }}
                      >
                        <motion.label
                          htmlFor="tp"
                          className="font-mono mb-2 block text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                          animate={{ y: f3 ? -4 : 0, scale: f3 ? 0.92 : 1 }}
                          transition={MOTION_TRANSITION}
                          style={{ transformOrigin: "left center" }}
                        >
                          PROJECT TYPE
                        </motion.label>
                        <div className="syn-glass rounded px-3 py-1">
                          <select
                            id="tp"
                            name="type"
                            required
                            defaultValue={PROJECT_TYPES[0]}
                            onFocus={() => setF3(true)}
                            onBlur={() => setF3(false)}
                            className="font-mono w-full cursor-pointer border-0 bg-transparent py-3 text-[12px] text-[var(--text-primary)] outline-none"
                            style={line(f3)}
                          >
                            {PROJECT_TYPES.map((t) => (
                              <option key={t} value={t} className="bg-[var(--bg-elevated)]">
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, x: -28 },
                          show: { opacity: 1, x: 0, transition: MOTION_TRANSITION },
                        }}
                      >
                        <motion.label
                          htmlFor="msg"
                          className="font-mono mb-2 block text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                          animate={{ y: f4 ? -4 : 0, scale: f4 ? 0.92 : 1 }}
                          transition={MOTION_TRANSITION}
                          style={{ transformOrigin: "left center" }}
                        >
                          MESSAGE
                        </motion.label>
                        <div className="syn-glass rounded px-3 py-1">
                          <textarea
                            id="msg"
                            name="message"
                            rows={5}
                            required
                            onFocus={() => setF4(true)}
                            onBlur={() => setF4(false)}
                            className="font-mono w-full resize-y border-0 bg-transparent py-3 text-[12px] text-[var(--text-primary)] outline-none"
                            style={line(f4)}
                          />
                        </div>
                      </motion.div>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0, transition: MOTION_TRANSITION },
                        }}
                      >
                      <GlassButton variant="gold" className="w-full justify-center" buttonType="submit">
                        SEND IT →
                      </GlassButton>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>
            </StarBorder>
          </TiltGlare>

          <p className="font-mono mt-8 text-[11px] text-[var(--text-secondary)]">
            Or just DM me directly:{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="gold-text-glow underline-offset-2 hover:underline"
            >
              <ShinyText speed={3} className="font-mono text-[11px]">
                @vfxsyn
              </ShinyText>
            </a>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
