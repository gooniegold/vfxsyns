"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageBreadcrumb({
  items,
  className,
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-secondary)]", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? <span className="text-[var(--border-gold)]" aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-[var(--gold)]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--gold)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
