"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveMenuItem, type IMenuItem } from "@/src/lib/menus/menus";
import { cn } from "@/src/lib/utils/cn";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/components/ui/sidebar";

const SidebarLink = ({ item }: { item: IMenuItem }) => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { href, label, icon: MenuIcon } = item;
  const isActive = isActiveMenuItem(pathname, item);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={label}
        className="relative h-10 px-4 font-medium text-project-muted-foreground transition-colors duration-300 hover:bg-project-muted-primary/50 hover:text-project-accent data-[active=true]:bg-project-muted-primary data-[active=true]:font-semibold data-[active=true]:text-project-primary"
      >
        <Link href={href} onClick={() => setOpenMobile(false)}>
          <span
            aria-hidden
            className={cn(
              "absolute left-0 top-0 h-full w-0.5 origin-top bg-project-primary transition-transform duration-300",
              isActive ? "scale-y-100" : "scale-y-0",
            )}
          />
          <MenuIcon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarLink;
