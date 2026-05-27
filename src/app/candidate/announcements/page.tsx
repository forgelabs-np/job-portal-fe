"use client";

import { Box, Text, VStack, Badge } from "@chakra-ui/react";
import { useAnnouncements, Announcement, AnnouncementType } from "@/api/announcements";
import { BRAND_COLORS } from "@/constants/color";

const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => {
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z" />
          </svg>
        </Box>
      )}

      <VStack align="start" gap={3}>
        <Badge colorScheme={getTypeColor(announcement.announcementType)} px={3} py={1} borderRadius="full" w="fit-content">
          {announcement.announcementType.replace("_", " ")}
        </Badge>

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

        <Text fontSize="sm" color="gray.600" whiteSpace="pre-wrap">
          {announcement.content}
        </Text>

        <Text fontSize="xs" color="gray.500">
          {new Date(announcement.createdAt).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};

const CandidateAnnouncementsPage = () => {
  const { data: response, isLoading } = useAnnouncements();
  const announcements = response?.data?.data as any;
  const announcementList = announcements?.content;

  if (isLoading) {
    return (
      <Box p={8}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Box mb={8}>
        <Text fontSize="2xl" fontWeight="800" color="gray.800">
          Announcements
        </Text>
        <Text fontSize="sm" color="gray.600" mt={1}>
          Stay updated with the latest news and updates
        </Text>
      </Box>

      {announcementList && announcementList.length > 0 ? (
        <VStack gap={4} align="stretch">
          {announcementList.map((announcement: Announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </VStack>
      ) : (
        <Box
          bg="white"
          borderRadius="xl"
          p={12}
          border="1px dashed"
          borderColor="gray.300"
          textAlign="center"
        >
          <Text fontSize="lg" color="gray.500">
            No announcements available
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default CandidateAnnouncementsPage;
