import type { IMenuItem } from "@/src/lib/menus/menus";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu as SidebarMenuList,
} from "@/src/components/ui/sidebar";
import SidebarLink from "./SidebarLink";

interface ISidebarMenuProps {
  label: string;
  items: IMenuItem[];
}

// One menu for every role — only the item list changes.
const SidebarMenu = ({ label, items }: ISidebarMenuProps) => {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupLabel className="px-4 text-project-primary uppercase tracking-[0.28em]">
        {label}
      </SidebarGroupLabel>

      <SidebarMenuList className="gap-0.5">
        {items.map((item) => (
          <SidebarLink key={item.href} item={item} />
        ))}
      </SidebarMenuList>
    </SidebarGroup>
  );
};

export default SidebarMenu;
