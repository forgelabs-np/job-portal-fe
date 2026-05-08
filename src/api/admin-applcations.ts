import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export interface ApplicationType {
  id: number;
  jobDemandId: number;
  jobTitle: string;
  jobCountry: string;
  jobCity: string;
  agencyId: number;
  agencyName: string;
  agencyEmail: string;
  candidateId: number;
  candidateName: string;
  candidateTrade: string;
  candidatePassportNumber: string;
  notes: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  appliedAt: string;
  rejectionReason: string | null;
  reviewedBy: number | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedApplicationResponse {
  content: ApplicationType[];
  size: number;
  page: number;
  totalPages: number;
  totalElements: number;
}

interface GetApplicationParams {
  jobDemandId?: number;
  agencyId?: number;
  status?: string;
  pageable: {
    page: number;
    size: number;
    sort?: string[];
  };
}

const getApplication = (params: GetApplicationParams) => {
  return httpClient.get<ApiResponse<PaginatedApplicationResponse>>(
    api.ADMIN.APPLICATIONS.GET,
    {
      params,
    },
  );
};

export const useGetApplicationQuery = (params: GetApplicationParams) => {
  return useQuery({
    queryKey: [api.ADMIN.APPLICATIONS.GET, params],
    queryFn: () => getApplication(params),
    select: (resp) => resp.data.data,
  });
};
