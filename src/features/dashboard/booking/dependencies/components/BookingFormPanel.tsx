"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, MapPin } from "lucide-react";
import { AppButton, AppInput, AppTextArea, SidePanel, Text } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import type { IBookableService } from "@/src/features/dashboard/service/dependencies/types/service.types";
import { useCreateBookingMutation } from "../hooks/useBookingMutation";
import {
  createBookingSchema,
  type TCreateBookingForm,
} from "../schema/booking.schema";

interface IBookingFormPanelProps {
  service: IBookableService | null;
  onClose: () => void;
}

const EMPTY_FORM: TCreateBookingForm = {
  serviceId: "",
  scheduledAt: "",
  address: "",
  city: "",
  area: "",
  notes: "",
};

const BookingFormPanel = ({ service, onClose }: IBookingFormPanelProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateBookingForm>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: EMPTY_FORM,
  });

  // The panel stays mounted between rows, so the id has to follow whichever
  // service opened it.
  useEffect(() => {
    reset({ ...EMPTY_FORM, serviceId: service?.id ?? "" });
  }, [service?.id, reset]);

  const createBooking = useCreateBookingMutation(() => {
    onClose();
    router.push("/dashboard/customer/bookings");
  });

  return (
    <SidePanel
      isOpen={Boolean(service)}
      onOpenChange={(open) => !open && onClose()}
      title="Book this service"
      description={service?.title}
      footer={
        <>
          <AppButton
            variant="outline"
            text="Cancel"
            onClick={onClose}
            disabled={createBooking.isPending}
          />
          <AppButton
            type="submit"
            form="booking-form"
            text="Confirm booking"
            disabled={createBooking.isPending}
          />
        </>
      }
    >
      <form
        id="booking-form"
        className="space-y-5"
        onSubmit={handleSubmit((values) => createBooking.mutate(values))}
      >
        <div className="border border-project-border bg-project-muted/40 p-4">
          <Text
            variant="medium-xs"
            as="span"
            className="block uppercase tracking-[0.14em] text-project-muted-foreground"
          >
            You are booking
          </Text>

          <Text
            variant="semibold-base"
            as="p"
            className="mt-2 text-project-accent"
          >
            {service?.title}
          </Text>

          <Text
            variant="normal-sm"
            as="p"
            className="mt-1 text-project-muted-foreground"
          >
            {service ? formatMoney(service.price) : null}
          </Text>
        </div>

        <input type="hidden" {...register("serviceId")} />

        <AppInput
          label="Date and time"
          type="datetime-local"
          error={errors.scheduledAt?.message ?? errors.serviceId?.message}
          {...register("scheduledAt")}
        />

        <AppTextArea
          label="Full address"
          placeholder="House 12, Road 4, Block C, Mirpur 10, Dhaka 1216"
          error={errors.address?.message}
          {...register("address")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <AppInput
            label="City"
            autoComplete="address-level2"
            placeholder="Dhaka"
            leftElement={<Building2 size={16} />}
            error={errors.city?.message}
            {...register("city")}
          />

          <AppInput
            label="Area"
            autoComplete="address-level3"
            placeholder="Mirpur"
            leftElement={<MapPin size={16} />}
            error={errors.area?.message}
            {...register("area")}
          />
        </div>

        <AppTextArea
          label="Notes for the technician"
          placeholder="Anything they should know before arriving"
          error={errors.notes?.message}
          {...register("notes")}
        />
      </form>
    </SidePanel>
  );
};

export default BookingFormPanel;
