import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
  totalAgencies: number;
  pendingAgencies: number;
  approvedAgencies: number;
  rejectedAgencies: number;

  totalJobs: number;
  openJobs: number;
  completedJobs: number;
  closedJobs: number;
  cancelledJobs: number;

  totalSlots: number;
  filledSlots: number;
  remainingSlots: number;
}

export interface RecentJob {
  id: number;
  title: string;
  country: string;

  totalSlots: number;
  filledSlots: number;
  remainingSlots: number;

  appliedCount: number;
  status: string;
  createdAt: string;
}

export interface RecentAgency {
  id: number;
  fullName: string;
  email: string;
  approvalStatus: string;
  createdAt: string;
}

export interface JobStatusDistribution {
  open: number;
  completed: number;
  closed: number;
  cancelled: number;
}

export interface WeeklyActivity {
  days: string[];
  jobsCreated: number[];
  agenciesJoined: number[];
  candidatesSubmitted: number[];
}

export interface DashboardResponse {
  stats: DashboardStats;
  recentJobs: RecentJob[];
  recentAgencies: RecentAgency[];
  jobStatusDistribution: JobStatusDistribution;
  weeklyActivity: WeeklyActivity;
}

export interface AgencyDashboardStats {
  totalCandidates: number;
  enabledCandidates: number;
  disabledCandidates: number;
  totalApplications: number;
  pendingApplications: number;
  reviewedApplications: number;
  shortlistedApplications: number;
  rejectedApplications: number;
  withdrawnApplications: number;
  assignedJobs: number;
  openJobs: number;
  completedJobs: number;
  approvalRate: number;
}

export interface RecentApplication {
  id: number;
  jobTitle: string;
  candidateName: string;
  status: string;
  appliedAt: string;
}

export interface RecentCandidate {
  id: number;
  fullName: string;
  trade: string;
  isEnabled: boolean;
  createdAt: string;
}

export interface AgencyRecentJob {
  id: number;
  title: string;
  country: string;
  totalSlots: number;
  remainingSlots: number;
  status: string;
}

export interface AgencyStatusDistribution {
  pending: number;
  reviewed: number;
  shortlisted: number;
  rejected: number;
  withdrawn: number;
}

export interface AgencyWeeklyActivity {
  days: string[];
  applicationsSubmitted: number[];
  applicationsShortlisted: number[];
}

export interface AgencyDashboardResponse {
  stats: AgencyDashboardStats;
  recentApplications: RecentApplication[];
  recentCandidates: RecentCandidate[];
  recentJobs: AgencyRecentJob[];
  statusDistribution: AgencyStatusDistribution;
  weeklyActivity: AgencyWeeklyActivity;
}

const getDashboardData = () => {
  return httpClient.get<ApiResponse<DashboardResponse>>(api.ADMIN.DASHBOARD);
};

export const useGetDashboardQuery = () => {
  return useQuery({
    queryFn: getDashboardData,
    queryKey: [api.ADMIN.JOBS.GET_JOB],
    select: (resp) => resp?.data?.data,
  });
};

const getAgencyDashboardData = () => {
  return httpClient.get<ApiResponse<AgencyDashboardResponse>>(api.AGENCY.DASHBOARD);
};

export const useGetAgencyDashboardQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryFn: getAgencyDashboardData,
    queryKey: [api.AGENCY.DASHBOARD],
    select: (resp) => resp?.data?.data,
    enabled: options?.enabled,
  });
};
