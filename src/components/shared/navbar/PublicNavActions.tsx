import { ArrowRight } from "lucide-react";
import { AppButton, ThemeToggle } from "@/src/components";
import type { IProfileUser } from "@/src/types/types";
import ProfileDropdown from "./ProfileDropdown";

const PublicNavActions = ({ user }: { user?: IProfileUser }) => {
  return (
    <div className="flex items-center gap-3">
      {user ? (
        <ProfileDropdown user={user} />
      ) : (
        <AppButton
          text="Sign in"
          href="/login"
          rightIcon={ArrowRight}
          className="hidden sm:flex"
        />
      )}

      <ThemeToggle />
    </div>
  );
};

export default PublicNavActions;
