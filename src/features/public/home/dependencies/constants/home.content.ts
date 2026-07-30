import type { Metadata } from "next";
import { AirVent, PlugZap, Ruler, Waves } from "lucide-react";
import type {
  IBannerIntro,
  IBannerProofItem,
  IBannerSlide,
} from "../types/home.types";

const UNSPLASH = "https://images.unsplash.com";

const PHOTO_IDS = {
  plumbing: "photo-1607472586893-edb57bdc0e39",
  electrical: "photo-1621905251189-08b45d6a269e",
  appliance: "photo-1558618666-fcd25c85cd64",
  carpentry: "photo-1503387762-592deb58ef4e",
} as const;

const heroPhoto = (id: string, grade = "") =>
  `${UNSPLASH}/${id}?auto=format&fit=crop&w=2400&q=80${grade}`;

const socialPhoto = (id: string) =>
  `${UNSPLASH}/${id}?auto=format&fit=crop&w=1200&h=630&q=75`;

export const BANNER_INTRO: IBannerIntro = {
  eyebrow: "Verified home services",
  headline: "Fixed today.",
  highlight: "Not someday.",
  description:
    "Book a background-checked technician for plumbing, electrical, cooling or appliance work. Your payment is held until you approve the job.",
  primaryCta: { label: "Book a technician", href: "/services" },
  secondaryCta: { label: "Browse categories", href: "/categories" },
};

export const BANNER_SLIDES: IBannerSlide[] = [
  {
    id: "plumbing",
    index: "01",
    category: "Plumbing",
    headline: "Leaks stopped before the ceiling gives in.",
    description:
      "Burst pipes, blocked drains, dead geysers. Emergency slots open every hour of the day.",
    icon: Waves,
    cta: { label: "Book plumbing", href: "/services?category=plumbing" },
    image: {
      src: heroPhoto(PHOTO_IDS.plumbing),
      alt: "Industrial water pipes and valves mounted on a brick wall",
    },
  },
  {
    id: "electrical",
    index: "02",
    category: "Electrical",
    headline: "Wiring handled by licensed hands only.",
    description:
      "Board upgrades, tripping circuits, new points. Every technician is ID-checked and skill-reviewed.",
    icon: PlugZap,
    cta: { label: "Book electrical", href: "/services?category=electrical" },
    image: {
      src: heroPhoto(PHOTO_IDS.electrical),
      alt: "Electrician in a hard hat testing wiring inside a wall-mounted panel",
    },
  },
  {
    id: "appliance",
    index: "03",
    category: "Appliance repair",
    headline: "Your kitchen back in service the same day.",
    description:
      "Fridges, ovens, washing machines. Parts sourced and fitted, with a 30-day warranty on the work.",
    icon: AirVent,
    cta: {
      label: "Book appliance repair",
      href: "/services?category=appliance",
    },
    image: {
      src: heroPhoto(PHOTO_IDS.appliance, "&bri=-32&sat=-10"),
      alt: "Technician fitting a socket wrench onto a part in a dim workshop",
    },
  },
  {
    id: "carpentry",
    index: "04",
    category: "Carpentry & fittings",
    headline: "Millimetre work, not rough guesses.",
    description:
      "Doors, cabinets, mounts and fixtures — measured, fitted and cleaned up before the technician leaves.",
    icon: Ruler,
    cta: { label: "Book carpentry", href: "/services?category=carpentry" },
    image: {
      src: heroPhoto(PHOTO_IDS.carpentry, "&bri=-28&sat=-10"),
      alt: "Craftsman marking measurements on a drawing at a timber workbench",
    },
  },
];

export const BANNER_PROOF: IBannerProofItem[] = [
  { value: "12,400+", label: "Jobs completed" },
  { value: "4.9/5", label: "Average rating" },
  { value: "58 min", label: "Median response" },
];

export const HOME_METADATA: Metadata = {
  title: {
    absolute: "FixItNow — verified technicians for same-day home repairs",
  },
  description:
    "Book background-checked technicians for plumbing, electrical, appliance and carpentry work. Same-day slots, fixed quotes, payment released only after you approve the job.",
  keywords: [
    "home repair service",
    "verified technicians",
    "plumbing service",
    "electrician booking",
    "appliance repair",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "FixItNow",
    title: "FixItNow — verified technicians for same-day home repairs",
    description:
      "Plumbing, electrical, appliance and carpentry work by background-checked technicians. Payment held until you approve the job.",
    images: [
      {
        url: socialPhoto(PHOTO_IDS.plumbing),
        width: 1200,
        height: 630,
        alt: BANNER_SLIDES[0].image.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FixItNow — verified technicians for same-day home repairs",
    description:
      "Same-day home repairs from background-checked technicians. Pay only after you approve the work.",
  },
};
