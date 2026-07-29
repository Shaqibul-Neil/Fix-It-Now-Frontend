export const apiEndpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refreshToken: "/auth/refresh-token",
    me: "/auth/me",
  },
  technician: {
    profile: "/technicians/profile",
    myProfile: "/technicians/profile/me",
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
