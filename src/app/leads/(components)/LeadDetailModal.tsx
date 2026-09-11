"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Text,
  Badge,
  Skeleton,
  SkeletonText,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "@chakra-ui/react";
import {
  User,
  Phone as PhoneIcon,
  Mail,
  MapPin,
  FileText,
  Clock,
  CircleDot,
  Pencil,
} from "lucide-react";
import {
  useLead,
  useMarkLeadAsProcessedMutation,
  type Lead,
} from "@/api/leads";
import { BRAND_COLORS, WEBSITE_THEME_COLOR } from "@/constants/color";

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getSubjectLabel = (subject: string) => {
  return subject
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

interface FieldItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function FieldItem({ label, value, icon }: FieldItemProps) {
  return (
    <Box>
      <HStack gap={1.5} mb={1}>
        <Box color="gray.400" display="flex" alignItems="center">{icon}</Box>
        <Text fontSize="xs" color="gray.400" fontWeight={500}>
          {label}
        </Text>
      </HStack>
      <Text fontSize="sm" color="gray.800" fontWeight={500} wordBreak="break-word">
        {value || "—"}
      </Text>
    </Box>
  );
}

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (lead: Lead) => void;
}

export default function LeadDetailModal({
  lead,
  isOpen,
  onClose,
  onEdit,
}: LeadDetailModalProps) {
  const { data: freshLead, isLoading } = useLead(lead?.id ?? 0, isOpen && !!lead?.id);
  const markProcessedMutation = useMarkLeadAsProcessedMutation();
  const hasMarkedRead = useRef(false);

  const displayLead = freshLead || lead;

  // Auto-mark as read when opening an unread lead
  useEffect(() => {
    if (displayLead && !displayLead.isRead && isOpen && !hasMarkedRead.current) {
      hasMarkedRead.current = true;
      // Dynamically import to avoid circular deps
      import("@/api/leads").then(({ markLeadAsRead }) => {
        markLeadAsRead(displayLead.id);
      });
    }
    if (!isOpen) {
      hasMarkedRead.current = false;
    }
  }, [displayLead, isOpen]);

  if (!lead) return null;

  return (
    <DialogRoot open={isOpen} onOpenChange={(details) => !details.open && onClose()} size="lg">
      <DialogBackdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <DialogPositioner>
        <DialogContent
          maxH="90vh"
          display="flex"
          flexDirection="column"
          borderRadius="2xl"
          overflow="hidden"
          mx={4}
          maxW={{ base: "95vw", md: "700px" }}
        >
          {/* Fixed Header */}
          <DialogHeader
            px={6}
            pt={5}
            pb={4}
            borderBottom="1px solid"
            borderColor="gray.100"
            flexShrink={0}
          >
            <Flex justify="space-between" align="center" pr={8}>
              <Text fontWeight="700" fontSize="lg" color="gray.900">
                Lead Details
              </Text>
            </Flex>
            <DialogCloseTrigger />
          </DialogHeader>

          {/* Scrollable Body */}
          <DialogBody
            px={6}
            py={5}
            flex={1}
            overflowY="auto"
          >
            {isLoading ? (
              <Box>
                <HStack gap={3} mb={5}>
                  <Skeleton boxSize="48px" borderRadius="lg" />
                  <Box>
                    <Skeleton height="16px" width="140px" borderRadius="md" mb={2} />
                    <HStack gap={2}>
                      <Skeleton height="18px" width="52px" borderRadius="full" />
                      <Skeleton height="18px" width="62px" borderRadius="full" />
                    </HStack>
                  </Box>
                </HStack>
                <SkeletonText noOfLines={6} gap={3} />
              </Box>
            ) : displayLead ? (
              <>
                {/* Avatar + Name + Badges */}
                <HStack gap={3} mb={5}>
                  <Flex
                    w="48px"
                    h="48px"
                    borderRadius="lg"
                    bg={BRAND_COLORS[50]}
                    border="1px solid"
                    borderColor={BRAND_COLORS[200]}
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <User size={20} color={WEBSITE_THEME_COLOR} />
                  </Flex>
                  <Box>
                    <Text fontWeight="700" fontSize="md" color="gray.900" mb={1}>
                      {displayLead.fullName}
                    </Text>
                    <HStack gap={2}>
                      <Badge
                        variant="subtle"
                        colorPalette={displayLead.isRead ? "green" : "orange"}
                        borderRadius="full"
                        fontSize="xs"
                        px={2.5}
                      >
                        {displayLead.isRead ? "Read" : "Unread"}
                      </Badge>
                      <Badge
                        variant="subtle"
                        colorPalette={displayLead.isProcessed ? "green" : "gray"}
                        borderRadius="full"
                        fontSize="xs"
                        px={2.5}
                      >
                        {displayLead.isProcessed ? "Processed" : "Pending"}
                      </Badge>
                    </HStack>
                  </Box>
                </HStack>

                {/* Two-column details grid */}
                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4} mb={5}>
                  <FieldItem
                    label="Full Name"
                    value={displayLead.fullName}
                    icon={<User size={14} />}
                  />
                  <FieldItem
                    label="Email"
                    value={displayLead.email}
                    icon={<Mail size={14} />}
                  />
                  <FieldItem
                    label="Phone Number"
                    value={displayLead.phoneNumber}
                    icon={<PhoneIcon size={14} />}
                  />
                  <FieldItem
                    label="Location"
                    value={displayLead.location}
                    icon={<MapPin size={14} />}
                  />
                  <FieldItem
                    label="Subject"
                    value={getSubjectLabel(displayLead.subject)}
                    icon={<FileText size={14} />}
                  />
                  <FieldItem
                    label="Created At"
                    value={formatDate(displayLead.createdAt)}
                    icon={<Clock size={14} />}
                  />
                  <FieldItem
                    label="Updated At"
                    value={formatDate(displayLead.updatedAt)}
                    icon={<Clock size={14} />}
                  />
                </Grid>

                {/* Description - full width */}
                <Box>
                  <Text
                    fontSize="xs"
                    color="gray.400"
                    fontWeight={600}
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb={2}
                  >
                    Description
                  </Text>
                  <Box
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.100"
                    borderRadius="lg"
                    p={4}
                  >
                    <Text
                      fontSize="sm"
                      color="gray.700"
                      lineHeight={1.7}
                      whiteSpace="pre-wrap"
                      wordBreak="break-word"
                    >
                      {displayLead.description || "No description provided."}
                    </Text>
                  </Box>
                </Box>
              </>
            ) : (
              <Box textAlign="center" py={10}>
                <Text color="gray.400">Lead not found.</Text>
              </Box>
            )}
          </DialogBody>

          {/* Fixed Footer */}
          {displayLead && !isLoading && (
            <DialogFooter
              px={6}
              py={4}
              borderTop="1px solid"
              borderColor="gray.100"
              flexShrink={0}
              gap={3}
              justifyContent="flex-end"
            >
              {!displayLead.isProcessed && (
                <Button
                  variant="outline"
                  size="sm"
                  color="#3B82F6"
                  borderColor="#BBD5FE"
                  _hover={{ bg: "blue.50", borderColor: "#3B82F6" }}
                  onClick={() => markProcessedMutation.mutate(displayLead.id)}
                  loading={markProcessedMutation.isPending}
                  loadingText="Processing..."
                  gap={1.5}
                  borderRadius="lg"
                >
                  <CircleDot size={14} />
                  Mark as Processed
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                color={WEBSITE_THEME_COLOR}
                borderColor={BRAND_COLORS[200]}
                _hover={{ bg: "red.50", borderColor: WEBSITE_THEME_COLOR }}
                onClick={() => {
                  onClose();
                  onEdit(displayLead);
                }}
                gap={1.5}
                borderRadius="lg"
              >
                <Pencil size={14} />
                Edit
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
