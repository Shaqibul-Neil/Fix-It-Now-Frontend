import type { TSelectOption } from "@/src/types/filter.types";
import type { TBookingStatus } from "@/src/types/types";
import type { TBookingStatusUpdate } from "./types/booking.types";

// Mirrors the backend's transition guard, so a table or a details page never
// offers a move that would come back as a 400.
export const NEXT_STATUS: Partial<Record<TBookingStatus, TSelectOption[]>> = {
  REQUESTED: [
    {
      label: "Accept the job",
      value: "ACCEPTED" satisfies TBookingStatusUpdate,
    },
    {
      label: "Decline the job",
      value: "DECLINED" satisfies TBookingStatusUpdate,
    },
  ],
  PAID: [
    { label: "Start work", value: "IN_PROGRESS" satisfies TBookingStatusUpdate },
  ],
  IN_PROGRESS: [
    {
      label: "Mark completed",
      value: "COMPLETED" satisfies TBookingStatusUpdate,
    },
  ],
};

export const CANCELABLE: TBookingStatus[] = ["REQUESTED", "ACCEPTED", "PAID"];

// REQUESTED is shown too, but only to explain that the technician must accept
// first — the backend pays out on ACCEPTED alone.
export const PAYABLE: TBookingStatus[] = ["REQUESTED", "ACCEPTED"];
