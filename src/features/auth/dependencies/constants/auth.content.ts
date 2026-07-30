import { House, Wrench } from "lucide-react";
import { USER_ROLES } from "@/src/lib/auth/auth.roles";

export type TRegisterRole =
  | typeof USER_ROLES.CUSTOMER
  | typeof USER_ROLES.TECHNICIAN;

// Proof only: headline, three numbers, a category ticker. A prose paragraph and
// an icon list used to live here and pushed the auth screens into a scroll —
// every selling point that matters is already on the form side.
export interface IAuthAsideContent {
  eyebrow: string;
  headlineLines: string[];
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
  { eyebrow: string; title: string; description: string }
> = {
  [USER_ROLES.CUSTOMER]: {
    eyebrow: "01 — Customer",
    title: "Create your customer account",
    description:
      "One account for every booking, address and invoice. Takes under a minute.",
  },
  [USER_ROLES.TECHNICIAN]: {
    eyebrow: "02 — Technician",
    title: "Start your technician profile",
    description:
      "Set up your login first. Skills, service area and documents come next.",
  },
};
