"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveMenuItem, PUBLIC_MENU } from "@/src/lib/menus/menus";
import { cn } from "@/src/lib/utils/cn";

const PublicNavMenu = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className={cn("items-center gap-8", className)}
    >
      {PUBLIC_MENU.map((item) => {
        const isActive = isActiveMenuItem(pathname, item);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative flex items-center py-1.5 text-sm transition-colors duration-300",
              // Rule sits on the link's own bottom edge, not the navbar's —
              // full-height links pushed it 26px away from the label.
              "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left",
              "after:scale-x-0 after:bg-project-primary",
              "after:transition-transform after:duration-500 after:ease-out",
              "hover:after:scale-x-100",
              isActive
                ? "font-semibold text-project-accent after:scale-x-100"
                : "font-medium text-project-muted-foreground hover:text-project-accent",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default PublicNavMenu;
