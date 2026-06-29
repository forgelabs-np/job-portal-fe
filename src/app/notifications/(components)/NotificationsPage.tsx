"use client";

import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import {
  useNotifications,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  type Notification,
} from "@/api/notification";
import { formatDistanceToNow } from "date-fns";
import { BRAND_COLORS, WEBSITE_THEME_COLOR } from "@/constants/color";
import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Mail,
  CheckCircle,
  Briefcase,
  User,
  FileText,
  ChevronRight,
  Filter,
  Ellipsis,
  CheckCheck,
  Trash2,
} from "lucide-react";


const getNotificationIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case "application":
      return Briefcase;
    case "candidate":
      return User;
    case "document":
      return FileText;
    default:
      return Briefcase;
  }
};

interface StatCardProps {
  label: string;
  count: number;
  iconBg: string;
  iconColor: string;
  countColor: string;
  linkLabel: string;
  borderColor: string;
  IconComponent: React.ElementType;
}

const StatCard = ({
  label,
  count,
  iconBg,
  iconColor,
  countColor,
  linkLabel,
  borderColor,
  IconComponent,
}: StatCardProps) => (
  <Box
    flex={1}
    bg="white"
    border="1px solid"
    borderColor={borderColor}
    borderRadius="xl"
    p={5}
    minW={0}
  >
    <Flex align="center" gap={4} mb={4}>
      <Flex
        w="44px"
        h="44px"
        borderRadius="lg"
        bg={iconBg}
        align="center"
        justify="center"
        flexShrink={0}
      >
        <IconComponent size={20} color={iconColor} />
      </Flex>
      <Box>
        <Text fontSize="sm" color="gray.500" fontWeight={500} mb="1px">
          {label}
        </Text>
        <Text fontSize="2xl" fontWeight={700} color={countColor} lineHeight={1}>
          {count}
        </Text>
      </Box>
    </Flex>

  </Box>
);

