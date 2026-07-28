export interface IApiResponse<TData> {
  success: boolean;
  message?: string;
  data?: TData;
}
