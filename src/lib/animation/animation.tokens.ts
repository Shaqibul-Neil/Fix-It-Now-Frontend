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

// Radix drives its own enter/exit through data-state, so overlays animate in
// CSS rather than gsap. One place for how every overlay moves.
export const OVERLAY_MOTION = {
  overlay: [
    "duration-300",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
  ].join(" "),

  center: [
    "duration-300",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  ].join(" "),

  fromRight: [
    "duration-300",
    "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
    "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right",
  ].join(" "),
} as const;
