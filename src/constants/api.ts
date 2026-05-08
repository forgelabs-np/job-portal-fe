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
      ASSIGN: "/admin/jobs/assign",
    },
    APPLICATIONS: {
      GET: "/admin/applications",
    },
  },
  AGENCY: {
    GET_PROFILE: "/agency/profile",
    APPROVED_PROFILE: "/agency/profile/complete",
    CREATE_PROFILE: "/agency/profile",
    CANDIDATES: {
      GET: "/agency/candidates",
      POST: "/agency/candidates",
      GET_BY_ID: "/agency/candidates/{id}",
    },
    JOBS: {
      APPLY: "/agency/applications",
      GET_JOBS: "/agency/jobs/assigned",
    },
  },
};
