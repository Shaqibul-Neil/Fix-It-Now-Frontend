import Logo from "./Logo";
import MobileNav from "./MobileNav";
import PublicNavActions from "./PublicNavActions";
import PublicNavMenu from "./PublicNavMenu";
import type { IProfileUser } from "./ProfileDropdown";

const PublicNavbar = ({ user }: { user?: IProfileUser }) => {
  return (
    <header className="sticky top-0 z-40 bg-project-background/85 backdrop-blur">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 xl:px-8">
        <Logo />

        <PublicNavMenu className="hidden lg:flex" />

        <div className="flex items-center gap-3">
          <PublicNavActions user={user} />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
