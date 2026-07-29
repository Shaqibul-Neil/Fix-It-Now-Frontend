"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import type { TUserRole } from "@/src/lib/auth/auth.roles";
import { PROFILE_MENU } from "@/src/lib/menus/menus";
import { ProviderAvatar, Text } from "@/src/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

export interface IProfileUser {
  name: string;
  email: string;
  role: TUserRole;
  avatarUrl?: string | null;
}

const ProfileDropdown = ({ user }: { user: IProfileUser }) => {
  const { name, email, role, avatarUrl } = user;

  // Real sign-out lands with the auth mutations.
  const handleLogout = () => console.log("logout");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open profile menu"
          className="transition-opacity duration-300 hover:opacity-80 cursor-pointer"
        >
          <ProviderAvatar src={avatarUrl} name={name} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={10} className="w-64 p-0">
        <div className="flex items-center gap-3 border-b border-project-border p-4">
          <ProviderAvatar src={avatarUrl} name={name} className="size-11" />

          <div className="flex min-w-0 flex-col gap-0.5">
            <Text
              variant="semibold-sm-2"
              as="span"
              truncate
              className="text-project-accent"
            >
              {name}
            </Text>
            <Text
              variant="normal-xs"
              as="span"
              truncate
              className="text-project-muted-foreground"
            >
              {email}
            </Text>
            <Text
              variant="medium-xs"
              as="span"
              className="mt-1 uppercase tracking-[0.18em] text-project-primary"
            >
              {role.toLowerCase()}
            </Text>
          </div>
        </div>

        <div className="flex flex-col py-1">
          {PROFILE_MENU[role].map(({ label, href, icon: MenuIcon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-project-muted-foreground transition-colors duration-300 hover:bg-project-muted-primary/50 hover:text-project-accent"
            >
              <MenuIcon className="size-4 shrink-0 transition-colors duration-300 group-hover:text-project-primary" />
              {label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 border-t border-project-border px-4 py-3 text-sm font-medium text-project-muted-foreground transition-colors duration-300 hover:bg-project-destructive/5 hover:text-project-destructive cursor-pointer"
        >
          <LogOut className="size-4 shrink-0" />
          Sign out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
