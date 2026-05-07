export const api = {
  AUTH: {
    AGENCY_LOGIN: "/auth/agency/login",
    ADMIN_LOGIN: "/auth/admin/login",
    REGISTER: "/auth/signup",
    VERIFY_REGISTER: "/auth/verify-signup",
  },
  ADMIN: {
    GET_AGENCY: "/admin/agencies",
    APPROVE_REJECT: "/admin/agencies/action",
    APPROVED_COUNTRIES: "/countries/enabled",
    ALL_COUNTRIES: "/countries/search",
    TOGGLE_COUNTRY: "/countries/{id}/toggle",
    DASHBOARD: "/admin/dashboard",
    JOBS: {
      CREATE: "/admin/jobs",
      GET_JOB: "/admin/jobs",
      GET_JOB_BY_ID: "/admin/jobs/{id}",
    },
  },
};
