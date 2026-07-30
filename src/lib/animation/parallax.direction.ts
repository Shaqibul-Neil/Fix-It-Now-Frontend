export type TParallaxDirection = "up" | "down" | "left" | "right";

export const PARALLAX_TRAVEL: Record<
  TParallaxDirection,
  { axis: "x" | "y"; sign: 1 | -1 }
> = {
  up: { axis: "y", sign: 1 },
  down: { axis: "y", sign: -1 },
  left: { axis: "x", sign: 1 },
  right: { axis: "x", sign: -1 },
};
