"use client";

import { Fingerprint, Link2, Phone, User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { AppInput, Text } from "@/src/components";
import type { TTechnicianProfileInput } from "../schema/onboarding.schema";

const IdentityStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TTechnicianProfileInput>();

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <AppInput
          label="National ID number"
          inputMode="numeric"
          placeholder="1234567890"
          leftElement={<Fingerprint size={16} />}
          error={errors.identity?.nationalId?.message}
          {...register("identity.nationalId")}
        />

        <AppInput
          label="Date of birth (optional)"
          type="date"
          error={errors.identity?.dateOfBirth?.message}
          {...register("identity.dateOfBirth")}
        />
      </div>

      <AppInput
        label="NID document URL (optional)"
        type="url"
        placeholder="https://example.com/nid-scan.jpg"
        leftElement={<Link2 size={16} />}
        error={errors.identity?.nidDocument?.message}
        {...register("identity.nidDocument")}
      />

      <AppInput
        label="Passport number (optional)"
        placeholder="BX0912345"
        error={errors.identity?.passportNumber?.message}
        {...register("identity.passportNumber")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <AppInput
          label="Emergency contact name (optional)"
          placeholder="Rahim Uddin"
          leftElement={<User size={16} />}
          error={errors.identity?.emergencyContactName?.message}
          {...register("identity.emergencyContactName")}
        />

        <AppInput
          label="Emergency contact phone (optional)"
          type="tel"
          inputMode="numeric"
          placeholder="01712345678"
          leftElement={<Phone size={16} />}
          error={errors.identity?.emergencyContactPhone?.message}
          {...register("identity.emergencyContactPhone")}
        />
      </div>

      <div className="border border-project-border bg-project-muted-primary/60 p-4">
        <Text variant="normal-sm" as="p" className="text-project-accent">
          Identity details lock once an admin approves you. Customers never see
          this step — it is only used to verify that you are who you say.
        </Text>
      </div>
    </>
  );
};

export default IdentityStep;
