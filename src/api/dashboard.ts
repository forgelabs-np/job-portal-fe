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
