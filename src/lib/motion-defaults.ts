/** Smooth ease-out — use for Framer Motion transitions (avoid heavy spring curves). */
export const MOTION_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export const MOTION_TRANSITION = {
  duration: 0.45,
  ease: MOTION_EASE,
} as const;

export function motionTransition(delay = 0) {
  return delay ? { ...MOTION_TRANSITION, delay } : { ...MOTION_TRANSITION };
}
