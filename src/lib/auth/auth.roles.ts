export const USER_ROLES = {
  ADMIN: "ADMIN",
  TECHNICIAN: "TECHNICIAN",
  CUSTOMER: "CUSTOMER",
} as const;

export type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/** Where each role lands after login, and where a wrong-role user is sent back to. */
export const ROLE_LANDING_PAGE: Record<TUserRole, string> = {
  ADMIN: "/dashboard/admin",
  TECHNICIAN: "/dashboard/technician",
  CUSTOMER: "/dashboard/customer",
};
