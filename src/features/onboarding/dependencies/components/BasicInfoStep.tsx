"use client";

import { Link2, Phone } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { AppInput, AppTextArea } from "@/src/components";
import { TTechnicianProfileInput } from "../schema/onboarding.schema";

const BasicInfoStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TTechnicianProfileInput>();

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <AppInput
          label="Phone number"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="01712345678"
          leftElement={<Phone size={16} />}
          error={errors.basicInfo?.phone?.message}
          {...register("basicInfo.phone")}
        />

        <AppInput
          label="Years of experience"
          type="number"
          inputMode="numeric"
          min={0}
          max={60}
          placeholder="5"
          error={errors.basicInfo?.experienceYears?.message}
          {...register("basicInfo.experienceYears", { valueAsNumber: true })}
        />
      </div>

      <AppInput
        label="Profile photo URL (optional)"
        type="url"
        placeholder="https://example.com/your-photo.jpg"
        leftElement={<Link2 size={16} />}
        error={errors.basicInfo?.avatar?.message}
        {...register("basicInfo.avatar", {
          setValueAs: (value) => value || undefined,
        })}
      />

      <AppTextArea
        label="Short bio"
        placeholder="Ten years of residential wiring and AC installation across Dhaka. Same-day callouts, licensed and insured."
        className="min-h-32"
        error={errors.basicInfo?.bio?.message}
        {...register("basicInfo.bio")}
      />
    </>
  );
};

export default BasicInfoStep;
