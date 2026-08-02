import type { Metadata } from "next";
import type {
  IBannerIntro,
  IBannerScene,
  IHomeCounter,
} from "../types/home.types";

const UNSPLASH = "https://images.unsplash.com";

const HERO_PHOTO_ID = "photo-1607472586893-edb57bdc0e39";

const HERO_ALT = "Industrial water pipes and valves mounted on a brick wall";

const heroPhoto = (id: string, grade = "") =>
  `${UNSPLASH}/${id}?auto=format&fit=crop&w=2400&q=80${grade}`;

export const BANNER_INTRO: IBannerIntro = {
  eyebrow: "Verified home services",
  primaryCta: { label: "Book a technician", href: "/technicians" },
  secondaryCta: { label: "Browse services", href: "/services" },
};

// Photo and headline swap together as the pinned banner is scrolled.
export const BANNER_SCENES: IBannerScene[] = [
  {
    id: "plumbing",
    headline: "Fixed today.",
    highlight: "Not someday.",
    description:
      "Book a background-checked technician for plumbing, electrical, cooling or appliance work. Your payment is held until you approve the job.",
    image: { src: heroPhoto(HERO_PHOTO_ID), alt: HERO_ALT },
  },
  {
    id: "electrical",
    headline: "Wiring handled",
    highlight: "by licensed hands.",
    description:
      "Board upgrades, tripping circuits, new points. Every technician is ID-checked and skill-reviewed before a single job reaches them.",
    image: {
      src: heroPhoto("photo-1621905251189-08b45d6a269e"),
      alt: "Electrician testing wiring inside a wall-mounted panel",
    },
  },
  {
    id: "appliance",
    headline: "Your kitchen back",
    highlight: "in service the same day.",
    description:
      "Fridges, ovens, washing machines. Parts sourced and fitted, with a 30-day warranty on the work that was done.",
    image: {
      src: heroPhoto("photo-1558618666-fcd25c85cd64", "&bri=-32&sat=-10"),
      alt: "Technician fitting a socket wrench onto a part in a workshop",
    },
  },
  {
    id: "carpentry",
    headline: "Millimetre work,",
    highlight: "not rough guesses.",
    description:
      "Doors, cabinets, mounts and fixtures — measured, fitted and cleaned up before the technician leaves your home.",
    image: {
      src: heroPhoto("photo-1503387762-592deb58ef4e", "&bri=-28&sat=-10"),
      alt: "Craftsman marking measurements at a timber workbench",
    },
  },
];

export const HOME_COUNTERS: IHomeCounter[] = [
  {
    id: "jobs",
    value: 12400,
    suffix: "+",
    label: "Jobs completed",
    description: "Paid out only after the customer approved the work.",
  },
  {
    id: "rating",
    value: 4.9,
    decimals: 1,
    suffix: "/5",
    label: "Average rating",
    description: "Across every published review on the platform.",
  },
  {
    id: "response",
    value: 58,
    suffix: " min",
    label: "Median response",
    description: "From request sent to a technician accepting it.",
  },
  {
    id: "technicians",
    value: 320,
    suffix: "+",
    label: "Verified technicians",
    description: "ID-checked and approved by an admin before going live.",
  },
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
        url: `${UNSPLASH}/${HERO_PHOTO_ID}?auto=format&fit=crop&w=1200&h=630&q=75`,
        width: 1200,
        height: 630,
        alt: HERO_ALT,
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
