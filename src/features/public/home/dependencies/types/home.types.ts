import type { LucideIcon } from "lucide-react";

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

export interface IProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  meta: string;
  icon: LucideIcon;
}

export interface IValueProp {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  stats?: { id: string; value: string; label: string }[];
}

export interface ITestimonial {
  id: string;
  quote: string;
  highlight: string;
  rating: number;
  customerName: string;
  customerLocation: string;
  categoryName: string;
  serviceTitle: string;
  technicianName: string;
  completedOn: string;
  amountPaid: string;
  beforeImage: string;
  afterImage: string;
}

export interface IFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ICoverageCity {
  id: string;
  city: string;
  technicianCount: number;
  areas: string[];
  isLive: boolean;
}

export interface IJoinBenefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}
