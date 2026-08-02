"use client";

import { LogOut } from "lucide-react";
import { AppButton, AppModal, Text } from "@/src/components";
import { useLogoutMutation } from "@/src/features/auth/dependencies/hooks/useAuth";

interface ISwitchAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SwitchAccountModal = ({ isOpen, onClose }: ISwitchAccountModalProps) => {
  const { mutate: logout, isPending } = useLogoutMutation();

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Technician accounts can't book services"
      description="Booking is only available to customer accounts."
      footer={
        <>
          <AppButton variant="outline" text="Close" onClick={onClose} />
          <AppButton
            text={isPending ? "Signing out..." : "Log out"}
            onClick={() => logout()}
            disabled={isPending}
            rightIcon={LogOut}
          />
        </>
      }
    >
      <Text
        variant="normal-sm"
        as="p"
        className="text-project-muted-foreground"
      >
        Log out and create (or sign in to) a customer account to book this
        service.
      </Text>
    </AppModal>
  );
};

export default SwitchAccountModal;
