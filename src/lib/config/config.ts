export const config = {
  api_url: process.env.API_URL || "http://localhost:5000/api",
  app_url: process.env.NEXT_PUBLIC_APP_URL,
  isProduction: process.env.NODE_ENV === "production",
  gateway_base_url: "/api/gateway",
  auth_base_url: "/api/auth",

  cookies: {
    accessTokenKey: "access_token",
    refreshTokenKey: "refresh_token",
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
