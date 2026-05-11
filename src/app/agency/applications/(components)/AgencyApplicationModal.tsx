"use client";

import {
  useGetAgencyApplicationById,
  useWithdrawApplicationMutation,
} from "@/api/agency-jobs";
import { Button, Dialog } from "@/shared";
import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  BsBriefcase,
  BsCalendar,
  BsGeoAlt,
  BsPerson,
  BsTools,
  BsXCircle,
} from "react-icons/bs";

// ─── Status Badge ─────────────────────────────────────────────────────────────

type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED" | "SHORTLISTED";

const statusConfig: Record<
  ApplicationStatus,
  { color: string; bg: string; label: string }
> = {
  PENDING: { color: "#b45309", bg: "#fef3c7", label: "Pending" },
  SHORTLISTED: { color: "#ffffff", bg: "#40a600", label: "Shortlisted" },
  APPROVED: { color: "#065f46", bg: "#d1fae5", label: "Approved" },
  REJECTED: { color: "#991b1b", bg: "#fee2e2", label: "Rejected" },
};

export const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
  const cfg = statusConfig[status] ?? statusConfig.PENDING;
  return (
    <Box
      as="span"
      px={2.5}
      py={0.5}
      borderRadius="full"
      fontSize="xs"
      fontWeight="600"
      bg={cfg.bg}
      color={cfg.color}
      letterSpacing="0.02em"
    >
      {cfg.label}
    </Box>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// ─── Detail Row ───────────────────────────────────────────────────────────────

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <Flex
    align={{ base: "flex-start", sm: "center" }}
    direction={{ base: "column", sm: "row" }}
    py={3}
    borderBottom="1px solid"
    borderColor="gray.100"
    _last={{ borderBottom: "none" }}
    gap={{ base: 1.5, sm: 3 }}
  >
    <Flex
      align="center"
      gap={3}
      flex={{ base: "unset", sm: "0 0 auto" }}
      w={{ sm: "190px" }}
    >
      <Flex
        w="28px"
        h="28px"
        align="center"
        justify="center"
        borderRadius="7px"
        bg="gray.50"
        color="gray.400"
        flexShrink={0}
        fontSize="13px"
      >
        {icon}
      </Flex>
      <Text fontSize="sm" color="gray.600">
        {label}
      </Text>
    </Flex>
    <Text
      fontSize="sm"
      fontWeight="500"
      color="gray.800"
      flex={1}
      textAlign={{ base: "left", sm: "right" }}
      pl={{ base: "40px", sm: 0 }}
    >
      {value}
    </Text>
  </Flex>
);

// ─── Section Card ─────────────────────────────────────────────────────────────

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box
    border="1px solid"
    borderColor="gray.100"
    borderRadius="12px"
    overflow="hidden"
  >
    <Box
      px={4}
      py={2.5}
      borderBottom="1px solid"
      borderColor="gray.100"
      bg="gray.100"
    >
      <Text
        fontSize="xs"
        fontWeight="700"
        color="gray.600"
        letterSpacing="0.08em"
        textTransform="uppercase"
      >
        {title}
      </Text>
    </Box>
    <Box px={4}>{children}</Box>
  </Box>
);

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

const ModalSkeleton = () => (
  <VStack align="stretch" gap={5} pb={2}>
    {[1, 2].map((i) => (
      <Box
        key={i}
        border="1px solid"
        borderColor="gray.100"
        borderRadius="12px"
        overflow="hidden"
      >
        <Box px={4} py={2.5} bg="gray.100">
          <Skeleton h="12px" w="120px" />
        </Box>
        <Box px={4} py={2}>
          <SkeletonText noOfLines={3} gap={4} mt={3} />
        </Box>
      </Box>
    ))}
  </VStack>
);

// ─── Modal ────────────────────────────────────────────────────────────────────

interface AgencyApplicationModalProps {
  applicationId: number | null;
  open: boolean;
  onClose: () => void;
}

export const AgencyApplicationModal = ({
  applicationId,
  open,
  onClose,
}: AgencyApplicationModalProps) => {
  const { data: application, isLoading } = useGetAgencyApplicationById(
    applicationId ?? 0,
  );

  const { mutate: withdraw, isPending: isWithdrawing } =
    useWithdrawApplicationMutation();

  const handleWithdraw = () => {
    if (!applicationId) return;
    withdraw(applicationId, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} size="lg" hasCloseTrigger>
      <Flex
        direction="column"
        maxH={{ base: "80vh", md: "85vh" }}
        overflow="hidden"
      >
        {/* Header */}
        <Box
          flexShrink={0}
          pb={3}
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          {isLoading ? (
            <HStack gap={2.5}>
              <Skeleton h="20px" w="80px" borderRadius="full" />
              <Skeleton h="14px" w="120px" />
            </HStack>
          ) : application ? (
            <HStack gap={2.5} flexWrap="wrap">
              <StatusBadge status={application.status} />
              <Text fontSize="xs" color="gray.600">
                Applied {formatDate(application.appliedAt)}
              </Text>
            </HStack>
          ) : null}
        </Box>

        {/* Body */}
        <Box
          flex={1}
          overflowY="auto"
          pt={5}
          css={{
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "var(--chakra-colors-gray-200)",
              borderRadius: "4px",
            },
          }}
        >
          {isLoading ? (
            <ModalSkeleton />
          ) : application ? (
            <VStack align="stretch" gap={5} pb={2}>
              <SectionCard title="Job Information">
                <DetailRow
                  icon={<BsBriefcase />}
                  label="Job Title"
                  value={application.jobTitle}
                />
                <DetailRow
                  icon={<BsGeoAlt />}
                  label="Location"
                  value={`${application.jobCity}, ${application.jobCountry}`}
                />
                <DetailRow
                  icon={<BsCalendar />}
                  label="Applied At"
                  value={formatDate(application.appliedAt)}
                />
              </SectionCard>

              <SectionCard title="Candidate Information">
                <DetailRow
                  icon={<BsPerson />}
                  label="Candidate Name"
                  value={application.candidateName}
                />
                <DetailRow
                  icon={<BsTools />}
                  label="Trade"
                  value={application.candidateTrade}
                />
                {application.notes && (
                  <DetailRow
                    icon={<BsBriefcase />}
                    label="Notes"
                    value={application.notes}
                  />
                )}
              </SectionCard>

              {application.status === "REJECTED" &&
                application.rejectionReason && (
                  <Box
                    px={4}
                    py={3}
                    bg="red.50"
                    border="1px solid"
                    borderColor="red.200"
                    borderRadius="10px"
                  >
                    <Text
                      fontSize="xs"
                      fontWeight="700"
                      color="red.500"
                      mb={1}
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                    >
                      Rejection Reason
                    </Text>
                    <Text fontSize="sm" color="red.700">
                      {application.rejectionReason}
                    </Text>
                  </Box>
                )}

              {application.status === "PENDING" && (
                <Flex justify="flex-end" pt={1}>
                  <Button
                    size="sm"
                    colorPalette="red"
                    variant="outline"
                    loading={isWithdrawing}
                    loadingText="Withdrawing…"
                    onClick={handleWithdraw}
                    borderRadius="8px"
                    fontWeight="600"
                    fontSize="sm"
                    px={5}
                    _hover={{ bg: "red.50" }}
                  >
                    <BsXCircle />
                    Withdraw Application
                  </Button>
                </Flex>
              )}
            </VStack>
          ) : (
            <Text color="gray.500" fontSize="sm" textAlign="center" py={8}>
              Application not found.
            </Text>
          )}
        </Box>
      </Flex>
    </Dialog>
  );
};
