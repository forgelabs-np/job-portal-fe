import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export enum LeadSubject {
  CONSULTATION = "CONSULTATION",
  PARTNERSHIP = "PARTNERSHIP",
  FEEDBACK = "FEEDBACK",
  GENERAL_INQUIRY = "GENERAL_INQUIRY",
  SUPPORT = "SUPPORT",
}

export interface Lead {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  location: string;
  subject: LeadSubject;
  description: string;
  isRead: boolean;
  isProcessed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LeadListResponse {
  content: Lead[];
  size: number;
  page: number;
  totalPages: number;
  totalElements: number;
}

export interface SubmitLeadPayload {
  data: {
    fullName: string;
    phoneNumber: string;
    email: string;
    location: string;
    subject: LeadSubject;
    description: string;
  };
}

export interface UpdateLeadPayload {
  data: {
    fullName: string;
    phoneNumber: string;
    email: string;
    location: string;
    subject: LeadSubject;
    description: string;
  };
}

export interface LeadsQueryParams {
  fullName?: string;
  email?: string;
  subject?: string;
  isRead?: boolean;
  isProcessed?: boolean;
  pageable?: {
    page?: number;
    size?: number;
    sort?: string;
  };
}

// ─── API Functions ────────────────────────────────────────────────────────────

export const submitLead = (payload: SubmitLeadPayload) => {
  return httpClient.post<ApiResponse<Lead>>(api.LEADS.SUBMIT, payload);
};

export const getLeads = (params: LeadsQueryParams) => {
  return httpClient.get<ApiResponse<LeadListResponse>>(api.LEADS.GET_ALL, {
    params: {
      ...params,
      page: params.pageable?.page,
      size: params.pageable?.size,
      sort: params.pageable?.sort,
    },
    paramsSerializer: (params) => {
      const parts: string[] = [];
      if (params.fullName) parts.push(`fullName=${encodeURIComponent(params.fullName)}`);
      if (params.email) parts.push(`email=${encodeURIComponent(params.email)}`);
      if (params.subject) parts.push(`subject=${params.subject}`);
      if (params.isRead !== undefined && params.isRead !== null) parts.push(`isRead=${params.isRead}`);
      if (params.isProcessed !== undefined && params.isProcessed !== null) parts.push(`isProcessed=${params.isProcessed}`);
      if (params.page !== undefined) parts.push(`page=${params.page}`);
      if (params.size !== undefined) parts.push(`size=${params.size}`);
      if (params.sort) parts.push(`sort=${encodeURIComponent(params.sort)}`);
      return parts.join("&");
    },
  });
};

export const getLeadById = (id: number) => {
  return httpClient.get<ApiResponse<Lead>>(
    api.LEADS.GET_BY_ID.replace("{id}", String(id)),
  );
};

export const updateLead = (id: number, payload: UpdateLeadPayload) => {
  return httpClient.put<ApiResponse<Lead>>(
    api.LEADS.UPDATE.replace("{id}", String(id)),
    payload,
  );
};

export const deleteLead = (id: number) => {
  return httpClient.delete(api.LEADS.DELETE.replace("{id}", String(id)));
};

export const markLeadAsRead = (id: number) => {
  return httpClient.patch(api.LEADS.MARK_READ.replace("{id}", String(id)));
};

export const markLeadAsProcessed = (id: number) => {
  return httpClient.patch(api.LEADS.MARK_PROCESSED.replace("{id}", String(id)));
};

export const getUnreadLeadCount = () => {
  return httpClient.get<ApiResponse<number>>(api.LEADS.UNREAD_COUNT);
};

export const getUnprocessedLeadCount = () => {
  return httpClient.get<ApiResponse<number>>(api.LEADS.UNPROCESSED_COUNT);
};

// ─── React Query Hooks ────────────────────────────────────────────────────────

export const LEADS_QUERY_KEYS = {
  all: ["leads"] as const,
  lists: () => [...LEADS_QUERY_KEYS.all, "list"] as const,
  list: (params: LeadsQueryParams) => [...LEADS_QUERY_KEYS.lists(), params] as const,
  details: () => [...LEADS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: number) => [...LEADS_QUERY_KEYS.details(), id] as const,
  unreadCount: () => [...LEADS_QUERY_KEYS.all, "unread-count"] as const,
  unprocessedCount: () => [...LEADS_QUERY_KEYS.all, "unprocessed-count"] as const,
};

export const useLeads = (params: LeadsQueryParams) => {
  return useQuery({
    queryFn: () => getLeads(params),
    queryKey: LEADS_QUERY_KEYS.list(params),
    select: (resp) => resp?.data?.data,
  });
};

export const useLead = (id: number, enabled = false) => {
  return useQuery({
    queryFn: () => getLeadById(id),
    queryKey: LEADS_QUERY_KEYS.detail(id),
    select: (resp) => resp?.data?.data,
    enabled,
  });
};

export const useSubmitLeadMutation = () => {
  return useMutation({
    mutationFn: submitLead,
    onSuccess: () => {
      // successNotification(response?.data?.message || "Your message has been submitted successfully.");
      successNotification("Your message has been submitted successfully.");

    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ?? err.response?.data?.error ?? "Failed to submit lead.",
      );
    },
  });
};

export const useUpdateLeadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateLeadPayload }) =>
      updateLead(id, payload),
    onSuccess: (response) => {
      successNotification(response?.data?.message || "Lead updated successfully.");
      queryClient.invalidateQueries({ queryKey: LEADS_QUERY_KEYS.all });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ?? err.response?.data?.error ?? "Failed to update lead.",
      );
    },
  });
};

export const useDeleteLeadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      successNotification("Lead deleted successfully.");
      queryClient.invalidateQueries({ queryKey: LEADS_QUERY_KEYS.all });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ?? err.response?.data?.error ?? "Failed to delete lead.",
      );
    },
  });
};

export const useMarkLeadAsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markLeadAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_QUERY_KEYS.all });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ?? err.response?.data?.error ?? "Failed to mark as read.",
      );
    },
  });
};

export const useMarkLeadAsProcessedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markLeadAsProcessed,
    onSuccess: () => {
      successNotification("Lead marked as processed.");
      queryClient.invalidateQueries({ queryKey: LEADS_QUERY_KEYS.all });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ?? err.response?.data?.error ?? "Failed to mark as processed.",
      );
    },
  });
};

export const useUnreadLeadCount = () => {
  return useQuery({
    queryFn: getUnreadLeadCount,
    queryKey: LEADS_QUERY_KEYS.unreadCount(),
    select: (resp) => resp?.data?.data ?? 0,
  });
};

export const useUnprocessedLeadCount = () => {
  return useQuery({
    queryFn: getUnprocessedLeadCount,
    queryKey: LEADS_QUERY_KEYS.unprocessedCount(),
    select: (resp) => resp?.data?.data ?? 0,
  });
};
