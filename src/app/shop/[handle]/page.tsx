import { notFound } from "next/navigation";
import Link from "next/link";

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
    accentRgb: "255,255,255",
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
    accentRgb: "160,120,255",
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
    accentRgb: "255,160,80",
    thumbnail: "automve",
  },
];

function ProductThumbnail({ type, accentRgb }: { type: string; accentRgb: string }) {
  if (type === "free") {
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <defs>
          <radialGradient id="qd-free-bg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(40,40,55,1)" />
            <stop offset="100%" stopColor="rgba(8,8,12,1)" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#qd-free-bg)" />
        {[80,160,240,320].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {[80,160,240,320].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        <rect x="140" y="148" width="120" height="100" rx="8" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2"/>
        <rect x="140" y="163" width="20" height="14" rx="2" fill="rgba(255,255,255,0.08)"/>
        <rect x="240" y="163" width="20" height="14" rx="2" fill="rgba(255,255,255,0.08)"/>
        <rect x="140" y="219" width="20" height="14" rx="2" fill="rgba(255,255,255,0.08)"/>
        <rect x="240" y="219" width="20" height="14" rx="2" fill="rgba(255,255,255,0.08)"/>
        <polygon points="185,183 185,215 215,199" fill="rgba(255,255,255,0.55)"/>
        <rect x="155" y="230" width="90" height="5" rx="2.5" fill="rgba(255,255,255,0.1)"/>
        <text x="200" y="305" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="monospace" letterSpacing="4">FREE BUILD</text>
      </svg>
    );
  }
  if (type === "pro") {
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <defs>
          <radialGradient id="qd-pro-bg" cx="30%" cy="30%" r="80%">
            <stop offset="0%" stopColor="rgba(60,35,110,1)" />
            <stop offset="100%" stopColor="rgba(8,8,18,1)" />
          </radialGradient>
          <radialGradient id="qd-pro-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(160,120,255,0.25)" />
            <stop offset="100%" stopColor="rgba(160,120,255,0)" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#qd-pro-bg)" />
        <ellipse cx="200" cy="200" rx="160" ry="160" fill="url(#qd-pro-glow)" />
        {[140,168,196,224,252].map((x, i) => {
          const h = [60,40,70,45,55][i];
          return <rect key={x} x={x} y={220 - h} width="18" height={h} rx="4" fill={`rgba(160,120,255,${0.3 + i * 0.1})`}/>;
        })}
        <polygon points="200,138 216,160 242,143 231,172 169,172 158,143 184,160" fill="none" stroke="rgba(200,160,255,0.65)" strokeWidth="2" strokeLinejoin="round"/>
        <text x="200" y="310" textAnchor="middle" fill="rgba(160,120,255,0.55)" fontSize="10" fontFamily="monospace" letterSpacing="4">PRO LICENSE</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <defs>
        <radialGradient id="av-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="rgba(100,50,15,1)" />
          <stop offset="100%" stopColor="rgba(6,6,8,1)" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#av-bg)" />
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => {
        const h = [20,45,30,60,80,40,70,55,35,65,25,50,30][i];
        return (
          <rect key={i} x={120 + i * 13} y={200 - h/2} width="8" height={h} rx="4"
            fill={`rgba(255,${130 - i * 4},${50 + i * 3},${0.45 + i * 0.03})`} />
        );
      })}
      <path d="M155 153 L245 153 L225 133 M245 153 L225 173" stroke="rgba(255,150,70,0.55)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="200" y="310" textAnchor="middle" fill="rgba(255,150,70,0.55)" fontSize="10" fontFamily="monospace" letterSpacing="6">AUTOMVE</text>
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
    <main
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 8% -15%, rgba(180,20,20,0.14), transparent 45%), radial-gradient(ellipse 70% 50% at 92% 5%, rgba(140,15,15,0.10), transparent 42%), linear-gradient(180deg, #0a0202 0%, #130505 48%, #0a0303 100%)",
      }}
    >
      <div className="mx-auto max-w-[860px] px-6 py-10 md:px-10">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em]"
          style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}>
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/shop" className="transition-colors hover:text-white">Shop</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.55)" }}>{product.title}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Thumbnail */}
          <div
            className="aspect-square overflow-hidden rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: `0 0 60px rgba(${product.accentRgb},0.04)`,
            }}
          >
            <ProductThumbnail type={product.thumbnail} accentRgb={product.accentRgb} />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-5">
            {/* Badge + price */}
            <div className="flex items-center gap-3">
              <span
                className="rounded-md px-2 py-1 text-[9px] uppercase tracking-[0.2em]"
                style={{
                  background: `rgba(${product.accentRgb},0.08)`,
                  border: `1px solid rgba(${product.accentRgb},0.18)`,
                  color: `rgba(${product.accentRgb},0.8)`,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {product.badge}
              </span>
              <span
                className="text-[24px] font-semibold text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {product.price}
              </span>
            </div>

            <h1
              className="text-[26px] font-semibold leading-tight text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {product.title}
            </h1>

            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter), sans-serif" }}
            >
              {product.description}
            </p>

            {/* Features */}
            <ul className="space-y-2.5">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span
                    className="h-px w-3 shrink-0 rounded-full"
                    style={{ background: `rgba(${product.accentRgb},0.5)` }}
                  />
                  <span
                    className="text-[12px]"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* CTA */}
            {product.available && product.buyUrl ? (
              <a
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center rounded-xl text-[13px] font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: `rgba(${product.accentRgb},0.12)`,
                  border: `1px solid rgba(${product.accentRgb},0.3)`,
                  color: `rgb(${product.accentRgb})`,
                  fontFamily: "var(--font-inter), sans-serif",
                  boxShadow: `0 0 30px rgba(${product.accentRgb},0.08)`,
                }}
              >
                {product.price === "FREE" ? "Download Free →" : `Buy for ${product.price} →`}
              </a>
            ) : (
              <div
                className="flex h-11 w-full items-center justify-center rounded-xl text-[13px]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.28)",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                Coming Soon
              </div>
            )}

            <Link
              href="/shop"
              className="text-center text-[10px] transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono)" }}
            >
              ← back to shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
