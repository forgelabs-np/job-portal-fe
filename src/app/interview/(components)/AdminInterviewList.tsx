"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Badge,
  Button as ChakraButton,
  Dialog,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import {
  useGetAllInterviewsQuery,
  useCancelInterviewMutation,
  useDeleteInterviewMutation,
  InterviewFilterParams,
  InterviewResponse,
} from "@/api/admin-interview";
import { SetInterviewResultModal } from "./SetInterviewResultModal";

import { Datatable } from "@/shared/ui/datatable";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { ColumnDef } from "@tanstack/react-table";
import { MdCancel, MdDelete } from "react-icons/md";
import { Button } from "@/shared";
import { SelectFieldInput } from "@/shared/ui/Select";
import { useForm, FormProvider } from "react-hook-form";
import { ConfirmationDialog } from "@/components/ui/confirmationDialog";

interface AdminInterviewListProps {
  jobDemandId?: number;
}

const statusColorScheme: Record<string, string> = {
  SCHEDULED: "blue",
  RESCHEDULED: "purple",
  COMPLETED: "green",
  CANCELLED: "red",
  NO_SHOW: "orange",
};

const resultColorScheme: Record<string, string> = {
  PENDING: "yellow",
  PASS: "green",
  FAIL: "red",
  RE_INTERVIEW: "orange",
};

