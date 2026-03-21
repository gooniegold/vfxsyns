"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "glass" | "gold" | "outline";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[10px] min-h-[40px]",
  md: "px-9 py-[14px] text-[11px] min-h-[44px]",
  lg: "px-10 py-4 text-[12px] min-h-[48px]",
};

const goldStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(135deg, #B8BEC7, #D4D9E0, #6B7280)",
  backgroundSize: "300% 300%",
  animation: "gradientShift 3s ease infinite",
};

export function GlassButton({
  children,
  variant = "glass",
  href,
  onClick,
  className,
  size = "md",
  buttonType = "button",
  cursorHover = true,
}: {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: Size;
  buttonType?: "button" | "submit";
  /** Adds data-cursor="hover" for themed hover targets */
  cursorHover?: boolean;
}) {
  const isExternal = href?.startsWith("http") ?? false;

  const base =
    "syn-btn-shimmer relative inline-flex items-center justify-center overflow-hidden font-strong font-semibold tracking-[0.2em] transition-shadow duration-200";

  const variants: Record<Variant, string> = {
    glass:
      "syn-glass rounded-[50px] text-[var(--text-primary)] hover:border-[var(--gold-border)] hover:shadow-[0_0_24px_rgba(184,190,199,0.2),inset_0_0_24px_rgba(184,190,199,0.05)]",
    gold: "rounded-[50px] border-none text-[#050505] shadow-none hover:scale-[1.04] hover:shadow-[0_8px_32px_rgba(184,190,199,0.4)]",
    outline:
      "rounded-[50px] border border-[var(--gold-border)] bg-transparent text-[var(--gold)] hover:border-[var(--gold-border)] hover:bg-[rgba(17,17,17,0.85)] hover:shadow-[0_0_20px_rgba(184,190,199,0.15)]",
  };

  const inner = (
    <>
      {variant === "glass" ? (
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[rgba(184,190,199,0.12)] to-[rgba(107,114,128,0.06)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      ) : null}
      <span className="relative z-[1]">{children}</span>
    </>
  );

  const btnClass = cn(base, sizes[size], variants[variant], "group", className);
  const cursorProps = cursorHover ? ({ "data-cursor": "hover" } as const) : {};

  if (href && isExternal) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.97 }}
        className={btnClass}
        style={variant === "gold" ? goldStyle : undefined}
        {...cursorProps}
      >
        {inner}
      </motion.a>
    );
  }

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.97 }} className="inline-flex max-w-full [&:has(a)]:w-full">
        <Link
          href={href}
          className={cn(btnClass, "max-w-full")}
          style={variant === "gold" ? goldStyle : undefined}
          {...cursorProps}
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={buttonType}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={btnClass}
      style={variant === "gold" ? goldStyle : undefined}
      {...cursorProps}
    >
      {inner}
    </motion.button>
  );
}
