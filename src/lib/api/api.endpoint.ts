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
    bookings: "/technician/bookings",
    bookingStatus: (id: string) => `/technician/bookings/${id}`,
    reviews: "/technician/reviews",
    availability: "/technician/availability",
  },
  admin: {
    dashboard: { stats: "/stats/admin/dashboard" },
    bookings: "/admin/bookings",
    payments: "/admin/payments",
    reviews: "/admin/reviews",
    reviewStatus: (id: string) => `/admin/reviews/${id}/status`,
  },
  customer: {
    bookings: "/bookings",
    cancelBooking: (id: string) => `/bookings/${id}/cancel`,
    createPayment: "/payments/create",
    myPayments: "/payments/my-payments",
    reviews: "/reviews",
    myReviews: "/reviews/my-reviews",
  },
  // Shared by customer (own review) and admin (any review).
  review: {
    byId: (id: string) => `/reviews/${id}`,
  },
  // Shared by all three roles — the backend picks the shape from the token.
  booking: {
    details: (id: string) => `/bookings/${id}`,
  },
  // Shared by admin and customer — same rule, the admin payload carries more.
  payment: {
    details: (id: string) => `/payments/${id}`,
  },
  service: {
    list: "/services",
  },
  // Public — what a customer reads before picking a time.
  technicianPublic: {
    availability: (id: string) => `/technicians/${id}/availability`,
  },
  category: {
    list: "/categories",
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
