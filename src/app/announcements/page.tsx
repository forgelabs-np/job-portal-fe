"use client";

import { Box, Button, Flex, HStack, Text, VStack, Badge, IconButton } from "@chakra-ui/react";
import { useAdminAnnouncements, useDeleteAnnouncementMutation, usePinAnnouncementMutation, Announcement, AnnouncementType, TargetAudience } from "@/api/announcements";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Pin, PinOff, ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND_COLORS } from "@/constants/color";
import { useState } from "react";

const AnnouncementCard = ({ announcement, onEdit, onDelete, onPin }: {
  announcement: Announcement;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onPin: (id: number) => void;
}) => {
  const getTypeColor = (type: AnnouncementType) => {
    switch (type) {
      case AnnouncementType.GENERAL:
        return "blue";
      case AnnouncementType.JOB_ALERT:
        return "green";
      case AnnouncementType.SYSTEM_UPDATE:
        return "purple";
      case AnnouncementType.POLICY_CHANGE:
        return "orange";
      case AnnouncementType.EVENT:
        return "pink";
      default:
        return "gray";
    }
  };

  const getAudienceLabel = (audience: TargetAudience) => {
    switch (audience) {
      case TargetAudience.ALL:
        return "All Users";
      case TargetAudience.AGENCY_ONLY:
        return "Agency Only";
      case TargetAudience.CANDIDATE_ONLY:
        return "Candidate Only";
      default:
        return audience;
    }
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={6}
      border="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
      position="relative"
    >
      {announcement.isPinned && (
        <Box
          position="absolute"
          top={4}
          right={4}
          color={BRAND_COLORS[600]}
          zIndex={1}
        >
          <Pin size={20} />
        </Box>
      )}

      <VStack align="start" gap={3}>
        <HStack justify="space-between" w="full">
          <Badge colorScheme={getTypeColor(announcement.announcementType)} px={3} py={1} borderRadius="full">
            {announcement.announcementType.replace("_", " ")}
          </Badge>
          <Badge colorScheme="gray" px={3} py={1} borderRadius="full">
            {getAudienceLabel(announcement.targetAudience)}
          </Badge>
        </HStack>

        {announcement.imageUrl && (
          <Box
            w="full"
            h="200px"
            borderRadius="lg"
            overflow="hidden"
            bg="gray.100"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_API_IMAGE_ENDPOINT}${announcement.imageUrl}`}
              alt={announcement.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        )}

        <Text fontSize="lg" fontWeight="700" color="gray.800">
          {announcement.title}
        </Text>

        <Text fontSize="sm" color="gray.600" >
          {announcement.content}
        </Text>

        <HStack justify="space-between" w="full" pt={2}>
          <Text fontSize="xs" color="gray.500">
            {new Date(announcement.createdAt).toLocaleDateString()}
            {announcement.publishedAt && ` • Published: ${new Date(announcement.publishedAt).toLocaleDateString()}`}
          </Text>

          <HStack gap={2}>
            <IconButton
              size="sm"
              variant="ghost"
              color={BRAND_COLORS[600]}
              onClick={() => onPin(announcement.id)}
              aria-label={announcement.isPinned ? "Unpin" : "Pin"}
            >
              {announcement.isPinned ? <PinOff size={16} /> : <Pin size={16} />}
            </IconButton>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={() => onEdit(announcement.id)}
              aria-label="Edit"
            >
              <Pencil size={16} />
            </IconButton>
            <IconButton
              size="sm"
              variant="ghost"
              color="red.500"
              onClick={() => onDelete(announcement.id)}
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </IconButton>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

const AdminAnnouncementsPage = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { data: response, isLoading } = useAdminAnnouncements({ page, size: pageSize });
  const deleteMutation = useDeleteAnnouncementMutation();
  const pinMutation = usePinAnnouncementMutation();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const paginationData = response?.data?.data as any;
  const announcements = paginationData?.content
  const totalPages = paginationData?.totalPages || 1;
  const totalElements = paginationData?.totalElements || 0;

  const handleEdit = (id: number) => {
    router.push(`/announcements/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      deleteMutation.mutate(id);
    }
  };

  const handlePin = (id: number) => {
    pinMutation.mutate(id);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <Box p={8}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Text fontSize="2xl" fontWeight="800" color="gray.800">
            Announcements
          </Text>
          <Text fontSize="sm" color="gray.600" mt={1}>
            Manage announcements for all users
          </Text>
        </Box>
        <Button
          bg={BRAND_COLORS[600]}
          color="white"
          onClick={() => router.push("/announcements/create")}
          px={3}
          borderRadius="xl"
          _hover={{ bg: BRAND_COLORS[700] }}
        >
          <Plus/>
          Create Announcement
        </Button>
      </Flex>

      {announcements && announcements.length > 0 ? (
        <>
          <VStack gap={4} align="stretch">
            {announcements.map((announcement: Announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPin={handlePin}
              />
            ))}
          </VStack>

         {totalPages > 1 && (
  <Flex justify="space-between" align="center" mt={6}>
    <Text fontSize="sm" color="gray.600">
      Showing {page * pageSize + 1} to{" "}
      {Math.min((page + 1) * pageSize, totalElements)} of{" "}
      {totalElements} announcements
    </Text>

    <HStack gap={2}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 0}
        borderRadius="lg"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>

      <Text fontSize="sm" fontWeight="600" color="gray.700">
        Page {page + 1} of {totalPages}
      </Text>

      <Button
        size="sm"
        variant="outline"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages - 1}
        borderRadius="lg"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </HStack>
  </Flex>
)}
        </>
      ) : (
        <Box
          bg="white"
          borderRadius="xl"
          p={12}
          border="1px dashed"
          borderColor="gray.300"
          textAlign="center"
        >
          <Text fontSize="lg" color="gray.500" mb={4}>
            No announcements yet
          </Text>
          <Button
            bg={BRAND_COLORS[600]}
            color="white"
            onClick={() => router.push("/announcements/create")}
            px={6}
            borderRadius="xl"
            _hover={{ bg: BRAND_COLORS[700] }}
          >
            <Plus/>
            Create First Announcement
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AdminAnnouncementsPage;