export const AdminInterviewList: React.FC<AdminInterviewListProps> = ({
  jobDemandId,
}) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [resultFilter, setResultFilter] = useState<string>("");
  const [cancelInterviewId, setCancelInterviewId] = useState<number | null>(null);
  const [deleteInterviewId, setDeleteInterviewId] = useState<number | null>(null);

  const params: InterviewFilterParams = {
    pageable: {
      page,
      size,
      sort: ["scheduledAt,desc"],
    },
    ...(jobDemandId && { jobDemandId }),
    ...(statusFilter && { status: statusFilter }),
    ...(resultFilter && { result: resultFilter }),
  };

  const methods = useForm({
    defaultValues: {
      status: "",
      result: "",
      pageSize: size,
    },
  });

  const watchedStatus = methods.watch("status");
  const watchedResult = methods.watch("result");
  const watchedPageSize = methods.watch("pageSize");

  useEffect(() => {
    if (watchedStatus !== undefined && watchedStatus !== statusFilter) {
      setStatusFilter(watchedStatus);
      setPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedStatus]);

  useEffect(() => {
    if (watchedResult !== undefined && watchedResult !== resultFilter) {
      setResultFilter(watchedResult);
      setPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedResult]);

  useEffect(() => {
    if (watchedPageSize && Number(watchedPageSize) !== size) {
      setSize(Number(watchedPageSize));
      setPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedPageSize]);

  const { data, isLoading, refetch } = useGetAllInterviewsQuery(params);
  const { mutate: cancelInterview } = useCancelInterviewMutation();
  const { mutate: deleteInterview } = useDeleteInterviewMutation();

  const handleCancelInterview = (interviewId: number) => {
    cancelInterview(interviewId, {
      onSuccess: () => {
        refetch();
      },
      onError: (err: unknown) => {
        // toast.error(
        //   err.response?.data?.message || "Failed to cancel interview"
        // );
      },
    });
  };

  const handleDeleteInterview = (interviewId: number) => {
    deleteInterview(interviewId, {
      onSuccess: () => {
        refetch();
      },
      onError: (err: unknown) => {
        // toast.error(
        //   err.response?.data?.message || "Failed to delete interview"
        // );
      },
    });
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns = useMemo<ColumnDef<InterviewResponse>[]>(
    () => [
      {
        accessorKey: "candidateName",
        header: "Candidate",
        cell: ({ row }) => (
          <Box>
            <Text fontSize="sm" fontWeight="500" color="gray.800">
              {row.original.candidateName}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {row.original.jobTitle}
            </Text>
          </Box>
        ),
      },
      {
        accessorKey: "scheduledAt",
        header: "Scheduled At",
        cell: ({ row }) => (
          <Text fontSize="sm" whiteSpace="nowrap">
            {formatDateTime(row.original.scheduledAt)}
          </Text>
        ),
      },
      {
        accessorKey: "interviewType",
        header: "Type",
        cell: ({ row }) => (
          <Badge
            colorPalette={row.original.interviewType === "ONLINE" ? "blue" : "purple"}
            fontSize="xs"
          >
            {row.original.interviewType}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            colorPalette={statusColorScheme[row.original.status] || "gray"}
            fontSize="xs"
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "result",
        header: "Result",
        cell: ({ row }) => (
          <Badge
            colorPalette={resultColorScheme[row.original.result] || "gray"}
            fontSize="xs"
          >
            {row.original.result}
          </Badge>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const interview = row.original;
          return (
            <HStack gap={2} >
              
              {(interview.status === "COMPLETED" || interview.status === "NO_SHOW") && (
                <SetInterviewResultModal
                  interviewId={interview.id}
                  candidateName={interview.candidateName}
                  currentResult={interview.result}
                  onSuccess={() => refetch()}
                />
              )}

            {interview.status !== "CANCELLED" && (
              <Button
                size="sm"
                variant="outline"
                colorScheme="orange"
                onClick={() => setCancelInterviewId(interview.id)}
              >
                <HStack gap={1} align="center">
                  <MdCancel size={16} />
                  <Text>Cancel</Text>
                </HStack>
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              colorScheme="red"
              onClick={() => setDeleteInterviewId(interview.id)}
            >
              <HStack gap={1} align="center">
                <MdDelete size={16} />
                <Text>Delete</Text>
              </HStack>
            </Button>
            </HStack>
          );
        },
      },
    ],
    [refetch]
  );

  // const totalPages = data?.totalPages || 0;

  return (
    <VStack  align="stretch" gap={4}>
      {/* Filters */}
      <HStack gap={3} wrap="wrap" justify="space-between">
        <FormProvider {...methods}>
          <HStack>
            <SelectFieldInput
              name="status"
              label="Status"
              options={[
                { label: "Scheduled", value: "SCHEDULED" },
                { label: "Rescheduled", value: "RESCHEDULED" },
                { label: "Completed", value: "COMPLETED" },
                { label: "Cancelled", value: "CANCELLED" },
                { label: "No Show", value: "NO_SHOW" },
              ]}
            />

            <SelectFieldInput
              name="result"
              label="Result"
              options={[
                { label: "Pending", value: "PENDING" },
                { label: "Pass", value: "PASS" },
                { label: "Fail", value: "FAIL" },
                { label: "Re-Interview", value: "RE_INTERVIEW" },
              ]}
            />

            {(statusFilter || resultFilter) && (
              <ChakraButton
                variant="ghost"
                onClick={() => {
                  methods.setValue("status", "");
                  methods.setValue("result", "");
                  setStatusFilter("");
                  setResultFilter("");
                  setPage(0);
                }}
              >
                Clear Filters
              </ChakraButton>
            )}
          </HStack>

        
        </FormProvider>
      </HStack>

      {/* Table */}
      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200" p={2}>
        <Datatable
          columns={columns}
          data={data?.content ?? []}
          isLoading={isLoading}
        />
      </Box>

      {/* Pagination
      {!isLoading && data && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          pageSize={size}
          onPageChange={(p) => setPage(p)}
        />
      )} */}
      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        open={cancelInterviewId !== null}
        onClose={() => setCancelInterviewId(null)}
        title="Cancel Interview"
        action="cancel this interview"
        handleSubmit={() => {
          if (cancelInterviewId) handleCancelInterview(cancelInterviewId);
          setCancelInterviewId(null);
        }}
      />

      <ConfirmationDialog
        open={deleteInterviewId !== null}
        onClose={() => setDeleteInterviewId(null)}
        title="Delete Interview"
        action="delete this interview"
        handleSubmit={() => {
          if (deleteInterviewId) handleDeleteInterview(deleteInterviewId);
          setDeleteInterviewId(null);
        }}
      />
    </VStack>
  );
};
