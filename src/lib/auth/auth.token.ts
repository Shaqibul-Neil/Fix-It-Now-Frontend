import jwt from "jsonwebtoken";
import { TUserRole } from "./auth.roles";

export interface IAccessTokenPayload {
  id: string;
  email: string;
  role: TUserRole;
  iat: number;
  exp: number;
}

/**
 * Decodes the access token payload without verifying the signature.
 * Express verifies the token on protected API requests
 * jwt.decode() only reads the token payload.
 * It does not check:
 * - token authenticity
 * - token expiration
 * - token tampering
 */
export const decodeAccessToken = (
  token: string,
): IAccessTokenPayload | null => {
  const payload = jwt.decode(token);
  if (!payload || typeof payload !== "object") return null;
  return payload as IAccessTokenPayload;
};

// Checks whether the access token is expired or about to expire.
export const isAccessTokenExpired = (payload: IAccessTokenPayload): boolean => {
  const expireAtMs = payload.exp * 1000;
  const marginMs = 30_000;
  return expireAtMs - marginMs <= Date.now();
};
