"use client";

import { Box, Flex, Text, VStack, HStack, Badge } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/shared/ui/menu";
import {
  useNotifications,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  type Notification,
} from "@/api/notification";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface NotificationMenuProps {
  children: React.ReactNode;
}

type TabType = "all" | "unread";

export const NotificationMenu = ({ children }: NotificationMenuProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("unread");
  const { data: notificationsData, isLoading } = useNotifications();
  const markAsReadMutation = useMarkAsReadMutation();
  const markAllAsReadMutation = useMarkAllAsReadMutation();
  const deleteNotificationMutation = useDeleteNotificationMutation();

  const notifications = notificationsData?.data?.data?.content || [];

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  const displayedNotifications =
    activeTab === "unread" ? unreadNotifications : readNotifications;

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const handleDelete = (id: string) => {
    deleteNotificationMutation.mutate(id);
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <Box
      p={4}
      borderBottom="1px solid"
      borderColor="gray.100"
      _hover={{ bg: "gray.50" }}
      transition="background 0.2s"
      cursor="pointer"
      onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
    >
      <Flex justify="space-between" align="start" mb={2}>
        <Text fontWeight={600} fontSize="sm" color="gray.800">
          {notification.title}
        </Text>
        {!notification.isRead && (
          <Badge colorPalette="blue" variant="solid" fontSize="xs">
            New
          </Badge>
        )}
      </Flex>
      <Text fontSize="sm" color="gray.600" mb={2}>
        {notification.body}
      </Text>
      <Flex justify="space-between" align="center">
        <Text fontSize="xs" color="gray.400">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </Text>
        <Button
          size="xs"
          variant="ghost"
          color="red.500"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(notification.id);
          }}
        >
          Delete
        </Button>
      </Flex>
    </Box>
  );

  return (
    <MenuRoot>
      <MenuTrigger asChild>{children}</MenuTrigger>
      <MenuContent minWidth="380px" maxHeight="500px" overflow="auto">
        <VStack gap={0} align="stretch" p={4}>
          {/* Header */}
          <Flex justify="space-between" align="center" mb={3}>
            <Text fontWeight={700} fontSize="md" color="gray.900">
              Notifications
            </Text>
            {unreadNotifications.length > 0 && (
              <Button
                size="xs"
                variant="ghost"
                color="blue.500"
                onClick={handleMarkAllAsRead}
                loading={markAllAsReadMutation.isPending}
              >
                Mark all read
              </Button>
            )}
          </Flex>

          {/* Tabs */}
          <Flex gap={2} mb={3}>
            <Button
              size="xs"
              variant={activeTab === "unread" ? "solid" : "ghost"}
              bg={activeTab === "unread" ? "blue.500" : "transparent"}
              color={activeTab === "unread" ? "white" : "gray.700"}
              onClick={() => setActiveTab("unread")}
            >
              Unread ({unreadNotifications.length})
            </Button>
            <Button
              size="xs"
              variant={activeTab === "all" ? "solid" : "ghost"}
              bg={activeTab === "all" ? "blue.500" : "transparent"}
              color={activeTab === "all" ? "white" : "gray.700"}
              onClick={() => setActiveTab("all")}
            >
              All ({notifications.length})
            </Button>
          </Flex>

          {/* Notifications List */}
          {isLoading ? (
            <Box p={8} textAlign="center">
              <Text color="gray.500">Loading notifications...</Text>
            </Box>
          ) : displayedNotifications.length === 0 ? (
            <Box p={8} textAlign="center">
              <Text color="gray.500">
                {activeTab === "unread"
                  ? "No unread notifications"
                  : "No notifications"}
              </Text>
            </Box>
          ) : (
            <VStack gap={0} align="stretch" maxH="350px" overflowY="auto">
              {displayedNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </VStack>
          )}
        </VStack>
      </MenuContent>
    </MenuRoot>
  );
};
