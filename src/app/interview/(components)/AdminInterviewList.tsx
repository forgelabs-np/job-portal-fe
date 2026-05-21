"use client";

import {
  InterviewFilterParams,
  InterviewResponse,
  useCancelInterviewMutation,
  useDeleteInterviewMutation,
  useGetAllInterviewsQuery,
} from "@/api/admin-interview";
import {
  Badge,
  Box,
  Button as ChakraButton,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { SetInterviewResultModal } from "./SetInterviewResultModal";
import { SetInterviewStatusModal } from "./SetInterviewStatusModal";

import { ConfirmationDialog } from "@/components/ui/confirmationDialog";
import { Datatable } from "@/shared/ui/datatable";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/shared/ui/menu";
import { SelectFieldInput } from "@/shared/ui/Select";
import { IconButton } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { FormProvider, useForm } from "react-hook-form";
import { MdAutorenew, MdCancel, MdDelete, MdEventAvailable, MdOutlineEdit, MdSettings } from "react-icons/md";
import { ScheduleInterviewModal } from "../[jobId]/(components)/ScheduleInterviewModal";
import ViewInterviewModal from "./ViewInterviewModal";

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
  const [rescheduleInterviewId, setRescheduleInterviewId] = useState<number | null>(null);
  const [cancelInterviewId, setCancelInterviewId] = useState<number | null>(null);
  const [deleteInterviewId, setDeleteInterviewId] = useState<number | null>(null);
  const [statusInterview, setStatusInterview] = useState<InterviewResponse | null>(null);
  const [resultInterview, setResultInterview] = useState<InterviewResponse | null>(null);

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
  }, [watchedStatus,statusFilter]);

  useEffect(() => {
    if (watchedResult !== undefined && watchedResult !== resultFilter) {
      setResultFilter(watchedResult);
      setPage(0);
    }
  }, [watchedResult,resultFilter]);

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
            <HStack gap={2}>
              <ViewInterviewModal interviewId={interview.id} />

              <MenuRoot>
                <MenuTrigger asChild>
                  <IconButton size="sm" variant="ghost" colorScheme="gray">
                    <MdSettings size={18} />
                  </IconButton>
                </MenuTrigger>
                <MenuContent>
                  {(interview.status === "COMPLETED" || interview.status === "NO_SHOW") && (
                    <MenuItem value="set-result" onClick={() => setResultInterview(interview)}>
                      <HStack gap={2}>
                        <MdOutlineEdit size={16} />
                        <Text>Set Result</Text>
                      </HStack>
                    </MenuItem>
                  )}

                  {interview.status !== "CANCELLED" && interview.status !== "COMPLETED" && interview.status !== "NO_SHOW" && (
                    <MenuItem value="reschedule" onClick={() => setRescheduleInterviewId(interview.id)}>
                      <HStack gap={2} >
                        <MdEventAvailable size={16} />
                        <Text>Reschedule</Text>
                      </HStack>
                    </MenuItem>
                  )}

                  <MenuItem value="update-status" onClick={() => setStatusInterview(interview)}>
                    <HStack gap={2} >
                      <MdAutorenew size={16} />
                      <Text>Update Status</Text>
                    </HStack>
                  </MenuItem>

                  {interview.status !== "CANCELLED" && (
                    <MenuItem value="cancel" onClick={() => setCancelInterviewId(interview.id)}>
                      <HStack gap={2}>
                        <MdCancel size={16} />
                        <Text>Cancel</Text>
                      </HStack>
                    </MenuItem>
                  )}

                  <MenuItem value="delete" onClick={() => setDeleteInterviewId(interview.id)}>
                    <HStack gap={2}>
                      <MdDelete size={16} color="red.500" />
                      <Text>Delete</Text>
                    </HStack>
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
            </HStack>
          );
        },
      },
    ],
    []
  );

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

      <ScheduleInterviewModal
        open={rescheduleInterviewId !== null}
        onClose={() => {
          setRescheduleInterviewId(null);
          refetch();
        }}
        existingInterviewId={rescheduleInterviewId || undefined}
      />

      <SetInterviewStatusModal
        interviewId={statusInterview?.id || 0}
        candidateName={statusInterview?.candidateName || ""}
        currentStatus={statusInterview?.status || "SCHEDULED"}
        open={!!statusInterview}
        onClose={() => setStatusInterview(null)}
        onSuccess={() => { setStatusInterview(null); refetch(); }}
      />

      <SetInterviewResultModal
        interviewId={resultInterview?.id || 0}
        candidateName={resultInterview?.candidateName || ""}
        currentResult={resultInterview?.result || "PENDING"}
        open={!!resultInterview}
        onClose={() => setResultInterview(null)}
        onSuccess={() => { setResultInterview(null); refetch(); }}
      />
    </VStack>
  );
};
