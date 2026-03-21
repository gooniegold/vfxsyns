"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Film, ShoppingBag, Mail } from "lucide-react";
import Dock from "@/components/react-bits/Dock";
import { subscribeMatchMedia } from "@/lib/safe-media";
import { cn } from "@/lib/utils";

const NAV = [
  { path: "/", label: "HOME", Icon: Home },
  { path: "/portfolio", label: "WORK", Icon: Film },
  { path: "/shop", label: "SHOP", Icon: ShoppingBag },
  { path: "/contact", label: "CONTACT", Icon: Mail },
] as const;

const SHORTCUT: Record<(typeof NAV)[number]["path"], string> = {
  "/": "H",
  "/portfolio": "W",
  "/shop": "S",
  "/contact": "C",
};

function useCompactDock() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    return subscribeMatchMedia("(max-width: 767px)", setCompact);
  }, []);
  return compact;
}

export function AppDock() {
  const router = useRouter();
  const pathname = usePathname();
  const compact = useCompactDock();
  const iconPx = compact ? 16 : 20;
  const baseItemSize = compact ? 40 : 48;
  const magnification = compact ? 52 : 64;
  const panelHeight = compact ? 56 : 64;

  return (
    <nav
      className="flex w-auto justify-end"
      style={{
        position: "fixed",
        top: 20,
        right: 32,
        zIndex: 9999,
        pointerEvents: "auto",
      }}
      aria-label="Primary navigation"
    >
      <div className="h-16 w-auto md:h-[72px]">
        <Dock
          gapPx={compact ? 8 : 12}
          horizontalPaddingPx={compact ? 24 : 32}
          items={NAV.map(({ path, label, Icon }) => {
            const active = path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
            const shortcut = SHORTCUT[path];
            return {
              icon: (
                <span className="relative inline-flex">
                  <Icon
                    size={iconPx}
                    strokeWidth={1.35}
                    className={cn(active ? "syn-dock-active-icon" : "text-[var(--text-secondary)]")}
                  />
                  {path === "/shop" ? (
                    <span className="pointer-events-none absolute -right-1 -top-0.5 rounded px-[3px] py-px font-mono text-[6px] font-bold uppercase tracking-[0.08em] text-[#050505] [background:linear-gradient(135deg,var(--gold-bright),var(--gold))]">
                      NEW
                    </span>
                  ) : null}
                </span>
              ),
              label: (
                <span
                  className="font-ui text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                  title={compact ? label : `${label} [${shortcut}]`}
                >
                  {label}
                  {!compact ? (
                    <span className="ml-1 hidden font-mono text-[7px] text-[var(--text-secondary)] opacity-70 md:inline">
                      [{shortcut}]
                    </span>
                  ) : null}
                </span>
              ),
              onClick: () => router.push(path),
              className: cn(
                "syn-dock-item-inactive transition-colors duration-200",
                active && "syn-dock-item-active border-[var(--border-gold)]",
              ),
            };
          })}
          baseItemSize={baseItemSize}
          magnification={magnification}
          distance={compact ? 140 : 180}
          panelHeight={panelHeight}
          dockHeight={compact ? 200 : 240}
          className={cn("!rounded-full !py-2 syn-dock-pill")}
        />
      </div>
    </nav>
  );
}
