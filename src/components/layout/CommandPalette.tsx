"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Home, Mail, ShoppingBag, ExternalLink, Shield } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/constants";
import { MOTION_TRANSITION } from "@/lib/motion-defaults";
import { cn } from "@/lib/utils";

const ACTIONS = [
  { label: "Go to Home", path: "/", keys: "H", Icon: Home },
  { label: "Go to Work", path: "/portfolio", keys: "W", Icon: Film },
  { label: "Go to Shop", path: "/shop", keys: "S", Icon: ShoppingBag },
  { label: "Go to Contact", path: "/contact", keys: "C", Icon: Mail },
  { label: "Open Control Panel", path: "/vfxsyn-control", keys: "A", Icon: Shield },
  { label: "Open Instagram", href: INSTAGRAM_URL, external: true, keys: "I", Icon: ExternalLink },
] as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(0);
  const router = useRouter();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        const k = e.key.toLowerCase();
        if (["h", "w", "s", "c", "a"].includes(k) && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
          const map: Record<string, string> = { h: "/", w: "/portfolio", s: "/shop", c: "/contact", a: "/vfxsyn-control" };
          const path = map[k];
          if (path) {
            e.preventDefault();
            router.push(path);
          }
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((i) => (i + 1) % ACTIONS.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((i) => (i - 1 + ACTIONS.length) % ACTIONS.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const a = ACTIONS[sel];
        if ("path" in a && a.path) router.push(a.path);
        else if ("href" in a && a.href) window.open(a.href, "_blank", "noopener,noreferrer");
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, router, sel]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal
          aria-label="Command menu"
          className="fixed inset-0 z-[100020] flex items-start justify-center bg-[rgba(5,5,5,0.72)] px-4 pb-8 pt-[min(18vh,120px)] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={MOTION_TRANSITION}
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={MOTION_TRANSITION}
            className="w-full max-w-md overflow-hidden rounded-xl border border-[var(--border-gold)] bg-[rgba(10,10,10,0.95)] shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="border-b border-[var(--border-subtle)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Quick navigation
            </p>
            <ul className="max-h-[min(60vh,420px)] overflow-y-auto py-2">
              {ACTIONS.map((a, i) => {
                const Icon = a.Icon;
                return (
                  <li key={a.label}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-3 text-left font-mono text-[12px] text-[var(--text-primary)] transition-colors",
                        i === sel ? "bg-[rgba(184,190,199,0.1)] text-[var(--gold)]" : "hover:bg-[rgba(184,190,199,0.06)]",
                      )}
                      onMouseEnter={() => setSel(i)}
                      onClick={() => {
                        if ("path" in a && a.path) router.push(a.path);
                        else if ("href" in a && a.href) window.open(a.href, "_blank", "noopener,noreferrer");
                        close();
                      }}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.35} />
                      <span className="flex-1">{a.label}</span>
                      <kbd className="rounded border border-[var(--border-subtle)] px-1.5 py-0.5 text-[9px] text-[var(--text-secondary)]">
                        {a.keys}
                      </kbd>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="border-t border-[var(--border-subtle)] px-4 py-2 font-mono text-[9px] text-[var(--text-secondary)]">
              <kbd className="rounded border border-[var(--border-subtle)] px-1">↑</kbd>{" "}
              <kbd className="rounded border border-[var(--border-subtle)] px-1">↓</kbd> navigate ·{" "}
              <kbd className="rounded border border-[var(--border-subtle)] px-1">↵</kbd> open ·{" "}
              <kbd className="rounded border border-[var(--border-subtle)] px-1">esc</kbd> close
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
