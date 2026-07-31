import type { ReactNode } from "react";
import { Footer, PublicNavbar } from "@/src/components";
import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";
import { IProfileUser } from "@/src/types/types";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getMeRequest();

  // Guests browse these pages freely — only the navbar's auth state depends
  // on whether someone is logged in.
  const user: IProfileUser | undefined = currentUser
    ? {
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
        role: currentUser.role,
      }
    : undefined;

  return (
    <div className="flex min-h-svh flex-col">
      <PublicNavbar user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
