import { IApiResponse } from "@/src/types/types";
import { config } from "../config/config";
import { ApiRequestError } from "./api.error";

interface IClientFetchOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  baseUrl?: string;
}

// Used by TanStack Query inside Client Components.
// Browser talks only with Next.js BFF, not the Express API directly.
export const clientFetch = async <TData>(
  path: string,
  {
    method = "GET",
    body,
    baseUrl = config.gateway_base_url,
  }: IClientFetchOptions = {},
): Promise<IApiResponse<TData>> => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  let result: IApiResponse<TData>;
  try {
    result = await response.json();
  } catch {
    result = { success: false, message: "Unexpected server response" };
  }

  if (!response.ok || !result.success) {
    throw new ApiRequestError(
      result.message ?? "Something went wrong",
      response.status,
    );
  }
  return result;
};
