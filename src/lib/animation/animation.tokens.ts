// One place for how motion feels. Change here and every animation follows.
export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  // Scroll-linked tweens must not ease — the scrollbar is the timeline.
  none: "none",
} as const;

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
} as const;

export const STAGGER = 0.08;

// Seconds a scrubbed tween lags behind the scrollbar. This lag is what makes
// parallax read as smooth instead of glued to the wheel.
export const SCRUB = 1;
