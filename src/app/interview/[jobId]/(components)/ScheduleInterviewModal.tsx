"use client";

import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import {
  Textarea,
  Stack,
  Field,
  Text,
  Box,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Dialog, FormProvider, TextFieldInput, DateFieldInput } from "@/shared";
import { MultiSelectFieldInput } from "@/shared/ui/MultiSelectFieldInput";
import { SelectFieldInput } from "@/shared/ui/Select";

import {
  useCreateOrUpdateInterviewMutation,
  useGetInterviewByIdQuery,
  InterviewRequest,
} from "@/api/admin-interview";
import { format, parseISO } from "date-fns";
import { scheduleInterviewSchema } from "@/schema/interview";
import { yupResolver } from "@hookform/resolvers/yup";

interface CandidateOption {
  id: number;
  name: string;
}

interface ScheduleInterviewModalProps {
  open: boolean;
  onClose: () => void;
  candidate?: CandidateOption;
  candidates?: CandidateOption[];
  isBulk?: boolean;
  existingInterviewId?: number;
}

interface ScheduleInterviewFormValues {
  candidateIds: number[];
  mode: "ONLINE" | "IN_PERSON";
  date: string;
  time: string;
  locationOrUrl: string;
  notes: string;
  timezone: string;
}

export function ScheduleInterviewModal({
  open,
  onClose,
  candidate,
  candidates = [],
  isBulk = false,
  existingInterviewId,
}: ScheduleInterviewModalProps) {
  const { data: existingInterview } = useGetInterviewByIdQuery(
    existingInterviewId ?? null
  );

  const methods = useForm<ScheduleInterviewFormValues, any, ScheduleInterviewFormValues>({
    resolver: yupResolver(scheduleInterviewSchema),
    defaultValues: {
      candidateIds: candidate ? [candidate.id] : [],
      mode: "ONLINE",
      date: "",
      time: "",
      locationOrUrl: "",
      notes: "",
      timezone: "NEPAL",
    },
  });

  const { reset, watch, register, setValue, formState: { isValid } } = methods;
  const mode = watch("mode");

  useEffect(() => {
    if (existingInterview) {
      const parsedDate = parseISO(existingInterview.scheduledAt);
      setValue("mode", existingInterview.interviewType);
      setValue("date", format(parsedDate, "yyyy-MM-dd"));
      setValue("time", format(parsedDate, "HH:mm"));
      setValue(
        "locationOrUrl",
        existingInterview.interviewType === "ONLINE"
          ? existingInterview.interviewLink
          : existingInterview.venue ?? ""
      );
      setValue("notes", existingInterview.adminNotes ?? "");
      setValue("timezone", existingInterview.timezone);
    }
  }, [existingInterview, setValue]);

  // Sync single candidate id
  useEffect(() => {
    if (candidate && !isBulk) {
      setValue("candidateIds", [candidate.id]);
    }
  }, [candidate, isBulk, setValue]);

  const candidateOptions = candidates.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const { mutateAsync: scheduleInterview, isPending } =
    useCreateOrUpdateInterviewMutation();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: ScheduleInterviewFormValues) => {
    try {
      const scheduledAt = `${data.date}T${data.time}:00`;

      const payloadBase = {
        scheduledAt,
        timezone: data.timezone,
        interviewType: data.mode,
        interviewLink: data.mode === "ONLINE" ? data.locationOrUrl : "",
        venue: data.mode === "IN_PERSON" ? data.locationOrUrl : "",
        adminNotes: data.notes,
      } satisfies Partial<InterviewRequest>;

      // ── Reschedule existing interview ──
      if (existingInterviewId && existingInterview) {
        await scheduleInterview({
          ...payloadBase,
          id: existingInterviewId,
          jobApplicationId: existingInterview.jobApplicationId,
        });
        handleClose();
        return;
      }

      // ── New interview(s) ──
      let ids: number[] = [];
      if (isBulk) {
        ids = data.candidateIds;
      } else if (candidate) {
        ids = [candidate.id];
      } else if (data.candidateIds?.length > 0) {
        ids = data.candidateIds;
      }

      if (ids.length === 0) return;

      await Promise.all(
        ids.map((jobApplicationId) =>
          scheduleInterview({ ...payloadBase, jobApplicationId })
        )
      );

      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      size="md"
      title="Schedule Interview"
      hasCloseTrigger
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box maxH="60vh" overflowY="auto" pr={2}>
          <Stack gap={4}>
            <Box p={3} bg="blue.50" borderRadius="md" mb={2}>
              <Text fontSize="sm" fontWeight="500" color="blue.700">
                {isBulk
                  ? `Schedule a bulk interview for selected candidates.`
                  : `Scheduling interview for ${candidate?.name}.`}
              </Text>
            </Box>

            {isBulk && (
              <MultiSelectFieldInput
                name="candidateIds"
                label="Select Candidates"
                options={candidateOptions}
                placeholder="Select candidates"
                required
              />
            )}

            <SelectFieldInput
              name="mode"
              label="Interview Mode"
              options={[
                { label: "Online", value: "ONLINE" },
                { label: "In-person", value: "IN_PERSON" },
              ]}
              required
            />

            <SelectFieldInput
              name="timezone"
              label="Timezone"
              options={[{ label: "NEPAL", value: "NEPAL" }]}
              required
            />

            <HStack gap={4} align="flex-start">
              <DateFieldInput
                name="date"
                label="Interview Date"
                required
                bg="white"
                min={new Date().toISOString().split('T')[0]}
              />

              <TextFieldInput
                name="time"
                label="Interview Time"
                type="time"
                required
                bg="white"
                min={new Date().toISOString()}
              />
            </HStack>

            <TextFieldInput
              name="locationOrUrl"
              label={
                mode === "ONLINE"
                  ? "Interview URL / Meeting Link"
                  : "Location"
              }
              type="text"
              placeholder={
                mode === "ONLINE"
                  ? "https://meet.google.com/..."
                  : "Enter physical address..."
              }
              required
              bg="white"
            />

            <Field.Root>
              <Field.Label>Notes / Instructions</Field.Label>
              <Textarea
                placeholder="Any special instructions for the candidate..."
                {...register("notes")}
                bg="white"
                rows={3}
              />

            </Field.Root>
          </Stack>
        </Box>

        {/* Fixed footer */}
        <Flex
          justify="flex-end"
          gap={3}
          mt={4}
          pt={4}
          borderTop="1px solid"
          borderColor="gray.200"
          bg="white"
          position="sticky"
          bottom={0}
        >
          <Button variant="outline" onClick={handleClose} type="button">
            Cancel
          </Button>

          <Button
            bg={WEBSITE_THEME_COLOR}
            color="white"
            _hover={{ bg: "green.700" }}
            type="submit"
            disabled={!isValid || isPending}
            loading={isPending}
          >
            {existingInterviewId ? "Reschedule" : "Schedule"}
          </Button>
        </Flex>
      </FormProvider>
    </Dialog>
  );
}