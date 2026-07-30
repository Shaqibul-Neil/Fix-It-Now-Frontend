import { NotificationBell, ThemeToggle } from "@/src/components";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import type { IProfileUser } from "@/src/types/types";
import AppBreadcrumbs from "./AppBreadcrumbs";
import ProfileDropdown from "./ProfileDropdown";

const DashboardNavbar = ({ user }: { user: IProfileUser }) => {
  return (
    <header className="sticky top-0 z-30 flex h-18 shrink-0 items-center justify-between gap-4 border-b border-project-border bg-project-background/85 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="size-9 border border-project-border text-project-muted-foreground transition-colors duration-300 hover:border-project-primary/40 hover:text-project-primary" />
        <AppBreadcrumbs />
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <NotificationBell />
        <ProfileDropdown user={user} />
      </div>
    </header>
  );
};

export default DashboardNavbar;
