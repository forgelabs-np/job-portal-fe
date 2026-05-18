import { Job } from "@/app/job/(components)/JobCard";
import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";


export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";

export interface CandidateDocument {
  id: number;
  documentType: string;
  documentName: string;
  documentLink: string;
  documentPath: string
  notes: string;
  uploadedAt: string;
}

export interface CandidateStatuses {
  pccStatus: string;
  slcStatus: string;
  workPermitStatus: string;
  visaStatus: string;
}

export interface CandidateProfileData {
  id: number;
  agencyId: number;
  agencyName: string;
  userId: number;
  userEmail: string;
  candidateType: string;
  createdByType: string;
  firstName: string;
  lastName: string;
  fullName: string;
  trade: string;
  dateOfBirth: string;
  age: number;
  maritalStatus: MaritalStatus;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  isPassportValid: boolean;
  documentsFolderLink: string;
  introVideoLink: string;
  isEnabled: boolean;
  documents: CandidateDocument[];
  statuses: CandidateStatuses;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCandidateProfilePayload {
  firstName: string;
  lastName: string;
  trade: string;
  dateOfBirth: string;
  maritalStatus: MaritalStatus;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  documentsFolderLink?: string;
  introVideoLink?: string;
}

export type CandidateDocumentType =
  | "PASSPORT"
  | "PCC"
  | "CV"
  | "SLC";

export interface CandidateDocumentUploadRequest {
  documentType: CandidateDocumentType;
  file: File;
}

export interface CandidateProfileRequest {
  data: {
    id?: number;
    firstName: string;
    lastName: string;
    trade: string;
    dateOfBirth: string;
    maritalStatus: MaritalStatus;
    passportNumber: string;
    passportIssueDate?: string;
    passportExpiryDate: string;
    documentsFolderLink?: string;
    introVideoLink?: string;
  };
}


export interface CandidateDashboardStats {
  totalApplications: number;
  pendingApplications: number;
  shortlistedApplications: number;
  rejectedApplications: number;
  approvedApplications: number;
  withdrawnApplications: number;
  availableJobs: number;
}

export interface CandidateRecentApplication {
  id: number;
  jobTitle: string;
  jobCountry: string;
  jobCity: string;
  status: string;
  appliedAt: string;
}

export interface CandidateRecentJob {
  id: number;
  title: string;
  country: string;
  totalSlots: number;
  remainingSlots: number;
  status: string;
}

export interface CandidateStatusDistribution {
  pending: number;
  shortlisted: number;
  approved: number;
  rejected: number;
  withdrawn: number;
}

export interface CandidateWeeklyActivity {
  days: string[];
  applicationsSubmitted: number[];
}

export interface CandidateDashboardResponse {
  stats: CandidateDashboardStats;
  recentApplications: CandidateRecentApplication[];
  recentJobs: CandidateRecentJob[];
  statusDistribution: CandidateStatusDistribution;
  weeklyActivity: CandidateWeeklyActivity;
}

// ─── Candidate Application Types ───────────────────────────────────────

export interface CandidateApplicationType {
  id: number;
  jobDemandId: number;
  jobTitle: string;
  jobCountry: string;
  jobCity: string;
  notes: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SHORTLISTED" | "WITHDRAWN";
  appliedAt: string;
  rejectionReason: string | null;
  reviewedBy: number | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedCandidateApplicationResponse {
  content: CandidateApplicationType[];
  size: number;
  page: number;
  totalPages: number;
  totalElements: number;
}

export interface CandidateApplyPayload {
  jobDemandId: number;
  notes: string;
}

// ─── Candidate Jobs Types ──────────────────────────────────────────────

interface CandidateJobsParams {
  keyword?: string;
  page?: number;
  size?: number;
}

interface CandidateJobsResponse {
  content: Job[];
  size: number;
  page: number;
  totalPages: number;
  totalElements: number;
}

// ─── API Functions & Hooks ─────────────────────────────────────────────

// Mock Dashboard Data for development since API is not ready yet
export const MOCK_DASHBOARD_DATA: CandidateDashboardResponse = {
  stats: {
    totalApplications: 12,
    pendingApplications: 5,
    shortlistedApplications: 3,
    rejectedApplications: 2,
    approvedApplications: 2,
    withdrawnApplications: 0,
    availableJobs: 48,
  },
  recentApplications: [
    {
      id: 1,
      jobTitle: "Senior Frontend Engineer",
      jobCountry: "Germany",
      jobCity: "Berlin",
      status: "SHORTLISTED",
      appliedAt: "2026-05-15T08:30:00Z",
    },
    {
      id: 2,
      jobTitle: "React Developer",
      jobCountry: "Canada",
      jobCity: "Toronto",
      status: "PENDING",
      appliedAt: "2026-05-14T11:15:00Z",
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer (Next.js)",
      jobCountry: "United Kingdom",
      jobCity: "London",
      status: "REJECTED",
      appliedAt: "2026-05-10T14:45:00Z",
    },
    {
      id: 4,
      jobTitle: "UI/UX Developer",
      jobCountry: "United States",
      jobCity: "New York",
      status: "APPROVED",
      appliedAt: "2026-05-08T09:00:00Z",
    },
  ],
  recentJobs: [
    {
      id: 101,
      title: "Staff Software Engineer (Frontend)",
      country: "Switzerland",
      totalSlots: 5,
      remainingSlots: 2,
      status: "OPEN",
    },
    {
      id: 102,
      title: "Junior Frontend Engineer",
      country: "Japan",
      totalSlots: 10,
      remainingSlots: 7,
      status: "OPEN",
    },
    {
      id: 103,
      title: "Lead React Architect",
      country: "Singapore",
      totalSlots: 3,
      remainingSlots: 1,
      status: "OPEN",
    },
    {
      id: 104,
      title: "Mobile App Developer (React Native)",
      country: "Australia",
      totalSlots: 4,
      remainingSlots: 3,
      status: "OPEN",
    },
  ],
  statusDistribution: {
    pending: 5,
    shortlisted: 3,
    approved: 2,
    rejected: 2,
    withdrawn: 0,
  },
  weeklyActivity: {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    applicationsSubmitted: [2, 4, 1, 3, 0, 2, 0],
  },
};

const getCandidateDashboard = () => {
  return httpClient.get<ApiResponse<CandidateDashboardResponse>>(
    api.CANDIDATE.DASHBOARD,
  );
};

export const useGetCandidateDashboardQuery = () => {
  return useQuery({
    queryKey: [api.CANDIDATE.DASHBOARD],
    queryFn: async () => {
      // Simulate loading state (800ms delay) for premium user feel
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        data: {
          success: true,
          message: "Fetched mock candidate dashboard successfully",
          responseCode: 200,
          data: MOCK_DASHBOARD_DATA,
        },
      } as any;
    },
    select: (resp) => resp?.data?.data,
  });
};

// Profile
const getCandidateProfile = () => {
  return httpClient.get<ApiResponse<CandidateProfileData>>(
    api.CANDIDATE.PROFILE,
  );
};

export const useGetCandidateProfile = () => {
  return useQuery({
    queryFn: getCandidateProfile,
    queryKey: [api.CANDIDATE.PROFILE],
    select: (resp) => resp?.data?.data,
  });
};



const createCandidateProfile = (payload: CandidateProfileRequest) => {
  const reqData = { ...payload.data };

  return httpClient.post(api.CANDIDATE.CREATE_PROFILE, { data: reqData });
};

const uploadCandidateDocument = ({
  documentType,
  file,
}: CandidateDocumentUploadRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  return httpClient.post(api.CANDIDATE.UPLOAD_DOCUMENT, formData, {
    params: { documentType },
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useCreateCandidateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CandidateProfileRequest) =>
      createCandidateProfile(payload),
    onSuccess: (response) => {
      successNotification(
        response?.data?.message ?? "Profile saved successfully",
      );
      queryClient.invalidateQueries({
        queryKey: [api.CANDIDATE.PROFILE],
      });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ??
        err.response?.data?.error ??
        "Failed to save profile",
      );
    },
  });
};

