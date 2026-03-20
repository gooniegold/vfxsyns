"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: "How do I order custom VFX work?",
    a: "DM @vfxsyn on Instagram. Tell me your project, timeline, and references. I will get back to you fast.",
  },
  {
    q: "What software do you use?",
    a: "Houdini, Blender, After Effects, DaVinci Resolve. Tools depend on what the project actually needs.",
  },
  {
    q: "How long does a project take?",
    a: "Depends on scope. A color grade can be done in days. A full 3D simulation scene takes longer. Rush options are available — just ask.",
  },
  {
    q: "Do the VFX packs work with my software?",
    a: "Yes. Packs are delivered as video files (ProRes/MOV) and work in Premiere, After Effects, Final Cut, DaVinci, and anything else that reads video.",
  },
  {
    q: "Can I use your packs for commercial projects?",
    a: "Yes. Once you buy, the license covers unlimited commercial use including music videos, ads, and client work.",
  },
  {
    q: "Do you work with artists outside Atlanta?",
    a: "All the time. Based in Atlanta, working globally. Everything is remote-friendly.",
  },
];

export function FAQSection({ id = "faq" }: { id?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ScrollReveal>
    <section id={id} className="relative px-6 py-[120px] md:px-10">
      <div className="relative mx-auto max-w-[900px]">
        <span className="section-ghost-num">04</span>
        <ScrollReveal>
          <p className="font-mono relative z-[1] text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
            <span className="text-gradient">● FAQ</span>
          </p>
          <motion.h2
            className="font-display text-gradient relative z-[1] mt-4 text-[clamp(48px,8vw,72px)] font-bold"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
          >
            QUESTIONS
          </motion.h2>
        </ScrollReveal>

        <div className="relative z-[1] mt-12 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={item.q} delay={i * 0.05}>
                <div
                  data-cursor="hover"
                  className={cn(
                    "border bg-[var(--bg-card)] transition-[border-color,box-shadow]",
                    isOpen ? "border-[var(--border-gold)] shadow-[var(--shadow-gold)]" : "border-[var(--border-subtle)] hover:border-[var(--border-gold)]",
                  )}
                >
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 p-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-mono text-[13px] text-[var(--text-primary)]">{item.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="h-5 w-5 shrink-0 text-[var(--gold)]" strokeWidth={1.5} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="font-mono border-t border-[var(--border-subtle)] px-5 pb-5 pt-4 text-[13px] leading-[1.75] text-[var(--text-secondary)]">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}
