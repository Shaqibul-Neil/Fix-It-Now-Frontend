"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppButton } from "@/src/components";
import { ROLE_LANDING_PAGE, type TUserRole } from "@/src/lib/auth/auth.roles";
import LoginPromptModal from "./LoginPromptModal";
import SwitchAccountModal from "./SwitchAccountModal";

interface IBookNowButtonProps {
  userRole?: TUserRole;
  text?: string;
  className?: string;
}

// Anonymous -> login prompt. Technician -> can't book, offer to switch
// accounts. Customer/admin -> already has a dashboard, send them to book
// from there instead of duplicating the flow here.
const BookNowButton = ({
  userRole,
  text = "Book now",
  className,
}: IBookNowButtonProps) => {
  const router = useRouter();
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const [isSwitchAccountOpen, setIsSwitchAccountOpen] = useState(false);

  const handleClick = () => {
    if (!userRole) return setIsLoginPromptOpen(true);
    if (userRole === "TECHNICIAN") return setIsSwitchAccountOpen(true);
    router.push(`${ROLE_LANDING_PAGE[userRole]}/services`);
  };

  return (
    <>
      <AppButton
        text={text}
        type="button"
        onClick={handleClick}
        className={className}
      />

      <LoginPromptModal
        isOpen={isLoginPromptOpen}
        onClose={() => setIsLoginPromptOpen(false)}
      />

      <SwitchAccountModal
        isOpen={isSwitchAccountOpen}
        onClose={() => setIsSwitchAccountOpen(false)}
      />
    </>
  );
};

export default BookNowButton;