export const useUploadCandidateDocument = () => {
  return useMutation({
    mutationFn: (payload: CandidateDocumentUploadRequest) =>
      uploadCandidateDocument(payload),
    onSuccess: (response) => {
      successNotification(
        response?.data?.message ?? "Document uploaded successfully",
      );
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ??
        err.response?.data?.error ??
        "Document upload failed",
      );
    },
  });
};

// Jobs
const getCandidateJobs = (params: CandidateJobsParams) => {
  return httpClient.get<ApiResponse<CandidateJobsResponse>>(
    api.CANDIDATE.JOBS,
    { params },
  );
};





export const useGetCandidateJobs = (params: CandidateJobsParams = {}) => {
  return useQuery({
    queryFn: () => getCandidateJobs(params),
    queryKey: [api.CANDIDATE.JOBS, params],
    select: (resp) => resp?.data?.data?.content,
  });
};

// Applications
const getCandidateApplications = (params: { status?: string }) => {
  return httpClient.get<ApiResponse<PaginatedCandidateApplicationResponse>>(
    api.CANDIDATE.APPLICATIONS.GET,
    { params },
  );
};

export const useGetCandidateApplications = (
  params: { status?: string } = {},
) => {
  return useQuery({
    queryFn: () => getCandidateApplications(params),
    queryKey: [api.CANDIDATE.APPLICATIONS.GET, params],
    select: (resp) => resp?.data?.data?.content,
  });
};

