import { NextRequest } from "next/server";
import {
  decodeAccessToken,
  IAccessTokenPayload,
  isAccessTokenExpired,
} from "../auth/auth.token";
import { ITokens } from "@/src/types/types";
import { applyTokensToRequest, readTokens } from "./proxy.cookies";
import { refreshTokenRequest } from "@/src/features/auth/dependencies/api/auth.service";

/**
 * Result returned after checking the current user session.
 * user:
 *   Current logged-in user information from JWT.
 * isAuthenticated:
 *   Whether the user has a valid session.
 * refreshedTokens:
 *   New tokens if access token was refreshed.
 * shouldClearCookies:
 *   Whether invalid cookies should be removed.
 */

export interface IProxySession {
  user: IAccessTokenPayload | null;
  isAuthenticated: boolean;
  refreshedTokens: ITokens | null;
  shouldClearCookies: boolean;
}

/**
 * Checks authentication state before every request.
 *
 * Steps:
 * 1. Read access token and refresh token from cookies.
 * 2. Decode access token to get user information.
 * 3. If access token is valid, continue.
 * 4. If expired, use refresh token to get a new access token.
 * 5. If refresh fails, clear session.
 */
export const resolveSession = async (
  request: NextRequest,
): Promise<IProxySession> => {
  // Get current tokens from browser cookies
  const { accessToken, refreshToken } = readTokens(request);

  // Decode access token to get user information
  const user = accessToken ? decodeAccessToken(accessToken) : null;

  /**
   * Case 1:
   * Access token exists and still valid.
   *
   * No need to call backend refresh API.
   */
  if (user && !isAccessTokenExpired(user)) {
    return {
      user,
      isAuthenticated: true,
      refreshedTokens: null,
      shouldClearCookies: false,
    };
  }

  /**
   * Case 2:
   * Access token expired and refresh token does not exist.
   *
   * User cannot recover session.
   */
  if (!refreshToken) {
    return {
      user: null,
      isAuthenticated: false,
      refreshedTokens: null,
      shouldClearCookies: Boolean(accessToken),
    };
  }

  /**
   * Case 3:
   * Access token expired.
   * Try creating a new access token using refresh token.
   */
  const refreshedTokens = await refreshTokenRequest(refreshToken);

  /**
   * Refresh token invalid or expired.
   *
   * User needs to login again.
   */
  if (!refreshedTokens) {
    return {
      user: null,
      isAuthenticated: false,
      refreshedTokens: null,
      shouldClearCookies: true,
    };
  }

  /**
   * Update current request cookies.
   *
   * This helps remaining proxy logic use the new token
   * during this same request lifecycle.
   */
  applyTokensToRequest(request, refreshedTokens);

  // Decode newly generated access token
  const refreshedUser = decodeAccessToken(refreshedTokens.accessToken);

  return {
    user: refreshedUser,
    isAuthenticated: Boolean(refreshedUser),
    refreshedTokens,
    shouldClearCookies: false,
  };
};
