"use client";

import { CalendarClock } from "lucide-react";
import { AppButton, Text } from "@/src/components";
import { useMyAvailabilityQuery } from "../hooks/useAvailability";

// Catches whoever skipped the page after onboarding. Silent once hours exist,
// so it never nags a technician who is already bookable.
const AvailabilityPrompt = () => {
  const { data, isPending } = useMyAvailabilityQuery();

  if (isPending || (data && data.length > 0)) return null;

  return (
    <div className="mb-4 flex flex-col gap-4 border border-project-yellow/35 bg-project-yellow/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center border border-project-yellow/35 text-project-yellow">
          <CalendarClock className="size-4.5" />
        </span>

        <div className="min-w-0">
          <Text variant="semibold-base" as="p" className="text-project-accent">
            Set your working hours
          </Text>

          <Text
            variant="normal-sm"
            as="p"
            className="mt-1 text-project-muted-foreground"
          >
            Customers cannot book you until they know when you are available.
          </Text>
        </div>
      </div>

      <AppButton
        href="/dashboard/technician/availability"
        text="Set hours"
        className="shrink-0"
      />
    </div>
  );
};

export default AvailabilityPrompt;
