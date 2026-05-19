"use client";

import {
  ApplicationDocument,
  ProcessApplicationDocumentPayload,
  UpdateApplicationStatusPayload,
  useGetApplicationByIdQuery,
  useGetSelfApplicationByIdQuery,
  useProcessApplicationDocumentMutation,
  useUpdateApplicationStatusMutation,
  useUpdateSelfApplicationStatusMutation,
} from "@/api/admin-applcations";
import { ConfirmationDialog } from "@/components/ui/confirmationDialog";
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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsFileEarmark } from "react-icons/bs";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { StatusBadge, DetailsContent } from "./ApplicationModal";
import { WEBSITE_THEME_COLOR } from "@/constants/color";

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_OPTIONS: UpdateApplicationStatusPayload["status"][] = [
  "PENDING",
  "APPROVED",
  "SHORTLISTED",
  "REJECTED",
];

const statusLabel: Record<UpdateApplicationStatusPayload["status"], string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  SHORTLISTED: "Shortlisted",
  REJECTED: "Rejected",
};

const getDocumentUrl = (doc: ApplicationDocument) =>
  doc.documentPath ?? doc.fileUrl ?? doc.url ?? "";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// ─── Document status badge ────────────────────────────────────────────────────
const DocStatusBadge = ({ status }: { status: string }) => {
  const colorPalette =
    status === "APPROVED" ? "green" : status === "REJECTED" ? "red" : "orange";
  return <Badge colorPalette={colorPalette}>{status ?? "PENDING"}</Badge>;
};

