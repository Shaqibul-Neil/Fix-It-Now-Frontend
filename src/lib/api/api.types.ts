import { IApiResponse } from "@/src/types/types";

export interface IBackendFetchResponse<TData> {
  status: number;
  response: IApiResponse<TData>;
  headers: Headers;
}

export interface IBackendFetchOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  accessToken?: string;
  cookie?: string;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}
