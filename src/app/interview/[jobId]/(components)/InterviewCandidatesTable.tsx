"use client";

import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Datatable } from "@/shared/ui/datatable";
import { Box, HStack, Stack, Text, Button } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ApplicationModal, StatusBadge } from "@/app/applications/(components)/ApplicationModal";
import { ScheduleInterviewModal } from "./ScheduleInterviewModal";
import { useGetShortlistedCandidates, ShortListedResponse } from "@/api/interview";
import { DataTable } from "@/shared/ui/datatable/NewDataTable";

interface InterviewCandidatesTableProps {
  jobDemandId: string;
}

export const InterviewCandidatesTable = ({ jobDemandId }: InterviewCandidatesTableProps) => {
  const [payload, setPayload] = useState({
    page: 0,
    pageSize: 10,
  });
  const { data: shortlistedData, isLoading } = useGetShortlistedCandidates({
    page: payload.page,
    size: payload.pageSize,
    jobDemandId: Number(jobDemandId),
  });

  // Calculate pagination values from API response
  const pageCount = shortlistedData?.totalPages ?? 0;
  const totalRecords = shortlistedData?.totalElements ?? 0;
  const displayCount = shortlistedData?.content?.length ?? 0;
  const next = payload.page < pageCount;
  const previous = payload.page > 0;

  const [selectedViewId, setSelectedViewId] = useState<number | null>(null);

  // For individual schedule
  const [scheduleCandidate, setScheduleCandidate] = useState<{ id: number, name: string } | null>(null);

  // For bulk schedule
  const [isBulkScheduleOpen, setIsBulkScheduleOpen] = useState(false);

  const columns = useMemo<ColumnDef<ShortListedResponse>[]>(
    () => [
      {
        accessorKey: "applicationId",
        header: "S.N.",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "candidateName",
        header: "Candidate",
        cell: ({ row }) => (
          <Box>
            <Text fontSize="sm" fontWeight="500" color="gray.800">
              {row.original.candidateName}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {row.original.candidateTrade}
            </Text>
          </Box>
        ),
      },
      {
        accessorKey: "agencyName",
        header: "Agency",
        cell: ({ row }) => (
          <Text fontSize="sm" color="gray.700">
            {row.original.agencyName ?? "SELF"}
          </Text>
        ),
      },
      {
        accessorKey: "status",
        header: "App Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "interviewStatus",
        header: "Interview",
        cell: ({ row }) => {
          if (!row.original.interviewStatus) return <Text fontSize="xs" color="gray.400">Not Scheduled</Text>;
          return <StatusBadge status={row.original.interviewStatus} />;
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <HStack gap={2}>
            <Box
              as="button"
              px={3}
              py={1.5}
              fontSize="xs"
              fontWeight="600"
              color={WEBSITE_THEME_COLOR}
              border="1px solid"
              borderColor={WEBSITE_THEME_COLOR}
              borderRadius="6px"
              cursor="pointer"
              bg="transparent"
              transition="all 0.15s"
              _hover={{ bg: WEBSITE_THEME_COLOR, color: "white" }}
              onClick={() => setSelectedViewId(row.original.applicationId)}
            >
              View Details
            </Box>

            <Box
              as="button"
              px={3}
              py={1.5}
              fontSize="xs"
              fontWeight="600"
              color="white"
              bg={WEBSITE_THEME_COLOR}
              borderRadius="6px"
              cursor="pointer"
              border="1px solid"
              borderColor={WEBSITE_THEME_COLOR}
              transition="all 0.15s"
              _hover={{ opacity: 0.85 }}
              onClick={() => setScheduleCandidate({ id: row.original.applicationId, name: row.original.candidateName })}
            >
              Schedule Interview
            </Box>
          </HStack>
        ),
      },
    ],
    [],
  );

  const candidatesOptions = useMemo(() => {
    if (!shortlistedData?.content) return [];
    return shortlistedData.content.map(app => ({
      id: app.applicationId,
      name: app.candidateName,
    }));
  }, [shortlistedData]);

  return (
    <>
      <Stack gap={4}>
        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.500">
            Review the shortlisted candidates for this job.
          </Text>
          <Button
            size="sm"
            bg={WEBSITE_THEME_COLOR}
            color="white"
            _hover={{ bg: "green.700" }}
            onClick={() => setIsBulkScheduleOpen(true)}
            disabled={candidatesOptions.length === 0}
          >
            Bulk Schedule Interview
          </Button>
        </HStack>

        <DataTable
          columns={columns}
          data={shortlistedData?.content ?? []}
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
            // Handle search logic here
            console.log("Search:", searchTerm);
          }}

        />
      </Stack>

      <ApplicationModal
        applicationId={selectedViewId}
        type="agency"
        open={!!selectedViewId}
        onClose={() => setSelectedViewId(null)}
      />

      <ScheduleInterviewModal
        open={!!scheduleCandidate}
        onClose={() => setScheduleCandidate(null)}
        candidate={scheduleCandidate || undefined}
        isBulk={false}
      />

      {isBulkScheduleOpen && (
        <ScheduleInterviewModal
          open={isBulkScheduleOpen}
          onClose={() => setIsBulkScheduleOpen(false)}
          candidates={candidatesOptions}
          isBulk={true}
        />
      )}
    </>
  );
};
