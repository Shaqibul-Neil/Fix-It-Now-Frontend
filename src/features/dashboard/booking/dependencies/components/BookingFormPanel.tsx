"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "date-fns";
import { Building2, CalendarCheck, MapPin } from "lucide-react";
import {
  AppButton,
  AppDatePicker,
  AppInput,
  AppTextArea,
  AppTimePicker,
  ResultState,
  SidePanel,
  Text,
} from "@/src/components";
import { formatDateTime, formatMoney } from "@/src/lib/utils/format.utils";
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

// Visiting hours the platform sells. The backend still owns the real rule —
// it checks each technician's own availability slots.
const WORK_START = "08:00";
const WORK_END = "20:00";
const DEFAULT_TIME = "10:00";

interface ICreatedBooking {
  id?: string;
  scheduledAt: string;
  address: string;
}

const BookingFormPanel = ({ service, onClose }: IBookingFormPanelProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState(DEFAULT_TIME);
  const [created, setCreated] = useState<ICreatedBooking | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TCreateBookingForm>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: EMPTY_FORM,
  });

  // Every control starts over for whichever service opened the panel. Closing
  // is skipped so the slide-out animation does not flash an empty form.
  const [lastServiceId, setLastServiceId] = useState(service?.id);
  if (service?.id !== lastServiceId) {
    setLastServiceId(service?.id);
    if (service) {
      setDate(undefined);
      setTime(DEFAULT_TIME);
      setCreated(null);
    }
  }

  const serviceId = service?.id;
  useEffect(() => {
    if (!serviceId) return;
    reset({ ...EMPTY_FORM, serviceId });
  }, [serviceId, reset]);

  // The form carries one ISO field; the two controls write into it together.
  const applySchedule = (nextDate: Date | undefined, nextTime: string) => {
    setDate(nextDate);
    setTime(nextTime);

    const [hours, minutes] = nextTime.split(":").map(Number);

    setValue(
      "scheduledAt",
      nextDate
        ? set(nextDate, {
            hours,
            minutes,
            seconds: 0,
            milliseconds: 0,
          }).toISOString()
        : "",
      { shouldValidate: Boolean(nextDate) },
    );
  };

  const createBooking = useCreateBookingMutation((id) => {
    const values = getValues();
    setCreated({
      id,
      scheduledAt: values.scheduledAt,
      address: values.address,
    });
  });

  return (
    <SidePanel
      isOpen={Boolean(service)}
      onOpenChange={(open) => !open && onClose()}
      title={created ? "Request sent" : "Book this service"}
      description={service?.title}
      footer={
        created ? (
          <>
            <AppButton variant="outline" text="Close" onClick={onClose} />
            <AppButton
              href={
                created.id
                  ? `/dashboard/customer/bookings/${created.id}`
                  : "/dashboard/customer/bookings"
              }
              text="View booking"
            />
          </>
        ) : (
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
        )
      }
    >
      {created ? (
        <ResultState
          tone="success"
          titleAs="h3"
          icon={CalendarCheck}
          title="Booking request sent"
          description="The technician has been notified. Once they accept it, the booking moves to unpaid and you can pay from the booking page."
          className="border-0 p-0 sm:p-0"
          meta={[
            { label: "Service", value: service?.title },
            {
              label: "When",
              value: created.scheduledAt
                ? formatDateTime(created.scheduledAt)
                : "—",
            },
            {
              label: "Amount",
              value: service ? formatMoney(service.price) : null,
            },
            { label: "Where", value: created.address },
          ]}
        />
      ) : (
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

          <AppDatePicker
            mode="single"
            label="Date"
            disablePast
            value={date}
            onDateChange={(next) => applySchedule(next, time)}
            placeholderText="Pick a date"
            className="w-full md:w-full"
            error={errors.scheduledAt?.message ?? errors.serviceId?.message}
          />

          <AppTimePicker
            label="Time"
            value={time}
            minTime={WORK_START}
            maxTime={WORK_END}
            onChange={(next) => applySchedule(date, next)}
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
      )}
    </SidePanel>
  );
};

export default BookingFormPanel;
