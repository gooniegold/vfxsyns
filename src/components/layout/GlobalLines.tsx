export function GlobalLines() {
  const lines = [
    { x1: "0%", y1: "0%", x2: "100%", y2: "100%", dur: 14 },
    { x1: "5%", y1: "0%", x2: "95%", y2: "100%", dur: 18 },
    { x1: "10%", y1: "15%", x2: "90%", y2: "85%", dur: 16 },
    { x1: "0%", y1: "40%", x2: "100%", y2: "70%", dur: 20 },
    { x1: "20%", y1: "0%", x2: "80%", y2: "100%", dur: 22 },
    { x1: "0%", y1: "70%", x2: "100%", y2: "30%", dur: 17 },
  ];

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="rgba(184,190,199,0.03)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          className="syn-line-dash"
          style={{
            animationDuration: `${l.dur}s`,
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}
    </svg>
  );
}
