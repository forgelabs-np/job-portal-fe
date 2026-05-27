import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export enum AnnouncementType {
  GENERAL = "GENERAL",
  JOB_ALERT = "JOB_ALERT",
  SYSTEM_UPDATE = "SYSTEM_UPDATE",
  POLICY_CHANGE = "POLICY_CHANGE",
  EVENT = "EVENT",
}

export enum TargetAudience {
  ALL = "ALL",
  AGENCY_ONLY = "AGENCY_ONLY",
  CANDIDATE_ONLY = "CANDIDATE_ONLY",
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  announcementType: AnnouncementType;
  targetAudience: TargetAudience;
  isActive: boolean;
  isPinned: boolean;
  isVisible: boolean;
  publishedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  createdByName: string;
}

export interface CreateAnnouncementDetails {
  title: string;
  content: string;
  targetAudience: TargetAudience;
  announcementType: AnnouncementType;
  publishedAt: string | null;
  imageFile?: File;
}

export interface UpdateAnnouncementDetails {
  title: string;
  content: string;
  targetAudience: TargetAudience;
  announcementType: AnnouncementType;
  publishedAt: string | null;
  imageFile?: File;
}

// Admin APIs
export const createAnnouncement = (data: CreateAnnouncementDetails) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("targetAudience", data.targetAudience);
  formData.append("announcementType", data.announcementType);
  if (data.publishedAt) {
    formData.append("publishedAt", data.publishedAt);
  }
  if (data.imageFile) {
    formData.append("imageFile", data.imageFile);
  }
  return httpClient.post(api.ADMIN.ANNOUNCEMENTS.CREATE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateAnnouncement = (id: number, data: UpdateAnnouncementDetails) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("targetAudience", data.targetAudience);
  formData.append("announcementType", data.announcementType);
  if (data.publishedAt) {
    formData.append("publishedAt", data.publishedAt);
  }
  if (data.imageFile) {
    formData.append("imageFile", data.imageFile);
  }
  return httpClient.put(api.ADMIN.ANNOUNCEMENTS.UPDATE.replace("{id}", id.toString()), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteAnnouncement = (id: number) => {
  return httpClient.delete(api.ADMIN.ANNOUNCEMENTS.DELETE.replace("{id}", id.toString()));
};

export const pinAnnouncement = (id: number) => {
  return httpClient.patch(api.ADMIN.ANNOUNCEMENTS.PIN.replace("{id}", id.toString()));
};

export const getAdminAnnouncements = (params?: any) => {
  return httpClient.get<ApiResponse<Announcement[]>>(api.ADMIN.ANNOUNCEMENTS.GET_ALL, { params });
};

export const getAdminAnnouncementById = (id: number) => {
  return httpClient.get<ApiResponse<Announcement>>(api.ADMIN.ANNOUNCEMENTS.GET_BY_ID.replace("{id}", id.toString()));
};

// Public/Authenticated APIs
export const getAnnouncements = (params?: any) => {
  return httpClient.get<ApiResponse<Announcement[]>>(api.AGENCY.ANNOUNCEMENTS.GET, { params });
};

export const getAnnouncementById = (id: number) => {
  return httpClient.get<ApiResponse<Announcement>>(api.AGENCY.ANNOUNCEMENTS.GET_BY_ID.replace("{id}", id.toString()));
};

export const getLatestAnnouncements = () => {
  return httpClient.get<ApiResponse<Announcement[]>>(api.AGENCY.ANNOUNCEMENTS.GET_LATEST);
};

// Admin Hooks
export const useCreateAnnouncementMutation = () => {
  return useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      successNotification("Announcement created successfully");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ?? err.response?.data?.error ?? "Failed to create announcement"
      );
    },
  });
};

export const useUpdateAnnouncementMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAnnouncementDetails }) =>
      updateAnnouncement(id, data),
    onSuccess: () => {
      successNotification("Announcement updated successfully");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ?? err.response?.data?.error ?? "Failed to update announcement"
      );
    },
  });
};

export const useDeleteAnnouncementMutation = () => {
  return useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => {
      successNotification("Announcement deleted successfully");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ?? err.response?.data?.error ?? "Failed to delete announcement"
      );
    },
  });
};

export const usePinAnnouncementMutation = () => {
  return useMutation({
    mutationFn: pinAnnouncement,
    onSuccess: () => {
      successNotification("Announcement pinned successfully");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ?? err.response?.data?.error ?? "Failed to pin announcement"
      );
    },
  });
};

export const useAdminAnnouncements = (params?: any) => {
  return useQuery({
    queryKey: ["admin-announcements", params],
    queryFn: () => getAdminAnnouncements(params),
  });
};

export const useAdminAnnouncementById = (id: number) => {
  return useQuery({
    queryKey: ["admin-announcement", id],
    queryFn: () => getAdminAnnouncementById(id),
    enabled: !!id,
  });
};

// Public/Authenticated Hooks
export const useAnnouncements = (params?: any) => {
  return useQuery({
    queryKey: ["announcements", params],
    queryFn: () => getAnnouncements(params),
  });
};

export const useAnnouncementById = (id: number) => {
  return useQuery({
    queryKey: ["announcement", id],
    queryFn: () => getAnnouncementById(id),
    enabled: !!id,
  });
};

export const useLatestAnnouncements = () => {
  return useQuery({
    queryKey: ["latest-announcements"],
    queryFn: () => getLatestAnnouncements(),
  });
};
