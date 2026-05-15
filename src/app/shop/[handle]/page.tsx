import { notFound } from "next/navigation";
import Link from "next/link";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

/* ── Product catalogue ── */
const PRODUCTS = [
  {
    handle: "quickdraft-free",
    title: "QuickDraft Free",
    badge: "FREE BUILD",
    price: "FREE",
    description:
      "Low-res review exports with a watermark locked on. Built for client passes — share rough cuts without worrying about unauthorised distribution.",
    features: [
      "720p watermarked export",
      "Client-review-friendly format",
      "One-click render from timeline",
      "Works with After Effects & Premiere",
    ],
    buyUrl: "https://buy.stripe.com/cNi5kw1gV0mOdYYbek77O00",
    available: true,
    accentColor: "rgba(255,255,255,0.9)",
    thumbnail: "free",
  },
  {
    handle: "quickdraft-pro",
    title: "QuickDraft Pro",
    badge: "PRO LICENSE",
    price: "$29",
    description:
      "Auto render queue, granular watermark controls, and faster handoffs when you're on a deadline. One-off purchase, instant download, yours forever.",
    features: [
      "Full-res exports with optional watermark",
      "Auto render queue — batch multiple comps",
      "Watermark position, opacity & scale controls",
      "Priority update access",
    ],
    buyUrl: "https://buy.stripe.com/quickdraft-pro",
    available: true,
    accentColor: "rgba(200,180,255,0.9)",
    thumbnail: "pro",
  },
  {
    handle: "automve",
    title: "VFXSYN AUTOMVE",
    badge: "PLUGIN",
    price: "$49",
    description:
      "Automatic motion for music videos. Shakes, zoom outs, punch ins, and hit stops that follow your audio — so you spend less time keyframing.",
    features: [
      "Audio-reactive shake & zoom engine",
      "Hit-stop generator with custom hold frames",
      "BPM detection & beat-snap",
      "Works inside After Effects",
    ],
    buyUrl: "https://buy.stripe.com/automve",
    available: true,
    accentColor: "rgba(255,180,100,0.9)",
    thumbnail: "automve",
  },
];

function ProductThumbnail({ type, accent }: { type: string; accent: string }) {
  if (type === "free") {
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <defs>
          <radialGradient id="qd-free-bg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(60,60,80,1)" />
            <stop offset="100%" stopColor="rgba(10,10,15,1)" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#qd-free-bg)" />
        {/* Grid lines */}
        {[80,160,240,320].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {[80,160,240,320].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {/* Center icon — film strip */}
        <rect x="140" y="150" width="120" height="100" rx="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
        <rect x="140" y="165" width="20" height="14" rx="2" fill="rgba(255,255,255,0.1)"/>
        <rect x="240" y="165" width="20" height="14" rx="2" fill="rgba(255,255,255,0.1)"/>
        <rect x="140" y="221" width="20" height="14" rx="2" fill="rgba(255,255,255,0.1)"/>
        <rect x="240" y="221" width="20" height="14" rx="2" fill="rgba(255,255,255,0.1)"/>
        {/* Play triangle */}
        <polygon points="185,185 185,215 215,200" fill="rgba(255,255,255,0.6)"/>
        {/* Watermark line */}
        <rect x="155" y="232" width="90" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
        {/* Label */}
        <text x="200" y="305" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace" letterSpacing="4">QUICKDRAFT FREE</text>
      </svg>
    );
  }
  if (type === "pro") {
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <defs>
          <radialGradient id="qd-pro-bg" cx="30%" cy="30%" r="80%">
            <stop offset="0%" stopColor="rgba(80,50,140,1)" />
            <stop offset="100%" stopColor="rgba(10,10,20,1)" />
          </radialGradient>
          <radialGradient id="qd-pro-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(160,120,255,0.3)" />
            <stop offset="100%" stopColor="rgba(160,120,255,0)" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#qd-pro-bg)" />
        <ellipse cx="200" cy="200" rx="160" ry="160" fill="url(#qd-pro-glow)" />
        {/* Queue bars */}
        {[140,168,196,224,252].map((x, i) => (
          <rect key={x} x={x} y={220 - (i % 3 === 0 ? 60 : i % 3 === 1 ? 40 : 50)} width="18" height={i % 3 === 0 ? 60 : i % 3 === 1 ? 40 : 50} rx="4" fill={`rgba(160,120,255,${0.4 + i * 0.08})`}/>
        ))}
        {/* Crown icon */}
        <polygon points="200,140 215,160 240,145 230,175 170,175 160,145 185,160" fill="none" stroke="rgba(200,160,255,0.7)" strokeWidth="2" strokeLinejoin="round"/>
        <text x="200" y="310" textAnchor="middle" fill="rgba(180,150,255,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="4">QUICKDRAFT PRO</text>
      </svg>
    );
  }
  // automve
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <defs>
        <radialGradient id="av-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="rgba(120,60,20,1)" />
          <stop offset="100%" stopColor="rgba(8,8,10,1)" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#av-bg)" />
      {/* Audio waveform */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => {
        const h = [20,45,30,60,80,40,70,55,35,65,25,50,30][i];
        return (
          <rect key={i} x={120 + i * 13} y={200 - h/2} width="8" height={h} rx="4"
            fill={`rgba(255,${140 - i * 5},${60 + i * 3},${0.5 + i * 0.03})`} />
        );
      })}
      {/* Motion arrow */}
      <path d="M155 155 L245 155 L225 135 M245 155 L225 175" stroke="rgba(255,160,80,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="200" y="310" textAnchor="middle" fill="rgba(255,160,80,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="4">AUTOMVE</text>
    </svg>
  );
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = PRODUCTS.find((p) => p.handle === handle);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-[900px] px-6 py-10 md:px-10">
        <PageBreadcrumb
          items={[
            { label: "HOME", href: "/" },
            { label: "SHOP", href: "/shop" },
            { label: product.title.toUpperCase() },
          ]}
        />

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {/* Left — product thumbnail */}
          <div
            className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <ProductThumbnail type={product.thumbnail} accent={product.accentColor} />
          </div>

          {/* Right — info */}
          <div className="flex flex-col justify-center space-y-5">
            {/* Badge + price */}
            <div className="flex items-center gap-3">
              <span
                className="rounded px-2 py-0.5 text-[9px] uppercase tracking-widest"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {product.badge}
              </span>
              <span
                className="text-[22px] font-semibold text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {product.price}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[28px] font-semibold leading-tight text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {product.title}
            </h1>

            {/* Description */}
            <p
              className="text-[13px] leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {product.description}
            </p>

            {/* Feature list */}
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span
                    className="h-1 w-1 shrink-0 rounded-full bg-white"
                    style={{ opacity: 0.4 }}
                  />
                  <span
                    className="text-[12px]"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            {product.available && product.buyUrl ? (
              <a
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center rounded-xl text-[13px] font-medium text-black transition-opacity hover:opacity-90"
                style={{ background: "#ffffff", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {product.price === "FREE" ? "Download Free" : `Buy — ${product.price}`}
              </a>
            ) : (
              <div
                className="flex h-11 w-full items-center justify-center rounded-xl text-[13px]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                Coming Soon
              </div>
            )}

            <Link
              href="/shop"
              className="text-center text-[11px] transition-colors"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}
            >
              ← back to shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
