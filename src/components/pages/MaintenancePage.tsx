"use client";

import { useEffect, useRef, useState } from "react";
import { INSTAGRAM_URL } from "@/lib/constants";

/* ── floating particle ─────────────────────────────────────────── */
function Particle({ i }: { i: number }) {
  const size = 2 + Math.random() * 3;
  const left = Math.random() * 100;
  const delay = Math.random() * 8;
  const dur = 6 + Math.random() * 10;

  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: `${left}%`,
        bottom: "-10%",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `rgba(${139 + i * 5}, ${92 + i * 2}, 246, ${0.15 + Math.random() * 0.2})`,
        animation: `maint-float ${dur}s ${delay}s linear infinite`,
        pointerEvents: "none",
        filter: `blur(${Math.random() > 0.5 ? 1 : 0.2}px)`,
      }}
    />
  );
}

/* ── glitch title ──────────────────────────────────────────────── */
function GlitchTitle({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <h1
      className="maint-title"
      style={{
        fontFamily: "var(--font-display), sans-serif",
        fontWeight: 900,
        fontSize: "clamp(48px, 10vw, 140px)",
        letterSpacing: "0.1em",
        lineHeight: 1,
        textAlign: "center",
        color: "transparent",
        background: "linear-gradient(135deg, #ffffff 0%, #8b5cf6 50%, #06b6d4 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        position: "relative",
        animation: glitch ? "maint-glitch 0.3s steps(2, end)" : undefined,
      }}
    >
      {text}
      {glitch && (
        <>
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "inherit",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              clipPath: "inset(20% 0 40% 0)",
              transform: "translate(3px, -2px)",
              opacity: 0.7,
            }}
          >
            {text}
          </span>
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "inherit",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              clipPath: "inset(55% 0 10% 0)",
              transform: "translate(-3px, 2px)",
              opacity: 0.7,
            }}
          >
            {text}
          </span>
        </>
      )}
    </h1>
  );
}

/* ── main page ─────────────────────────────────────────────────── */
export default function MaintenancePage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#030308",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 9999,
        fontFamily: "var(--font-body), sans-serif",
      }}
    >
      <style>{`
        @keyframes maint-float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
        }
        @keyframes maint-glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 2px); }
          40% { transform: translate(-3px, -2px); }
          60% { transform: translate(3px, 2px); }
          80% { transform: translate(3px, -2px); }
          100% { transform: translate(0); }
        }
        .maint-title {
           filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.3));
        }
      `}</style>

      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(40)].map((_, i) => (
          <Particle key={i} i={i} />
        ))}
      </div>

      {/* HUD background elements */}
      <div className="pointer-events-none absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent" />
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "0 20px" }}>
        <div style={{ marginBottom: 40, display: "flex", justifyContent: "center" }}>
          <GlitchTitle text="VFXSYN" />
        </div>

        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10,
              letterSpacing: "0.4em",
              color: "#8b5cf6",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            SYSTEM_UPGRADE_IN_RPROGRESS
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "0.05em",
              marginBottom: 24,
              lineHeight: 1,
            }}
          >
            V2.1 TOTAL <span style={{ color: "var(--accent-secondary)" }}>TRANSFORMATION</span>
          </h2>

          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "#94a3b8",
              marginBottom: 40,
              maxWidth: 450,
              margin: "0 auto 40px",
            }}
          >
            Compiling Midnight Obsidian architecture | Deploying 3D physics modules | Purging legacy fragments. 
            The visual landscape is shifting.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                height: 48,
                padding: "0 32px",
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                color: "#ffffff",
                alignItems: "center",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              FOLLOW THE SHIFT
            </a>
          </div>
        </div>
      </div>

      {/* Footer HUD info */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 8,
          letterSpacing: "0.2em",
          color: "rgba(255, 255, 255, 0.3)",
          textTransform: "uppercase",
        }}
      >
        V2.1_CORE_SYN_REVAMP // ATLANTA_GEORGIA
      </div>
    </div>
  );
}
