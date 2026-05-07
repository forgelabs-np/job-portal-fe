import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface AgencyProfileRequest {
  data: {
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
  };
}

const createAgencyProfile = (payload: AgencyProfileRequest) => {
  return httpClient.post(api.AGENCY.CREATE_PROFILE, payload);
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
  return httpClient.get<ApiResponse<boolean>>(api.AGENCY.GET_PROFILE);
};

export const useGetAgencyProfile = () => {
  return useQuery({
    queryFn: () => getAgencyProfile(),
    queryKey: [api.AGENCY.GET_PROFILE],
    select: (resp) => resp?.data?.data,
    // enabled: !!params?.status,
  });
};
