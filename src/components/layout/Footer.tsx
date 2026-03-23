"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ShinyText from "@/components/react-bits/ShinyText";
import { INSTAGRAM_URL } from "@/lib/constants";
import { motionTransition } from "@/lib/motion-defaults";

const nav = [
  { href: "/", label: "HOME" },
  { href: "/portfolio", label: "WORK" },
  { href: "/shop", label: "SHOP" },
  { href: "/contact", label: "CONTACT" },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      ref={ref}
      className="syn-footer-wave relative border-t border-[var(--border-subtle)] px-6 pb-8 pt-20 md:px-10"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-3">
        <div>
          <p className="hero-title-breathe text-[22px]">
            <ShinyText speed={3} className="font-display tracking-[0.08em]">
              VFXSYN
            </ShinyText>
          </p>
          <p className="font-mono mt-3 text-[9px] leading-relaxed tracking-[0.2em] text-[var(--text-secondary)]">
            Atlanta, GA | VFX | Color | Direction
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {nav.map((item, i) => (
            <motion.div
              key={item.href}
              className="motion-gpu-hint"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={motionTransition(i * 0.08)}
            >
              <Link
                href={item.href}
                data-cursor="hover"
                className="nav-link-syn font-strong w-fit text-[10px] font-semibold tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--gold)]"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
        <div>
          <motion.p
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={motionTransition(0.32)}
          >
            <ShinyText speed={3} className="font-mono text-[9px] uppercase tracking-[0.2em]">
              INSTAGRAM
            </ShinyText>
          </motion.p>
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="font-mono mt-2 inline-block text-[12px] transition-opacity hover:opacity-90"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={motionTransition(0.4)}
          >
            <ShinyText speed={3} className="font-mono text-[12px]">
              @vfxsyn
            </ShinyText>
          </motion.a>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col justify-between gap-4 border-t border-[var(--border-accent)] pt-8 sm:flex-row">
        <p className="font-mono text-[9px] text-[var(--text-secondary)]">© 2026 VFXSYN</p>
        <p className="font-mono text-[9px] text-[var(--text-secondary)]">Atlanta, GA</p>
      </div>
    </footer>
  );
}
