export const apiEndpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refreshToken: "/auth/refresh-token",
    me: "/auth/me",
  },
  technician: {
    dashboard: { stats: "/stats/technician/dashboard" },
    profile: "/technicians/profile",
    myProfile: "/technicians/profile/me",
  },
  admin: {
    dashboard: { stats: "/stats/admin/dashboard" },
  },
};

// Next.js BFF(Gateway) paths — what the browser calls.

export const bffEndpoints = {
  auth: {
    register: "/register",
    login: "/login",
    logout: "/logout",
  },
};