// ─── Application Status Component ─────────────────────────────────────────────
interface StatusSectionProps {
  application: { candidateName: string; jobTitle: string; status: string } | undefined;
  status: UpdateApplicationStatusPayload["status"];
  setStatus: (s: UpdateApplicationStatusPayload["status"]) => void;
  rejectionReason: string;
  setRejectionReason: (r: string) => void;
  isPending: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const StatusSection = ({
  application,
  status,
  setStatus,
  rejectionReason,
  setRejectionReason,
  isPending,
  onClose,
  onSubmit,
}: StatusSectionProps) => (
  <VStack align="stretch" gap={4}>
    {/* Current status */}
    {application && (
      <HStack gap={2}>
        <Text fontSize="sm" color="gray.500">
          Current:
        </Text>
        <StatusBadge
          status={
            application.status as UpdateApplicationStatusPayload["status"]
          }
        />
      </HStack>
    )}

    {/* Status selector */}
    <Box>
      <Text
        fontSize="xs"
        fontWeight="600"
        color="gray.600"
        mb={2}
        textTransform="uppercase"
        letterSpacing="0.06em"
      >
        New Status
      </Text>
      <Flex gap={2} flexWrap="wrap">
        {STATUS_OPTIONS.map((opt) => (
          <Box
            key={opt}
            as="button"
            px={3}
            py={1.5}
            fontSize="sm"
            fontWeight="600"
            borderRadius="8px"
            border="2px solid"
            cursor="pointer"
            transition="all 0.15s"
            onClick={() => setStatus(opt)}
            borderColor={status === opt ? "blue.500" : "gray.200"}
            bg={status === opt ? "blue.50" : "white"}
            color={status === opt ? "blue.600" : "gray.500"}
            _hover={{ borderColor: "blue.400", color: "blue.500" }}
          >
            {statusLabel[opt]}
          </Box>
        ))}
      </Flex>
    </Box>

    {/* Rejection reason — only when REJECTED */}
    {status === "REJECTED" && (
      <Box>
        <Text
          fontSize="xs"
          fontWeight="600"
          color="red.500"
          mb={2}
          textTransform="uppercase"
          letterSpacing="0.06em"
        >
          Rejection Reason <span style={{ color: "red" }}>*</span>
        </Text>
        <Textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Enter the reason for rejection…"
          rows={3}
          fontSize="sm"
          borderColor="red.200"
          _focus={{ borderColor: "red.400", boxShadow: "none" }}
          resize="vertical"
        />
      </Box>
    )}

    {/* Footer */}
    <Flex justify="flex-end" gap={3} pt={2}>
      <Box
        as="button"
        px={4}
        py={2}
        fontSize="sm"
        fontWeight="600"
        borderRadius="8px"
        border="1px solid"
        borderColor="gray.200"
        color="gray.600"
        cursor="pointer"
        bg="white"
        _hover={{ bg: "gray.50" }}
        onClick={onClose}
      >
        Cancel
      </Box>
      <Box
        as="button"
        px={4}
        py={2}
        fontSize="sm"
        fontWeight="600"
        borderRadius="8px"
        cursor="pointer"
        bg="blue.500"
        color="white"
        opacity={
          isPending || (status === "REJECTED" && !rejectionReason.trim())
            ? 0.6
            : 1
        }
        pointerEvents={
          isPending || (status === "REJECTED" && !rejectionReason.trim())
            ? "none"
            : "auto"
        }
        _hover={{ bg: "blue.600" }}
        onClick={onSubmit}
        transition="all 0.15s"
      >
        {isPending ? "Saving…" : "Save Changes"}
      </Box>
    </Flex>
  </VStack>
);

// ─── Documents Tab ────────────────────────────────────────────────────────────
interface DocumentsTabProps {
  documents: ApplicationDocument[];
  onActionClick: (data: {
    documentId: number;
    action: "Approve" | "Reject";
  }) => void;
}

const DocumentsTab = ({ documents, onActionClick }: DocumentsTabProps) => {
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
      <VStack align="stretch" gap={3}>
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
                {/* Left: type, name, status */}
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

                {/* Right: image + action buttons */}
                <HStack gap={2} flexShrink={0}>
                  {docUrl ? (
                    <Image
                      src={`${baseImageUrl}${docUrl}`}
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
                    //     transition="all 0.15s"
                    //   >
                    //     <BsFileEarmark size={18} />
                    //   </Flex>
                    // }
                    />
                  ) : (
                    <Text fontSize="sm" color="gray.400">
                      File unavailable
                    </Text>
                  )}

                  {/* Only show approve/reject for PENDING docs */}
                  {doc.status === "PENDING" && (
                    <>
                      <Box
                        as="button"
                        px={3}
                        py={1.5}
                        fontSize="xs"
                        fontWeight="600"
                        borderRadius="6px"
                        cursor="pointer"
                        bg={WEBSITE_THEME_COLOR}
                        color="white"
                        border="1px solid"
                        _hover={{ bg: "green.600" }}
                        transition="all 0.15s"
                        onClick={() =>
                          onActionClick({
                            documentId: doc.id,
                            action: "Approve",
                          })
                        }
                      >
                        Approve
                      </Box>
                      <Box
                        as="button"
                        px={3}
                        py={1.5}
                        fontSize="xs"
                        fontWeight="600"
                        borderRadius="6px"
                        cursor="pointer"
                        bg="white"
                        color="red.500"
                        border="1px solid"
                        borderColor="red.400"
                        _hover={{ bg: "red.50" }}
                        transition="all 0.15s"
                        onClick={() =>
                          onActionClick({
                            documentId: doc.id,
                            action: "Reject",
                          })
                        }
                      >
                        Reject
                      </Box>
                    </>
                  )}
                </HStack>
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

// ─── Shared modal UI ──────────────────────────────────────────────────────────
interface EditModalContentProps {
  application: ReturnType<typeof useGetApplicationByIdQuery>["data"];
  isLoading: boolean;
  isPending: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onDocumentAction: (data: {
    documentId: number;
    action: "Approve" | "Reject";
  }) => void;
  status: UpdateApplicationStatusPayload["status"];
  setStatus: (s: UpdateApplicationStatusPayload["status"]) => void;
  rejectionReason: string;
  setRejectionReason: (r: string) => void;
}

const EditModalContent = ({
  application,
  isLoading,
  isPending,
  onClose,
  onSubmit,
  onDocumentAction,
  status,
  setStatus,
  rejectionReason,
  setRejectionReason,
}: EditModalContentProps) => {
  const documents = application?.documents ?? [];

  return (
    <Flex direction="column" h="75vh" maxH="75vh" gap={4}>
      {/* Header */}
      <Box pb={3} borderBottom="1px solid" borderColor="gray.100" flexShrink={0}>
        <Text fontWeight="700" fontSize="lg" color="gray.800">
          Update Application
        </Text>
        {application && (
          <Text fontSize="xs" color="gray.500" mt={0.5}>
            {application.candidateName} — {application.jobTitle}
          </Text>
        )}
      </Box>

      {/* Body */}
      {isLoading ? (
        <Flex justify="center" align="center" py={8} flex={1}>
          <Spinner size="md" color="blue.500" />
        </Flex>
      ) : (
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
                {application && <DetailsContent application={application} />}

                {/* Status section rendered just below details */}
                <Box border="1px solid" borderColor="gray.200" borderRadius="12px" p={4} bg="gray.50">
                  <Text fontSize="xs" fontWeight="700" color="gray.600" mb={3} textTransform="uppercase" letterSpacing="0.08em">
                    Update Application Status
                  </Text>
                  <StatusSection
                    application={application}
                    status={status}
                    setStatus={setStatus}
                    rejectionReason={rejectionReason}
                    setRejectionReason={setRejectionReason}
                    isPending={isPending}
                    onClose={onClose}
                    onSubmit={onSubmit}
                  />
                </Box>
              </VStack>
            </Tabs.Content>

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
              <Box pb={4}>
                <DocumentsTab
                  documents={documents}
                  onActionClick={onDocumentAction}
                />
              </Box>
            </Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs.Root>
      )}
    </Flex>
  );
};

// ─── Agency edit inner ────────────────────────────────────────────────────────
const AgencyEditModalInner = ({
  applicationId,
  onClose,
  onDocumentActionClick,
  isProcessingDocument,
}: {
  applicationId: number;
  onClose: () => void;
  onDocumentActionClick: (data: {
    documentId: number;
    action: "Approve" | "Reject";
  }) => void;
  isProcessingDocument: boolean;
}) => {
  const { data: application, isLoading } =
    useGetApplicationByIdQuery(applicationId);
  const { mutate: updateStatus, isPending } =
    useUpdateApplicationStatusMutation();

  const [status, setStatus] =
    useState<UpdateApplicationStatusPayload["status"]>("PENDING");
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    if (application) {
      setStatus(
        application.status as UpdateApplicationStatusPayload["status"],
      );
      setRejectionReason(application.rejectionReason ?? "");
    }
  }, [application]);

