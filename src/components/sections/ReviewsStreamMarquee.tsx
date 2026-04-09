"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { marqueeReviewSlice, REVIEW_STREAM_TOTAL } from "@/lib/review-stream";
import { cn } from "@/lib/utils";

export function ReviewsStreamMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const rows = useMemo(() => marqueeReviewSlice(), []);

  return (
    <section
      className="relative z-[1] overflow-hidden border-y border-[var(--border-subtle)] py-14 md:py-20"
      aria-label="Client reviews"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(168,85,247,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1400px] px-5 text-center md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--accent-bright)]">
          Client feedback
        </p>
        <h2 className="font-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.02em] text-[var(--text-primary)]">
          Real notes from real jobs
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-body text-[14px] text-[var(--text-secondary)]">
          {REVIEW_STREAM_TOTAL.toLocaleString()}+ notes in the stream below. Same messy energy we get in DMs.
        </p>
      </div>

      <div className="relative mt-10">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-24 bg-gradient-to-r from-[var(--bg-base)] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-24 bg-gradient-to-l from-[var(--bg-base)] to-transparent"
          aria-hidden
        />

        <div className="overflow-hidden py-2">
          <div
            className={cn(
              "flex w-max gap-4 md:gap-5 motion-reduce:animate-none",
              prefersReducedMotion ? "" : "animate-[syn-review-marquee_120s_linear_infinite]",
            )}
            style={{ willChange: prefersReducedMotion ? undefined : "transform" }}
          >
            {[0, 1].map((dup) => (
              <div key={dup} className="flex gap-4 md:gap-5">
                {rows.map((r) => (
                  <article
                    key={`${dup}-${r.id}`}
                    className="syn-review-pill w-[min(88vw,300px)] shrink-0 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-3 text-left shadow-[0_0_40px_rgba(168,85,247,0.12)] md:w-[280px]"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
                        {r.name}
                      </span>
                      <span className="flex gap-0.5 text-[var(--gold)]" aria-hidden>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" strokeWidth={0} />
                        ))}
                      </span>
                    </div>
                    <p className="font-body text-[13px] leading-snug text-[var(--text-secondary)]">
                      {r.text}
                    </p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
