"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

function isDirectVideo(src: string): boolean {
  return /\.(mp4|mov|webm|m4v)$/i.test(src) || src.includes("/api/portfolio-media/");
}

function isDriveEmbed(src: string): boolean {
  return src.includes("drive.google.com");
}

type PortfolioVideoPreviewProps = {
  src: string;
  title: string;
  className?: string;
  /** When true, only decode/play when scrolled into view (smoother long grids). */
  playInView?: boolean;
  /** Home hero cards: start muted autoplay immediately when direct video file. */
  instantAutoplay?: boolean;
};

/**
 * Direct files: muted autoplay loop with play/pause when in view (saves decode offscreen).
 * Google Drive: iframe embed (browser may still require interaction for autoplay).
 */
export function PortfolioVideoPreview({
  src,
  title,
  className,
  playInView = true,
  instantAutoplay = false,
}: PortfolioVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isDirectVideo(src) || !instantAutoplay) return;
    const el = videoRef.current;
    if (!el) return;
    void el.play().catch(() => {});
  }, [src, instantAutoplay]);

  useEffect(() => {
    if (!isDirectVideo(src) || !playInView || instantAutoplay) return;
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            void el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.2, rootMargin: "80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, playInView, instantAutoplay]);

  if (isDirectVideo(src)) {
    return (
      <video
        ref={videoRef}
        src={src}
        title={title}
        muted
        loop
        playsInline
        preload={instantAutoplay ? "auto" : "metadata"}
        autoPlay={instantAutoplay || !playInView}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]",
          className,
        )}
      />
    );
  }

  if (isDriveEmbed(src)) {
    const sep = src.includes("?") ? "&" : "?";
    const embedSrc = src.includes("autoplay") ? src : `${src}${sep}autoplay=1`;
    return (
      <iframe
        src={embedSrc}
        title={title}
        loading="eager"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full border-0 [transform:translateZ(0)]",
          className,
        )}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      title={title}
      muted
      loop
      playsInline
      preload="metadata"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]",
        className,
      )}
    />
  );
}
