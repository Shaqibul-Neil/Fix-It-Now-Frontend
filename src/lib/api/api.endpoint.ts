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
        list: "/admin/categories",
        details: (id: string) => `/admin/categories/${id}`,
        create: "/admin/categories",
        update: (id: string) => `/admin/categories/${id}`,
        restore: (id: string) => `/admin/categories/${id}/restore`,
        remove: (id: string) => `/admin/categories/${id}`,
      },
      technicians: {
        list: "/technicians/admin/list",
        details: (id: string) => `/technicians/admin/${id}`,
        approval: (id: string) => `/technicians/admin/${id}/approval`,
        featured: (id: string) => `/technicians/admin/${id}/featured`,
      },
      // Ban, remove and restore act on the account, not on any one profile —
      // technician rows carry `userId` for exactly this.
      users: {
        list: "/admin/users",
        status: (id: string) => `/admin/users/${id}`,
        restore: (id: string) => `/admin/users/${id}/restore`,
        remove: (id: string) => `/admin/users/${id}`,
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
        restore: (id: string) => `/services/${id}/restore`,
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
      stats: {
        dashboard: "/stats/customer/dashboard",
      },
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

  // Role-agnostic: every signed-in user reads their own notifications.
  notifications: {
    list: "/notifications",
    unreadCount: "/notifications/unread-count",
    readAll: "/notifications/read-all",
    read: (id: string) => `/notifications/${id}/read`,
  },

  public: {
    technician: {
      list: "/technicians",
      filters: "/technicians/filters",
      details: (id: string) => `/technicians/${id}`,
      availability: (id: string) => `/technicians/${id}/availability`,
    },
    category: {
      list: "/categories",
      details: (slug: string) => `/categories/${slug}`,
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
