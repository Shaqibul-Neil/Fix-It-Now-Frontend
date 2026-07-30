"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isToday, set } from "date-fns";
import { Building2, CalendarCheck, MapPin } from "lucide-react";
import {
  AppButton,
  AppDatePicker,
  AppInput,
  AppTextArea,
  ResultState,
  SidePanel,
  Text,
} from "@/src/components";
import {
  DAY_SHORT,
  DAY_ORDER,
  DAY_INDEX,
  buildTimeSlots,
  slotsForDate,
  workingDayIndexes,
} from "@/src/features/dashboard/availability/dependencies/utils/availability.utils";
import { useTechnicianAvailabilityQuery } from "@/src/features/dashboard/availability/dependencies/hooks/useAvailability";
import {
  formatDateTime,
  formatMoney,
  formatTime,
} from "@/src/lib/utils/format.utils";
import { cn } from "@/src/lib/utils/cn";
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

// Used only when the technician published no hours at all — the backend skips
// its availability check for them, so the panel opens the whole working day.
const FALLBACK_RANGE = { startTime: "08:00", endTime: "20:00" };
const FALLBACK_STEP = 60;

interface ICreatedBooking {
  id?: string;
  scheduledAt: string;
  address: string;
}

const BookingFormPanel = ({ service, onClose }: IBookingFormPanelProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [created, setCreated] = useState<ICreatedBooking | null>(null);

  const { data: availability = [], isPending: isLoadingHours } =
    useTechnicianAvailabilityQuery(service?.technicianId);

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
      setTime("");
      setCreated(null);
    }
  }

  const serviceId = service?.id;
  useEffect(() => {
    if (!serviceId) return;
    reset({ ...EMPTY_FORM, serviceId });
  }, [serviceId, reset]);

  const hasPublishedHours = availability.length > 0;
  const workingDays = workingDayIndexes(availability);

  // Whichever weekday the technician never works is unreachable on the
  // calendar, so a wrong day cannot even be clicked.
  const blockedDays = hasPublishedHours
    ? DAY_ORDER.map((day) => DAY_INDEX[day]).filter(
        (index) => !workingDays.includes(index),
      )
    : undefined;

  const step = Math.max(15, service?.estimatedDuration ?? FALLBACK_STEP);

  const dayRanges = hasPublishedHours
    ? slotsForDate(availability, date)
    : [FALLBACK_RANGE];

  // A booking has to be in the future, so today loses the hours already gone.
  const notBefore =
    date && isToday(date)
      ? Math.ceil(
          (new Date().getHours() * 60 + new Date().getMinutes()) / step,
        ) * step
      : undefined;

  const times = date ? buildTimeSlots(dayRanges, step, notBefore) : [];

  // The form carries one ISO field; the date and the chosen start write it
  // together.
  const applySchedule = (
    nextDate: Date | undefined,
    nextTime: string,
    { validate = true } = {},
  ) => {
    setDate(nextDate);
    setTime(nextTime);

    const [hours, minutes] = nextTime.split(":").map(Number);
    const isComplete = Boolean(nextDate && nextTime);

    setValue(
      "scheduledAt",
      isComplete && nextDate
        ? set(nextDate, {
            hours,
            minutes,
            seconds: 0,
            milliseconds: 0,
          }).toISOString()
        : "",
      { shouldValidate: validate && isComplete },
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

          {/* Which days this technician works, before anything is picked. */}
          {hasPublishedHours && (
            <div>
              <Text
                variant="label-sm"
                as="span"
                className="text-project-foreground"
              >
                Works on
              </Text>

              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {DAY_ORDER.map((day) => {
                  const isWorking = workingDays.includes(DAY_INDEX[day]);

                  return (
                    <span
                      key={day}
                      className={cn(
                        "border px-2.5 py-1 text-xs font-medium uppercase tracking-[0.12em]",
                        isWorking
                          ? "border-project-primary/30 bg-project-muted-primary text-project-primary"
                          : "border-project-border bg-project-muted text-project-muted-foreground/60",
                      )}
                    >
                      {DAY_SHORT[day]}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <input type="hidden" {...register("serviceId")} />

          <AppDatePicker
            mode="single"
            label="Date"
            disablePast
            disabledDaysOfWeek={blockedDays}
            value={date}
            onDateChange={(next) =>
              applySchedule(next, "", { validate: false })
            }
            placeholderText="Pick a date"
            className="w-full md:w-full"
            error={errors.scheduledAt?.message ?? errors.serviceId?.message}
          />

          <div>
            <Text
              variant="label-sm"
              as="span"
              className="text-project-foreground"
            >
              Start time
            </Text>

            {!date ? (
              <Text
                variant="normal-sm"
                as="p"
                className="mt-1.5 text-project-muted-foreground"
              >
                Pick a date first.
              </Text>
            ) : isLoadingHours ? (
              <Text
                variant="normal-sm"
                as="p"
                className="mt-1.5 text-project-muted-foreground"
              >
                Loading available times…
              </Text>
            ) : times.length === 0 ? (
              <Text
                variant="normal-sm"
                as="p"
                className="mt-1.5 text-project-muted-foreground"
              >
                Nothing left on this date. Try the next one.
              </Text>
            ) : (
              // One button per bookable start, so an hour outside the
              // technician's window cannot be chosen at all.
              <div className="mt-1.5 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {times.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => applySchedule(date, option)}
                    className={cn(
                      "cursor-pointer border px-2 py-2 text-sm font-medium tabular-nums transition-colors duration-200",
                      option === time
                        ? "border-project-primary bg-project-primary text-project-primary-foreground"
                        : "border-project-border bg-project-card text-project-accent hover:border-project-primary hover:text-project-primary",
                    )}
                  >
                    {formatTime(option)}
                  </button>
                ))}
              </div>
            )}

            {!hasPublishedHours && !isLoadingHours && (
              <Text
                variant="normal-xs"
                as="p"
                className="mt-2 text-project-muted-foreground"
              >
                This technician has not published working hours, so any time in
                the day can be requested.
              </Text>
            )}
          </div>

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
