import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
}

export interface NotificationResponse {
  content: Notification[];
}

export interface SendNotificationRequest {
  title: string;
  body: string;
  type: string;
  users: string[];
}

export const sendNotification = (data: SendNotificationRequest) => {
  return httpClient.post<ApiResponse<{ message: string }>>(api.NOTIFICATION.SEND, {
    data,
  });
};

export const getAllNotifications = () => {
  return httpClient.get<ApiResponse<NotificationResponse>>(api.NOTIFICATION.GET_ALL);
};

export const getUnreadNotifications = () => {
  return httpClient.get<ApiResponse<number>>(
    api.NOTIFICATION.GET_UNREAD
  );
};

export const markNotificationAsRead = (id: string) => {
  return httpClient.patch<ApiResponse<{ message: string }>>(
    api.NOTIFICATION.MARK_READ.replace("{notificationId}", id)
  );
};

export const markAllNotificationsAsRead = () => {
  return httpClient.patch<ApiResponse<{ message: string }>>(
    api.NOTIFICATION.MARK_ALL_READ
  );
};

export const deleteNotification = (id: string) => {
  return httpClient.delete<ApiResponse<{ message: string }>>(
    api.NOTIFICATION.DELETE.replace("{notificationId}", id)
  );
};

export const useSendNotificationMutation = () => {
  return useMutation({
    mutationFn: sendNotification,
  });
};

export const useMarkAsReadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useMarkAllAsReadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useDeleteNotificationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });
};

export const useUnreadNotifications = () => {
  return useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: getUnreadNotifications,
  });
};
