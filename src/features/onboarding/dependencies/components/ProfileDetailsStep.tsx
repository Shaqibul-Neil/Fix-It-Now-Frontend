"use client";

import { BadgeCheck } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { AppInput, AppTextArea, Text } from "@/src/components";
import type { TTechnicianProfileInput } from "../schema/onboarding.schema";

// One entry per line, blank lines dropped.
const toList = (value: string) =>
  value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);

const ProfileDetailsStep = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TTechnicianProfileInput>();

  return (
    <>
      <AppInput
        label="Professional title (optional)"
        placeholder="Licensed Electrician & AC Specialist"
        leftElement={<BadgeCheck size={16} />}
        error={errors.profileDetails?.professionalTitle?.message}
        {...register("profileDetails.professionalTitle")}
      />

      <AppTextArea
        label="Tagline (optional)"
        placeholder="I treat every callout like it is my own home — measured, tested and cleaned up."
        className="min-h-20"
        error={errors.profileDetails?.tagline?.message}
        {...register("profileDetails.tagline")}
      />

      <Controller
        control={control}
        name="profileDetails.skills"
        render={({ field }) => (
          <AppTextArea
            label="Skills — one per line"
            placeholder={"Wiring & rewiring\nCircuit breaker repair\nAC installation"}
            className="min-h-32"
            error={errors.profileDetails?.skills?.message}
            value={field.value?.join("\n") ?? ""}
            onChange={(event) => field.onChange(toList(event.target.value))}
            onBlur={field.onBlur}
          />
        )}
      />

      <Controller
        control={control}
        name="profileDetails.workHighlights"
        render={({ field }) => (
          <AppTextArea
            label="How you work — one per line"
            placeholder={
              "Same-day callouts across Dhaka\nWritten quote before any work starts\n30-day warranty on every repair"
            }
            className="min-h-32"
            error={errors.profileDetails?.workHighlights?.message}
            value={field.value?.join("\n") ?? ""}
            onChange={(event) => field.onChange(toList(event.target.value))}
            onBlur={field.onBlur}
          />
        )}
      />

      <div className="border border-project-border bg-project-muted-primary/60 p-4">
        <Text variant="normal-sm" as="p" className="text-project-accent">
          Skills are what customers filter the technician list by, so use the
          words they would search for.
        </Text>
      </div>
    </>
  );
};

export default ProfileDetailsStep;
