"use client";

import { LogIn } from "lucide-react";
import { AppButton, AppModal, Text } from "@/src/components";

interface ILoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPromptModal = ({ isOpen, onClose }: ILoginPromptModalProps) => {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Please log in to book"
      description="You need an account to book a technician."
      footer={
        <>
          <AppButton variant="outline" text="Not now" onClick={onClose} />
          <AppButton text="Log in" href="/login" rightIcon={LogIn} />
        </>
      }
    >
      <div className="flex items-center gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center border border-project-primary/30 bg-project-muted-primary text-project-primary">
          <LogIn className="size-5" />
        </span>

        <Text
          variant="normal-sm"
          as="p"
          className="text-project-muted-foreground"
        >
          Sign in and your booking picks up right where you left off — pick a
          time, confirm, done.
        </Text>
      </div>
    </AppModal>
  );
};

export default LoginPromptModal;
