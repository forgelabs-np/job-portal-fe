"use client";

import {
  Candidate,
  useGetAllCandidates,
} from "@/api/candidates";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button } from "@/shared";
import { TableActions } from "@/shared/ui/datatable";
import { DataTable } from "@/shared/ui/datatable/NewDataTable";
import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useMemo, useState } from "react";
import AddOrEditCandidates, { StatusBadge } from "./AddorEditCandidates";
import ViewCandidateDetails from "./ViewCandidateDetails";

const CandidatesTable = () => {
  const [payload, setPayload] = useState({
    page: 0,
    pageSize: 10,
  });
  
  const { data, isLoading } = useGetAllCandidates({
    page: payload.page,
    size: payload.pageSize,
  });
  
  const [id, setId] = useState<number>();
  const [modalOpen, setModalOpen] = useState(false);

  const [viewId, setViewId] = useState<number>();
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Calculate pagination values from API response
  const pageCount = data?.totalPages ?? 0;
  const totalRecords = data?.totalElements ?? 0;
  const displayCount = data?.content?.length ?? 0;
  const next = payload.page < pageCount;
  const previous = payload.page > 0;
  
  const handleEdit = useCallback((candidateId: number) => {
    setId(candidateId);
    setModalOpen(true);
  }, []);

  const handleView = useCallback((candidateId: number) => {
    setViewId(candidateId);
    setViewModalOpen(true);
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
        accessorKey: "PCC",
        header: "PCC",
        cell: ({ row }) => {
          const statuses = row.original.statuses;

          return <StatusBadge status={statuses?.pccStatus} />;
        },
      },
      {
        accessorKey: "slcStatus",
        header: "SLC",
        cell: ({ row }) => {
          const statuses = row.original.statuses;

          return <StatusBadge status={statuses?.slcStatus} />;
        },
      },
      {
        accessorKey: "workPermitStatus",
        header: "Work Permit Status",
        cell: ({ row }) => {
          const statuses = row.original.statuses;

          return <StatusBadge status={statuses?.workPermitStatus} />;
        },
      },
      {
        accessorKey: "visaStatus",
        header: "Visa Status",
        cell: ({ row }) => {
          const statuses = row.original.statuses;

          return <StatusBadge status={statuses?.visaStatus} />;
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
            onEdit={() => {
              handleEdit(row.original.id);
            }}
          />
        ),
      },
    ],
    [handleEdit, handleView],
  );

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Candidates
      </Text>
      <Stack gap={4}>
        <HStack justify="flex-end">
          <Button bg={WEBSITE_THEME_COLOR} onClick={() => setModalOpen(true)}>
            Add Candidates
          </Button>
        </HStack>

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
            // Handle search logic here
            console.log("Search:", searchTerm);
          }}
         
        />

        <AddOrEditCandidates
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          id={id}
          resetId={setId}
        />

        <ViewCandidateDetails
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          id={viewId}
          resetId={setViewId}
        />
      </Stack>
    </>
  );
};

export default CandidatesTable;
