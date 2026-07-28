import { IApiResponse } from "@/src/types/types";
import { config } from "../config/config";
import { IBackendFetchOptions, IBackendFetchResponse } from "./api.types";

export const serverFetch = async <TData>(
  path: string,
  {
    method = "GET",
    body,
    accessToken,
    cookie,
    cache,
    next,
  }: IBackendFetchOptions = {},
): Promise<IBackendFetchResponse<TData>> => {
  const response = await fetch(`${config.api_url}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...(cookie && { Cookie: cookie }),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...(cache && { cache }),
    ...(next && { next }),
  });

  let parsed: IApiResponse<TData>;
  try {
    parsed = await response.json();
  } catch {
    parsed = {
      success: false,
      message: "Invalid backend response",
    };
  }
  return {
    status: response.status,
    response: parsed,
    headers: response.headers,
  };
};
