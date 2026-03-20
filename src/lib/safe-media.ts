/**
 * Subscribe to matchMedia with guards for SSR, null MQL, and legacy Safari (addListener).
 */
export function subscribeMatchMedia(query: string, onChange: (matches: boolean) => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  let mq: MediaQueryList | null = null;
  try {
    mq = window.matchMedia(query);
  } catch {
    return () => undefined;
  }

  if (!mq) return () => undefined;

  const apply = () => onChange(mq.matches);

  if (typeof mq.addEventListener === "function") {
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }

  const legacy = mq as MediaQueryList & {
    addListener?: (cb: () => void) => void;
    removeListener?: (cb: () => void) => void;
  };
  if (typeof legacy.addListener === "function") {
    apply();
    legacy.addListener(apply);
    return () => {
      if (typeof legacy.removeListener === "function") {
        legacy.removeListener(apply);
      }
    };
  }

  return () => undefined;
}
