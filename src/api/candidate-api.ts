import { Job } from "@/app/job/(components)/JobCard";
import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// ─── Candidate Profile Types ───────────────────────────────────────────

export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";

export interface CandidateDocument {
  id: number;
  documentType: string;
  documentName: string;
  documentLink: string;
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

// ─── Candidate Dashboard Types ─────────────────────────────────────────

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

// Dashboard
const getCandidateDashboard = () => {
  return httpClient.get<ApiResponse<CandidateDashboardResponse>>(
    api.CANDIDATE.DASHBOARD,
  );
};

export const useGetCandidateDashboardQuery = () => {
  return useQuery({
    queryFn: getCandidateDashboard,
    queryKey: [api.CANDIDATE.DASHBOARD],
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

const updateCandidateProfile = (payload: UpdateCandidateProfilePayload) => {
  return httpClient.put(api.CANDIDATE.UPDATE_PROFILE, payload);
};

export const useUpdateCandidateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCandidateProfilePayload) =>
      updateCandidateProfile(payload),
    onSuccess: (response) => {
      successNotification(
        response?.data?.message ?? "Profile updated successfully",
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
          "Failed to update profile",
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
    api.CANDIDATE.APPLICATIONS.GET_BY_ID.replace("{id}", `${id}`),
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
  return httpClient.post(api.CANDIDATE.APPLICATIONS.POST, { data: payload });
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
  return httpClient.delete<ApiResponse<null>>(
    api.CANDIDATE.APPLICATIONS.WITHDRAW.replace("{id}", `${id}`),
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
