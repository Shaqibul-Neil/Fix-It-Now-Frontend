import { loginRequest } from "@/src/features/auth/dependencies/api/auth.service";
import { apiError, apiSuccess } from "@/src/lib/api/api.response";
import { setAuthCookies } from "@/src/lib/auth/auth.cookies";

//Login route handler.

export const POST = async (request: Request) => {
  // Read JSON body sent from the client
  let payload;

  try {
    payload = await request.json();
  } catch {
    return apiError("Invalid request body", 400);
  }

  // Call backend login API with validated data
  const { status, response, refreshToken } = await loginRequest(payload);

  if (!response.success || !response.data) {
    return apiError(response.message ?? "Login failed.", status);
  }

  // Store tokens as httpOnly cookies
  await setAuthCookies({
    accessToken: response.data.accessToken,
    refreshToken,
  });

  return apiSuccess(
    response.message ?? "Logged in successfully",
    response.data.user,
  );
};
