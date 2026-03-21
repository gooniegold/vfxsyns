"use client";

export function LightPillarBG() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#050505",
      }}
      aria-hidden
    >
      {[
        { left: "10%", delay: "0s", duration: "3s", opacity: 0.12 },
        { left: "22%", delay: "0.6s", duration: "4s", opacity: 0.08 },
        { left: "35%", delay: "1.2s", duration: "3.5s", opacity: 0.15 },
        { left: "50%", delay: "0.3s", duration: "5s", opacity: 0.1 },
        { left: "63%", delay: "0.9s", duration: "4s", opacity: 0.13 },
        { left: "78%", delay: "1.5s", duration: "3s", opacity: 0.09 },
        { left: "88%", delay: "0.5s", duration: "4.5s", opacity: 0.11 },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            bottom: 0,
            width: "1px",
            height: "60vh",
            background: `linear-gradient(to top, transparent, rgba(184,190,199,${p.opacity}), transparent)`,
            filter: "blur(3px)",
            animation: `pillarRise ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "300px",
          background: "linear-gradient(to top, rgba(184,190,199,0.04), transparent)",
        }}
      />
      <style>{`
        @keyframes pillarRise {
          0%, 100% { opacity: 0; transform: scaleY(0.3) translateY(20px); }
          50% { opacity: 1; transform: scaleY(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
