"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { INSTAGRAM_URL } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

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
      className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 pb-8 pt-20 md:px-10"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-3">
        <div>
          <p className="font-display hero-title-breathe text-gradient text-[22px] tracking-[0.08em]">VFXSYN</p>
          <p className="font-mono mt-3 text-[9px] leading-relaxed tracking-[0.2em] text-[var(--text-secondary)]">
            Atlanta, GA · VFX · Color · Direction
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {nav.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease, delay: i * 0.08 }}
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
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]">
            <span className="text-gradient">INSTAGRAM</span>
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="font-mono mt-2 inline-block text-[12px] text-gradient transition-opacity hover:opacity-90"
          >
            @vfxsyn
          </a>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 sm:flex-row">
        <p className="font-mono text-[9px] text-[var(--text-secondary)]">© 2025 VFXSYN</p>
        <p className="font-mono text-[9px] text-[var(--text-secondary)]">Atlanta, GA</p>
      </div>
    </footer>
  );
}
