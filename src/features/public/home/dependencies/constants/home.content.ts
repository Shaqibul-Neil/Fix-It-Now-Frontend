import type { Metadata } from "next";
import {
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  Lock,
  Receipt,
  ShieldCheck,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import type {
  IBannerIntro,
  IBannerScene,
  ICoverageCity,
  IFaqItem,
  IHomeCounter,
  IJoinBenefit,
  IProcessStep,
  ITestimonial,
  IValueProp,
} from "../types/home.types";

const UNSPLASH = "https://images.unsplash.com";

const HERO_PHOTO_ID = "photo-1607472586893-edb57bdc0e39";

const HERO_ALT = "Industrial water pipes and valves mounted on a brick wall";

const heroPhoto = (id: string, grade = "") =>
  `${UNSPLASH}/${id}?auto=format&fit=crop&w=2400&q=80${grade}`;

export const BANNER_INTRO: IBannerIntro = {
  eyebrow: "Verified home services",
  primaryCta: { label: "Book a technician", href: "/technicians" },
  secondaryCta: { label: "Browse categories", href: "/categories" },
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

// Read left to right on a wide screen, top to bottom on a small one.
export const HOW_IT_WORKS: IProcessStep[] = [
  {
    id: "describe",
    step: "01",
    title: "Tell us what broke",
    description:
      "Pick the category, describe the problem and choose a slot that suits you. No call centre, no waiting on hold.",
    meta: "Takes 2 minutes",
    icon: ClipboardList,
  },
  {
    id: "compare",
    step: "02",
    title: "Compare real technicians",
    description:
      "See verified profiles side by side — hourly rate, years on the tools, skills and the reviews of people who booked them before you.",
    meta: "Free to browse",
    icon: Users,
  },
  {
    id: "secure",
    step: "03",
    title: "Confirm and pay into escrow",
    description:
      "Your money is held by FixItNow, not by the technician. The quote is fixed before anyone knocks on your door.",
    meta: "Card or mobile wallet",
    icon: ShieldCheck,
  },
  {
    id: "approve",
    step: "04",
    title: "Approve the work",
    description:
      "Happy with the job? Release the payment and rate the technician. Not happy? Raise it and we step in before a single taka moves.",
    meta: "You hold the release",
    icon: ThumbsUp,
  },
];

export const PROCESS_INTRO = {
  eyebrow: "How it works",
  title: "Four steps between a broken thing and a fixed one",
  description:
    "The same flow for a leaking tap and a dead compressor — transparent pricing, a vetted technician, and money that only moves when you say so.",
  cta: {
    title: "Ready when you are",
    description:
      "Every technician on the list has already cleared ID checks and an admin review.",
    label: "Book a technician",
    href: "/technicians",
  },
};

export const VALUE_INTRO = {
  eyebrow: "Why FixItNow",
  title: "Built so the risk sits with us, not with you",
  description:
    "Anyone can list a phone number. We check the person behind it, hold the payment, and stand behind the work after they leave.",
};

// The first entry renders as the large tile, the rest as the small ones.
export const WHY_CHOOSE_US: IValueProp[] = [
  {
    id: "vetted",
    title: "Every technician is vetted before you ever see them",
    description:
      "National ID, trade experience and past work are reviewed by an admin. Rejected applications never reach the public listing, and an approved profile can still be pulled the moment standards slip.",
    icon: BadgeCheck,
    stats: [
      { id: "verified", value: "100%", label: "ID-verified profiles" },
      { id: "review", value: "Manual", label: "Admin approval on every join" },
    ],
  },
  {
    id: "escrow",
    title: "Money held in escrow",
    description:
      "Payment sits with us until you mark the job done, so a half-finished repair is never a paid one.",
    icon: Lock,
  },
  {
    id: "quote",
    title: "Fixed price up front",
    description:
      "The rate is agreed before the visit. No surprise call-out charge added at your doorstep.",
    icon: Receipt,
  },
  {
    id: "sameday",
    title: "Same-day slots",
    description:
      "Technicians publish their real working hours, so the slot you pick is one they can actually keep.",
    icon: CalendarClock,
  },
  {
    id: "reviews",
    title: "Reviews you can trust",
    description:
      "Only a customer who paid for a completed booking can leave a rating. Nothing is bought or planted.",
    icon: Star,
  },
];

export const TESTIMONIAL_INTRO = {
  eyebrow: "Straight from completed jobs",
  title: "Reviews are earned here, not collected",
  description:
    "Only a customer who paid for a finished booking can leave one. Every quote below is tied to the job it came from.",
};

// Before and after are the same photo graded two ways — the real pair comes off
// the booking once technicians start uploading job photos.
const repairPhoto = (id: string, grade: string) =>
  `${UNSPLASH}/${id}?auto=format&fit=crop&w=1200&q=80${grade}`;

export const TESTIMONIALS: ITestimonial[] = [
  {
    id: "review-1",
    quote:
      "Water had been coming through the ceiling for two days and three people had already quoted me blind over the phone.",
    highlight:
      "Karim found the joint in twenty minutes and the price never moved from what the app showed me.",
    rating: 5,
    customerName: "Nusrat J.",
    customerLocation: "Dhanmondi, Dhaka",
    categoryName: "Plumbing",
    serviceTitle: "Emergency leak repair",
    technicianName: "Karim Mia",
    completedOn: "12 July 2026",
    amountPaid: "1200",
    beforeImage: repairPhoto("photo-1607472586893-edb57bdc0e39", "&bri=-35&sat=-40"),
    afterImage: repairPhoto("photo-1607472586893-edb57bdc0e39", "&bri=8"),
  },
  {
    id: "review-2",
    quote:
      "Half the flat kept tripping every time the iron went on and I was ready to rewire the whole place.",
    highlight:
      "Turned out to be one burnt socket. He showed me the reading before and after, and charged me for one hour.",
    rating: 5,
    customerName: "Tanvir H.",
    customerLocation: "Banani, Dhaka",
    categoryName: "Electrical",
    serviceTitle: "Tripping circuit diagnosis",
    technicianName: "Nasir Uddin",
    completedOn: "28 June 2026",
    amountPaid: "900",
    beforeImage: repairPhoto("photo-1621905251189-08b45d6a269e", "&bri=-40&sat=-35"),
    afterImage: repairPhoto("photo-1621905251189-08b45d6a269e", "&bri=6"),
  },
  {
    id: "review-3",
    quote:
      "The AC ran all night and the room still felt like the street outside. Two shops told me to replace the unit.",
    highlight:
      "It needed gas and a filter clean. Cost me a fifth of a new machine and the room was cold by afternoon.",
    rating: 5,
    customerName: "Sharmin A.",
    customerLocation: "Bashundhara, Dhaka",
    categoryName: "AC & cooling",
    serviceTitle: "Gas refill with leak test",
    technicianName: "Tanvir Ahmed",
    completedOn: "03 June 2026",
    amountPaid: "2600",
    beforeImage: repairPhoto("photo-1558618666-fcd25c85cd64", "&bri=-42&sat=-30"),
    afterImage: repairPhoto("photo-1558618666-fcd25c85cd64", "&bri=4"),
  },
  {
    id: "review-4",
    quote:
      "A bedroom door had been scraping the frame since the monsoon and every carpenter wanted to replace the whole thing.",
    highlight:
      "He planed it, reset the hinges and cleared the shavings. It has closed properly every day since.",
    rating: 4,
    customerName: "Rakib M.",
    customerLocation: "Mohakhali, Dhaka",
    categoryName: "Carpentry",
    serviceTitle: "Door repair and realignment",
    technicianName: "Shamim Reza",
    completedOn: "19 May 2026",
    amountPaid: "1300",
    beforeImage: repairPhoto("photo-1503387762-592deb58ef4e", "&bri=-38&sat=-45"),
    afterImage: repairPhoto("photo-1503387762-592deb58ef4e", "&bri=6&sat=-5"),
  },
];

export const EMERGENCY_BAND = {
  eyebrow: "Emergency callout",
  title: "Burst pipe at two in the morning?",
  description:
    "Technicians who take emergency work publish round-the-clock hours. Filter for them and the next free slot is the one you book.",
  cta: {
    label: "Find emergency technicians",
    href: "/technicians?emergencyService=true",
  },
  stats: [
    { id: "response", value: "42 min", label: "Median response" },
    { id: "cover", value: "24/7", label: "Emergency cover" },
    { id: "cities", value: "6", label: "Cities live" },
  ],
};

export const COVERAGE_INTRO = {
  eyebrow: "Where we work",
  title: "Six cities live, more opening every quarter",
  description:
    "A technician only appears in your results if they publish working hours for your area, so nobody accepts a job they cannot reach.",
};

export const COVERAGE_CITIES: ICoverageCity[] = [
  {
    id: "dhaka",
    city: "Dhaka",
    technicianCount: 186,
    areas: [
      "Dhanmondi",
      "Gulshan",
      "Banani",
      "Uttara",
      "Mirpur",
      "Mohammadpur",
      "Bashundhara",
      "Badda",
      "Motijheel",
      "Rampura",
    ],
    isLive: true,
  },
  {
    id: "chattogram",
    city: "Chattogram",
    technicianCount: 64,
    areas: ["Agrabad", "Khulshi", "Nasirabad", "Halishahar", "Pahartali"],
    isLive: true,
  },
  {
    id: "sylhet",
    city: "Sylhet",
    technicianCount: 28,
    areas: ["Zindabazar", "Amberkhana", "Subid Bazar"],
    isLive: true,
  },
  {
    id: "khulna",
    city: "Khulna",
    technicianCount: 21,
    areas: ["Sonadanga", "Khalishpur", "Boyra"],
    isLive: true,
  },
  {
    id: "rajshahi",
    city: "Rajshahi",
    technicianCount: 14,
    areas: ["Boalia", "Shaheb Bazar", "Motihar"],
    isLive: true,
  },
  {
    id: "barishal",
    city: "Barishal",
    technicianCount: 7,
    areas: ["Band Road", "Nathullabad"],
    isLive: false,
  },
];

export const FAQ_INTRO = {
  eyebrow: "Before you book",
  title: "The questions people actually ask",
  description:
    "Money, safety and what happens when a job goes wrong. If yours is not here, the form below reaches a person.",
};

export const HOME_FAQ: IFaqItem[] = [
  {
    id: "vetting",
    question: "How do you check the technicians?",
    answer:
      "Every applicant submits a national ID, trade experience and proof of past work. An admin reviews it by hand before the profile is ever visible, and electrical applicants are rejected outright without a valid trade licence on file. An approved profile can still be pulled the moment complaints stand up.",
  },
  {
    id: "escrow",
    question: "When does the technician get my money?",
    answer:
      "Not when they arrive, and not when they say they are finished. Your payment sits with FixItNow until you mark the job complete. If you raise a dispute instead, nothing moves until we have looked at it.",
  },
  {
    id: "pricing",
    question: "Can the price change after they turn up?",
    answer:
      "The quote you accept is fixed for the work you described. If the technician finds something else — a cracked pipe behind the wall, a board that needs replacing — they have to price it in front of you and you have to accept it before they carry on.",
  },
  {
    id: "timing",
    question: "How fast can someone actually come?",
    answer:
      "Median time from request to a technician accepting is 42 minutes. Same-day slots are common in Dhaka and Chattogram. Technicians publish their real working hours, so the slot you pick is one they can keep.",
  },
  {
    id: "warranty",
    question: "What if the fault comes back?",
    answer:
      "Work carries a 30-day warranty. Report the same fault inside that window and the return visit costs you nothing. Parts keep whatever warranty the manufacturer gives them, itemised on your invoice.",
  },
  {
    id: "dispute",
    question: "The job was done badly. Now what?",
    answer:
      "Do not release the payment. Open a dispute from the booking and an admin reviews both sides, the photos and the message history. Refunds go back to your original payment method.",
  },
  {
    id: "cancel",
    question: "Can I cancel after booking?",
    answer:
      "Yes, free of charge until the technician is on the way. After that a call-out fee may apply, and it is shown to you before you confirm the cancellation.",
  },
  {
    id: "reviews",
    question: "Are the reviews real?",
    answer:
      "Only a customer who paid for a completed booking can leave one, and it is permanently attached to that job. Nothing is bought, planted or edited after the fact.",
  },
];

export const JOIN_INTRO = {
  eyebrow: "Work with us",
  title: "Your tools, your hours, our customers",
  description:
    "Stop chasing work through phone calls and middlemen. Publish your rate, set the days you actually work, and get paid the moment the customer signs off.",
  cta: { label: "Apply as a technician", href: "/register?role=technician" },
  earnings: [
    { id: "share", value: "85%", label: "You keep of every job" },
    { id: "payout", value: "24h", label: "From approval to payout" },
    { id: "fee", value: "৳0", label: "To list your profile" },
  ],
};

export const JOIN_BENEFITS: IJoinBenefit[] = [
  {
    id: "hours",
    title: "You set the calendar",
    description:
      "Publish the days and hours you take work. Nobody can book a slot you did not open.",
    icon: CalendarClock,
  },
  {
    id: "rate",
    title: "You set the rate",
    description:
      "Price each service yourself. We never discount your work to win a booking.",
    icon: Receipt,
  },
  {
    id: "paid",
    title: "Paid, not chased",
    description:
      "The customer's money is already in escrow before you knock. Approval releases it to you.",
    icon: Wallet,
  },
  {
    id: "reputation",
    title: "A record that follows you",
    description:
      "Every completed job builds a public rating that wins the next one. No portfolio to maintain.",
    icon: TrendingUp,
  },
];

export const JOIN_STEPS = [
  {
    id: "apply",
    step: "01",
    title: "Send your details",
    description: "ID, trade experience and the areas you cover.",
  },
  {
    id: "verify",
    step: "02",
    title: "Get reviewed",
    description: "An admin checks it by hand, usually within two working days.",
  },
  {
    id: "work",
    step: "03",
    title: "Open your calendar",
    description: "List your services, publish hours, start taking bookings.",
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
