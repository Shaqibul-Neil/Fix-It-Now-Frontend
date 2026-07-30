import { formatTime } from "@/src/lib/utils/format.utils";
import type {
  IAvailabilitySlot,
  IDaySchedule,
  IPublicAvailabilitySlot,
  ISetAvailabilityPayload,
  ITimeRange,
  TDayOfWeek,
  TWeekSchedule,
} from "../types/availability.types";

// Monday first — the same order the backend sorts by, since TDayOfWeek is a
// native enum and "asc" follows its declaration.
export const DAY_ORDER: TDayOfWeek[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const DAY_LABEL: Record<TDayOfWeek, string> = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
};

export const DAY_SHORT: Record<TDayOfWeek, string> = {
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
};

// JavaScript's Date.getDay() counts from Sunday, the enum starts at Monday.
export const DAY_INDEX: Record<TDayOfWeek, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

export const DEFAULT_RANGE: ITimeRange = {
  startTime: "09:00",
  endTime: "17:00",
};

// Filling seven days by hand is the whole friction of this page.
export const SCHEDULE_PRESETS = [
  {
    id: "weekdays",
    label: "Weekdays 9–5",
    days: [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
    ] as TDayOfWeek[],
    range: { startTime: "09:00", endTime: "17:00" },
  },
  {
    id: "everyday",
    label: "Every day 8–8",
    days: DAY_ORDER,
    range: { startTime: "08:00", endTime: "20:00" },
  },
];

export const toMinutes = (time: string) => {
  const [hour, minute] = time.split(":");
  return (Number(hour) || 0) * 60 + (Number(minute) || 0);
};

export const toTimeString = (minutes: number) => {
  const bounded = Math.max(0, Math.min(24 * 60 - 1, minutes));
  const hour = String(Math.floor(bounded / 60)).padStart(2, "0");
  const minute = String(bounded % 60).padStart(2, "0");
  return `${hour}:${minute}`;
};

export const formatRange = ({ startTime, endTime }: ITimeRange) =>
  `${formatTime(startTime)} – ${formatTime(endTime)}`;

export const emptyWeek = (): TWeekSchedule =>
  DAY_ORDER.reduce(
    (week, day) => ({ ...week, [day]: { isActive: false, ranges: [] } }),
    {} as TWeekSchedule,
  );

export const buildPresetWeek = (
  days: TDayOfWeek[],
  range: ITimeRange,
): TWeekSchedule => {
  const week = emptyWeek();
  days.forEach((day) => {
    week[day] = { isActive: true, ranges: [{ ...range }] };
  });
  return week;
};

// Server rows are flat and one per range; the editor needs them grouped.
export const toWeekSchedule = (slots: IAvailabilitySlot[]): TWeekSchedule => {
  const week = emptyWeek();

  slots.forEach(({ dayOfWeek, startTime, endTime, isActive }) => {
    const day = week[dayOfWeek];
    day.ranges.push({ startTime, endTime });
    // A day counts as on when any of its ranges is live.
    if (isActive) day.isActive = true;
  });

  DAY_ORDER.forEach((day) => {
    week[day].ranges.sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  return week;
};

// PUT replaces the whole schedule, so every range the editor holds is sent —
// off days included, carrying isActive false.
export const toSlotPayload = (
  week: TWeekSchedule,
): ISetAvailabilityPayload => ({
  slots: DAY_ORDER.flatMap((dayOfWeek) =>
    week[dayOfWeek].ranges.map(({ startTime, endTime }) => ({
      dayOfWeek,
      startTime,
      endTime,
      isActive: week[dayOfWeek].isActive,
    })),
  ),
});

// Mirrors the two rules the backend enforces, so a bad range is caught inline
// instead of coming back as a toast.
export const findDayError = (day: IDaySchedule): string | null => {
  const broken = day.ranges.find(
    (range) => toMinutes(range.startTime) >= toMinutes(range.endTime),
  );
  if (broken) return "End time must be after start time";

  const sorted = [...day.ranges].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );

  for (let index = 1; index < sorted.length; index += 1) {
    const previous = sorted[index - 1];
    const current = sorted[index];
    if (!previous || !current) continue;
    if (toMinutes(current.startTime) < toMinutes(previous.endTime)) {
      return "These hours overlap each other";
    }
  }

  return null;
};

export const countRanges = (week: TWeekSchedule) =>
  DAY_ORDER.reduce((total, day) => total + week[day].ranges.length, 0);

export const liveDays = (week: TWeekSchedule) =>
  DAY_ORDER.filter((day) => week[day].isActive && week[day].ranges.length > 0);

// One line naming what is about to be saved, for the confirm step.
export const summariseWeek = (week: TWeekSchedule) => {
  const live = liveDays(week);
  if (live.length === 0) return "No day is switched on";

  const days = live.map((day) => DAY_SHORT[day]).join(", ");
  const ranges = live.reduce(
    (total, day) => total + week[day].ranges.length,
    0,
  );

  return `${days} · ${ranges} time ${ranges === 1 ? "range" : "ranges"}`;
};

// The weekdays a customer may pick, as Date.getDay() numbers so the calendar
// can block the rest.
export const workingDayIndexes = (slots: IPublicAvailabilitySlot[]) => [
  ...new Set(slots.map((slot) => DAY_INDEX[slot.dayOfWeek])),
];

export const slotsForDate = (
  slots: IPublicAvailabilitySlot[],
  date: Date | undefined,
) => {
  if (!date) return [];
  const index = date.getDay();
  return slots.filter((slot) => DAY_INDEX[slot.dayOfWeek] === index);
};

// One bookable start time per step, and only where a whole job still fits
// inside the window. A window too short for even one job still offers its
// start — the backend only requires the start to sit inside the slot.
export const buildTimeSlots = (
  ranges: ITimeRange[],
  stepMinutes: number,
  notBefore?: number,
) => {
  const times: string[] = [];

  ranges.forEach((range) => {
    const start = toMinutes(range.startTime);
    const end = toMinutes(range.endTime);
    const last = end - start >= stepMinutes ? end - stepMinutes : start;

    for (let minute = start; minute <= last; minute += stepMinutes) {
      if (notBefore !== undefined && minute < notBefore) continue;
      times.push(toTimeString(minute));
    }
  });

  return times;
};
