"use client";
import type { TUserRole } from "@/src/lib/auth/auth.roles";
import { DASHBOARD_MENU } from "@/src/lib/menus/menus";
import { Logo } from "@/src/components";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/src/components/ui/sidebar";
import SidebarMenu from "./SidebarMenu";

const ROLE_LABEL: Record<TUserRole, string> = {
  ADMIN: "Admin panel",
  TECHNICIAN: "Technician",
  CUSTOMER: "Customer",
};

const AppSidebar = ({ role }: { role: TUserRole }) => {
  return (
    <Sidebar collapsible="icon" className="border-project-border">
      <SidebarHeader className="h-18 justify-center border-b border-project-border px-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center">
        <Logo
          href="/dashboard"
          className="group-data-[collapsible=icon]:justify-center"
          wordmarkClassName="group-data-[collapsible=icon]:hidden"
        />
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarMenu label={ROLE_LABEL[role]} items={DASHBOARD_MENU[role]} />
      </SidebarContent>

      <SidebarFooter className="border-t border-project-border p-0">
        <span aria-hidden className="h-0.5 w-full bg-project-primary" />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
