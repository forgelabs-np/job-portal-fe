"use client";

import {
  ApplicationType,
  useGetApplicationQuery,
  useGetSelfApplicationQuery,
} from "@/api/admin-applcations";
import { useGetJobs } from "@/api/job";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Datatable } from "@/shared/ui/datatable";
import { Box, HStack, NativeSelect, Stack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  ApplicationModal,
  StatusBadge,
} from "../../(components)/ApplicationModal";
import { EditApplicationModal } from "../../(components)/EditApplicationModal";

const SelfApplicationTable = () => {
  const [jobDemandId, setJobDemandId] = useState("");
  const [status, setStatus] = useState("");
  const [selectedViewId, setSelectedViewId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const { data: jobs } = useGetJobs({ size: 1000 });

  const { data, isLoading } = useGetSelfApplicationQuery({
    ...(jobDemandId && { jobDemandId: Number(jobDemandId) }),
    ...(status && { status }),
    pageable: {
      page: 0,
      size: 100,
    },
  });

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
        accessorKey: "country",
        header: "Country",
        cell: ({ row }) => (
          console.log("row", row.original),
          <Box>
            <Text fontSize="sm" color="gray.700">
              {row.original.country}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {row.original.city}
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
              onClick={() => setSelectedViewId(row.original.id)}
            >
              View
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
              onClick={() => setEditId(row.original.id)}
            >
              Update Status
            </Box>
          </HStack>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Self Applications
      </Text>

      <Stack gap={4}>
        <HStack gap={4}>
          <NativeSelect.Root w="250px">
            <NativeSelect.Field
              value={jobDemandId}
              onChange={(e) => setJobDemandId(e.target.value)}
              bg="white"
            >
              <option value="">All Jobs</option>
              {jobs?.content?.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>

          <NativeSelect.Root w="200px">
            <NativeSelect.Field
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              bg="white"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
              <option value="SHORTLISTED">Shortlisted</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </HStack>

        <Datatable
          columns={columns}
          data={data?.content ?? []}
          isLoading={isLoading}
        />
      </Stack>

      <ApplicationModal
        applicationId={selectedViewId}
        type="self"
        open={!!selectedViewId}
        onClose={() => setSelectedViewId(null)}
      />

      <EditApplicationModal
        applicationId={editId}
        type="self"
        open={!!editId}
        onClose={() => setEditId(null)}
      />
    </>
  );
};

export default SelfApplicationTable;
