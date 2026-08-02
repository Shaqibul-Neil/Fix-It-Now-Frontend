import type { Metadata } from "next";
import { FileSearch, IdCard, ShieldCheck, Star } from "lucide-react";
import type {
  IAboutPrinciple,
  IMilestone,
  ITeamMember,
  IVettingStep,
} from "../types/about.types";

const UNSPLASH = "https://images.unsplash.com";

export const ABOUT_INTRO = {
  eyebrow: "About FixItNow",
  title: "Finding someone honest should not be the hard part",
  description:
    "We started with one question — why is booking a plumber a matter of luck? FixItNow exists so the answer stops being whoever picked up the phone.",
};

export const ABOUT_HERO_IMAGE = {
  src: `${UNSPLASH}/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2000&q=80&bri=-15`,
  alt: "Electrician working inside an open distribution board",
};

export const ABOUT_STORY = {
  eyebrow: "Why we built it",
  title: "Three quotes, three prices, no way to tell who was right",
  paragraphs: [
    "A leaking bathroom joint in a Dhanmondi flat took eleven days and four different people to fix. Every one of them quoted a different number over the phone, none of them wrote anything down, and the last one asked for more money once the tiles were already off the wall.",
    "None of that is a plumbing problem. It is an information problem. The customer cannot see who is competent, and the good technician has no way to prove that they are — so both sides lose to whoever shouts loudest.",
    "FixItNow puts the missing information in one place. Verified identity, a published rate, real working hours, and a review that can only come from a job somebody paid for. Then it holds the money until the work is actually done.",
  ],
  pullQuote:
    "The technician should compete on their record, not on how convincing they sound on the phone.",
};

export const ABOUT_STATS = [
  { id: "jobs", value: "12,400+", label: "Jobs completed" },
  { id: "technicians", value: "320+", label: "Verified technicians" },
  { id: "cities", value: "6", label: "Cities live" },
  { id: "rating", value: "4.9/5", label: "Average rating" },
];

export const ABOUT_PRINCIPLES: IAboutPrinciple[] = [
  {
    id: "escrow",
    index: "01",
    title: "The money moves last",
    description:
      "Payment is held by us, not by the technician, and it is released when the customer says the work is done. A half-finished repair is never a paid one, and a dispute freezes it entirely.",
  },
  {
    id: "identity",
    index: "02",
    title: "Nobody is anonymous",
    description:
      "Every technician on the platform submitted a national ID and had it checked by a person. If a profile is live, we know exactly who is standing at your door.",
  },
  {
    id: "price",
    index: "03",
    title: "The price is agreed before the visit",
    description:
      "Quotes are fixed for the work described. Anything found on site has to be priced in front of the customer and accepted before the technician carries on.",
  },
  {
    id: "proof",
    index: "04",
    title: "Reviews are earned, not collected",
    description:
      "Only a customer who paid for a completed booking can leave a rating, and it stays attached to that job forever. We do not buy, plant or delete them.",
  },
];

export const VETTING_INTRO = {
  eyebrow: "How a technician gets listed",
  title: "Four gates before a profile is visible to anyone",
  description:
    "Most applications do not clear all four. That is the point — the list is short because the checks are real.",
};

export const VETTING_STEPS: IVettingStep[] = [
  {
    id: "identity",
    title: "Identity on file",
    description:
      "National ID or passport, matched against the name and phone number on the account. No document, no application.",
    outcome: "Rejected without a match",
    icon: IdCard,
  },
  {
    id: "trade",
    title: "Trade evidence",
    description:
      "Years on the tools, the categories they work in, and photographs of past jobs. Electrical applicants must also hold a valid licence.",
    outcome: "Licence mandatory for electrical",
    icon: FileSearch,
  },
  {
    id: "review",
    title: "Manual admin review",
    description:
      "A person reads the whole application. Approvals, rejections and the reason for each are recorded against the account.",
    outcome: "Decided in about two days",
    icon: ShieldCheck,
  },
  {
    id: "ongoing",
    title: "Judged on every job after that",
    description:
      "Ratings, dispute history and cancellations are watched continuously. A profile that slips is suspended, not quietly left running.",
    outcome: "Approval is not permanent",
    icon: Star,
  },
];

export const MILESTONES: IMilestone[] = [
  {
    id: "start",
    period: "Early 2024",
    title: "One category, one city",
    description:
      "Plumbing in Dhaka, twelve technicians, and a spreadsheet holding the bookings together.",
  },
  {
    id: "escrow",
    period: "Late 2024",
    title: "Escrow goes live",
    description:
      "Payments stopped going hand to hand. Disputes dropped by more than half in the first quarter.",
  },
  {
    id: "categories",
    period: "2025",
    title: "Six trades, five cities",
    description:
      "Electrical, cooling, appliance, carpentry and painting joined, each with its own vetting rules.",
  },
  {
    id: "now",
    period: "2026",
    title: "12,400 jobs and counting",
    description:
      "Median response is down to 42 minutes and every review on the platform is tied to a paid booking.",
  },
];

export const TEAM_INTRO = {
  eyebrow: "Who is behind it",
  title: "Small team, no call centre",
  description:
    "The people who read your support messages are the same people who built the thing you are messaging about.",
};

export const ABOUT_TEAM: ITeamMember[] = [
  {
    id: "founder",
    name: "Shakib Rahman",
    role: "Founder",
    focus: "Talks to technicians every week and still reads the disputes.",
  },
  {
    id: "ops",
    name: "Farhana Islam",
    role: "Head of operations",
    focus: "Owns the vetting queue and decides who gets listed.",
  },
  {
    id: "trust",
    name: "Ariful Haque",
    role: "Trust and safety",
    focus: "Reviews every complaint and every suspension.",
  },
  {
    id: "product",
    name: "Nabila Karim",
    role: "Product",
    focus: "Keeps the booking flow short enough to finish on a phone.",
  },
];

export const ABOUT_CTA = {
  title: "Two ways in from here",
  description:
    "Book someone verified for the thing that broke, or put your own trade on the platform.",
  primary: { label: "Browse technicians", href: "/technicians" },
  secondary: { label: "Apply as a technician", href: "/register?role=technician" },
};

export const ABOUT_METADATA: Metadata = {
  title: "About FixItNow",
  description:
    "Why FixItNow exists, how technicians are vetted, and what happens to your money between booking and completion.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About FixItNow",
    description:
      "Verified identities, fixed quotes and payment held in escrow — how the platform actually works.",
    images: [{ url: ABOUT_HERO_IMAGE.src }],
  },
};