  const handleSubmit = () => {
    const payload: UpdateApplicationStatusPayload = {
      status,
      ...(status === "REJECTED" ? { rejectionReason } : {}),
    };
    updateStatus(
      { id: applicationId, payload },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <EditModalContent
      application={application}
      isLoading={isLoading}
      isPending={isPending || isProcessingDocument}
      onClose={onClose}
      onSubmit={handleSubmit}
      onDocumentAction={onDocumentActionClick}
      status={status}
      setStatus={setStatus}
      rejectionReason={rejectionReason}
      setRejectionReason={setRejectionReason}
    />
  );
};

// ─── Self edit inner ──────────────────────────────────────────────────────────
const SelfEditModalInner = ({
  applicationId,
  onClose,
  onDocumentActionClick,
  isProcessingDocument,
}: {
  applicationId: number;
  onClose: () => void;
  onDocumentActionClick: (data: {
    documentId: number;
    action: "Approve" | "Reject";
  }) => void;
  isProcessingDocument: boolean;
}) => {
  const { data: application, isLoading } =
    useGetSelfApplicationByIdQuery(applicationId);
  const { mutate: updateStatus, isPending } =
    useUpdateSelfApplicationStatusMutation();

  const [status, setStatus] =
    useState<UpdateApplicationStatusPayload["status"]>("PENDING");
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    if (application) {
      setStatus(
        application.status as UpdateApplicationStatusPayload["status"],
      );
      setRejectionReason(application.rejectionReason ?? "");
    }
  }, [application]);

  const handleSubmit = () => {
    const payload: UpdateApplicationStatusPayload = {
      status,
      ...(status === "REJECTED" ? { rejectionReason } : {}),
    };
    updateStatus(
      { id: applicationId, payload },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <EditModalContent
      application={application}
      isLoading={isLoading}
      isPending={isPending || isProcessingDocument}
      onClose={onClose}
      onSubmit={handleSubmit}
      onDocumentAction={onDocumentActionClick}
      status={status}
      setStatus={setStatus}
      rejectionReason={rejectionReason}
      setRejectionReason={setRejectionReason}
    />
  );
};

// ─── Public export ────────────────────────────────────────────────────────────
interface EditApplicationModalProps {
  applicationId: number | null;
  type: "agency" | "self";
  open: boolean;
  onClose: () => void;
}

export const EditApplicationModal = ({
  applicationId,
  type,
  open,
  onClose,
}: EditApplicationModalProps) => {
  const { mutate: processDocument, isPending: isProcessingDocument } =
    useProcessApplicationDocumentMutation();

  const [pendingDocAction, setPendingDocAction] = useState<{
    documentId: number;
    action: "Approve" | "Reject";
  } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDocumentActionClick = (data: {
    documentId: number;
    action: "Approve" | "Reject";
  }) => {
    setPendingDocAction(data);
    setConfirmOpen(true);
  };

  const handleDocumentConfirm = (rejectionReason?: string) => {
    if (!pendingDocAction) return;
    const payload: ProcessApplicationDocumentPayload = {
      documentId: pendingDocAction.documentId,
      status: pendingDocAction.action === "Approve" ? "APPROVED" : "REJECTED",
      ...(pendingDocAction.action === "Reject" ? { rejectionReason } : {}),
    };
    processDocument(payload, {
      onSuccess: () => {
        setConfirmOpen(false);
        setPendingDocAction(null);
      },
    });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} size="lg" hasCloseTrigger>
        {applicationId !== null ? (
          type === "agency" ? (
            <AgencyEditModalInner
              applicationId={applicationId}
              onClose={onClose}
              onDocumentActionClick={handleDocumentActionClick}
              isProcessingDocument={isProcessingDocument}
            />
          ) : (
            <SelfEditModalInner
              applicationId={applicationId}
              onClose={onClose}
              onDocumentActionClick={handleDocumentActionClick}
              isProcessingDocument={isProcessingDocument}
            />
          )
        ) : null}
      </Dialog>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setPendingDocAction(null);
        }}
        title={`Are you sure you want to ${pendingDocAction?.action} this document?`}
        action={pendingDocAction?.action ?? "Approve"}
        handleSubmit={handleDocumentConfirm}
        submitActionPending={isProcessingDocument}
        showRejectReason={pendingDocAction?.action === "Reject"}
      />
    </>
  );
};
