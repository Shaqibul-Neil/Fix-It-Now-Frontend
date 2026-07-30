import type { ElementType } from "react";

export interface IBannerSlide {
  id: string;
  index: string;
  category: string;
  headline: string;
  description: string;
  icon: ElementType;
  cta: { label: string; href: string };
  image: { src: string; alt: string };
}

export interface IBannerIntro {
  eyebrow: string;
  headline: string;
  highlight: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface IBannerProofItem {
  value: string;
  label: string;
}
