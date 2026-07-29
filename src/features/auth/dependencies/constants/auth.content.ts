import {
  BadgeCheck,
  CalendarCheck,
  House,
  MapPinned,
  ShieldCheck,
  Timer,
  Wallet,
  Wrench,
} from "lucide-react";
import type { ElementType } from "react";
import { USER_ROLES } from "@/src/lib/auth/auth.roles";

export type TRegisterRole =
  | typeof USER_ROLES.CUSTOMER
  | typeof USER_ROLES.TECHNICIAN;

export interface IAuthAsideContent {
  eyebrow: string;
  headlineLines: string[];
  intro: string;
  highlights: { icon: ElementType; title: string; description: string }[];
  stats: { value: string; label: string }[];
  marqueeItems: string[];
}

const SERVICE_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "AC & Cooling",
  "Appliance repair",
  "Carpentry",
  "Painting",
  "Pest control",
  "Deep cleaning",
];

export const LOGIN_ASIDE: IAuthAsideContent = {
  eyebrow: "Welcome back",
  headlineLines: ["Fixed today.", "Not someday."],
  intro:
    "FixItNow connects you with background-checked technicians in your area, holds your payment until the job is approved, and keeps every booking in one place.",
  highlights: [
    {
      icon: ShieldCheck,
      title: "Verified technicians only",
      description:
        "Every profile is ID-checked and skill-reviewed before it goes live.",
    },
    {
      icon: Timer,
      title: "Same-day slots",
      description:
        "Most bookings are matched with a technician inside an hour.",
    },
    {
      icon: Wallet,
      title: "Pay after approval",
      description:
        "Funds release once you mark the job complete — never before.",
    },
  ],
  stats: [
    { value: "12,400+", label: "Jobs completed" },
    { value: "4.9/5", label: "Average rating" },
    { value: "58 min", label: "Median response" },
  ],
  marqueeItems: SERVICE_CATEGORIES,
};

const CUSTOMER_ASIDE: IAuthAsideContent = {
  eyebrow: "Customer account",
  headlineLines: ["Book it once.", "Track it live."],
  intro:
    "Describe the problem, pick a time that suits you, and follow your technician from accepted to completed without a single phone call.",
  highlights: [
    {
      icon: CalendarCheck,
      title: "Pick your own slot",
      description: "Choose the date and time window that fits your day.",
    },
    {
      icon: House,
      title: "Save your addresses",
      description: "Home, office, rental — book any of them in two taps.",
    },
    {
      icon: BadgeCheck,
      title: "Rate and re-book",
      description: "Liked the work? Send the same technician your next job.",
    },
  ],
  stats: [
    { value: "0 tk", label: "Booking fee" },
    { value: "24/7", label: "Support" },
    { value: "30 day", label: "Work warranty" },
  ],
  marqueeItems: SERVICE_CATEGORIES,
};

const TECHNICIAN_ASIDE: IAuthAsideContent = {
  eyebrow: "Technician account",
  headlineLines: ["Your skills.", "Our pipeline."],
  intro:
    "List what you repair, draw your service area, and let paid jobs come to you. No lead fees, no cold calling, payouts on a fixed weekly cycle.",
  highlights: [
    {
      icon: MapPinned,
      title: "Jobs near you",
      description: "Set a radius and only see work you can actually reach.",
    },
    {
      icon: Wrench,
      title: "Your own rates",
      description: "Price per category and update it whenever you want.",
    },
    {
      icon: Wallet,
      title: "Weekly payouts",
      description:
        "Completed jobs settle every week, tracked in your dashboard.",
    },
  ],
  stats: [
    { value: "0%", label: "Lead fee" },
    { value: "Weekly", label: "Payout cycle" },
    { value: "3 steps", label: "To go live" },
  ],
  marqueeItems: SERVICE_CATEGORIES,
};

export const REGISTER_ASIDE: Record<TRegisterRole, IAuthAsideContent> = {
  [USER_ROLES.CUSTOMER]: CUSTOMER_ASIDE,
  [USER_ROLES.TECHNICIAN]: TECHNICIAN_ASIDE,
};

// Shown before a role is picked — the two entry cards on /register.
export const REGISTER_ROLE_OPTIONS = [
  {
    index: "01",
    role: USER_ROLES.CUSTOMER,
    icon: House,
    title: "I need something fixed",
    tagline: "Register as a customer",
    points: [
      "Book verified technicians near you",
      "Track the job from accepted to done",
      "Pay only after you approve the work",
    ],
  },
  {
    index: "02",
    role: USER_ROLES.TECHNICIAN,
    icon: Wrench,
    title: "I fix things for a living",
    tagline: "Register as a technician",
    points: [
      "Publish your skills and service area",
      "Receive jobs that match what you do",
      "Get paid on a weekly payout cycle",
    ],
  },
] as const;

// Copy for the form screen itself, after the role is chosen.
export const REGISTER_FORM_CONTENT: Record<
  TRegisterRole,
  { eyebrow: string; title: string; description: string; submitLabel: string }
> = {
  [USER_ROLES.CUSTOMER]: {
    eyebrow: "01 — Customer",
    title: "Create your customer account",
    description:
      "One account for every booking, address and invoice. Takes under a minute.",
    submitLabel: "Create customer account",
  },
  [USER_ROLES.TECHNICIAN]: {
    eyebrow: "02 — Technician",
    title: "Start your technician profile",
    description:
      "Set up your login first. Skills, service area and documents come in the next step.",
    submitLabel: "Continue to onboarding",
  },
};
