"use client";
import {
  AgencyListType,
  useApproveRejectAgencyMutation,
  useGetAgenciesQuery,
} from "@/api/admin";
import { ConfirmationDialog } from "@/components/ui/confirmationDialog";
import { Datatable } from "@/shared/ui/datatable";
import { HStack, Tabs, Text, useDisclosure } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import { Row } from "@tanstack/react-table";

const TAB_STATUSES = ["PENDING", "APPROVED", "REJECTED"] as const;
type Status = (typeof TAB_STATUSES)[number];

const AgencyTable = ({ status }: { status: Status }) => {
  const { data, isLoading } = useGetAgenciesQuery({ status });
  const { onClose, onOpen, open } = useDisclosure();
  const { mutate: approveRejectAgency, isPending } =
    useApproveRejectAgencyMutation();

  const [selectedAgency, setSelectedAgency] = useState<{
    userId: number;
    action: "Approve" | "Reject";
  } | null>(null);

  const handleActionClick = useCallback(
    (userId: number, action: "Approve" | "Reject") => {
      setSelectedAgency({ userId, action });
      onOpen();
    },
    [onOpen],
  );
  const handleSubmit = (rejectedReason?: string) => {
    if (!selectedAgency) return;
    approveRejectAgency(
      {
        userId: selectedAgency.userId,
        action: selectedAgency.action.toUpperCase(),
        rejectedReason: rejectedReason,
      },
      {
        onSuccess: () => {
          onClose();
          setSelectedAgency(null);
        },
      },
    );
  };

  const columns = useMemo<ColumnDef<AgencyListType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "S.N.",
        cell: ({ row }) => row.index + 1,
      },
      { accessorKey: "email", header: "Email" },

      ...(status === "PENDING"
        ? [
            {
              accessorKey: "action",
              header: "Actions",
              cell: ({ row }: { row: Row<AgencyListType> }) => (
                <HStack gap={6} cursor="pointer">
                  <LuCheck
                    size={20}
                    color="green"
                    onClick={() =>
                      handleActionClick(row.original.userId, "Approve")
                    }
                  />
                  <LuX
                    size={20}
                    color="red"
                    onClick={() =>
                      handleActionClick(row.original.userId, "Reject")
                    }
                  />
                </HStack>
              ),
            },
          ]
        : []),
    ],
    [status, handleActionClick],
  );
  return (
    <>
      <Datatable columns={columns} data={data ?? []} isLoading={isLoading} />
      <ConfirmationDialog
        open={open}
        onClose={onClose}
        title={`Are you sure you want to ${selectedAgency?.action}?`}
        handleSubmit={handleSubmit}
        action={selectedAgency?.action ?? "Approve"}
        submitActionPending={isPending}
        showRejectReason={selectedAgency?.action === "Reject"}
      />
    </>
  );
};

const AgencyList = () => {
  const [activeTab, setActiveTab] = useState<Status>("PENDING");

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Agencies
      </Text>
      <Tabs.Root
        value={activeTab}
        onValueChange={(e) => setActiveTab(e.value as Status)}
        variant="enclosed"
      >
        <Tabs.List>
          {TAB_STATUSES.map((status) => (
            <Tabs.Trigger key={status} value={status}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.ContentGroup>
          {TAB_STATUSES.map((status) => (
            <Tabs.Content key={status} value={status} px={0}>
              {activeTab === status && <AgencyTable status={status} />}
            </Tabs.Content>
          ))}
        </Tabs.ContentGroup>
      </Tabs.Root>
    </>
  );
};

export default AgencyList;
