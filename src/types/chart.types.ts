import { TBookingStatus } from "./types";

export interface IBookingStatusCount {
  status: TBookingStatus;
  count: number;
}

export interface ICategoryCount {
  category: string;
  count: number;
}

export interface ITrendPoint {
  date: string;
  current: number;
  previous: number;
}

export interface IChartSeries {
  id: string;
  label: string;
  total?: number;
}

export interface IChartPoint {
  label: string;
  [seriesId: string]: string | number;
}

export interface IPieSlice {
  name: string;
  value: number;
}

export type TChartColorMap = Record<string, string>;

export type TAreaCurve = "basis" | "monotone" | "step" | "linear";
