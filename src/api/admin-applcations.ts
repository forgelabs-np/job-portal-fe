import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface ApplicationDocument {
  id: number;
  documentType: string;
  documentName?: string;
  documentPath?: string;
  fileUrl?: string;
  url?: string;
  status: string;
  rejectionReason?: string | null;
  uploadedAt?: string;
}

export interface ApplicationCandidateStatuses {
  pccStatus?: string;
  slcStatus?: string;
  workPermitStatus?: string;
  visaStatus?: string;
}

export interface ApplicationType {
  id: number;
  jobDemandId: number;
  jobTitle: string;
  jobCountry: string;
  jobCity: string;
  country: string;
  city: string;
  agencyId: number;
  agencyName: string;
  agencyEmail: string;
  candidateId: number;
  candidateName: string;
  candidateTrade: string;
  candidatePassportNumber: string;
  notes: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SHORTLISTED";
  appliedAt: string;
  rejectionReason: string | null;
  reviewedBy: number | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  documents?: ApplicationDocument[];
  candidateStatuses?: ApplicationCandidateStatuses;
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


const getSelfApplication = (params: GetApplicationParams) => {
  return httpClient.get<ApiResponse<PaginatedApplicationResponse>>(
    api.ADMIN.APPLICATIONS.SELF_APPLICATIONS,
    {
      params,
    },
  );
};

export const useGetSelfApplicationQuery = (params: GetApplicationParams) => {
  return useQuery({
    queryKey: [api.ADMIN.APPLICATIONS.SELF_APPLICATIONS, params],
    queryFn: () => getSelfApplication(params),
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


const getSelfApplicationById = (id: number) => {
  return httpClient.get<ApiResponse<ApplicationType>>(
    api.ADMIN.APPLICATIONS.GET_SELF_APPLICATION_BY_ID.replace("{applicationId}", String(id)),
  );
};

export const useGetSelfApplicationByIdQuery = (id: number | null) => {
  return useQuery({
    queryKey: [api.ADMIN.APPLICATIONS.GET_SELF_APPLICATION_BY_ID, id],
    queryFn: () => getSelfApplicationById(id!),
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


const updateSelfApplicationStatus = (
  id: number,
  payload: UpdateApplicationStatusPayload,
) => {
  return httpClient.patch<ApiResponse<ApplicationType>>(
    api.ADMIN.APPLICATIONS.UPDATE_SELF_APPLICATION.replace("{applicationId}", String(id)),
    { data: payload },
  );
};

export const useUpdateSelfApplicationStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateApplicationStatusPayload;
    }) => updateSelfApplicationStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.ADMIN.APPLICATIONS.SELF_APPLICATIONS] });
    },
  });
};

// ─── Process Application Document ─────────────────────────────────────────────

export interface ProcessApplicationDocumentPayload {
  documentId: number;
  status: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}

const processApplicationDocument = (payload: ProcessApplicationDocumentPayload) => {
  return httpClient.post<ApiResponse<null>>(
    api.ADMIN.APPLICATIONS.PROCESS_AGENCY_DOCUMENT,
    { data: payload },
  );
};

export const useProcessApplicationDocumentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: processApplicationDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.ADMIN.APPLICATIONS.GET_BY_ID] });
      queryClient.invalidateQueries({ queryKey: [api.ADMIN.APPLICATIONS.GET_SELF_APPLICATION_BY_ID] });
    },
  });
};
