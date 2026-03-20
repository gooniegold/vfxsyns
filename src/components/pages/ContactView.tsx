"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import BorderGlow from "@/components/react-bits/BorderGlow";
import GradientText from "@/components/react-bits/GradientText";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { TiltGlare } from "@/components/ui/TiltGlare";
import { INSTAGRAM_URL } from "@/lib/constants";
import { SYN_BORDER_GLOW_HSL, SYN_GOLD_GRADIENT, SYN_GOLD_MESH } from "@/lib/syn-styles";

const AVAILABLE = true;

const ease = [0.16, 1, 0.3, 1] as const;

const PROJECT_TYPES = [
  "Music Video",
  "Color Grading",
  "3D VFX",
  "VFX Pack Inquiry",
  "Other",
] as const;

export function ContactView() {
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
    <div className="relative bg-[var(--bg-base)] px-6 py-[120px] md:px-10">
      <motion.div
        className="mx-auto max-w-[1200px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <GradientText
          className="font-display text-[clamp(56px,8vw,120px)] leading-none tracking-[0.06em]"
          colors={[...SYN_GOLD_GRADIENT]}
          direction="diagonal"
          gradientAngle={135}
        >
          LET&apos;S TALK
        </GradientText>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-[1200px] gap-16 lg:grid-cols-[40%_60%]">
        <aside className="relative lg:pr-12">
          <div
            className={`inline-flex min-h-[44px] items-center gap-2 border border-[var(--border-subtle)] px-4 py-2 ${
              AVAILABLE ? "text-emerald-400" : "text-amber-500"
            }`}
          >
            <span>●</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              {AVAILABLE ? "AVAILABLE" : "BOOKED"}
            </span>
          </div>

          <div className="mt-12">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]">INSTAGRAM</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="gold-text-glow mt-2 inline-block underline decoration-[var(--gold)] decoration-1 underline-offset-[6px] transition-all"
            >
              <GradientText
                className="font-display text-[36px] tracking-[0.06em]"
                colors={[...SYN_GOLD_GRADIENT]}
                direction="diagonal"
                gradientAngle={135}
              >
                @vfxsyn
              </GradientText>
            </a>
          </div>

          <div className="mt-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]">BASED IN</p>
            <p className="font-display mt-2 text-[36px] text-[var(--text-primary)]">
              Atlanta, GA
            </p>
          </div>

          <p className="font-body mt-10 text-[12px] text-[var(--text-secondary)]">
            Fastest response is always Instagram DM.
          </p>

          <div
            className="pointer-events-none absolute right-0 top-[5%] hidden h-[90%] w-[2px] overflow-hidden rounded-full lg:block"
            style={{
              background: "linear-gradient(180deg, transparent, #ffd97d, #ff9a3c, #c8a96e, transparent)",
              backgroundSize: "100% 300%",
              animation: "saberRotate 3.5s linear infinite",
            }}
            aria-hidden
          />
        </aside>

        <div>
          <BorderGlow
            borderRadius={24}
            backgroundColor="var(--bg-card)"
            glowColor={SYN_BORDER_GLOW_HSL}
            colors={[...SYN_GOLD_MESH]}
            glowIntensity={0.52}
            coneSpread={22}
            edgeSensitivity={26}
            fillOpacity={0.28}
            className="border-[var(--border-subtle)] !shadow-none"
          >
            <TiltGlare className="rounded-[inherit]" tiltAmount={6}>
              <GlassCard saber={false} rounded={24} className="overflow-hidden border-0 border-transparent bg-transparent shadow-none">
                <div className="p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease }}
                      className="flex min-h-[280px] flex-col items-center justify-center py-8 text-center"
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
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-8"
                    >
                      <div>
                        <motion.label
                          htmlFor="nm"
                          className="font-mono mb-2 block text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                          animate={{ y: f1 ? -4 : 0, scale: f1 ? 0.92 : 1 }}
                          transition={{ duration: 0.2, ease }}
                          style={{ transformOrigin: "left center" }}
                        >
                          NAME
                        </motion.label>
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
                      <div>
                        <motion.label
                          htmlFor="ct"
                          className="font-mono mb-2 block text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                          animate={{ y: f2 ? -4 : 0, scale: f2 ? 0.92 : 1 }}
                          transition={{ duration: 0.2, ease }}
                          style={{ transformOrigin: "left center" }}
                        >
                          INSTAGRAM OR EMAIL
                        </motion.label>
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
                      <div>
                        <motion.label
                          htmlFor="tp"
                          className="font-mono mb-2 block text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                          animate={{ y: f3 ? -4 : 0, scale: f3 ? 0.92 : 1 }}
                          transition={{ duration: 0.2, ease }}
                          style={{ transformOrigin: "left center" }}
                        >
                          PROJECT TYPE
                        </motion.label>
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
                      <div>
                        <motion.label
                          htmlFor="msg"
                          className="font-mono mb-2 block text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                          animate={{ y: f4 ? -4 : 0, scale: f4 ? 0.92 : 1 }}
                          transition={{ duration: 0.2, ease }}
                          style={{ transformOrigin: "left center" }}
                        >
                          MESSAGE
                        </motion.label>
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
                      <GlassButton variant="gold" className="w-full justify-center" buttonType="submit">
                        SEND IT →
                      </GlassButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>
            </TiltGlare>
          </BorderGlow>

          <p className="font-mono mt-8 text-[11px] text-[var(--text-secondary)]">
            Or just DM me directly:{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="gold-text-glow text-[var(--gold)] underline-offset-2 hover:underline"
            >
              @vfxsyn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
