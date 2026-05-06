import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

interface AgencyApprovalType {
  userId: number;
  action: string;
  rejectedReason?: string;
}

export interface AgencyListType {
  email: string;
  userId: number;
}

const getAgencies = (params: { status: string }) => {
  return httpClient.get<ApiResponse<AgencyListType[]>>(api.ADMIN.GET_AGENCY, {
    params,
  });
};

export const useGetAgenciesQuery = (params: { status: string }) => {
  return useQuery({
    queryFn: () => getAgencies(params),
    queryKey: [api.ADMIN.GET_AGENCY, params],
    select: (resp) => resp?.data?.data,
    enabled: !!params?.status,
  });
};

const approveRejectAgency = (data: AgencyApprovalType) => {
  return httpClient.post(api.ADMIN.APPROVE_REJECT, { data });
};

export const useApproveRejectAgencyMutation = () => {
  return useMutation({
    mutationFn: approveRejectAgency,
  });
};
