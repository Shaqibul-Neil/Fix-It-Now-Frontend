export type TDayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

// GET /technician/availability — the technician's own rows. `isActive` is here
// because an off day is kept in the schedule rather than deleted.
export interface IAvailabilitySlot {
  id: string;
  dayOfWeek: TDayOfWeek;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

// GET /technicians/:id/availability — the public read already drops off days,
// so every row here is bookable.
export interface IPublicAvailabilitySlot {
  id: string;
  dayOfWeek: TDayOfWeek;
  startTime: string;
  endTime: string;
}

export interface ISetAvailabilityPayload {
  slots: {
    dayOfWeek: TDayOfWeek;
    startTime: string;
    endTime: string;
    isActive: boolean;
  }[];
}

export interface ITimeRange {
  startTime: string;
  endTime: string;
}

// The editor works a day at a time, so the flat server rows are grouped before
// they reach the form and flattened again on save.
export interface IDaySchedule {
  isActive: boolean;
  ranges: ITimeRange[];
}

export type TWeekSchedule = Record<TDayOfWeek, IDaySchedule>;
