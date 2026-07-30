import type { DefaultValues } from "react-hook-form";
import type { TTechnicianProfileInput } from "../schema/onboarding.schema";

export const ONBOARDING_DRAFT_KEY = "fixitnow_technician_onboarding";

export const ONBOARDING_STEPPER = [
  {
    id: 1,
    label: "Basic Information",
    title: "Tell us who you are",
    description:
      "A phone number customers can reach, a short bio, and how long you have been doing this work.",
  },
  {
    id: 2,
    label: "Pricing",
    title: "Set your rate",
    description:
      "What you charge per hour, and how far from your area you are willing to travel.",
  },
  {
    id: 3,
    label: "Service Area",
    title: "Where do you work",
    description:
      "Customers find you by city and area, so keep this exactly where you take jobs.",
  },
  {
    id: 4,
    label: "Review & Submit",
    title: "Check before you submit",
    description:
      "An admin reviews this once. Fixing something now is cheaper than a rejection later.",
  },
];

export const ONBOARDING_LAST_STEP = ONBOARDING_STEPPER.length;

export const ONBOARDING_INITIAL_VALUES: DefaultValues<TTechnicianProfileInput> =
  {
    basicInfo: {
      phone: "",
      avatar: undefined,
      bio: "",
      experienceYears: undefined,
    },
    pricing: { hourlyRate: undefined, serviceRadius: undefined },
    location: { address: "", city: "", area: "" },
  };
