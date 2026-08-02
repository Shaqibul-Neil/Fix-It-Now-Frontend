import type { Metadata } from "next";
import {
  Clock4,
  CreditCard,
  LifeBuoy,
  Mail,
  MapPin,
  PhoneCall,
  Wrench,
} from "lucide-react";
import type {
  IContactChannel,
  IContactDesk,
} from "../types/contact.types";

export const CONTACT_INTRO = {
  eyebrow: "Talk to a human",
  title: "Stuck on something the app cannot answer",
  description:
    "A booking gone wrong, a payment you want explained, or you want to work as a technician. Send it here and a person reads it.",
};

export const CONTACT_PAGE_INTRO = {
  eyebrow: "Contact",
  title: "Someone reads every message that lands here",
  description:
    "No ticket queue you never hear back from. Pick the desk that fits, or use the form and we route it for you.",
};

export const CONTACT_CHANNELS: IContactChannel[] = [
  {
    id: "phone",
    label: "Support line",
    value: "+880 1700 000 000",
    href: "tel:+8801700000000",
    meta: "Fastest for a job already in progress",
    icon: PhoneCall,
  },
  {
    id: "email",
    label: "Email",
    value: "support@fixitnow.com",
    href: "mailto:support@fixitnow.com",
    meta: "Replies inside one working day",
    icon: Mail,
  },
  {
    id: "hours",
    label: "Open hours",
    value: "Sat — Thu, 9am to 9pm",
    meta: "Emergency bookings run around the clock",
    icon: Clock4,
  },
  {
    id: "office",
    label: "Office",
    value: "Level 4, Kemal Ataturk Ave, Banani, Dhaka",
    meta: "Visits by appointment only",
    icon: MapPin,
  },
];

// Each desk maps to the topic the form sends, so nothing lands in a general inbox.
export const CONTACT_DESKS: IContactDesk[] = [
  {
    id: "booking",
    title: "A booking of mine",
    description:
      "Technician running late, work not finished, or you need to change a slot that is already confirmed.",
    email: "bookings@fixitnow.com",
    responseHours: 2,
    icon: LifeBuoy,
  },
  {
    id: "payment",
    title: "Payments and refunds",
    description:
      "Escrow questions, an invoice line you do not recognise, or a refund that has not landed yet.",
    email: "payments@fixitnow.com",
    responseHours: 8,
    icon: CreditCard,
  },
  {
    id: "technician",
    title: "Joining as a technician",
    description:
      "Application status, documents you need to submit, or how payouts and the platform fee work.",
    email: "partners@fixitnow.com",
    responseHours: 24,
    icon: Wrench,
  },
];

export const CONTACT_TOPICS = [
  { label: "A booking of mine", value: "booking" },
  { label: "Payments and refunds", value: "payment" },
  { label: "Joining as a technician", value: "technician" },
  { label: "Something else", value: "other" },
];

export const CONTACT_METADATA: Metadata = {
  title: "Contact FixItNow",
  description:
    "Reach the FixItNow team about a booking, a payment, or joining as a technician. Support line open Saturday to Thursday, emergency bookings around the clock.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact FixItNow",
    description:
      "Questions about a booking, a payment or becoming a technician — a person reads every message.",
  },
};
