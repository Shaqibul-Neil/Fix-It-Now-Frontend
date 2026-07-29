import { NextRequest } from "next/server";
import { resolveSession } from "./lib/proxy/proxy.session";
import { applyTokenToResponse, clearTokens } from "./lib/proxy/proxy.cookies";
import { resolveAction } from "./lib/proxy/proxy.action";
import { buildResponse } from "./lib/proxy/proxy.response";

export const proxy = async (request: NextRequest) => {
  const session = await resolveSession(request);
  const action = resolveAction(request, session);
  const response = buildResponse(request, session, action);

  if (session.refreshedTokens) {
    applyTokenToResponse(response, session.refreshedTokens);
  }

  if (session.shouldClearCookies) {
    clearTokens(response);
  }
  return response;
};

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif)$).*)",
  ],
};
