import { apiError } from "@/src/lib/api/api.response";
import { serverFetch } from "@/src/lib/api/api.server";
import { IBackendFetchOptions } from "@/src/lib/api/api.types";
import { getAccessToken } from "@/src/lib/auth/auth.cookies";
import { NextRequest, NextResponse } from "next/server";

// Auth routes handle tokens separately through /api/auth.
// They should never be exposed through the generic BFF proxy.
const BLOCKED_BFF_ROUTES = ["auth"];

// Converts catch-all route params into backend API path.
// Example: ["booking","123"] -> "/booking/123"
const buildBackendEndpoint = (pathSegments: string[], searchQuery: string) =>
  `/${pathSegments.join("/")}${searchQuery}`;

// Reads request body only for methods that usually contain data.
const readRequestBody = async (request: NextRequest) => {
  if (request.method === "GET" || request.method === "DELETE") return undefined;
  return request.json().catch(() => undefined);
};

// Forwards browser requests to Express API.
const forwardRequestToBackend = async (
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) => {
  // Catch-all route gives path segments as an array.
  const { path } = await context.params;

  // Prevent token-related routes from bypassing auth cookie handling.
  if (BLOCKED_BFF_ROUTES.includes(path[0])) {
    return apiError("Not found", 404);
  }

  // Access token stays inside httpOnly cookie.
  const accessToken = await getAccessToken();
  if (!accessToken) return apiError("Unauthorized", 401);

  const { status, response } = await serverFetch(
    buildBackendEndpoint(path, request.nextUrl.search),
    {
      method: request.method as IBackendFetchOptions["method"],
      body: await readRequestBody(request),
      accessToken,
      cache: "no-store",
    },
  );

  // Return backend response without changing its format.
  return NextResponse.json(response, { status });
};

export const GET = forwardRequestToBackend;
export const POST = forwardRequestToBackend;
export const PATCH = forwardRequestToBackend;
export const PUT = forwardRequestToBackend;
export const DELETE = forwardRequestToBackend;
