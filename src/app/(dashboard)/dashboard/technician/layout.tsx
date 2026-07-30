import { Clock, Pencil, ShieldX } from "lucide-react";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppButton, Text } from "@/src/components";
import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";
import { TECHNICIAN_APPROVAL_STATUS } from "@/src/types/types";

export default async function TechnicianLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getMeRequest();
  if (!currentUser) redirect("/login");
  if (!currentUser.isOnboarded) redirect("/onboarding");

  const { approvalStatus, rejectionReason } = currentUser;

  return (
    <div className="space-y-6">
      {approvalStatus === TECHNICIAN_APPROVAL_STATUS.PENDING && (
        <div className="flex gap-3 border border-project-yellow/35 bg-project-yellow/10 p-4">
          <Clock className="mt-0.5 size-4 shrink-0 text-project-yellow" />
          <div className="space-y-1">
            <Text
              variant="semibold-sm-2"
              as="span"
              className="block text-project-accent"
            >
              Waiting for admin approval
            </Text>
            <Text
              variant="normal-xs"
              as="p"
              className="text-project-muted-foreground"
            >
              Your profile is in the review queue. Publishing services and
              taking bookings unlocks once an admin approves it.
            </Text>
          </div>
        </div>
      )}

      {approvalStatus === TECHNICIAN_APPROVAL_STATUS.REJECTED && (
        <div className="flex flex-col gap-3 border border-project-destructive/30 bg-project-destructive/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <ShieldX className="mt-0.5 size-4 shrink-0 text-project-destructive" />
            <div className="space-y-1">
              <Text
                variant="semibold-sm-2"
                as="span"
                className="block text-project-accent"
              >
                Profile rejected
              </Text>
              <Text
                variant="normal-xs"
                as="p"
                className="text-project-muted-foreground"
              >
                {rejectionReason ?? "An admin rejected your profile."}
              </Text>
            </div>
          </div>

          <AppButton
            href="/onboarding"
            variant="destructive"
            text="Fix and re-apply"
            leftIcon={Pencil}
            className="shrink-0"
          />
        </div>
      )}

      {children}
    </div>
  );
}
