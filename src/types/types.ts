export interface IApiMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IApiResponse<TData> {
  success: boolean;
  message?: string;
  data?: TData;
  meta?: IApiMeta;
}

export interface ITokens {
  accessToken: string;
  refreshToken?: string;
}

// backend: stats.interface.ts -> IStatData
// buildMetrics sends changePercentage for rates and changeValue for counts,
// so exactly one of the two is present on any card.
export interface IStatData {
  id: string;
  label: string;
  value: number;
  changeValue?: number;
  changePercentage?: number;
}
