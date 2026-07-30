import Logo from "./Logo";
import MobileNav from "./MobileNav";
import PublicNavActions from "./PublicNavActions";
import PublicNavbarChrome from "./PublicNavbarChrome";
import PublicNavMenu from "./PublicNavMenu";
import type { IProfileUser } from "@/src/types/types";

const PublicNavbar = ({ user }: { user?: IProfileUser }) => {
  return (
    <PublicNavbarChrome>
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 xl:px-8">
        <Logo />

        <PublicNavMenu className="hidden lg:flex" />

        <div className="flex items-center gap-3">
          <PublicNavActions user={user} />
          <MobileNav />
        </div>
      </div>
    </PublicNavbarChrome>
  );
};

export default PublicNavbar;
