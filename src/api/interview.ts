import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { ApplicationType } from "./admin-applcations";


export interface ShortlistedParams {
  jobDemandId?: number;
  applicationType?: string;
  page?: number;
  size?: number;
  status?: string;
}

export interface ShortListedResponse {
  applicationId: number;
  jobDemandId: number;
  jobTitle: string;
  jobCountry: string;
  jobCity: string;
  candidateId: number;
  candidateName: string;
  candidateTrade: string;
  candidateType: string;
  agencyId: number;
  agencyName: string;
  status: string;
  appliedAt: string;
  shortlistedAt: string;
  interviewScheduledAt: string;
  interviewStatus: string;
}

export interface PaginatedShortListedResponse {
  content: ShortListedResponse[];
  size: number;
  page: number;
  totalPages: number;
  totalElements: number;
}

const getShortlistedCandidates = (params: ShortlistedParams) => {
  return httpClient.get<ApiResponse<PaginatedShortListedResponse>>(api.ADMIN.INTERVIEWS.SHORTLISTED, {
    params,
  });
};

export const useGetShortlistedCandidates = (
  params: ShortlistedParams = {},
  isOpen: boolean = true,
) => {
  return useQuery({
    queryFn: () => getShortlistedCandidates(params ),
    queryKey: [api.ADMIN.INTERVIEWS.SHORTLISTED, params],
    select: (resp) => resp?.data?.data,
    enabled: !!isOpen,
  });
};


const getShortlistedApplicationById = (id: number) => {
  return httpClient.get<ApiResponse<ApplicationType>>(
    api.ADMIN.INTERVIEWS.SHORTLISTED_BY_ID.replace("{applicationId}", String(id)),
  );
};

export const useShortlistedApplicationByIdQuery = (id: number | null) => {
  return useQuery({
    queryKey: [api.ADMIN.INTERVIEWS.SHORTLISTED_BY_ID, id],
    queryFn: () => getShortlistedApplicationById(id!),
    enabled: id !== null,
    select: (resp) => resp.data.data,
  });
};
