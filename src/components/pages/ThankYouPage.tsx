"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Copy, Download, Loader2 } from "lucide-react";

type SessionSummary = {
  ok: boolean;
  email?: string | null;
  currency?: string | null;
  amountTotal?: number | null;
  paymentStatus?: string | null;
  productHandle?: string | null;
  sessionDownloadUrl?: string | null;
  lineItems?: { title: string; quantity: number; downloadUrl: string | null }[];
  message?: string;
};

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [value]);

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">{label}</p>
      <div className="mt-2 flex items-center gap-2">
        <code className="min-w-0 flex-1 break-all font-mono text-[13px] text-[var(--text-primary)]">{value}</code>
        <button
          type="button"
          data-cursor="hover"
          onClick={onCopy}
          className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[var(--border-accent)] bg-[var(--bg-elevated)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent-bright)] transition hover:bg-[var(--accent-dim)]"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export function ThankYouPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id")?.trim() || "";
  const sellhubRef = searchParams.get("ref")?.trim() || "";
  /** Sellhub-style placeholders that were not replaced stay in the URL as literal [order_id]. */
  const refIsUnreplacedTemplate = Boolean(sellhubRef && /\[|\]/.test(sellhubRef));

  const [data, setData] = useState<SessionSummary | null>(null);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/order/session-summary?session_id=${encodeURIComponent(sessionId)}`);
        const json = (await res.json()) as SessionSummary;
        if (cancelled) return;
        if (!res.ok || !json.ok) {
          setError(json.message || "Could not load order details.");
          setData(null);
        } else {
          setData(json);
        }
      } catch {
        if (!cancelled) setError("Could not load order details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const email = data?.email || "";

  return (
    <div className="relative z-[1] mx-auto w-full max-w-[640px] px-5 py-16 md:px-8 md:py-24">
      <div className="rounded-2xl border border-[var(--border-accent)] bg-[linear-gradient(165deg,rgba(22,16,38,0.95),rgba(8,6,16,0.92))] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.45),0_0_60px_rgba(168,85,247,0.08)] md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">VFXSYN</p>
        <h1 className="font-display mt-3 text-[clamp(1.75rem,5vw,2.5rem)] leading-tight tracking-[0.02em] text-[var(--text-primary)]">
          Thank you
        </h1>
        <p className="mt-3 font-body text-[15px] leading-relaxed text-[var(--text-secondary)]">
          Your order is confirmed. Digital delivery details are below.
        </p>

        {refIsUnreplacedTemplate ? (
          <div
            className="mt-6 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 font-body text-[14px] leading-relaxed text-amber-100/95"
            role="status"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-200/80">Redirect URL issue</p>
            <p className="mt-2">
              The link still contains a template like <code className="rounded bg-black/30 px-1">[order_id]</code> — your
              storefront did not replace it with a real order id. That usually means the platform does not support those
              brackets in the redirect field, or the placeholder name is wrong.
            </p>
            <p className="mt-2">
              In Sellhub (or Sellix), set <strong>Redirect to</strong> to exactly:{" "}
              <code className="break-all rounded bg-black/30 px-1 text-[13px]">https://vfxsyn.org/thank-you</code> (no
              query string), save, then run a test purchase and confirm you land here after payment.
            </p>
          </div>
        ) : null}

        {sellhubRef && !refIsUnreplacedTemplate ? (
          <p className="mt-6 font-mono text-[11px] text-[var(--text-dim)]">
            Order reference: <span className="text-[var(--text-secondary)]">{sellhubRef}</span>
          </p>
        ) : null}

        {loading ? (
          <div className="mt-10 flex items-center gap-3 text-[var(--text-secondary)]">
            <Loader2 className="h-5 w-5 animate-spin text-[var(--accent)]" aria-hidden />
            <span className="font-mono text-[12px]">Loading order…</span>
          </div>
        ) : null}

        {!sessionId && !loading ? (
          <div className="mt-10 space-y-4 font-body text-[15px] text-[var(--text-secondary)]">
            <p>
              If you completed a purchase, open the link from your confirmation email, or return from checkout with a
              valid session.
            </p>
            <Link
              href="/shop"
              data-cursor="hover"
              className="font-mono inline-flex text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] hover:text-[var(--accent-bright)]"
            >
              Back to shop →
            </Link>
          </div>
        ) : null}

        {error && !loading ? (
          <p className="mt-10 font-mono text-[13px] text-red-300/90" role="alert">
            {error}
          </p>
        ) : null}

        {data?.ok && !loading ? (
          <div className="mt-10 space-y-10">
            {email ? (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Sent to</p>
                <p className="mt-1 font-body text-[16px] text-[var(--text-primary)]">{email}</p>
              </div>
            ) : null}

            {typeof data.amountTotal === "number" && data.amountTotal === 0 ? (
              <p className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 font-body text-[14px] text-[var(--text-secondary)]">
                No charge for this order — your downloads and entitlements still apply where configured.
              </p>
            ) : null}

            {data.lineItems && data.lineItems.length > 0 ? (
              <div className="space-y-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Your items</p>
                <ul className="space-y-6">
                  {data.lineItems.map((row, i) => (
                    <li
                      key={`${row.title}-${i}`}
                      className="border-b border-[var(--border-subtle)] pb-6 last:border-0 last:pb-0"
                    >
                      <p className="font-display text-[1.125rem] text-[var(--text-primary)]">
                        {row.title}
                        {row.quantity > 1 ? (
                          <span className="ml-2 font-mono text-[12px] text-[var(--text-dim)]">×{row.quantity}</span>
                        ) : null}
                      </p>
                      {row.downloadUrl ? (
                        <a
                          href={row.downloadUrl}
                          data-cursor="hover"
                          className="syn-glow-purple mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b0614] transition hover:bg-[var(--accent-bright)]"
                        >
                          <Download className="h-4 w-4" aria-hidden />
                          Download
                        </a>
                      ) : (
                        <p className="mt-3 font-body text-[13px] text-[var(--text-secondary)]">
                          Download link emailed — check your inbox and spam folder.
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {!data.lineItems?.some((x) => x.downloadUrl) && data.sessionDownloadUrl ? (
              <a
                href={data.sessionDownloadUrl}
                data-cursor="hover"
                className="syn-glow-purple inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b0614] transition hover:bg-[var(--accent-bright)]"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download
              </a>
            ) : null}

            <div className="space-y-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 p-5">
              <p className="font-display text-[1rem] text-[var(--text-primary)]">License and serial keys</p>
              <p className="font-body text-[14px] leading-relaxed text-[var(--text-secondary)]">
                License and serial keys are sent by email for security. If Sellhub manages fulfillment for a product, keys
                may appear in your Sellhub receipt or customer area as well.
              </p>
              {process.env.NEXT_PUBLIC_SELLHUB_CUSTOMER_PORTAL_URL ? (
                <a
                  href={process.env.NEXT_PUBLIC_SELLHUB_CUSTOMER_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="font-mono inline-block text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] hover:underline"
                >
                  Sellhub customer area →
                </a>
              ) : null}
              {email ? (
                <CopyField label="Confirmation email" value={email} />
              ) : null}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/license"
                data-cursor="hover"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] hover:underline"
              >
                License portal →
              </Link>
              <Link
                href="/shop"
                data-cursor="hover"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--accent)]"
              >
                Shop →
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
