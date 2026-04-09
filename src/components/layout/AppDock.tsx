"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Film, ShoppingBag, Mail, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/react-bits/MagneticButton";

const NAV = [
  { path: "/", label: "HOME", Icon: Home },
  { path: "/portfolio", label: "WORK", Icon: Film },
  { path: "/shop", label: "SHOP", Icon: ShoppingBag },
  { path: "/contact", label: "CONTACT", Icon: Mail },
  { path: "/vfxsyn-control", label: "CONTROL", Icon: Shield },
] as const;

export function AppDock() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed bottom-10 left-1/2 z-[9999] -translate-x-1/2">
      <motion.nav 
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="syn-glass flex items-center gap-1 rounded-full border border-[var(--border-accent)] bg-[rgba(3,3,8,0.7)] p-2 shadow-[0_32px_64px_rgba(0,0,0,0.6),0_0_40px_-10px_var(--accent-glow)] backdrop-blur-3xl"
      >
        {NAV.map((item) => {
          const active = pathname === item.path;
          return (
            <div key={item.path} className="relative">
              <MagneticButton>
                <Link
                  href={item.path}
                  onMouseEnter={() => setHovered(item.path)}
                  onMouseLeave={() => setHovered(null)}
                  data-cursor="hover"
                  className={cn(
                    "group relative flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-full transition-all duration-300",
                    active ? "text-[var(--accent-bright)]" : "text-[var(--text-secondary)] hover:text-white"
                  )}
                >
                  <motion.div
                    animate={active ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                    className="relative z-10"
                  >
                    <item.Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_10px_var(--accent)]")} strokeWidth={1.5} />
                  </motion.div>
                  
                  <span className="font-mono text-[7px] font-bold uppercase tracking-[0.2em] opacity-30 transition-opacity duration-300 group-hover:opacity-100">
                    {item.label}
                  </span>

                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 z-0 rounded-full bg-[var(--accent-dim)] border border-[var(--border-accent)]"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                </Link>
              </MagneticButton>

              <AnimatePresence>
                {hovered === item.path && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.8 }}
                    className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--border-accent)] bg-[rgba(3,3,8,0.95)] px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.3em] text-[var(--accent-bright)] shadow-2xl backdrop-blur-md"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.nav>
    </div>
  );
}
