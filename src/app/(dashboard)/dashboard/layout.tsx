import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  AppSidebar,
  DashboardNavbar,
  PageTransition,
  type IProfileUser,
} from "@/src/components";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getMeRequest();
  if (!currentUser) redirect("/login");

  const user: IProfileUser = {
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    email: currentUser.email,
    role: currentUser.role,
  };
  return (
    <SidebarProvider>
      <AppSidebar role={user.role} />

      <SidebarInset>
        <DashboardNavbar user={user} />
        <main className="flex-1 p-4 sm:p-6 xl:p-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
