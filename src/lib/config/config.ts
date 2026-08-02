export const config = {
  api_url: process.env.API_URL || "http://localhost:5000/api",
  app_url: process.env.NEXT_PUBLIC_APP_URL,
  isProduction: process.env.NODE_ENV === "production",
  gateway_base_url: "/api/gateway",
  auth_base_url: "/api/auth",

  cookies: {
    accessTokenKey: "access_token",
    refreshTokenKey: "refresh_token",
    // Seconds, and they mirror the backend's JWT_ACCESS_EXPIRY (15m) and
    // JWT_REFRESH_EXPIRY (30d). A cookie shorter than its own token drops the
    // session while the token is still valid, and the proxy then has to
    // refresh on every single request.
    accessTokenMaxAge: 15 * 60,
    refreshTokenMaxAge: 30 * 24 * 60 * 60,
    options: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  },
} as const;