const getCandidateApplicationById = (id: number) => {
  return httpClient.get<ApiResponse<CandidateApplicationType>>(
    api.CANDIDATE.APPLICATIONS.GET_BY_ID.replace("{applicationId}", `${id}`),
  );
};

export const useGetCandidateApplicationById = (id: number) => {
  return useQuery({
    queryFn: () => getCandidateApplicationById(id),
    queryKey: [api.CANDIDATE.APPLICATIONS.GET_BY_ID, id],
    select: (resp) => resp?.data?.data,
    enabled: !!id,
  });
};

// Apply to job
const applyToJob = (payload: CandidateApplyPayload) => {
  return httpClient.post(
    api.CANDIDATE.APPLY_JOB.replace("{jobDemandId}", `${payload.jobDemandId}`),
    null,
    {
      params: { notes: payload.notes },
    },
  );
};

export const useApplyToJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CandidateApplyPayload) => applyToJob(payload),
    onSuccess: (response) => {
      successNotification(
        response?.data?.message ?? "Applied successfully",
      );
      queryClient.invalidateQueries({
        queryKey: [api.CANDIDATE.APPLICATIONS.GET],
      });
      queryClient.invalidateQueries({
        queryKey: [api.CANDIDATE.JOBS],
      });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ??
        err.response?.data?.error ??
        "Failed to apply",
      );
    },
  });
};

// Withdraw application
const withdrawCandidateApplication = (id: number) => {
  return httpClient.patch<ApiResponse<null>>(
    api.CANDIDATE.APPLICATIONS.WITHDRAW.replace("{applicationId}", `${id}`),
  );
};

export const useWithdrawCandidateApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => withdrawCandidateApplication(id),
    onSuccess: (response) => {
      successNotification(
        response?.data?.message ?? "Application withdrawn successfully",
      );
      queryClient.invalidateQueries({
        queryKey: [api.CANDIDATE.APPLICATIONS.GET],
      });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ??
        err.response?.data?.error ??
        "Failed to withdraw application",
      );
    },
  });
};
