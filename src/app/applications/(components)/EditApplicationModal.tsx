"use client";

import {
    UpdateApplicationStatusPayload,
    useGetApplicationByIdQuery,
    useUpdateApplicationStatusMutation,
} from "@/api/admin-applcations";
import { Dialog } from "@/shared";
import {
    Box,
    Flex,
    HStack,
    Spinner,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StatusBadge } from "./ApplicationModal";

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

interface EditApplicationModalProps {
    applicationId: number | null;
    open: boolean;
    onClose: () => void;
}

export const EditApplicationModal = ({
    applicationId,
    open,
    onClose,
}: EditApplicationModalProps) => {
    const { data: application, isLoading } =
        useGetApplicationByIdQuery(applicationId);

    const { mutate: updateStatus, isPending } =
        useUpdateApplicationStatusMutation();

    const [status, setStatus] =
        useState<UpdateApplicationStatusPayload["status"]>("PENDING");
    const [rejectionReason, setRejectionReason] = useState("");

    // Sync form state when application data loads
    useEffect(() => {
        if (application) {
            setStatus(application.status as UpdateApplicationStatusPayload["status"]);
            setRejectionReason(application.rejectionReason ?? "");
        }
    }, [application]);

    const handleSubmit = () => {
        if (!applicationId) return;
        const payload: UpdateApplicationStatusPayload = {
            status,
            ...(status === "REJECTED" ? { rejectionReason } : {}),
        };
        updateStatus(
            { id: applicationId, payload },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    return (
        <Dialog open={open} onClose={onClose} size="md" hasCloseTrigger>
            <Flex direction="column" gap={5}>
                {/* Header */}
                <Box pb={3} borderBottom="1px solid" borderColor="gray.100">
                    <Text fontWeight="700" fontSize="lg" color="gray.800">
                        Update Application Status
                    </Text>
                    {application && (
                        <Text fontSize="xs" color="gray.500" mt={0.5}>
                            {application.candidateName} — {application.jobTitle}
                        </Text>
                    )}
                </Box>

                {/* Body */}
                {isLoading ? (
                    <Flex justify="center" py={8}>
                        <Spinner size="md" color="blue.500" />
                    </Flex>
                ) : (
                    <VStack align="stretch" gap={4}>
                        {/* Current status */}
                        {application && (
                            <HStack gap={2}>
                                <Text fontSize="sm" color="gray.500">
                                    Current:
                                </Text>
                                <StatusBadge status={application.status} />
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
                                        _hover={{
                                            borderColor: "blue.400",
                                            color: "blue.500",
                                        }}
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
                    </VStack>
                )}

                {/* Footer actions */}
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
                            isPending ||
                                (status === "REJECTED" && !rejectionReason.trim())
                                ? 0.6
                                : 1
                        }
                        pointerEvents={
                            isPending ||
                                (status === "REJECTED" && !rejectionReason.trim())
                                ? "none"
                                : "auto"
                        }
                        _hover={{ bg: "blue.600" }}
                        onClick={handleSubmit}
                        transition="all 0.15s"
                    >
                        {isPending ? "Saving…" : "Save Changes"}
                    </Box>
                </Flex>
            </Flex>
        </Dialog>
    );
};
