/** Smooth ease-out — softer than linear, less choppy than default spring */
export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

export const MOTION_TRANSITION = {
  duration: 0.65,
  ease: MOTION_EASE,
} as const;

export function motionTransition(delay = 0) {
  return delay ? { ...MOTION_TRANSITION, delay } : { ...MOTION_TRANSITION };
}
