"use client";

import { Building2, MapPin } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { AppInput, AppTextArea } from "@/src/components";
import { TTechnicianProfileInput } from "../schema/onboarding.schema";

const LocationStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TTechnicianProfileInput>();

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <AppInput
          label="City"
          autoComplete="address-level2"
          placeholder="Dhaka"
          leftElement={<Building2 size={16} />}
          error={errors.location?.city?.message}
          {...register("location.city")}
        />

        <AppInput
          label="Area"
          autoComplete="address-level3"
          placeholder="Mirpur"
          leftElement={<MapPin size={16} />}
          error={errors.location?.area?.message}
          {...register("location.area")}
        />
      </div>

      <AppTextArea
        label="Full address"
        placeholder="House 12, Road 4, Block C, Mirpur 10, Dhaka 1216"
        error={errors.location?.address?.message}
        {...register("location.address")}
      />
    </>
  );
};

export default LocationStep;
