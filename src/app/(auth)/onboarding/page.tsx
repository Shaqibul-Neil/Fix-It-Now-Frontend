import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";
import { getOnboardingRequest } from "@/src/features/onboarding/dependencies/api/onboarding.service";
import OnboardingPage from "@/src/features/onboarding/pages/OnboardingPage";
import { TECHNICIAN_APPROVAL_STATUS } from "@/src/types/types";

export const metadata: Metadata = {
  title: "Technician onboarding",
  description:
    "Set up your technician profile — contact details, hourly rate and service area.",
};

export default async function Onboarding() {
  const currentUser = await getMeRequest();
  if (!currentUser) redirect("/login");

  const isRejected =
    currentUser.approvalStatus === TECHNICIAN_APPROVAL_STATUS.REJECTED;

  if (currentUser.isOnboarded && !isRejected) redirect("/dashboard/technician");

  const initialValues = isRejected ? await getOnboardingRequest() : undefined;

  return (
    <OnboardingPage
      firstName={currentUser.firstName}
      rejectionReason={isRejected ? currentUser.rejectionReason : undefined}
      initialValues={initialValues}
    />
  );
}
