"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Play/pause a video based on viewport visibility. Calls `onPlayingChange` when
 * playback state edges (not on every intersection callback tick).
 */
export function useInViewVideoPlayback(
  videoRef: RefObject<HTMLVideoElement | null>,
  options: {
    threshold?: number;
    /** e.g. "200px 0px" — begin loading / playing before the video enters the viewport */
    rootMargin?: string;
    enabled?: boolean;
    onPlayingChange?: (playing: boolean) => void;
  } = {},
) {
  const { threshold = 0.3, rootMargin = "200px 0px", enabled = true, onPlayingChange } = options;
  const playingRef = useRef(false);
  const onCb = useRef(onPlayingChange);
  onCb.current = onPlayingChange;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const sync = (next: boolean) => {
      if (next === playingRef.current) return;
      playingRef.current = next;
      onCb.current?.(next);
    };

    const apply = (entry: IntersectionObserverEntry | undefined) => {
      if (!enabled) {
        el.pause();
        sync(false);
        return;
      }
      if (entry?.isIntersecting) {
        void el.play().catch(() => {});
        sync(true);
      } else {
        el.pause();
        sync(false);
      }
    };

    const observer = new IntersectionObserver(([entry]) => apply(entry), { threshold, rootMargin });
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.pause();
      if (playingRef.current) {
        playingRef.current = false;
        onCb.current?.(false);
      }
    };
  }, [videoRef, threshold, rootMargin, enabled]);
}
