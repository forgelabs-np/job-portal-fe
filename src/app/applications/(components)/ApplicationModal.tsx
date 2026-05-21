"use client";

import {
  ApplicationDocument,
  ApplicationType,
  useGetApplicationByIdQuery,
  useGetSelfApplicationByIdQuery,
} from "@/api/admin-applcations";
import { useShortlistedApplicationByIdQuery } from "@/api/interview";
import { Dialog } from "@/shared";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Image,
  Spinner,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  BsBriefcase,
  BsBuilding,
  BsCalendar,
  BsEnvelope,
  BsFileEarmark,
  BsGeoAlt,
  BsPassport,
  BsPerson,
  BsTools,
} from "react-icons/bs";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export interface JobApplication {
  id: number;
  jobDemandId: number;
  jobTitle: string;
  jobCountry: string;
  jobCity: string;
  agencyId: number;
  agencyName: string;
  agencyEmail: string;
  candidateId: number;
  candidateName: string;
  candidateTrade: string;
  candidatePassportNumber: string;
  notes: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SHORTLISTED";
  appliedAt: string;
  rejectionReason: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<
  "PENDING" | "APPROVED" | "REJECTED" | "SHORTLISTED",
  { color: string; bg: string; label: string }
> = {
  PENDING: { color: "#b45309", bg: "#fef3c7", label: "Pending" },
  SHORTLISTED: { color: "#ffffff", bg: "#40a600", label: "Shortlisted" },
  APPROVED: { color: "#065f46", bg: "#d1fae5", label: "Approved" },
  REJECTED: { color: "#991b1b", bg: "#fee2e2", label: "Rejected" },
};

export const StatusBadge = ({
  status,
}: {
  status: "PENDING" | "APPROVED" | "REJECTED" | "SHORTLISTED";
}) => {
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

// ─── Document status badge ────────────────────────────────────────────────────
const DocStatusBadge = ({ status }: { status: string }) => {
  const colorPalette =
    status === "APPROVED" ? "green" : status === "REJECTED" ? "red" : "orange";
  return <Badge colorPalette={colorPalette}>{status ?? "PENDING"}</Badge>;
};

const getDocumentUrl = (doc: ApplicationDocument) =>
  doc.documentPath ?? doc.fileUrl ?? doc.url ?? "";

// ─── Statuses row ─────────────────────────────────────────────────────────────
const statusLabelMap: Record<string, string> = {
  pccStatus: "PCC Status",
  slcStatus: "SLC Status",
  workPermitStatus: "Work Permit",
  visaStatus: "Visa Status",
};

// ─── Details Content ──────────────────────────────────────────────────────────
export const DetailsContent = ({ application }: { application: ApplicationType }) => (
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

    <SectionCard title="Agency Information">
      <DetailRow
        icon={<BsBuilding />}
        label="Agency Name"
        value={application.agencyName}
      />
      <DetailRow
        icon={<BsEnvelope />}
        label="Agency Email"
        value={application.agencyEmail}
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
      <DetailRow
        icon={<BsPassport />}
        label="Passport Number"
        value={application.candidatePassportNumber}
      />
      {application.notes && (
        <DetailRow
          icon={<BsBriefcase />}
          label="Notes"
          value={application.notes}
        />
      )}
    </SectionCard>

    {/* Candidate Statuses */}
    {application.candidateStatuses &&
      Object.keys(application.candidateStatuses).length > 0 && (
        <SectionCard title="Document Statuses">
          {Object.entries(application.candidateStatuses).map(([key, val]) => (
            <DetailRow
              key={key}
              icon={<BsFileEarmark />}
              label={statusLabelMap[key] ?? key}
              value={
                val ? (
                  <DocStatusBadge status={val} />
                ) : (
                  <Text fontSize="xs" color="gray.400">
                    N/A
                  </Text>
                )
              }
            />
          ))}
        </SectionCard>
      )}

    {/* Rejection reason */}
    {application.rejectionReason && (
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
  </VStack>
);

// ─── Documents Tab Content ────────────────────────────────────────────────────
const DocumentsContent = ({
  documents,
}: {
  documents: ApplicationDocument[];
}) => {
  const baseImageUrl = process.env.NEXT_PUBLIC_API_IMAGE_ENDPOINT ?? "";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = documents
    .map((doc) => getDocumentUrl(doc))
    .filter(Boolean)
    .map((p) => ({ src: `${baseImageUrl}${p}` }));

  const openAt = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  if (!documents.length) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap={3}
        py={12}
        color="gray.400"
      >
        <BsFileEarmark size={36} />
        <Text fontSize="sm">No documents uploaded for this application.</Text>
      </Flex>
    );
  }

  return (
    <>
      <VStack align="stretch" gap={3} pb={2}>
        {documents.map((doc, idx) => {
          const docUrl = getDocumentUrl(doc);
          return (
            <Box
              key={doc.id}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              p={3}
            >
              <Flex
                align={{ base: "start", md: "center" }}
                justify="space-between"
                direction={{ base: "column", md: "row" }}
                gap={3}
              >
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
                  {doc.rejectionReason && (
                    <Text fontSize="xs" color="red.500">
                      Reason: {doc.rejectionReason}
                    </Text>
                  )}
                  {doc.uploadedAt && (
                    <Text fontSize="xs" color="gray.400">
                      Uploaded: {formatDate(doc.uploadedAt)}
                    </Text>
                  )}
                </VStack>

                {docUrl ? (
                  <Image
                    src={`${baseImageUrl}${docUrl}`}
                    height="60px"
                    width="60px"
                    objectFit="cover"
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ opacity: 0.8, transform: "scale(1.05)" }}
                    transition="all 0.15s"
                    onClick={() => openAt(idx)}
                    alt={doc.documentType}

                  />
                ) : (
                  <Text fontSize="sm" color="gray.400">
                    File unavailable
                  </Text>
                )}
              </Flex>
            </Box>
          );
        })}
      </VStack>

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

// ─── Inner content shared between agency and self ─────────────────────────────
const ModalContent = ({
  application,
  isLoading,
}: {
  application: ApplicationType | undefined;
  isLoading: boolean;
}) => {
  const documents = application?.documents ?? [];
  const hasDocuments = documents.length > 0;

  if (isLoading) {
    return (
      <Flex justify="center" align="center" py={16}>
        <Spinner size="lg" color="blue.500" />
      </Flex>
    );
  }

  if (!application) return null;

  return (
    <Flex direction="column" maxH={{ base: "80vh", md: "85vh" }} overflow="hidden">
      {/* Header strip */}
      <Box
        flexShrink={0}
        pb={3}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <HStack gap={2.5} flexWrap="wrap">
          <StatusBadge status={application.status} />
          <Text fontSize="xs" color="gray.600">
            Applied {formatDate(application.appliedAt)}
          </Text>
        </HStack>
      </Box>

      {/* Tabs */}
      <Box
        flex={1}
        overflow="hidden"
        display="flex"
        flexDirection="column"
        pt={4}
      >
        <Tabs.Root defaultValue="details" variant="enclosed" display="flex" flexDirection="column" flex={1} minH={0}>
          <Tabs.List mb={3}>
            <Tabs.Trigger value="details">Application Details</Tabs.Trigger>
            <Tabs.Trigger value="documents">
              Documents{" "}
              {hasDocuments && (
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
            <Tabs.Content
              value="details"
              px={0}
              overflowY="auto"
              maxH="65vh"
              css={{
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": {
                  background: "var(--chakra-colors-gray-200)",
                  borderRadius: "4px",
                },
              }}
            >
              <DetailsContent application={application} />
            </Tabs.Content>

            <Tabs.Content
              value="documents"
              px={0}
              overflowY="auto"
              maxH="65vh"
              css={{
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": {
                  background: "var(--chakra-colors-gray-200)",
                  borderRadius: "4px",
                },
              }}
            >
              <DocumentsContent documents={documents} />
            </Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs.Root>
      </Box>
    </Flex>
  );
};

// ─── Agency inner wrapper ─────────────────────────────────────────────────────
const AgencyApplicationModalInner = ({ id }: { id: number }) => {
  const { data, isLoading } = useGetApplicationByIdQuery(id);
    // const { data, isLoading } = useShortlistedApplicationByIdQuery(id);


  return <ModalContent application={data} isLoading={isLoading} />;
};

const SelfApplicationModalInner = ({ id }: { id: number }) => {
  const { data, isLoading } = useGetSelfApplicationByIdQuery(id);
  return <ModalContent application={data} isLoading={isLoading} />;
};

// ─── Public export ────────────────────────────────────────────────────────────
interface ApplicationModalProps {
  applicationId: number | null;
  type: "agency" | "self";
  open: boolean;
  onClose: () => void;
}

export const ApplicationModal = ({
  applicationId,
  type,
  open,
  onClose,
}: ApplicationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} size="lg" hasCloseTrigger>
      {applicationId !== null ? (
        type === "agency" ? (
          <AgencyApplicationModalInner id={applicationId} />
        ) : (
          <SelfApplicationModalInner id={applicationId} />
        )
      ) : null}
    </Dialog>
  );
};
