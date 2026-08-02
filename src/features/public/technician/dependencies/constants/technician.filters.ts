import type { TSelectOption } from "@/src/types/filter.types";
import type { TPriceBucket, TTechnicianSort } from "../types/technician.types";

export const TECHNICIAN_SORT_OPTIONS: TSelectOption[] = [
  { label: "Best match", value: "best_match" satisfies TTechnicianSort },
  { label: "Top rated", value: "top_rated" satisfies TTechnicianSort },
  { label: "Most reviewed", value: "most_reviewed" satisfies TTechnicianSort },
  { label: "Price: low to high", value: "price_low" satisfies TTechnicianSort },
  {
    label: "Price: high to low",
    value: "price_high" satisfies TTechnicianSort,
  },
  { label: "Newest", value: "newest" satisfies TTechnicianSort },
];

export const PRICE_BUCKET_LABEL: Record<TPriceBucket, string> = {
  under_500: "Under ৳500 / hr",
  "500_1000": "৳500 – ৳1,000 / hr",
  "1000_2000": "৳1,000 – ৳2,000 / hr",
  "2000_plus": "৳2,000+ / hr",
};

// Boolean filters the sidebar shows as a single checkbox group.
export const TECHNICIAN_TOGGLES = [
  { key: "acceptingClients", label: "Accepting new clients" },
  { key: "eveningAvailable", label: "Available after 6 PM" },
  { key: "weekendAvailable", label: "Works weekends" },
  { key: "emergencyService", label: "Takes emergency jobs" },
  { key: "featured", label: "Featured technicians" },
] as const;
