"use client";

import { Box, Flex, Text, VStack, Badge } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
} from "@/shared/ui/menu";
import {
  useNotifications,
  useMarkAsReadMutation,
  type Notification,
} from "@/api/notification";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface NotificationMenuProps {
  children: React.ReactNode;
}

type TabType = "all" | "unread";

export const NotificationMenu = ({ children }: NotificationMenuProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("unread");
  const [open, setOpen] = useState(false);
  const { data: notificationsData, isLoading } = useNotifications();
  const markAsReadMutation = useMarkAsReadMutation();
  const router = useRouter();

  const notifications = notificationsData?.data?.data?.content || [];

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  // const readNotifications = notifications.filter((n) => n.isRead);

  const displayedNotifications =
    activeTab === "unread" ? unreadNotifications : notifications;

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const handleViewAll = () => {
    setOpen(false);
    router.push(ROUTES.NOTIFICATIONS);
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
          <Badge colorScheme="blue" variant="solid" fontSize="xs">
            New
          </Badge>
        )}
      </Flex>
      <Text fontSize="sm" color="gray.600" mb={2}>
        {notification.body}
      </Text>
      <Text fontSize="xs" color="gray.400">
        {formatDistanceToNow(new Date(notification.createdAt), {
          addSuffix: true,
        })}
      </Text>
    </Box>
  );

  return (
    <MenuRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <MenuTrigger asChild>{children}</MenuTrigger>
      <MenuContent minWidth="380px" maxHeight="500px" overflow="auto">
        <VStack gap={0} align="stretch" p={4}>
          {/* Header */}
          <Flex justify="space-between" align="center" mb={3}>
            <Text fontWeight={700} fontSize="md" color="gray.900">
              Notifications
            </Text>
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
            <VStack gap={0} align="stretch" maxH="300px" overflowY="auto">
              {displayedNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </VStack>
          )}

          {/* View All Button */}
          <Box pt={3} borderTop="1px solid" borderColor="gray.100">
            <Button
              size="sm"
              variant="ghost"
              color="blue.500"
              width="full"
              onClick={handleViewAll}
            >
              View all notifications
            </Button>
          </Box>
        </VStack>
      </MenuContent>
    </MenuRoot>
  );
};
