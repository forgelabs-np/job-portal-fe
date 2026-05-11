import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

const getApplicationById = (id: number) => {
  return httpClient.get<ApiResponse<ApplicationType>>(
    api.ADMIN.APPLICATIONS.GET_BY_ID.replace("{id}", String(id)),
  );
};

export const useGetApplicationByIdQuery = (id: number | null) => {
  return useQuery({
    queryKey: [api.ADMIN.APPLICATIONS.GET_BY_ID, id],
    queryFn: () => getApplicationById(id!),
    enabled: id !== null,
    select: (resp) => resp.data.data,
  });
};


export interface UpdateApplicationStatusPayload {
  status: "PENDING" | "APPROVED" | "SHORTLISTED" | "REJECTED";
  rejectionReason?: string;
}

const updateApplicationStatus = (
  id: number,
  payload: UpdateApplicationStatusPayload,
) => {
  return httpClient.patch<ApiResponse<ApplicationType>>(
    api.ADMIN.APPLICATIONS.UPDATE_STATUS.replace("{id}", String(id)),
    { data: payload },
  );
};

export const useUpdateApplicationStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateApplicationStatusPayload;
    }) => updateApplicationStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.ADMIN.APPLICATIONS.GET] });
    },
  });
};
