"use client";

import {
  useGetAgencyApplicationById,
  useWithdrawApplicationMutation
} from "@/api/agency-jobs";
import { Button, Dialog } from "@/shared";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Image,
  Skeleton,
  SkeletonText,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  BsBriefcase,
  BsCalendar,
  BsFileEarmark,
  BsGeoAlt,
  BsInfoCircle,
  BsPerson,
  BsTools,
  BsXCircle,
} from "react-icons/bs";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
      bg="gray.50"
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

const DocStatusBadge = ({ status }: { status: string }) => {
  const colorPalette =
    status === "APPROVED" ? "green" : status === "REJECTED" ? "red" : "orange";
  return <Badge colorPalette={colorPalette}>{status ?? "PENDING"}</Badge>;
};

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

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const documents = application?.documents ?? [];
  const baseImageUrl = process.env.NEXT_PUBLIC_API_IMAGE_ENDPOINT ?? "";

  const slides = documents
    .map((doc) => doc.documentPath)
    .filter(Boolean)
    .map((p) => ({ src: `${baseImageUrl}${p}` }));

  const openAt = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const handleWithdraw = () => {
    if (!applicationId) return;
    withdraw(applicationId, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} size="lg" hasCloseTrigger>
        <Flex
          direction="column"
          h="75vh"
          maxH="75vh"
          overflow="hidden"
          gap={4}
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
          {isLoading ? (
            <Flex justify="center" align="center" py={8} flex={1}>
              <ModalSkeleton />
            </Flex>
          ) : application ? (
            <Tabs.Root defaultValue="details" variant="enclosed" display="flex" flexDirection="column" flex={1} minH={0}>
              <Tabs.List mb={4} flexShrink={0}>
                <Tabs.Trigger value="details">Application Details</Tabs.Trigger>
                <Tabs.Trigger value="documents">
                  Documents{" "}
                  {documents.length > 0 && (
                    <Box
                      as="span"
                      ml={1.5}
                      px={1.5}
                      py={0.5}
                      bg="blue.100"
                      color="blue.700"
                      borderRadius="full"
                      fontSize="10px"
                      fontWeight="700"
                    >
                      {documents.length}
                    </Box>
                  )}
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.ContentGroup flex={1} minH={0}>
                {/* DETAILS TAB */}
                <Tabs.Content
                  value="details"
                  px={0}
                  overflowY="auto"
                  h="100%"
                  css={{
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-track": { background: "transparent" },
                    "&::-webkit-scrollbar-thumb": {
                      background: "var(--chakra-colors-gray-200)",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <VStack align="stretch" gap={5} pb={4}>
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

                    {/* Overall Rejection Reason */}
                    {application.status === "REJECTED" && application.rejectionReason && (
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
                          Application Rejection Reason
                        </Text>
                        <Text fontSize="sm" color="red.700">
                          {application.rejectionReason}
                        </Text>
                      </Box>
                    )}

                    {/* Withdraw Application */}
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
                </Tabs.Content>

                {/* DOCUMENTS TAB */}
                <Tabs.Content
                  value="documents"
                  px={0}
                  overflowY="auto"
                  h="100%"
                  css={{
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-track": { background: "transparent" },
                    "&::-webkit-scrollbar-thumb": {
                      background: "var(--chakra-colors-gray-200)",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <VStack align="stretch" gap={3} pb={4}>
                    {/* Information Note Card */}
                    <Box
                      p={3}
                      bg="blue.50"
                      border="1px solid"
                      borderColor="blue.100"
                      borderRadius="8px"
                    >
                      <HStack align="start" gap={2.5}>
                        <Box color="blue.500" mt={0.5}>
                          <BsInfoCircle size={15} />
                        </Box>
                        <Text fontSize="xs" color="blue.700" lineHeight="1.4">
                          <strong>Note:</strong> You cannot update candidate documents directly from this application view. To update a candidate's documents or replace a rejected file, please go to the <strong>Candidates</strong> management section, edit the candidate's profile, and upload the corrected files.
                        </Text>
                      </HStack>
                    </Box>

                    {/* List of Documents */}
                    {documents.length > 0 ? (
                      documents.map((doc, idx) => {
                        return (
                          <Box
                            key={doc.id}
                            border="1px solid"
                            borderColor="gray.200"
                            borderRadius="md"
                            p={3}
                          >
                            <Flex align="center" justify="space-between" gap={3}>
                              <VStack align="start" gap={1}>
                                <Text fontWeight="semibold" fontSize="sm" color="gray.800">
                                  {doc.documentType}
                                </Text>
                                {doc.documentName && (
                                  <Text fontSize="xs" color="gray.500">
                                    {doc.documentName}
                                  </Text>
                                )}
                                <DocStatusBadge status={doc.status} />

                                {/* Document level Rejection Reason */}
                                {doc.status === "REJECTED" && doc.rejectionReason && (
                                  <Box
                                    mt={1.5}
                                    px={2.5}
                                    py={1.5}
                                    bg="red.50"
                                    border="1px solid"
                                    borderColor="red.150"
                                    borderRadius="md"
                                  >
                                    <Text fontSize="xs" fontWeight="700" color="red.500">
                                      Document Rejection Reason:
                                    </Text>
                                    <Text fontSize="xs" color="red.700">
                                      {doc.rejectionReason}
                                    </Text>
                                  </Box>
                                )}
                              </VStack>

                              {doc.documentPath ? (
                                <Image
                                  src={`${baseImageUrl}${doc.documentPath}`}
                                  height="56px"
                                  width="56px"
                                  objectFit="cover"
                                  borderRadius="md"
                                  cursor="pointer"
                                  _hover={{ opacity: 0.8 }}
                                  transition="all 0.15s"
                                  onClick={() => openAt(idx)}
                                  alt={doc.documentType}
                                // fallback={
                                //   <Flex
                                //     w="56px"
                                //     h="56px"
                                //     bg="gray.100"
                                //     borderRadius="md"
                                //     align="center"
                                //     justify="center"
                                //     color="gray.400"
                                //     cursor="pointer"
                                //     onClick={() => openAt(idx)}
                                //     _hover={{ bg: "gray.200" }}
                                //   >
                                //     <BsFileEarmark size={18} />
                                //   </Flex>
                                // }
                                />
                              ) : (
                                <Text fontSize="xs" color="gray.400">
                                  No file preview
                                </Text>
                              )}
                            </Flex>
                          </Box>
                        );
                      })
                    ) : (
                      <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        gap={3}
                        py={8}
                        color="gray.400"
                      >
                        <BsFileEarmark size={32} />
                        <Text fontSize="xs">No documents uploaded.</Text>
                      </Flex>
                    )}
                  </VStack>
                </Tabs.Content>
              </Tabs.ContentGroup>
            </Tabs.Root>
          ) : (
            <Text color="gray.500" fontSize="sm" textAlign="center" py={8}>
              Application not found.
            </Text>
          )}
        </Flex>
      </Dialog>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        styles={{ root: { zIndex: 9999 } }}
      />
    </>
  );
};
