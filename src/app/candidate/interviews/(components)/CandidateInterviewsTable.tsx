"use client";

import { useGetCandidateInterviewsQuery, useGetCandidateInterviewByIdQuery } from "@/api/candidate-api";
import { InterviewResponse } from "@/api/admin-interview";
import { TableActions } from "@/shared/ui/datatable";
import { DataTable } from "@/shared/ui/datatable/NewDataTable";
import { Stack, Text, Badge } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import ViewInterviewModal from "@/app/interview/(components)/ViewInterviewModal";

const CandidateInterviewsTable = () => {
  const [payload, setPayload] = useState({
    page: 0,
    pageSize: 10,
  });
  
  const { data, isLoading } = useGetCandidateInterviewsQuery({
    pageable: { page: payload.page, size: payload.pageSize },
  });
  
  const [viewId, setViewId] = useState<number | null>(null);
  
  const { data: interviewDetail, isLoading: isLoadingDetail } = useGetCandidateInterviewByIdQuery(viewId);

  // Calculate pagination values from API response
  const pageCount = data?.totalPages ?? 0;
  const totalRecords = data?.totalElements ?? 0;
  const displayCount = data?.content?.length ?? 0;
  const next = payload.page < pageCount;
  const previous = payload.page > 0;

  const handleView = useCallback((interviewId: number) => {
    setViewId(interviewId);
  }, []);

  const columns = useMemo<ColumnDef<InterviewResponse>[]>(
    () => [
      {
        accessorKey: "id",
        header: "S.N.",
        cell: ({ row }) => row.index + 1 + payload.page * payload.pageSize,
      },
    
      {
        accessorKey: "jobTitle",
        header: "Job Title",
      },
      {
        accessorKey: "scheduledAt",
        header: "Date & Time",
        cell: ({ row }) => {
          const dateStr = row.original.scheduledAt;
          if (!dateStr) return "N/A";
          try {
            return format(parseISO(dateStr), "MMM d, yyyy h:mm a");
          } catch (e) {
            return dateStr;
          }
        },
      },
      {
        accessorKey: "interviewType",
        header: "Type",
        cell: ({ row }) => (
          <Badge colorPalette={row.original.interviewType === "ONLINE" ? "blue" : "orange"}>
            {row.original.interviewType}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          let color = "gray";
          if (status === "SCHEDULED") color = "blue";
          if (status === "RESCHEDULED") color = "teal";
          if (status === "COMPLETED") color = "green";
          if (status === "CANCELLED") color = "red";
          if (status === "NO_SHOW") color = "purple";

          return <Badge colorPalette={color}>{status}</Badge>;
        },
      },
      {
        accessorKey: "result",
        header: "Result",
        cell: ({ row }) => {
          const result = row.original.result;
          let color = "gray";
          if (result === "PENDING") color = "yellow";
           if (result === "PASS") color = "green";
          if (result === "FAIL") color = "red";
          if (result === "RE_INTERVIEW") color = "orange";
          return <Badge colorPalette={color}>{result}</Badge>;
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <TableActions
            onView={() => {
              handleView(row.original.id);
            }}
          />
        ),
      },
    ],
    [handleView, payload.page, payload.pageSize],
  );

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        My Interviews
      </Text>
      <Stack gap={4}>
        <DataTable 
          columns={columns} 
          data={data?.content ?? []} 
          isLoading={isLoading}
          payload={{
            ...payload,
            pageCount,
            count: totalRecords,
            display_count: displayCount,
            next,
            previous,
          }}
          setPayload={setPayload}
          onSearchChange={(searchTerm) => {
            console.log("Search:", searchTerm);
          }}
        />

        <ViewInterviewModal
          open={!!viewId}
          onClose={() => setViewId(null)}
          interview={interviewDetail}
        />
      </Stack>
    </>
  );
};

export default CandidateInterviewsTable;
