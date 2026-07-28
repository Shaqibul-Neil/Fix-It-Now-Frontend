import { NextRequest, NextResponse } from "next/server";
import { config } from "../config/config";
import { ITokens } from "@/src/types/types";

const {
  accessTokenKey,
  refreshTokenKey,
  options,
  accessTokenMaxAge,
  refreshTokenMaxAge,
} = config.cookies;

// Reads authentication tokens from incoming request cookies.
export const readTokens = (request: NextRequest) => ({
  accessToken: request.cookies.get(accessTokenKey)?.value,
  refreshToken: request.cookies.get(refreshTokenKey)?.value,
});

//Updates cookies inside the current request object.
export const applyTokensToRequest = (
  request: NextRequest,
  tokens: ITokens,
): void => {
  request.cookies.set(accessTokenKey, tokens.accessToken);
  if (tokens.refreshToken) {
    request.cookies.set(refreshTokenKey, tokens.refreshToken);
  }
};

//Writes refreshed tokens into the outgoing response cookies.
export const applyTokenToResponse = (
  response: NextResponse,
  tokens: ITokens,
): void => {
  response.cookies.set(accessTokenKey, tokens.accessToken, {
    ...options,
    maxAge: accessTokenMaxAge,
  });

  if (tokens.refreshToken) {
    response.cookies.set(refreshTokenKey, tokens.refreshToken, {
      ...options,
      maxAge: refreshTokenMaxAge,
    });
  }
};

//Removes authentication cookies.
export const clearTokens = (response: NextResponse): void => {
  response.cookies.delete(accessTokenKey);
  response.cookies.delete(refreshTokenKey);
};
