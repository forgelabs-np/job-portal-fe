"use client";
import {
  AgencyListType,
  useGetAgencyProfileDetailsQuery,
  useGetAgenciesQuery,
  useProcessAgencyDocumentMutation,
  useProcessAgencyProfileMutation,
} from "@/api/admin";
import { AgencyProfileReviewDialog } from "@/app/agency/(components)/AgencyProfileReviewDialog";
import { ConfirmationDialog } from "@/components/ui/confirmationDialog";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button } from "@/shared";
import { Datatable } from "@/shared/ui/datatable";
import { HStack, Tabs, Text, useDisclosure } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { Row } from "@tanstack/react-table";

const TAB_STATUSES = ["PENDING", "APPROVED", "REJECTED"] as const;
type Status = (typeof TAB_STATUSES)[number];
type ModalMode = "view" | "edit";
type ConfirmAction = "Approve" | "Reject";
type ActionScope = "PROFILE" | "DOCUMENT";

const AgencyTable = ({ status }: { status: Status }) => {
  const { data, isLoading } = useGetAgenciesQuery({ status });
  const {
    onClose: onCloseConfirm,
    onOpen: onOpenConfirm,
    open: openConfirm,
  } = useDisclosure();
  const {
    onClose: onCloseProfileModal,
    onOpen: onOpenProfileModal,
    open: openProfileModal,
  } = useDisclosure();
  const { mutate: processAgencyProfile, isPending: isProcessingProfile } =
    useProcessAgencyProfileMutation();
  const { mutate: processAgencyDocument, isPending: isProcessingDocument } =
    useProcessAgencyDocumentMutation();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("view");
  const [selectedAction, setSelectedAction] = useState<{
    scope: ActionScope;
    action: ConfirmAction;
    id: number;
  } | null>(null);

  const {
    data: selectedProfile,
    isLoading: isLoadingProfile,
    refetch,
  } = useGetAgencyProfileDetailsQuery(
    selectedUserId ?? undefined,
    openProfileModal,
  );

  const handleOpenModal = useCallback(
    (userId: number, mode: ModalMode) => {
      setSelectedUserId(userId);
      setModalMode(mode);
      onOpenProfileModal();
    },
    [onOpenProfileModal],
  );

  const handleActionClick = useCallback(
    (actionData: typeof selectedAction) => {
      setSelectedAction(actionData);
      onOpenConfirm();
    },
    [onOpenConfirm],
  );

  const handleSubmit = (rejectedReason?: string) => {
    if (!selectedAction) return;

    const statusValue =
      selectedAction.action === "Approve" ? "APPROVED" : "REJECTED";

    if (selectedAction.scope === "PROFILE") {
      processAgencyProfile(
        {
          userId: selectedAction.id,
          status: statusValue,
          rejectionReason: rejectedReason,
        },
        {
          onSuccess: () => {
            onCloseConfirm();
            setSelectedAction(null);
            refetch();
          },
        },
      );
      return;
    }

    processAgencyDocument(
      {
        documentId: selectedAction.id,
        status: statusValue,
        rejectionReason: rejectedReason,
      },
      {
        onSuccess: () => {
          onCloseConfirm();
          setSelectedAction(null);
          refetch();
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
      { accessorKey: "companyName", header: "Compny Name" },
      { accessorKey: "contactPersonName", header: "Contact Person Name" },
      { accessorKey: "contactPersonEmail", header: "Compny Person Email" },
      { accessorKey: "contactPersonPhone", header: "Phone Number" },
      // { accessorKey: "companyName", header: "Compny Name" },
      {
        accessorKey: "action",
        header: "Actions",
        cell: ({ row }: { row: Row<AgencyListType> }) => (
          <HStack gap={2}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOpenModal(row.original.userId, "view")}
            >
              View
            </Button>
            <Button
              size="sm"
              bg={WEBSITE_THEME_COLOR}
              _hover={{ opacity: 0.9 }}
              onClick={() => handleOpenModal(row.original.userId, "edit")}
            >
              Edit
            </Button>
          </HStack>
        ),
      },
    ],
    [handleOpenModal],
  );

  const submitActionPending = isProcessingProfile || isProcessingDocument;

  return (
    <>
      <Datatable columns={columns} data={data ?? []} isLoading={isLoading} />
      <AgencyProfileReviewDialog
        open={openProfileModal}
        onClose={() => {
          onCloseProfileModal();
          setSelectedUserId(null);
          setModalMode("view");
        }}
        mode={modalMode}
        profile={selectedProfile}
        isLoading={isLoadingProfile}
        onActionClick={handleActionClick}
      />
      <ConfirmationDialog
        open={openConfirm}
        onClose={onCloseConfirm}
        title={`Are you sure you want to ${selectedAction?.action}?`}
        handleSubmit={handleSubmit}
        action={selectedAction?.action ?? "Approve"}
        submitActionPending={submitActionPending}
        showRejectReason={selectedAction?.action === "Reject"}
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
        // colorPalette={"green"}
      >
        <Tabs.List>
          {TAB_STATUSES.map((status) => (
            <Tabs.Trigger
              key={status}
              value={status}
              color={activeTab === status ? WEBSITE_THEME_COLOR : "black"}
            >
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
