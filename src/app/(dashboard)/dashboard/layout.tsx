import type { ReactNode } from "react";
import {
  AppSidebar,
  DashboardNavbar,
  PageTransition,
  type IProfileUser,
} from "@/src/components";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { getCurrentUser } from "@/src/lib/auth/auth.cookies";
import { USER_ROLES } from "@/src/lib/auth/auth.roles";
import { QueryProvider } from "@/src/lib/providers/QueryProvider";

// Shown while the auth flow is not wired yet, so the dashboard is still
// browsable. Once login lands, an unauthenticated visit never reaches here.
const GUEST_PREVIEW: IProfileUser = {
  name: "Guest User",
  email: "guest@fixitnow.com",
  role: USER_ROLES.CUSTOMER,
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getCurrentUser();

  const user: IProfileUser = currentUser
    ? {
        name: currentUser.email.split("@")[0],
        email: currentUser.email,
        role: currentUser.role,
      }
    : GUEST_PREVIEW;

  return (
    <QueryProvider>
      <SidebarProvider>
        <AppSidebar role={user.role} />

        <SidebarInset>
          <DashboardNavbar user={user} />
          <main className="flex-1 p-4 sm:p-6 xl:p-8">
            <PageTransition>{children}</PageTransition>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </QueryProvider>
  );
}
