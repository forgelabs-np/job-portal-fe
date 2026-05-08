import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";

export interface Document {
  documentType: string;
  documentName: string;
  documentLink: string;
  notes: string;
}

export interface CandidateProfile {
  id: number;
  firstName: string;
  lastName: string;
  trade: string;
  dateOfBirth: string;
  maritalStatus: MaritalStatus;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  documentsFolderLink: string;
  introVideoLink: string;
  documents: Document[];
}

export interface CandidateProfileResponse {
  data: CandidateProfile;
}

export interface CandidateDocument {
  id: number;
  documentType: string;
  documentName: string;
  documentLink: string;
  notes: string;
  uploadedAt: string;
}

export interface CandidateStatuses {
  pccStatus: string;
  slcStatus: string;
  workPermitStatus: string;
  visaStatus: string;
}

export interface Candidate {
  id: number;
  agencyId: number;
  agencyName: string;
  firstName: string;
  lastName: string;
  fullName: string;
  trade: string;
  dateOfBirth: string;
  age: number;
  maritalStatus: MaritalStatus;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  isPassportValid: boolean;
  documentsFolderLink: string;
  introVideoLink: string;
  isEnabled: boolean;
  documents: CandidateDocument[];
  statuses: CandidateStatuses;
  createdAt: string;
  updatedAt: string;
}

export interface CandidatesResponse {
  data: {
    content: Candidate[];
  };
}

const getAllCandidates = () => {
  return httpClient.get<ApiResponse<CandidatesResponse>>(
    api.AGENCY.CANDIDATES.GET,
  );
};

export const useGetAllCandidates = () => {
  return useQuery({
    queryFn: () => getAllCandidates(),
    queryKey: [api.AGENCY.CANDIDATES.GET],
    select: (resp) => resp?.data?.data?.content,
  });
};

const getCandidateById = (id: number) => {
  return httpClient.get<ApiResponse<Candidate>>(
    api.AGENCY.CANDIDATES.GET_BY_ID.replace("{id}", `${id}`),
  );
};

export const useGetCandidateById = (id: number) => {
  return useQuery({
    queryFn: () => getCandidateById(id),
    queryKey: [api.AGENCY.CANDIDATES.GET_BY_ID],
    select: (resp) => resp?.data?.data,
    enabled: !!id,
  });
};

const createCandidate = (payload: CandidateProfileResponse) => {
  return httpClient.post(api.AGENCY.CANDIDATES.POST, payload);
};

export const useCreateCandidateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CandidateProfileResponse) => createCandidate(payload),

    onSuccess: (response) => {
      successNotification(response?.data?.message);

      // invalidate jobs list
      queryClient.invalidateQueries({
        queryKey: [api.AGENCY.CANDIDATES.GET],
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
