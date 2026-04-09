"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Film, ShoppingBag, Mail, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV = [
  { path: "/", label: "Home", Icon: Home },
  { path: "/portfolio", label: "Work", Icon: Film },
  { path: "/shop", label: "Shop", Icon: ShoppingBag },
  { path: "/contact", label: "Contact", Icon: Mail },
  { path: "/vfxsyn-control", label: "Admin", Icon: Shield },
] as const;

export function AppDock() {
  const pathname = usePathname();

  return (
    <div className="fixed right-5 top-5 z-[9999] md:right-8 md:top-7">
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-0.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--glass-bg)] px-1.5 py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl md:gap-1 md:px-2"
      >
        {NAV.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              data-cursor="hover"
              className={cn(
                "relative flex items-center gap-2 rounded-lg px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors md:px-3.5 md:py-2.5 md:text-[10px]",
                active
                  ? "bg-[var(--accent)] text-[#0a0a0c]"
                  : "text-[var(--text-secondary)] hover:bg-white/[0.06] hover:text-[var(--text-primary)]",
              )}
            >
              <item.Icon className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={1.5} aria-hidden />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
