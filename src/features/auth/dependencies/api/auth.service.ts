import { serverFetch } from "@/src/lib/api/api.server";
import { TLoginInput, TRegisterInput } from "../schema/auth.schema";
import {
  IAuthUser,
  ICurrentUser,
  ILoginResponseData,
  ILoginResult,
} from "../types/auth.types";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import { getSetCookieValue } from "@/src/lib/utils/cookie.utils";
import { ITokens } from "@/src/types/types";
import { getAccessToken } from "@/src/lib/auth/auth.cookies";
import { cache } from "react";

//-------------Login Request-----------
export const loginRequest = async (
  credentials: TLoginInput,
): Promise<ILoginResult> => {
  const result = await serverFetch<ILoginResponseData>(
    apiEndpoints.auth.login,
    {
      method: "POST",
      body: credentials,
      cache: "no-store",
    },
  );

  return {
    ...result,
    refreshToken: getSetCookieValue(result.headers, "refreshToken"),
  };
};

//-------------Register Request-----------
export const registerRequest = (payload: TRegisterInput) =>
  serverFetch<IAuthUser>(apiEndpoints.auth.register, {
    method: "POST",
    body: payload,
    cache: "no-store",
  });

//-------------Refresh Token-----------
export const refreshTokenRequest = async (
  refreshToken: string,
): Promise<ITokens | null> => {
  const { response, headers } = await serverFetch<{ accessToken: string }>(
    apiEndpoints.auth.refreshToken,
    {
      method: "POST",
      cookie: `refreshToken=${refreshToken}`,
      cache: "no-store",
    },
  );

  if (!response.success || !response.data?.accessToken) return null;

  return {
    accessToken: response.data.accessToken,
    refreshToken: getSetCookieValue(headers, "refreshToken"),
  };
};

//---------------Current User------------
export const getMeRequest = cache(async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const { response } = await serverFetch<ICurrentUser>(apiEndpoints.auth.me, {
    accessToken,
    cache: "no-store",
  });

  return response.success && response.data ? response.data : null;
});
