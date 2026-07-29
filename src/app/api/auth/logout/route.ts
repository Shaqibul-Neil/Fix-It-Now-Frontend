import { apiSuccess } from "@/src/lib/api/api.response";
import { clearAuthCookies } from "@/src/lib/auth/auth.cookies";

export const POST = async () => {
  await clearAuthCookies();
  return apiSuccess("Signed out successfully");
};
