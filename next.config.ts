import type { NextConfig } from "next";

/* ─────────────────────────────────────────────
   Security headers applied to every response
   ───────────────────────────────────────────── */
const securityHeaders = [
  /* HSTS — 2 years, cover all subdomains, opt into preload list */
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  /* Clickjacking protection */
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },

  /* Prevent MIME-type sniffing */
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },

  /* Legacy XSS filter (belt-and-suspenders for old browsers) */
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },

  /* Only send full referrer to same-origin; just origin to HTTPS cross-origin */
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },

  /* Lock down browser features we don't use */
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "browsing-topics=()",
      "payment=(self 'https://js.stripe.com')",
      "fullscreen=(self)",
    ].join(", "),
  },

  /* Allow cross-origin popups (Stripe, OAuth) but isolate window */
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },

  /* Allow cross-origin resource loading (Discord CDN, SoundCloud, etc.) */
  {
    key: "Cross-Origin-Resource-Policy",
    value: "cross-origin",
  },

  /* ── Content Security Policy ─────────────────────────────────────────
     Sources used by this app:
       • Lanyard REST + WebSocket  — api.lanyard.rest
       • Discord CDN               — cdn.discordapp.com, *.discordapp.com
       • SoundCloud widget iframe  — w.soundcloud.com
       • SoundCloud artwork CDN    — *.sndcdn.com, i.scdn.co
       • Google Fonts              — fonts.googleapis.com, fonts.gstatic.com
       • Stripe                    — js.stripe.com, api.stripe.com, hooks.stripe.com
       • Supabase                  — *.supabase.co
       • Three.js / Spline blobs   — blob:
     ────────────────────────────────────────────────────────────────── */
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline hydration + SoundCloud API script + Stripe.js
      "script-src 'self' 'unsafe-inline' https://w.soundcloud.com https://js.stripe.com",
      // Tailwind + Framer Motion inline styles + Google Fonts stylesheet
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts files
      "font-src 'self' data: https://fonts.gstatic.com",
      // Discord avatars/badges, SoundCloud artwork, Spotify art, data URIs, Three.js blobs
      "img-src 'self' data: blob: https://cdn.discordapp.com https://*.discordapp.com https://*.sndcdn.com https://i.scdn.co https://*.discord.com",
      // Lanyard WS + REST, Supabase, Stripe API
      "connect-src 'self' wss://api.lanyard.rest https://api.lanyard.rest https://api.stripe.com https://*.supabase.co wss://*.supabase.co",
      // SoundCloud widget iframe, Stripe payment elements
      "frame-src https://w.soundcloud.com https://js.stripe.com https://hooks.stripe.com",
      // SoundCloud audio streams
      "media-src 'self' blob: https://*.sndcdn.com https://cf-media.sndcdn.com",
      // Three.js / Spline web workers
      "worker-src 'self' blob:",
      // Block plugins (Flash etc.)
      "object-src 'none'",
      // Prevent base tag injection
      "base-uri 'self'",
      // Restrict form submissions
      "form-action 'self' https://js.stripe.com",
      // Force HTTPS for all mixed-content
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      // www → apex redirect (belt-and-suspenders alongside Vercel domain config)
      {
        source: "/(.*)",
        has: [{ type: "host", value: "www.vfxsyn.org" }],
        destination: "https://vfxsyn.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
