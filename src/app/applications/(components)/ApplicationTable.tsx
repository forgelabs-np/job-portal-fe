"use client";

import {
  ApplicationType,
  useGetApplicationQuery,
} from "@/api/admin-applcations";
import { useGetAgenciesQuery } from "@/api/admin";
import { useGetJobs } from "@/api/job";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Datatable } from "@/shared/ui/datatable";
import { Box, HStack, Stack, Text, NativeSelect } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ApplicationModal, StatusBadge } from "./ApplicationModal";
import { EditApplicationModal } from "./EditApplicationModal";

const ApplicationsTable = () => {
  const [jobDemandId, setJobDemandId] = useState("");
  const [agencyId, setAgencyId] = useState("");
  const [status, setStatus] = useState("");

  const { data: jobs } = useGetJobs({ size: 1000 });
  const { data: agencies } = useGetAgenciesQuery({ status: "APPROVED" });

  const { data, isLoading } = useGetApplicationQuery({
    ...(jobDemandId && { jobDemandId: Number(jobDemandId) }),
    ...(agencyId && { agencyId: Number(agencyId) }),
    ...(status && { status }),
    pageable: {
      page: 0,
      size: 100,
    },
  });

  const [selected, setSelected] = useState<ApplicationType | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

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
              onClick={() => setSelected(row.original)}
            >
              View
            </Box>

            {/* Edit button */}
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
        Applications
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
              {jobs?.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>

          <NativeSelect.Root w="250px">
            <NativeSelect.Field
              value={agencyId}
              onChange={(e) => setAgencyId(e.target.value)}
              bg="white"
            >
              <option value="">All Agencies</option>
              {agencies?.map((agency) => (
                <option key={agency.userId} value={agency.userId}>
                  {agency.email}
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
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
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
        application={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />

      <EditApplicationModal
        applicationId={editId}
        open={!!editId}
        onClose={() => setEditId(null)}
      />
    </>
  );
};

export default ApplicationsTable;
