import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface AgencyProfile {
  id: number;
  userId: number;
  companyName: string;
  companyDescription: string;
  companyWebsite: string;
  companyLogoUrl: string;
  companyAddress: string;
  companyPhone: string;
  registrationNumber: string;
  taxId: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  profileComplete: boolean;
  profileApprovalStatus: "PENDING" | "APPROVED" | "REJECTED";
  profileRejectionReason?: string | null;
  documents?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface AgencyProfileRequest {
  data: Partial<Omit<AgencyProfile, "id" | "email" | "approvalStatus" | "createdAt" | "updatedAt">>;
}

export type AgencyDocumentType =
  | "TRADE_LICENCE"
  | "COMPANY_REGISTRATION"
  | "MOU"
  | "OWNER_CITIZENSHIP";

export interface AgencyDocumentUploadRequest {
  documentType: AgencyDocumentType;
  file: File;
}

export const REQUIRED_DOCUMENTS: { type: AgencyDocumentType; label: string }[] = [
  { type: "TRADE_LICENCE", label: "Trade Licence" },
  { type: "COMPANY_REGISTRATION", label: "Company Registration" },
  { type: "MOU", label: "MOU" },
  { type: "OWNER_CITIZENSHIP", label: "Owner Citizenship" },
];

const createAgencyProfile = (payload: AgencyProfileRequest) => {
  return httpClient.post(api.AGENCY.CREATE_PROFILE, payload);
};

const uploadAgencyDocument = ({ documentType, file }: AgencyDocumentUploadRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  return httpClient.post(api.AGENCY.UPLOAD_DOCUMENT, formData, {
    params: { documentType },
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useCreateAgencyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AgencyProfileRequest) => createAgencyProfile(payload),

    onSuccess: (response) => {
      successNotification(response?.data?.message);

      queryClient.invalidateQueries({
        queryKey: [api.AGENCY.APPROVED_PROFILE],
      });
    },

    onError: ({
      error,
    }: {
      error: AxiosError<{ message: string; error: string }>;
    }) => {
      errorNotification(error?.response?.data?.message);
    },
  });
};

export const useUploadAgencyDocument = () => {
  return useMutation({
    mutationFn: (payload: AgencyDocumentUploadRequest) => uploadAgencyDocument(payload),
    onSuccess: (response) => {
      successNotification(response?.data?.message ?? "Document uploaded successfully");
    },
    onError: ({
      error,
    }: {
      error: AxiosError<{ message: string; error: string }>;
    }) => {
      errorNotification(error?.response?.data?.message ?? "Document upload failed");
    },
  });
};

const getAgencyApproved = () => {
  return httpClient.get<ApiResponse<boolean>>(api.AGENCY.APPROVED_PROFILE);
};

export const useGetApprovedAgency = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryFn: () => getAgencyApproved(),
    queryKey: [api.AGENCY.APPROVED_PROFILE],
    select: (resp) => resp?.data?.data,
    enabled: options?.enabled ?? true,
  });
};

const getAgencyProfile = () => {
  return httpClient.get<ApiResponse<AgencyProfile>>(api.AGENCY.GET_PROFILE);
};

export const useGetAgencyProfile = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryFn: () => getAgencyProfile(),
    queryKey: [api.AGENCY.GET_PROFILE],
    select: (resp) => resp?.data?.data,
    enabled: options?.enabled ?? true,
    retry: false,
  });
};

const updateAgencyProfile = (payload: AgencyProfileRequest) => {
  return httpClient.patch(api.AGENCY.UPDATE_PROFILE, payload);
};

export const useUpdateAgencyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AgencyProfileRequest) => updateAgencyProfile(payload),

    onSuccess: (response) => {
      successNotification(response?.data?.message);

      queryClient.invalidateQueries({
        queryKey: [api.AGENCY.GET_PROFILE],
      });
      queryClient.invalidateQueries({
        queryKey: [api.AGENCY.APPROVED_PROFILE],
      });
    },

    onError: ({
      error,
    }: {
      error: AxiosError<{ message: string; error: string }>;
    }) => {
      errorNotification(error?.response?.data?.message);
    },
  });
};
