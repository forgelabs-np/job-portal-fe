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
import { Button } from "@/shared";
import { SelectFieldInput } from "@/shared/ui/Select";
import { useForm, FormProvider } from "react-hook-form";

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
  PENDING: "gray",
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
            colorScheme={row.original.interviewType === "ONLINE" ? "blue" : "purple"}
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
            colorScheme={statusColorScheme[row.original.status] || "gray"}
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
            colorScheme={resultColorScheme[row.original.result] || "gray"}
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
            <HStack gap={1} >
              {interview.status === "SCHEDULED" && (
                <SetInterviewResultModal
                  interviewId={interview.id}
                  candidateName={interview.candidateName}
                  currentResult={interview.result}
                  onSuccess={() => refetch()}
                />
              )}

            {
    interview.status !== "CANCELLED" && (
        <Dialog.Root>
        <Dialog.Trigger asChild>
            <Button size="sm" variant="outline" colorScheme="orange">
            Cancel
            </Button>
        </Dialog.Trigger>

        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
                <Dialog.Header>
                <Dialog.Title>Cancel Interview</Dialog.Title>
                </Dialog.Header>

                <Dialog.Body>
                Are you sure you want to cancel this interview?
                </Dialog.Body>

                <Dialog.Footer>
                <HStack>
                    <Dialog.ActionTrigger asChild>
                    <Button variant="outline">No</Button>
                    </Dialog.ActionTrigger>

                    <Button
                    bg="orange.500"
                    color="white"
                    onClick={() => handleCancelInterview(interview.id)}
                    >
                    Yes, Cancel
                    </Button>
                </HStack>
                </Dialog.Footer>

                <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
                </Dialog.CloseTrigger>
            </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
        </Dialog.Root>
  )
}

<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button size="sm" variant="outline" colorScheme="red">
      Delete
    </Button>
  </Dialog.Trigger>

  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Delete Interview</Dialog.Title>
        </Dialog.Header>

        <Dialog.Body>
          This action cannot be undone.
        </Dialog.Body>

        <Dialog.Footer>
          <HStack>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.ActionTrigger>

            <Button
              bg="red.500"
              color="white"
              onClick={() => handleDeleteInterview(interview.id)}
            >
              Delete
            </Button>
          </HStack>
        </Dialog.Footer>

        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
            </HStack>
          );
        },
      },
    ],
    [refetch,handleCancelInterview, handleDeleteInterview]
  );

  const totalPages = data?.totalPages || 0;

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

          <HStack>
            <Text fontSize="sm" color="gray.500">Show</Text>
            <SelectFieldInput
              name="pageSize"
              label="Show"
              options={[
                { label: "5", value: 5 },
                { label: "10", value: 10 },
                { label: "20", value: 20 },
                { label: "50", value: 50 },
              ]}
            />
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
    </VStack>
  );
};
