"use client";

import { useState } from "react";
import { CalendarClock, RotateCcw, Save } from "lucide-react";
import {
  AppButton,
  AppError,
  ConfirmModal,
  DetailsSection,
  DetailsSkeleton,
  PageHeader,
  ResultState,
  Text,
} from "@/src/components";
import AvailabilityDayRow from "../dependencies/components/AvailabilityDayRow";
import AvailabilitySummary from "../dependencies/components/AvailabilitySummary";
import {
  DAY_ORDER,
  DEFAULT_RANGE,
  SCHEDULE_PRESETS,
  buildPresetWeek,
  countRanges,
  findDayError,
  summariseWeek,
  toSlotPayload,
  toWeekSchedule,
} from "../dependencies/utils/availability.utils";
import {
  useMyAvailabilityQuery,
  useSetAvailabilityMutation,
} from "../dependencies/hooks/useAvailability";
import type {
  ITimeRange,
  TDayOfWeek,
  TWeekSchedule,
} from "../dependencies/types/availability.types";

const TechnicianAvailabilityPage = () => {
  const { data, isPending, isError, error } = useMyAvailabilityQuery();
  const [week, setWeek] = useState<TWeekSchedule>(() =>
    toWeekSchedule(data ?? []),
  );
  const [isConfirming, setIsConfirming] = useState(false);

  const saveAvailability = useSetAvailabilityMutation(() =>
    setIsConfirming(false),
  );

  const [lastData, setLastData] = useState(data);
  if (data !== lastData) {
    setLastData(data);
    if (data) setWeek(toWeekSchedule(data));
  }

  if (isPending) return <DetailsSkeleton sectionCount={1} />;
  if (isError) return <AppError message={error?.message} />;
  // // `week` syncs from `data` a render behind on the very first paint —
  // // that is not an error, just not ready yet.
  // if (!week) return <DetailsSkeleton sectionCount={1} />;

  const editDay = (day: TDayOfWeek, next: Partial<TWeekSchedule[TDayOfWeek]>) =>
    setWeek((current) => ({ ...current, [day]: { ...current[day], ...next } }));

  const editRange = (day: TDayOfWeek, index: number, range: ITimeRange) =>
    editDay(day, {
      ranges: week[day].ranges.map((item, at) => (at === index ? range : item)),
    });

  const addRange = (day: TDayOfWeek) => {
    const previous = week[day].ranges.at(-1);
    // A second range on a day is almost always the afternoon after a break.
    const next: ITimeRange = previous
      ? { startTime: previous.endTime, endTime: DEFAULT_RANGE.endTime }
      : { ...DEFAULT_RANGE };

    editDay(day, { isActive: true, ranges: [...week[day].ranges, next] });
  };

  const removeRange = (day: TDayOfWeek, index: number) => {
    const ranges = week[day].ranges.filter((_, at) => at !== index);
    editDay(day, { ranges, isActive: ranges.length > 0 && week[day].isActive });
  };

  const copyToAll = (day: TDayOfWeek) =>
    setWeek((current) => {
      const source = current[day];

      return DAY_ORDER.reduce(
        (next, target) => ({
          ...next,
          [target]: {
            isActive: source.isActive,
            ranges: source.ranges.map((range) => ({ ...range })),
          },
        }),
        { ...current },
      );
    });

  const dayErrors = DAY_ORDER.map((day) => findDayError(week[day]));
  const hasError = dayErrors.some(Boolean);
  const isEmpty = countRanges(week) === 0;

  const savedWeek = toWeekSchedule(data);
  const isDirty =
    JSON.stringify(toSlotPayload(week)) !==
    JSON.stringify(toSlotPayload(savedWeek));

  const discard = () => setWeek(savedWeek);

  return (
    <section className="space-y-5">
      <PageHeader
        title="My availability"
        description="The weekly hours customers can book you in. Anything outside them is refused automatically."
        divClassName="mb-4"
      />

      {isEmpty ? (
        <ResultState
          tone="warning"
          titleAs="h2"
          icon={CalendarClock}
          title="You have not set your working hours yet"
          description="Customers cannot book you until you do. Start from a preset and adjust it — you can change this whenever you like."
          actions={SCHEDULE_PRESETS.map((preset) => (
            <AppButton
              key={preset.id}
              variant={preset.id === "weekdays" ? "primary" : "outline"}
              text={preset.label}
              onClick={() =>
                setWeek(buildPresetWeek(preset.days, preset.range))
              }
            />
          ))}
        />
      ) : (
        <>
          <AvailabilitySummary week={week} />

          <DetailsSection
            title="Weekly hours"
            description="Switch a day off to stop taking work on it without losing the hours."
            action={
              <div className="flex flex-wrap items-center gap-2">
                {SCHEDULE_PRESETS.map((preset) => (
                  <AppButton
                    key={preset.id}
                    variant="outline"
                    text={preset.label}
                    className="h-8 px-3 text-xs"
                    onClick={() =>
                      setWeek(buildPresetWeek(preset.days, preset.range))
                    }
                  />
                ))}
              </div>
            }
          >
            <div className="flex flex-col">
              {DAY_ORDER.map((day, index) => (
                <AvailabilityDayRow
                  key={day}
                  day={day}
                  schedule={week[day]}
                  error={dayErrors[index] ?? null}
                  onToggle={(isActive) => editDay(day, { isActive })}
                  onRangeChange={(at, range) => editRange(day, at, range)}
                  onAddRange={() => addRange(day)}
                  onRemoveRange={(at) => removeRange(day, at)}
                  onCopyToAll={() => copyToAll(day)}
                />
              ))}
            </div>
          </DetailsSection>

          <div className="flex flex-col gap-3 border border-project-border bg-project-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Hours are set before approval, but stay private until it lands. */}
            <Text
              variant="normal-sm"
              as="p"
              className="text-project-muted-foreground"
            >
              Your hours go live on your public profile once an admin approves
              you.
            </Text>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <AppButton
                variant="outline"
                text="Discard changes"
                rightIcon={RotateCcw}
                disabled={!isDirty || saveAvailability.isPending}
                onClick={discard}
              />

              <AppButton
                text="Save working hours"
                rightIcon={Save}
                disabled={hasError || !isDirty || saveAvailability.isPending}
                onClick={() => setIsConfirming(true)}
              />
            </div>
          </div>

          <ConfirmModal
            isOpen={isConfirming}
            onClose={() => setIsConfirming(false)}
            mode="approve"
            title="Save these working hours?"
            description="This replaces your whole schedule. Customers can only book you inside these windows — anything else is refused."
            entityName={summariseWeek(week)}
            confirmText="Yes, save them"
            isPending={saveAvailability.isPending}
            onConfirm={() => saveAvailability.mutate(toSlotPayload(week))}
          />
        </>
      )}
    </section>
  );
};

export default TechnicianAvailabilityPage;
