"use client";

import {
  ApplicationType,
  PaginatedApplicationResponse,
  useGetApplicationQuery,
} from "@/api/admin-applcations";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Datatable } from "@/shared/ui/datatable";
import { PaginationState } from "@/shared/datatable";
import { Box, Stack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ApplicationModal, StatusBadge } from "./ApplicationModal";

const ApplicationsTable = () => {
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  
  const { data, isLoading } = useGetApplicationQuery({
    pageable: {
      page: pageParams.pageIndex,
      size: pageParams.pageSize,
    },
  });
  console.log(data, "data");
  const [selected, setSelected] = useState<ApplicationType | null>(null);

  const columns = useMemo<ColumnDef<ApplicationType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "S.N.",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "jobTitle",
        header: "Job Title",
        cell: ({ row }) => (
          <Box>
            <Text fontSize="sm" fontWeight="600" color="gray.800">
              {row.original.jobTitle}
            </Text>
            <Text fontSize="xs" color="gray.400">
              ID #{row.original.jobDemandId}
            </Text>
          </Box>
        ),
      },
      {
        accessorKey: "jobCountry",
        header: "Country",
        cell: ({ row }) => (
          <Box>
            <Text fontSize="sm" color="gray.700">
              {row.original.jobCountry}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {row.original.jobCity}
            </Text>
          </Box>
        ),
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
        accessorKey: "candidatePassportNumber",
        header: "Passport No.",
        cell: ({ row }) => (
          <Text
            fontSize="sm"
            color="gray.600"
            fontFamily="mono"
            letterSpacing="0.04em"
          >
            {row.original.candidatePassportNumber}
          </Text>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
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
            onClick={() => setSelected(row.original)}
          >
            View
          </Box>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Applications
      </Text>

      <Stack gap={4}>
        <Datatable
          columns={columns}
          data={data?.content ?? []}
          isLoading={isLoading}
          serverPagination={{
            currentPage: pageParams.pageIndex,
            totalPages: data?.totalPages ?? 0,
            totalElements: data?.totalElements ?? 0,
            pageSize: pageParams.pageSize,
          }}
          header={{
            title: "Applications",
            hasSearch: true,
          }}
        />
      </Stack>

      <ApplicationModal
        application={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
};

export default ApplicationsTable;
