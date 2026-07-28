import { TUserRole, USER_ROLES } from "../auth/auth.roles";

// Logged-in users should be redirected away from these pages.
export const GUEST_ONLY_ROUTES = ["/login", "/register"];

// Protected dashboard routes with their allowed user roles.
export const PROTECTED_ROUTES: { prefix: string; allowedRoles: TUserRole[] }[] =
  [
    { prefix: "/dashboard/admin", allowedRoles: [USER_ROLES.ADMIN] },
    { prefix: "/dashboard/technician", allowedRoles: [USER_ROLES.TECHNICIAN] },
    { prefix: "/dashboard/customer", allowedRoles: [USER_ROLES.CUSTOMER] },
  ];

//Checks whether the current pathname is a guest-only route.
export const isGuestOnlyRoute = (pathName: string) =>
  GUEST_ONLY_ROUTES.includes(pathName);

//Finds protected route configuration matching the current pathname.
export const findProtectedRoute = (pathName: string) =>
  PROTECTED_ROUTES.find((route) => pathName.startsWith(route.prefix));
