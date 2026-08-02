"use client";

import { Controller, useFormContext } from "react-hook-form";
import { AppCheckbox, AppInput, Text } from "@/src/components";
import { TTechnicianProfileInput } from "../schema/onboarding.schema";

const PricingStep = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TTechnicianProfileInput>();

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <AppInput
          label="Hourly rate (tk)"
          type="number"
          inputMode="decimal"
          min={1}
          step={0.01}
          placeholder="500"
          error={errors.pricing?.hourlyRate?.message}
          {...register("pricing.hourlyRate", { valueAsNumber: true })}
        />

        <AppInput
          label="Service radius in km (optional)"
          type="number"
          inputMode="numeric"
          min={1}
          placeholder="10"
          error={errors.pricing?.serviceRadius?.message}
          {...register("pricing.serviceRadius", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
        />
      </div>

      <Controller
        control={control}
        name="pricing.offersEmergencyService"
        render={({ field }) => (
          <AppCheckbox
            id="offersEmergencyService"
            label="I take emergency callouts outside normal hours"
            checked={Boolean(field.value)}
            onCheckedChange={(checked) => field.onChange(checked === true)}
          />
        )}
      />

      <div className="border border-project-border bg-project-muted-primary/60 p-4">
        <Text variant="normal-sm" as="p" className="text-project-accent">
          This is your base rate. Every service you publish later carries its
          own price — that is the one customers see at booking time.
        </Text>
      </div>
    </>
  );
};

export default PricingStep;
