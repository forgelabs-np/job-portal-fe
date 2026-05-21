"use client";

import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InterviewStatus = "SCHEDULED" | "RESCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

export interface InterviewRequest {
  id?: number;
  jobApplicationId: number;
  scheduledAt: string; // ISO date-time
  timezone: string;
  interviewLink: string;
  interviewType: "ONLINE" | "IN_PERSON";
  venue?: string;
  adminNotes?: string;
}

export interface InterviewResponse {
  id: number;
  jobApplicationId: number;
  jobTitle: string;
  candidateId: number;
  candidateName: string;
  candidateType: string;
  agencyId: number;
  agencyName: string;
  scheduledAt: string; // ISO date-time
  timezone: string;
  interviewLink: string;
  interviewType: "ONLINE" | "IN_PERSON";
  venue?: string;
  adminNotes?: string;
  status: InterviewStatus;
  result: "PENDING" | "PASS" | "FAIL" | "RE_INTERVIEW";
  resultNotes?: string;
  resultUpdatedBy?: number;
  resultUpdatedAt?: string;
  scheduledBy: number;
  reminderSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewResultRequest {
  result: "PENDING" | "PASS" | "FAIL" | "RE_INTERVIEW";
  resultNotes?: string;
}

export interface InterviewFilterParams {
  jobDemandId?: number;
  status?: string;
  result?: string;
  agencyId?: number;
  pageable: {
    page: number;
    size: number;
    sort?: string[];
  };
}

export interface PaginatedInterviewResponse {
  content: InterviewResponse[];
  size: number;
  page: number;
  totalPages: number;
  totalElements: number;
}

// ─── API Calls ────────────────────────────────────────────────────────────────

const getAllInterviews = (params: InterviewFilterParams) => {
  return httpClient.get<ApiResponse<PaginatedInterviewResponse>>(
    api.ADMIN.INTERVIEWS.GET,
    { params }
  );
};

const getInterviewById = (interviewId: number) => {
  return httpClient.get<ApiResponse<InterviewResponse>>(
    api.ADMIN.INTERVIEWS.GET_BY_ID.replace("{interviewId}", String(interviewId))
  );
};

const getInterviewByApplicationId = (jobApplicationId: number) => {
  return httpClient.get<ApiResponse<InterviewResponse>>(
    api.ADMIN.INTERVIEWS.GET_BY_APPLICATION_ID.replace(
      "{jobApplicationId}",
      String(jobApplicationId)
    )
  );
};

const createOrUpdateInterview = (payload: InterviewRequest) => {
  return httpClient.post<ApiResponse<InterviewResponse>>(
    api.ADMIN.INTERVIEWS.CREATE_OR_UPDATE,
    { data: payload }
  );
};

const setInterviewResult = (
  interviewId: number,
  payload: InterviewResultRequest
) => {
  return httpClient.patch<ApiResponse<InterviewResponse>>(
    api.ADMIN.INTERVIEWS.SET_RESULT.replace("{interviewId}", String(interviewId)),
    { data: payload }
  );
};

const cancelInterview = (interviewId: number) => {
  return httpClient.patch<ApiResponse<InterviewResponse>>(
    api.ADMIN.INTERVIEWS.CANCEL.replace("{interviewId}", String(interviewId))
  );
};

const updateInterviewStatus = (
  interviewId: number,
  status: InterviewStatus
) => {
  return httpClient.patch<ApiResponse<InterviewResponse>>(
    api.ADMIN.INTERVIEWS.UPDATE_STATUS.replace("{interviewId}", String(interviewId)),
    null,
    { params: { status } }
  );
};

const deleteInterview = (interviewId: number) => {
  return httpClient.delete<ApiResponse<void>>(
    api.ADMIN.INTERVIEWS.DELETE.replace("{interviewId}", String(interviewId))
  );
};

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useGetAllInterviewsQuery = (params: InterviewFilterParams) => {
  return useQuery({
    queryKey: [api.ADMIN.INTERVIEWS.GET, params],
    queryFn: () => getAllInterviews(params),
    select: (resp) => resp.data.data,
  });
};

export const useGetInterviewByIdQuery = (interviewId: number | null) => {
  return useQuery({
    queryKey: [api.ADMIN.INTERVIEWS.GET_BY_ID, interviewId],
    queryFn: () => getInterviewById(interviewId!),
    enabled: interviewId !== null,
    select: (resp) => resp.data.data,
  });
};

export const useGetInterviewByApplicationIdQuery = (
  jobApplicationId: number | null
) => {
  return useQuery({
    queryKey: [api.ADMIN.INTERVIEWS.GET_BY_APPLICATION_ID, jobApplicationId],
    queryFn: () => getInterviewByApplicationId(jobApplicationId!),
    enabled: jobApplicationId !== null,
    select: (resp) => resp.data.data,
  });
};

// ─── Mutations ────────────────────────────────────────────────────────────────

export const useCreateOrUpdateInterviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrUpdateInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET_BY_APPLICATION_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.SHORTLISTED],
      });
    },
  });
};

export const useSetInterviewResultMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      interviewId,
      payload,
    }: {
      interviewId: number;
      payload: InterviewResultRequest;
    }) => setInterviewResult(interviewId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET_BY_APPLICATION_ID],
      });
    },
  });
};

export const useCancelInterviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET_BY_APPLICATION_ID],
      });
    },
  });
};

export const useUpdateInterviewStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      interviewId,
      status,
    }: {
      interviewId: number;
      status: InterviewStatus;
    }) => updateInterviewStatus(interviewId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET_BY_APPLICATION_ID],
      });
    },
  });
};

export const useDeleteInterviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET],
      });
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.INTERVIEWS.GET_BY_ID],
      });
    },
  });
};
