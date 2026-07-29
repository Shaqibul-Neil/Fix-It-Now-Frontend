import { IApiResponse } from "@/src/types/types";
import { config } from "../config/config";
import { ApiRequestError } from "./api.error";

interface IClientFetchOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
}

// Used by TanStack Query inside Client Components.
// Browser talks only with Next.js BFF, not the Express API directly.
export const clientFetch = async <TData>(
  path: string,
  { method = "GET", body }: IClientFetchOptions = {},
): Promise<IApiResponse<TData>> => {
  const response = await fetch(`${config.gateway_base_url}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const result: IApiResponse<TData> = await response.json();

  if (!response.ok || !result.success) {
    throw new ApiRequestError(
      result.message ?? "Something went wrong",
      response.status,
    );
  }
  return result;
};
