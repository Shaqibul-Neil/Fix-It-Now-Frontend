export interface IBannerIntro {
  eyebrow: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface IBannerScene {
  id: string;
  headline: string;
  highlight: string;
  description: string;
  image: { src: string; alt: string };
}

export interface IHomeCounter {
  id: string;
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  description: string;
}
