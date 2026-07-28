import { cookies } from "next/headers";
import { config } from "../config/config";
import { decodeAccessToken, IAccessTokenPayload } from "./auth.token";
import { ITokens } from "@/src/types/types";

const {
  accessTokenKey,
  refreshTokenKey,
  options,
  accessTokenMaxAge,
  refreshTokenMaxAge,
} = config.cookies;

//Stores authentication tokens in HTTP-only cookies.
export const setAuthCookies = async (session: ITokens): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(accessTokenKey, session.accessToken, {
    ...options,
    maxAge: accessTokenMaxAge,
  });

  if (session.refreshToken) {
    cookieStore.set(refreshTokenKey, session.refreshToken, {
      ...options,
      maxAge: refreshTokenMaxAge,
    });
  }
};

// Removes authentication cookies.
export const clearAuthCookies = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(accessTokenKey);
  cookieStore.delete(refreshTokenKey);
};

// Reads access token from the current request cookies.
export const getAccessToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(config.cookies.accessTokenKey)?.value;
};

// Reads refresh token from cookies.
export const getRefreshToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();

  return cookieStore.get(config.cookies.refreshTokenKey)?.value;
};

// Returns the currently logged-in user information.
export const getCurrentUser = async (): Promise<IAccessTokenPayload | null> => {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;
  return decodeAccessToken(accessToken);
};
