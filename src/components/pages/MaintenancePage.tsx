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
        background: `rgba(${120 + i * 12}, ${140 + i * 8}, 255, ${0.25 + Math.random() * 0.35})`,
        animation: `maint-float ${dur}s ${delay}s linear infinite`,
        pointerEvents: "none",
        filter: `blur(${Math.random() > 0.5 ? 1 : 0}px)`,
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
        letterSpacing: "0.08em",
        lineHeight: 1,
        textAlign: "center",
        color: "transparent",
        background: "linear-gradient(135deg, #e0e4ea 0%, #8B9CF7 40%, #6366F1 60%, #4F46E5 100%)",
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

/* ── canvas aurora ─────────────────────────────────────────────── */
function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 200 + Math.random() * 300,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      hue: 230 + i * 18,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = canvas.width + b.r;
        if (b.x > canvas.width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = canvas.height + b.r;
        if (b.y > canvas.height + b.r) b.y = -b.r;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `hsla(${b.hue}, 70%, 55%, 0.12)`);
        grad.addColorStop(0.5, `hsla(${b.hue}, 60%, 40%, 0.06)`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.7,
      }}
    />
  );
}

/* ── main maintenance page ─────────────────────────────────────── */
export function MaintenancePage() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* global keyframes */}
      <style>{`
        @keyframes maint-float {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-110vh) scale(0.5); opacity: 0; }
        }
        @keyframes maint-glitch {
          0%, 100% { transform: translate(0, 0); }
          15% { transform: translate(-2px, 1px); }
          35% { transform: translate(2px, -1px); }
          55% { transform: translate(-1px, -1px); }
          75% { transform: translate(1px, 1px); }
        }
        @keyframes maint-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        @keyframes maint-line-scan {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes maint-border-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#030308",
          overflow: "hidden",
        }}
      >
        {/* aurora background */}
        <AuroraCanvas />

        {/* grid overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        {/* scan line */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
            animation: "maint-line-scan 4s linear infinite",
            pointerEvents: "none",
          }}
        />

        {/* film grain */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            pointerEvents: "none",
          }}
        />

        {/* floating particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {Array.from({ length: 30 }, (_, i) => (
            <Particle key={i} i={i} />
          ))}
        </div>

        {/* vignette */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(3,3,8,0.8) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            padding: "0 24px",
            maxWidth: 800,
          }}
        >
          {/* logo pill */}
          <div
            style={{
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: 999,
              padding: "8px 20px",
              fontFamily: "var(--font-display), sans-serif",
              fontSize: 14,
              letterSpacing: "0.2em",
              color: "#8B9CF7",
              animation: "maint-border-glow 3s ease-in-out infinite",
            }}
          >
            VFXSYN
          </div>

          {/* main title */}
          <GlitchTitle text="UPDATING" />

          {/* subtitle */}
          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13,
              letterSpacing: "0.2em",
              color: "rgba(139,156,247,0.7)",
              textAlign: "center",
              animation: "maint-pulse 3s ease-in-out infinite",
              textTransform: "uppercase",
            }}
          >
            Site is being revamped{dots}
          </p>

          {/* divider */}
          <div
            style={{
              width: 60,
              height: 1,
              background: "linear-gradient(90deg, transparent, #6366F1, transparent)",
              opacity: 0.5,
            }}
          />

          {/* CTA */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "#c7d0ff",
              textDecoration: "none",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: 4,
              padding: "14px 28px",
              transition: "all 0.3s ease",
              background: "rgba(99,102,241,0.06)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(99,102,241,0.5)";
              el.style.background = "rgba(99,102,241,0.12)";
              el.style.boxShadow = "0 0 30px rgba(99,102,241,0.15)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(99,102,241,0.25)";
              el.style.background = "rgba(99,102,241,0.06)";
              el.style.boxShadow = "none";
            }}
          >
            DM @VFXSYN ON INSTAGRAM
          </a>

          {/* bottom tag */}
          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9,
              letterSpacing: "0.3em",
              color: "rgba(139,156,247,0.35)",
              textTransform: "uppercase",
              marginTop: 16,
            }}
          >
            ATLANTA, GA — VFX ARTIST
          </p>
        </div>
      </div>
    </>
  );
}
