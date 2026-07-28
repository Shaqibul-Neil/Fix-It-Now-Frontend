export interface IApiResponse<TData> {
  success: boolean;
  message?: string;
  data?: TData;
}

export interface ITokens {
  accessToken: string;
  refreshToken?: string;
}
