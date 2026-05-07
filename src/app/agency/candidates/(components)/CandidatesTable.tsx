"use client";

import {
  Candidate,
  CandidatesResponse,
  useGetAllCandidates,
} from "@/api/candidates";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button } from "@/shared";
import { Datatable, TableActions } from "@/shared/ui/datatable";
import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useMemo, useState } from "react";
import AddOrEditCandidates from "./AddorEditCandidates";

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
          resetId={() => {}}
        />
      </Stack>
    </>
  );
};

export default CandidatesTable;
