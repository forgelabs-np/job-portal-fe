"use client";

import { useGetAgenciesQuery } from "@/api/admin";
import { AssignJobPayloadType, useAssignJobMutation } from "@/api/job";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button, Dialog, FormProvider } from "@/shared";
import { MultiSelectFieldInput } from "@/shared/ui/MultiSelectFieldInput";
import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";


interface AssignJobModalProps {
  jobId: number | null;
  jobTitle?: string;
  open: boolean;
  onClose: () => void;
}

interface AssignJobFormValues {
  agencyIds: (number | string)[];
}

const AssignJobModal = ({
  jobId,
  jobTitle,
  open,
  onClose,
}: AssignJobModalProps) => {
  const methods = useForm<AssignJobFormValues>({
    defaultValues: {
      agencyIds: [],
    },
  });

  const { reset, setValue } = methods;
  const selectedAgencyIds = useWatch({
    control: methods.control,
    name: "agencyIds",
  });

  const prevSelectAllRef = useRef<boolean>(false);

  const { data: agencies } = useGetAgenciesQuery({
    status: "APPROVED",
  });

  const realAgencyOptions =
    agencies?.map((agency) => ({
      label: agency.companyName,
      value: agency.userId,
    })) ?? [];

  const realAgencyIds = realAgencyOptions.map((o) => o.value);

  const agencyOptions = [
    { label: "Select All", value: "select_all" },
    ...realAgencyOptions,
  ];

  const { mutate: assignJob, isPending } = useAssignJobMutation();

  // Handle Select All toggle
  useEffect(() => {
    const hasSelectAll = selectedAgencyIds.includes("select_all");
    const hadSelectAll = prevSelectAllRef.current;

    if (hasSelectAll && !hadSelectAll) {
      // Select All was just clicked - select all real agencies
      setValue("agencyIds", ["select_all", ...realAgencyIds], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else if (!hasSelectAll && hadSelectAll) {
      // Select All was just unchecked - deselect all
      setValue("agencyIds", [], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    prevSelectAllRef.current = hasSelectAll;
  }, [selectedAgencyIds, realAgencyIds, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: AssignJobFormValues) => {
    if (!jobId) return;

    // Filter out the "select_all" option from the submission
    const agencyIds = data.agencyIds.filter((id) => id !== "select_all") as number[];

    const payload: AssignJobPayloadType = {
      data: {
        jobDemandId: jobId,
        agencyIds,
      },
    };

    assignJob(payload, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} size="md" hasCloseTrigger>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack align="stretch" gap={6}>
          <Stack>
            <Text fontSize="2xl" fontWeight="700" color="gray.900">
              Assign Job to Agencies
            </Text>
            <Text mt={1} fontSize="md" color="gray.500">
              Assigning{" "}
              <Text as="span" fontWeight="600" color="gray.700">
                {jobTitle ?? "this job"}
              </Text>{" "}
              to selected agencies.
            </Text>
          </Stack>

          <MultiSelectFieldInput
            name="agencyIds"
            label="Agencies"
            options={agencyOptions}
            placeholder="Select agencies"
            required
          />

          <HStack justify="flex-end" gap={3}>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              minW="100px"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isPending}
              minW="160px"
              bg={WEBSITE_THEME_COLOR}
            >
              Assign Job
            </Button>
          </HStack>
        </VStack>
      </FormProvider>
    </Dialog>
  );
};

export default AssignJobModal;
