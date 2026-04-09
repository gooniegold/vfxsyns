"use client";

export function SoftAuroraBG() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#06040f",
      }}
      aria-hidden
    >
      <div
        style={{
          position: "absolute",
          width: "800px",
          height: "400px",
          top: "-100px",
          left: "-200px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(168,85,247,0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "aurora1 9s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "300px",
          top: "30%",
          right: "-150px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "aurora2 12s ease-in-out infinite alternate-reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "350px",
          bottom: "-100px",
          left: "20%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(216,180,254,0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "aurora3 10s ease-in-out infinite alternate",
        }}
      />
      <style>{`
        @keyframes aurora1 {
          from { transform: translate(0px, 0px) scale(1); }
          to { transform: translate(80px, -60px) scale(1.2); }
        }
        @keyframes aurora2 {
          from { transform: translate(0px, 0px) scale(1.1); }
          to { transform: translate(-60px, 40px) scale(0.85); }
        }
        @keyframes aurora3 {
          from { transform: translate(0px, 0px) scale(0.9); }
          to { transform: translate(50px, 60px) scale(1.15); }
        }
      `}</style>
    </div>
  );
}
