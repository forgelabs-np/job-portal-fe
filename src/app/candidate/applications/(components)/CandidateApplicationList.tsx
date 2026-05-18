"use client";

import {
  CandidateApplicationType,
  useGetCandidateApplications,
  useWithdrawCandidateApplicationMutation,
} from "@/api/candidate-api";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Datatable } from "@/shared/ui/datatable";
import { Box, HStack, NativeSelect, Stack, Text, Badge } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import CandidateApplicationModal from "./CandidateApplicationModal";

const StatusBadge = ({
  status,
}: {
  status: CandidateApplicationType["status"];
}) => {
  const colorMap: Record<string, string> = {
    PENDING: "orange",
    APPROVED: "green",
    SHORTLISTED: "blue",
    REJECTED: "red",
    WITHDRAWN: "gray",
  };

  return (
    <Badge
      colorPalette={colorMap[status] || "gray"}
      fontSize="xs"
      px={2}
      py={0.5}
      borderRadius="full"
    >
      {status}
    </Badge>
  );
};

const CandidateApplicationList = () => {
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data, isLoading } = useGetCandidateApplications({
    ...(status && { status }),
  });

  const { mutate: withdraw } = useWithdrawCandidateApplicationMutation();

  const columns = useMemo<ColumnDef<CandidateApplicationType>[]>(
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
              {row.original.jobCity}, {row.original.jobCountry}
            </Text>
          </Box>
        ),
      },
      {
        accessorKey: "appliedAt",
        header: "Applied Date",
        cell: ({ row }) => (
          <Text fontSize="sm" color="gray.600">
            {new Date(row.original.appliedAt).toLocaleDateString()}
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
              onClick={() => setSelectedId(row.original.id)}
            >
              View Details
            </Box>
            {row.original.status === "PENDING" && (
              <Box
                as="button"
                px={3}
                py={1.5}
                fontSize="xs"
                fontWeight="600"
                color="red.500"
                border="1px solid"
                borderColor="red.300"
                borderRadius="6px"
                cursor="pointer"
                bg="transparent"
                transition="all 0.15s"
                _hover={{ bg: "red.500", color: "white" }}
                onClick={() => withdraw(row.original.id)}
              >
                Withdraw
              </Box>
            )}
          </HStack>
        ),
      },
    ],
    [withdraw],
  );

  return (
    <>
      <Stack gap={4}>
        <HStack justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="xl">
            My Applications
          </Text>
          <NativeSelect.Root w="200px">
            <NativeSelect.Field
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              bg="white"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="WITHDRAWN">Withdrawn</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </HStack>

        <Datatable
          columns={columns}
          data={data ?? []}
          isLoading={isLoading}
        />
      </Stack>

      <CandidateApplicationModal
        applicationId={selectedId}
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
};

export default CandidateApplicationList;
