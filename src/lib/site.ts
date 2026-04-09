/**
 * Canonical site origin for metadata, signed download links, etc.
 * Set NEXT_PUBLIC_APP_URL in production (e.g. https://vfxsyn.org).
 */
export const CANONICAL_SITE_ORIGIN = "https://vfxsyn.org";

export function getSiteOrigin(): string {
  const u = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (u) return u.replace(/\/$/, "");
  const v = process.env.VERCEL_URL?.trim();
  if (v) return `https://${v.replace(/\/$/, "")}`;
  return CANONICAL_SITE_ORIGIN;
}