// ─── NotificationItem ────────────────────────────────────────────────────────

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const ItemIcon = getNotificationIcon(notification.type);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <Box
      position="relative"
      bg={notification.isRead ? "white" : "#FAFAFA"}
      borderBottom="1px solid"
      borderColor="gray.100"
      px={5}
      py={4}
      _hover={{ bg: "gray.50" }}
      transition="background 0.15s"
    >
      <Flex align="center" gap={3}>
        {/* Unread dot */}
        <Box
          w="8px"
          h="8px"
          borderRadius="full"
          bg={notification.isRead ? "transparent" : WEBSITE_THEME_COLOR}
          flexShrink={0}
        />

        {/* Icon box */}
        <Flex
          w="40px"
          h="40px"
          borderRadius="lg"
          bg={BRAND_COLORS[50]}
          border="1px solid"
          borderColor={BRAND_COLORS[200]}
          align="center"
          justify="center"
          flexShrink={0}
        >
          <ItemIcon size={16} color={WEBSITE_THEME_COLOR} />
        </Flex>

        {/* Content */}
        <Box flex={1} minW={0}>
          <Text
            fontWeight={600}
            fontSize="sm"
            color="gray.800"
            mb="2px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {notification.title}
          </Text>
          <Text
            fontSize="xs"
            color="gray.500"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {notification.message}
          </Text>
          <Text fontSize="xs" color="gray.400" mt={1}>
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </Box>

        {/* Right side */}
        <Flex align="center" gap={2} flexShrink={0}>
          {!notification.isRead && (
            <Badge
              px={2}
              py="2px"
              borderRadius="md"
              fontSize="xs"
              fontWeight={600}
              color={WEBSITE_THEME_COLOR}
              bg={BRAND_COLORS[50]}
              border="1px solid"
              borderColor={BRAND_COLORS[200]}
            >
              New
            </Badge>
          )}

          {/* 3-dot menu */}
          <Box position="relative" ref={menuRef}>
            <Flex
              w="28px"
              h="28px"
              borderRadius="md"
              align="center"
              justify="center"
              cursor="pointer"
              color="gray.400"
              _hover={{ bg: "gray.100", color: "gray.600" }}
              transition="all 0.15s"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Ellipsis size={16} />
            </Flex>

            {menuOpen && (
              <Box
                position="absolute"
                right={0}
                top="34px"
                zIndex={10}
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"
                boxShadow="lg"
                minW="160px"
                overflow="hidden"
              >
                {!notification.isRead && (
                  <Flex
                    align="center"
                    gap={2}
                    px={3}
                    py="10px"
                    fontSize="sm"
                    color="gray.700"
                    cursor="pointer"
                    _hover={{ bg: "gray.50" }}
                    onClick={() => {
                      onMarkAsRead(notification.id);
                      setMenuOpen(false);
                    }}
                  >
                    <CheckCheck size={14} color="#22C55E" />
                    Mark as read
                  </Flex>
                )}
                <Flex
                  align="center"
                  gap={2}
                  px={3}
                  py="10px"
                  fontSize="sm"
                  color="red.500"
                  cursor="pointer"
                  _hover={{ bg: "red.50" }}
                  onClick={() => {
                    onDelete(notification.id);
                    setMenuOpen(false);
                  }}
                >
                  <Trash2 size={14} />
                  Delete
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};


export const NotificationsPage = () => {
  const { data: notificationsData, isLoading } = useNotifications();
  const markAsReadMutation = useMarkAsReadMutation();
  const markAllAsReadMutation = useMarkAllAsReadMutation();
  const deleteNotificationMutation = useDeleteNotificationMutation();
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const notifications = notificationsData?.data?.data?.content || [];
  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  const filteredNotifications =
    filter === "unread"
      ? unreadNotifications
      : filter === "read"
        ? readNotifications
        : notifications;

  const filterCollection = createListCollection({
    items: [
      { label: "All", value: "all" },
      { label: "Unread", value: "unread" },
      { label: "Read", value: "read" },
    ],
  });

  const handleMarkAsRead = (id: string) => markAsReadMutation.mutate(id);
  const handleMarkAllAsRead = () => markAllAsReadMutation.mutate();
  const handleDelete = (id: string) => deleteNotificationMutation.mutate(id);

  return (
    <VStack gap={6} align="stretch">
      {/* ── Header ── */}
      <Flex justify="space-between" align="flex-start" flexWrap="wrap" gap={3}>
        <Box>
          <Text fontWeight={700} fontSize="2xl" color="gray.900" mb={1}>
            Notifications
          </Text>
          <Text fontSize="sm" color="gray.500">
            Stay updated with the latest activities and alerts.
          </Text>
        </Box>

        <Button
          size="sm"
          variant="outline"
          borderColor={WEBSITE_THEME_COLOR}
          color={WEBSITE_THEME_COLOR}
          _hover={{ bg: BRAND_COLORS[50] }}
          borderRadius="lg"
          fontWeight={600}
          onClick={handleMarkAllAsRead}
          loading={markAllAsReadMutation.isPending}
          disabled={unreadNotifications.length === 0}
        >
          <CheckCheck size={15} />
          Mark all as read
        </Button>
      </Flex>

      {/* ── Stat Cards ── */}
      <Flex gap={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
        <StatCard
          label="Unread"
          count={unreadNotifications.length}
          iconBg="#FEF2F2"
          iconColor={WEBSITE_THEME_COLOR}
          countColor={WEBSITE_THEME_COLOR}
          linkLabel="View unread notifications"
          borderColor="#FECACA"
          IconComponent={Bell}
        />
        <StatCard
          label="Total"
          count={notifications.length}
          iconBg="#EFF6FF"
          iconColor="#3B82F6"
          countColor="#3B82F6"
          linkLabel="All notifications"
          borderColor="#BFDBFE"
          IconComponent={Mail}
        />
        <StatCard
          label="Read"
          count={readNotifications.length}
          iconBg="#F0FDF4"
          iconColor="#22C55E"
          countColor="#22C55E"
          linkLabel="View read notifications"
          borderColor="#BBF7D0"
          IconComponent={CheckCircle}
        />
      </Flex>


      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontWeight={700} fontSize="lg" color="gray.800">
            Recent Notifications
          </Text>

          <HStack gap={3}>
            <HStack gap={2}>
              <Text fontSize="sm" color="gray.500" fontWeight={500}>
                Show:
              </Text>
              <Select.Root
                collection={filterCollection}
                value={[filter]}
                onValueChange={(e) =>
                  setFilter(e.value[0] as "all" | "unread" | "read")
                }
                size="sm"
                width="120px"
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger
                    borderRadius="lg"
                    borderColor="gray.200"
                    _hover={{ borderColor: "gray.300" }}
                    fontSize="sm"
                    fontWeight={500}
                    color="gray.700"
                  >
                    <Select.ValueText />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content borderRadius="lg" boxShadow="lg">
                    {filterCollection.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        {item.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </HStack>
          </HStack>
        </Flex>


        {isLoading ? (
          <Box
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.200"
            p={10}
            textAlign="center"
          >
            <Text color="gray.400" fontSize="sm">
              Loading notifications…
            </Text>
          </Box>
        ) : (
          <Box
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.200"
            overflow="hidden"
          >
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))}

            {/* End of list */}
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={10}
              gap={3}
            >
              <Box position="relative">
                <Flex
                  w="56px"
                  h="56px"
                  borderRadius="full"
                  bg="gray.100"
                  align="center"
                  justify="center"
                >
                  <Bell size={24} color="#9CA3AF" />
                </Flex>
              </Box>
              <Box textAlign="center">
                <Text fontWeight={600} fontSize="sm" color="gray.700" mb="2px">
                  You've reached the end
                </Text>
                <Text fontSize="xs" color="gray.400">
                  No more notifications to show
                </Text>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
    </VStack>
  );
};
