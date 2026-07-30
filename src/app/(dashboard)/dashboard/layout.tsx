import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppSidebar, DashboardNavbar, PageTransition } from "@/src/components";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";
import type { IProfileUser } from "@/src/types/types";
import { USER_ROLES } from "@/src/lib/auth/auth.roles";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getMeRequest();
  if (!currentUser) redirect("/login");

  if (currentUser.role === USER_ROLES.TECHNICIAN && !currentUser.isOnboarded) {
    redirect("/onboarding");
  }

  const user: IProfileUser = {
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    email: currentUser.email,
    role: currentUser.role,
  };
  return (
    <SidebarProvider>
      <AppSidebar role={user.role} />

      {/* min-w-0: a flex child defaults to min-width:auto, so a wide table
          would stretch the whole page instead of scrolling inside itself. */}
      <SidebarInset className="min-w-0">
        <DashboardNavbar user={user} />
        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 xl:p-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
