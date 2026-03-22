"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Film, ShoppingBag, Mail } from "lucide-react";

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

  return (
    <nav
      aria-label="Primary navigation"
      style={{
        position: "fixed",
        top: 20,
        right: 32,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(15,15,15,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(184,190,199,0.2)",
        borderRadius: 999,
        padding: "10px 16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        pointerEvents: "auto",
      }}
    >
      {NAV.map(({ path, label, Icon }) => {
        const active = isActivePath(pathname, path);
        return (
          <button
            key={path}
            type="button"
            onClick={() => router.push(path)}
            title={label}
            aria-current={active ? "page" : undefined}
            style={{
              background: active ? "rgba(184,190,199,0.15)" : "transparent",
              border: active ? "1px solid rgba(184,190,199,0.3)" : "1px solid transparent",
              borderRadius: 999,
              padding: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: active ? "#D4D9E0" : "rgba(184,190,199,0.6)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = "#D4D9E0";
              el.style.background = "rgba(184,190,199,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              if (!active) {
                el.style.color = "rgba(184,190,199,0.6)";
                el.style.background = "transparent";
              } else {
                el.style.color = "#D4D9E0";
                el.style.background = "rgba(184,190,199,0.15)";
              }
            }}
          >
            <Icon size={18} strokeWidth={1.5} aria-hidden />
          </button>
        );
      })}
    </nav>
  );
}
