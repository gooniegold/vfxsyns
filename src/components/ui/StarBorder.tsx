"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  SYN_STAR_BORDER_COLOR,
  SYN_STAR_BORDER_SPEED,
  SYN_STAR_BORDER_THICKNESS,
} from "@/lib/syn-styles";
import "@/components/StarBorder.css";

export function StarBorder({
  className,
  innerClassName,
  color = SYN_STAR_BORDER_COLOR,
  speed = SYN_STAR_BORDER_SPEED,
  thickness = SYN_STAR_BORDER_THICKNESS,
  children,
  style,
  ...rest
}: Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  innerClassName?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn("star-border-container", className)}
      style={
        {
          padding: `${thickness}px 0`,
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
        aria-hidden
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
        aria-hidden
      />
      <div className={cn("inner-content", innerClassName)}>{children}</div>
    </div>
  );
}
