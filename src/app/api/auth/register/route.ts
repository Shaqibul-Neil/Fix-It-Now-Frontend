import { registerRequest } from "@/src/features/auth/dependencies/api/auth.service";
import { apiError, apiSuccess } from "@/src/lib/api/api.response";

//Register route handler.
export const POST = async (request: Request) => {
  // Read JSON body sent from the client
  let payload;

  try {
    payload = await request.json();
  } catch {
    return apiError("Invalid request body", 400);
  }

  // Call backend login API with validated data
  const { status, response } = await registerRequest(payload);

  if (!response.success) {
    return apiError(response.message ?? "Registration failed.", status);
  }

  return apiSuccess(
    response.message ?? "Account created successfully",
    response.data,
    201,
  );
};
