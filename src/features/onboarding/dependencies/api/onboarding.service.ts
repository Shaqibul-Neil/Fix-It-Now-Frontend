import { TTechnicianProfileInput } from "../schema/onboarding.schema";
import { getAccessToken } from "@/src/lib/auth/auth.cookies";
import { serverFetch } from "@/src/lib/api/api.server";
import { ITechnicianProfile } from "../types/onboarding.types";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";

// Only a rejected technician re-opens onboarding, and they start from the saved
export const getOnboardingRequest = async (): Promise<
  TTechnicianProfileInput | undefined
> => {
  const accessToken = await getAccessToken();
  if (!accessToken) return undefined;

  const { response } = await serverFetch<ITechnicianProfile>(
    apiEndpoints.technician.myProfile,
    { accessToken, cache: "no-store" },
  );

  const profile = response.success ? response.data : null;
  if (!profile) return undefined;

  return {
    basicInfo: {
      phone: profile.phone,
      avatar: profile.avatar ?? undefined,
      bio: profile.bio,
      experienceYears: profile.experienceYears,
    },
    pricing: {
      hourlyRate: Number(profile.hourlyRate),
      serviceRadius: profile.serviceRadius ?? undefined,
    },
    location: {
      address: profile.address,
      city: profile.city,
      area: profile.area,
    },
  };
};
