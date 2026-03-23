"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Film, ShoppingBag, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { path: "/", label: "HOME", Icon: Home },
  { path: "/portfolio", label: "WORK", Icon: Film },
  { path: "/shop", label: "SHOP", Icon: ShoppingBag },
  { path: "/contact", label: "CONTACT", Icon: Mail },
] as const;

function isActivePath(pathname: string, path: string) {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function AppDock() {
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed right-8 top-8 z-[9999] flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[rgba(3,3,8,0.8)] p-2 shadow-[0_32px_64px_rgba(0,0,0,0.5)] backdrop-blur-xl"
    >
      {NAV.map(({ path, label, Icon }) => {
        const active = isActivePath(pathname, path);
        return (
          <button
            key={path}
            type="button"
            onClick={() => router.push(path)}
            onMouseEnter={() => setHovered(path)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300",
              active ? "text-white" : "text-[var(--text-secondary)] hover:text-white"
            )}
            title={label}
          >
            <AnimatePresence>
              {active && (
                <motion.div
                  layoutId="dock-bg"
                  className="absolute inset-0 z-0 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-bright)] opacity-100"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {hovered === path && !active && (
                <motion.div
                  layoutId="dock-hover"
                  className="absolute inset-0 z-0 rounded-full bg-white/5"
                  transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            <Icon className="relative z-10 h-[18px] w-[18px]" strokeWidth={2} />
            
            <AnimatePresence>
              {hovered === path && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.8 }}
                  className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--border-accent)] bg-[rgba(3,3,8,0.9)] px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.2em] text-[var(--accent-bright)] backdrop-blur-md"
                >
                  {label}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </nav>
  );
}
