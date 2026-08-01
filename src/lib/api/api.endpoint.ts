export const apiEndpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refreshToken: "/auth/refresh-token",
    me: "/auth/me",
  },

  dashboard: {
    admin: {
      stats: {
        dashboard: "/stats/admin/dashboard",
      },
      bookings: {
        list: "/admin/bookings",
        details: (id: string) => `/bookings/${id}`,
      },
      payments: {
        list: "/admin/payments",
        details: (id: string) => `/payments/${id}`,
      },
      services: {
        list: "/services/admin/list",
      },
      reviews: {
        list: "/admin/reviews",
        status: (id: string) => `/admin/reviews/${id}/status`,
      },
      categories: {
        list: "/categories",
        create: "/admin/categories",
        update: (id: string) => `/admin/categories/${id}`,
        remove: (id: string) => `/admin/categories/${id}`,
      },
      technicians: {
        list: "/technicians/admin/list",
        details: (id: string) => `/technicians/admin/${id}`,
        approval: (id: string) => `/technicians/admin/${id}/approval`,
      },
    },

    technician: {
      stats: {
        dashboard: "/stats/technician/dashboard",
      },
      profile: {
        create: "/technicians/profile",
        update: "/technicians/profile",
        myProfile: "/technicians/profile/me",
      },
      bookings: {
        list: "/technician/bookings",
        details: (id: string) => `/bookings/${id}`,
        status: (id: string) => `/technician/bookings/${id}`,
      },
      services: {
        myServices: "/technician/services/my-services",
        create: "/services",
        update: (id: string) => `/services/${id}`,
        remove: (id: string) => `/services/${id}`,
      },
      reviews: {
        myReviews: "/technician/reviews",
      },
      availability: {
        myAvailability: "/technician/availability",
        update: "/technician/availability",
      },
    },

    customer: {
      bookings: {
        list: "/bookings",
        create: "/bookings",
        details: (id: string) => `/bookings/${id}`,
        cancel: (id: string) => `/bookings/${id}/cancel`,
      },
      payments: {
        myPayments: "/payments/my-payments",
        details: (id: string) => `/payments/${id}`,
        create: "/payments/create",
      },
      reviews: {
        myReviews: "/reviews/my-reviews",
        create: "/reviews",
        update: (id: string) => `/reviews/${id}`,
        remove: (id: string) => `/reviews/${id}`,
      },
      services: {
        list: "/services",
      },
    },
  },

  public: {
    service: {
      list: "/services",
    },
    technician: {
      list: "/technicians",
      details: (id: string) => `/technicians/${id}`,
      availability: (id: string) => `/technicians/${id}/availability`,
    },
    category: {
      list: "/categories",
    },
  },
};

export const bffEndpoints = {
  auth: {
    register: "/register",
    login: "/login",
    logout: "/logout",
  },
};
