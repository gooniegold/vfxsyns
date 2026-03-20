"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Film, Home, Mail, ShoppingBag } from "lucide-react";
import Dock from "@/components/react-bits/Dock";
import { subscribeMatchMedia } from "@/lib/safe-media";
import { cn } from "@/lib/utils";

const NAV = [
  { path: "/", label: "HOME", Icon: Home },
  { path: "/portfolio", label: "WORK", Icon: Film },
  { path: "/shop", label: "SHOP", Icon: ShoppingBag },
  { path: "/contact", label: "CONTACT", Icon: Mail },
] as const;

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
      className="pointer-events-none fixed left-1/2 top-0 z-[100] flex w-[min(100%,480px)] -translate-x-1/2 justify-center px-4"
      style={{ paddingTop: `max(16px, env(safe-area-inset-top, 0px))` }}
      aria-label="Primary navigation"
    >
      <div className="pointer-events-auto relative h-16 w-full max-w-[min(100%,440px)] md:h-[72px]">
        <Dock
          gapPx={compact ? 8 : 12}
          horizontalPaddingPx={compact ? 24 : 32}
          items={NAV.map(({ path, label, Icon }) => {
            const active = path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
            return {
              icon: (
                <Icon
                  size={iconPx}
                  strokeWidth={1.35}
                  className={cn(active ? "syn-dock-active-icon" : "text-[var(--text-secondary)]")}
                />
              ),
              label: (
                <span
                  className="font-ui text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                >
                  {label}
                </span>
              ),
              onClick: () => router.push(path),
              className: cn(
                "border-[var(--border-subtle)] bg-[rgba(10,10,10,0.75)] backdrop-blur-md transition-colors duration-200",
                active && "syn-dock-item-active border-[var(--border-gold)]",
              ),
            };
          })}
          baseItemSize={baseItemSize}
          magnification={magnification}
          distance={compact ? 140 : 180}
          panelHeight={panelHeight}
          dockHeight={compact ? 200 : 240}
          className={cn(
            "!rounded-full !border !border-[var(--border-gold)] !bg-[rgba(10,10,10,0.85)] !py-2 !shadow-[0_12px_50px_rgba(0,0,0,0.65)] !backdrop-blur-[20px]",
          )}
        />
      </div>
    </nav>
  );
}
