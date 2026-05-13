import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ApprovalStatus = "APPROVED" | "REJECTED";

export interface AgencyListType {
  email: string;
  userId: number;
  companyName: string;
}

export interface AgencyDocument {
  id: number;
  documentType: string;
  status: string;
  rejectionReason?: string | null;
  documentPath?: string;
  fileUrl?: string;
  url?: string;
}

export interface AgencyProfileDetails extends AgencyListType {
  companyName?: string;
  companyDescription?: string;
  companyWebsite?: string;
  companyLogoUrl?: string;
  companyAddress?: string;
  companyPhone?: string;
  registrationNumber?: string;
  taxId?: string;
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
  approvalStatus?: string;
  profileStatus?: string;
  profileApprovalStatus?: string;
  status?: string;
  rejectionReason?: string | null;
  documents?: AgencyDocument[];
}

interface ProcessAgencyProfilePayload {
  userId: number;
  status: ApprovalStatus;
  rejectionReason?: string;
}

interface ProcessAgencyDocumentPayload {
  documentId: number;
  status: ApprovalStatus;
  rejectionReason?: string;
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

const getAgencyProfileDetails = (userId: number) => {
  return httpClient.get<ApiResponse<AgencyProfileDetails>>(
    api.ADMIN.GET_AGENCY_PROFILE_DETAILS.replace("{userId}", String(userId)),
  );
};

export const useGetAgencyProfileDetailsQuery = (
  userId?: number,
  enabled = false,
) => {
  return useQuery({
    queryFn: () => getAgencyProfileDetails(userId as number),
    queryKey: [api.ADMIN.GET_AGENCY_PROFILE_DETAILS, userId],
    select: (resp) => resp?.data?.data,
    enabled: Boolean(userId) && enabled,
  });
};

const processAgencyProfile = (payload: ProcessAgencyProfilePayload) => {
  return httpClient.post(api.ADMIN.PROCESS_AGENCY_PROFILE, { data: payload });
};

export const useProcessAgencyProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processAgencyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.GET_AGENCY],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.GET_AGENCY_PROFILE_DETAILS],
      });
    },
  });
};

const processAgencyDocument = (payload: ProcessAgencyDocumentPayload) => {
  return httpClient.post(api.ADMIN.PROCESS_AGENCY_DOCUMENT, { data: payload });
};

export const useProcessAgencyDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processAgencyDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.GET_AGENCY],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.GET_AGENCY_PROFILE_DETAILS],
      });
    },
  });
};
