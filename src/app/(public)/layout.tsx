import type { ReactNode } from "react";
import { Footer, PublicNavbar } from "@/src/components";
import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";
import { redirect } from "next/navigation";
import { IProfileUser } from "@/src/types/types";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getMeRequest();
  if (!currentUser) redirect("/");

  const user: IProfileUser = {
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    email: currentUser.email,
    role: currentUser.role,
  };
  return (
    <div className="flex min-h-svh flex-col">
      <PublicNavbar user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
