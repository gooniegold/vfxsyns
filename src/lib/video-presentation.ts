import type { CSSProperties, VideoHTMLAttributes } from "react";

/** `loading="lazy"` on `<video>` — valid in modern browsers; cast until `VideoHTMLAttributes` includes it. */
export const VIDEO_LOADING_LAZY = {
  loading: "lazy" as const,
} as unknown as VideoHTMLAttributes<HTMLVideoElement>;

/** Shared video styles for GPU layer + decode hints (see portfolio perf pass). */
export const SYN_VIDEO_BASE_STYLE: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  willChange: "transform",
  transform: "translateZ(0)",
  imageRendering: "auto",
};
