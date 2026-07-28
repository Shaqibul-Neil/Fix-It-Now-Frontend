import { NextRequest } from "next/server";
import { IProxySession } from "./proxy.session";
import { ROLE_LANDING_PAGE } from "../auth/auth.roles";
import { findProtectedRoute, isGuestOnlyRoute } from "./proxy.routes";

/**
 * What the proxy should do with a request.
 * redirect: change the URL in the address bar.
 * rewrite:  keep the URL, render a different route in its place.
 * null:     let the request through untouched.
 */

export type TProxyAction =
  | { type: "redirect"; url: URL }
  | { type: "rewrite"; url: URL }
  | null;

//Decides whether the current request should be redirected, rewritten, or allowed to continue.
export const resolveAction = (
  request: NextRequest,
  session: IProxySession,
): TProxyAction => {
  const { pathname } = request.nextUrl;

  //Decide where the user should land after login based on their role.
  const landingPage = session.user
    ? ROLE_LANDING_PAGE[session.user.role]
    : "/login";

  // Already signed in — no reason to see login or register.
  if (session.isAuthenticated && isGuestOnlyRoute(pathname)) {
    return { type: "redirect", url: new URL(landingPage, request.url) };
  }

  // dashboard is only a common entry point. Redirect users to their role-specific dashboard.
  if (pathname === "/dashboard") {
    return {
      type: "redirect",
      url: new URL(
        session.isAuthenticated ? landingPage : "/login",
        request.url,
      ),
    };
  }

  //Check whether this route requires authentication.
  const protectedRoute = findProtectedRoute(pathname);
  if (!protectedRoute) return null;

  // Not signed in — send them to log in, remembering where they were headed.
  if (!session.isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return { type: "redirect", url: loginUrl };
  }

  // Wrong role — show 404. Nothing at /not-found, so Next renders not-found.tsx.
  if (
    !session.user ||
    !protectedRoute.allowedRoles.includes(session.user.role)
  ) {
    return { type: "rewrite", url: new URL("/not-found", request.url) };
  }

  // Everything is valid. Render the requested page.
  return null;
};
