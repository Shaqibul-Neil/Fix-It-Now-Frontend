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
    {
      label: "Start work",
      value: "IN_PROGRESS" satisfies TBookingStatusUpdate,
    },
  ],
  IN_PROGRESS: [
    {
      label: "Mark completed",
      value: "COMPLETED" satisfies TBookingStatusUpdate,
    },
  ],
};

export const CANCELABLE: TBookingStatus[] = ["REQUESTED", "ACCEPTED", "PAID"];

// Pay, review and cancel are offered on every customer row rather than hidden
// on most of them — a menu that changes shape row by row teaches nothing. What
// changes is the outcome: null runs the action, anything else is the modal
// explaining why this row cannot.
export interface IBlockedAction {
  title: string;
  description: string;
}

const CLOSED: IBlockedAction = {
  title: "This booking is closed",
  description:
    "It was declined or cancelled, so there is nothing left to do here. Book another technician to try again.",
};

export const payBlockedReason = (
  status: TBookingStatus,
): IBlockedAction | null => {
  // The backend pays out on ACCEPTED alone.
  if (status === "ACCEPTED") return null;

  if (status === "REQUESTED") {
    return {
      title: "Waiting for the technician",
      description:
        "Payment opens once the technician accepts this booking. You will be notified.",
    };
  }

  if (status === "PAID" || status === "IN_PROGRESS" || status === "COMPLETED") {
    return {
      title: "You already paid for this",
      description:
        "This booking is settled. The receipt is on your payments page.",
    };
  }

  return CLOSED;
};

export const cancelBlockedReason = (
  status: TBookingStatus,
): IBlockedAction | null => {
  if (CANCELABLE.includes(status)) return null;

  if (status === "IN_PROGRESS") {
    return {
      title: "Work has already started",
      description:
        "The technician is on the job, so this booking can no longer be cancelled. Call them if something is wrong.",
    };
  }

  if (status === "COMPLETED") {
    return {
      title: "This job is already finished",
      description:
        "A completed booking cannot be cancelled. Leave a review instead so others know how it went.",
    };
  }

  return CLOSED;
};

export const reviewBlockedReason = (
  status: TBookingStatus,
  reviewId: string | null,
): IBlockedAction | null => {
  if (status !== "COMPLETED") {
    return {
      title: "Wait for the service to complete",
      description:
        "You can rate a technician once they mark this job completed. Nothing to do until then.",
    };
  }

  // The row carries no rating or comment, so editing belongs where it does.
  if (reviewId) {
    return {
      title: "You already reviewed this booking",
      description:
        "One review per booking. Open My reviews to change what you wrote or to take it down.",
    };
  }

  return null;
};
