"use client";

import {
  Candidate,
  CandidatesResponse,
  useGetAllCandidates,
} from "@/api/candidates";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button } from "@/shared";
import { Datatable, TableActions } from "@/shared/ui/datatable";
import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useMemo, useState } from "react";
import AddOrEditCandidates, { StatusBadge } from "./AddorEditCandidates";

const CandidatesTable = () => {
  const { data, isLoading } = useGetAllCandidates();
  const [id, setId] = useState<number>();
  const [modalOpen, setModalOpen] = useState(false);
  const handleEdit = useCallback((candidateId: number) => {
    setId(candidateId);
    setModalOpen(true);
  }, []);

  const columns = useMemo<ColumnDef<Candidate>[]>(
    () => [
      {
        accessorKey: "id",
        header: "S.N.",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "fullName",
        header: "Full Name",
      },
      { accessorKey: "maritalStatus", header: "Martial Status" },
      { accessorKey: "trade", header: "Trade" },

      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const statuses = row.original.statuses;

          return (
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <Text fontSize="xs" minW="90px">
                  PCC
                </Text>

                <StatusBadge status={statuses?.pccStatus} />
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <Text fontSize="xs" minW="90px">
                  SLC
                </Text>

                <StatusBadge status={statuses?.slcStatus} />
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <Text fontSize="xs" minW="90px">
                  Work Permit
                </Text>

                <StatusBadge status={statuses?.workPermitStatus} />
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <Text fontSize="xs" minW="90px">
                  Visa
                </Text>

                <StatusBadge status={statuses?.visaStatus} />
              </Box>
            </Box>
          );
        },
      },

      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <TableActions
            onEdit={() => {
              handleEdit(row.original.id);
            }}
          />
        ),
      },
    ],
    [handleEdit],
  );

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Agencies
      </Text>
      <Stack gap={4}>
        <HStack justify="flex-end">
          <Button bg={WEBSITE_THEME_COLOR} onClick={() => setModalOpen(true)}>
            Add Candidates
          </Button>
        </HStack>

        <Datatable columns={columns} data={data ?? []} isLoading={isLoading} />

        <AddOrEditCandidates
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          id={id}
          resetId={setId}
        />
      </Stack>
    </>
  );
};

export default CandidatesTable;
