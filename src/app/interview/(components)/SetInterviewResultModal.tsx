"use client";

import React, { useState } from "react";

import { Button } from "@/shared/ui/button";

import { Dialog } from "@/shared/ui/dialog";

import {
  useSetInterviewResultMutation,
  InterviewResultRequest,
} from "@/api/admin-interview";

import {
  Box,
  Textarea,
  VStack,
  HStack,
  Text,
  Badge,
} from "@chakra-ui/react";

import {
  useForm,
  FormProvider,
} from "react-hook-form";

import { SelectFieldInput } from "@/shared/ui/Select";
import { MdOutlineEdit } from "react-icons/md";

import {
  errorNotification,
  successNotification,
} from "@/utils/toast";

interface SetInterviewResultModalProps {
  interviewId: number;
  candidateName: string;
  currentResult?: string;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}

const resultColors: Record<string, string> = {
  PASS: "green",
  FAIL: "red",
  RE_INTERVIEW: "orange",
  PENDING: "gray",
};

export const SetInterviewResultModal: React.FC<
  SetInterviewResultModalProps
> = ({
  interviewId,
  candidateName,
  currentResult = "PENDING",
  onSuccess,
  trigger,
  open: controlledOpen,
  onClose: controlledOnClose,
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const handleClose = () => {
      if (isControlled && controlledOnClose) controlledOnClose();
      else setInternalOpen(false);
    };

    const methods =
      useForm<InterviewResultRequest>({
        defaultValues: {
          result:
            (currentResult as any) ||
            "PENDING",
          resultNotes: "",
        },
      });

    const { handleSubmit, reset } =
      methods;

    const { mutate: setResult, isPending } =
      useSetInterviewResultMutation();

    const onSubmit = (
      data: InterviewResultRequest
    ) => {
      setResult(
        {
          interviewId,
          payload: data,
        },
        {
          onSuccess: () => {
            successNotification(
              "Interview result updated successfully!"
            );

            reset();
            handleClose();
            onSuccess?.();
          },

          onError: (err: unknown) => {
            errorNotification(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (err as any)?.response?.data
                ?.message || "Failed to update interview result"
            );
          },
        }
      );
    };

    return (
      <>
        {!isControlled && trigger ? (
          <div onClick={() => setInternalOpen(true)} style={{ width: '100%' }}>
            {trigger}
          </div>
        ) : !isControlled ? (
          <Button variant="outline" size="sm" onClick={() => setInternalOpen(true)}>
            <HStack gap={1} align="center">
              <MdOutlineEdit size={16} />
              <Text>Set Result</Text>
            </HStack>
          </Button>
        ) : null}

        <Dialog
          open={open}
          onClose={handleClose}
          title="Set Interview Result"
          hasCloseTrigger
          size="lg"
          contentMinWidth="500px"
        >
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
            >
              <VStack
                gap={4}
                align="stretch"
              >
                <Box>
                  <Text
                    fontSize="sm"
                    color="gray.600"
                  >
                    Candidate
                  </Text>

                  <Text
                    fontWeight="600"
                    fontSize="md"
                  >
                    {candidateName}
                  </Text>
                </Box>

                {currentResult &&
                  currentResult !==
                  "PENDING" && (
                    <Box>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        mb={2}
                      >
                        Current Result
                      </Text>

                      <Badge
                        colorScheme={
                          resultColors[
                          currentResult
                          ] || "gray"
                        }
                        fontSize="sm"
                        px={3}
                        py={1}
                      >
                        {currentResult}
                      </Badge>
                    </Box>
                  )}

                <SelectFieldInput
                  name="result"
                  label="Interview Result"
                  options={[
                    {
                      label: "Pending",
                      value: "PENDING",
                    },
                    {
                      label: "Pass",
                      value: "PASS",
                    },
                    {
                      label: "Fail",
                      value: "FAIL",
                    },
                    {
                      label:
                        "Re-Interview Required",
                      value:
                        "RE_INTERVIEW",
                    },
                  ]}
                  required
                />

                <Textarea
                  placeholder="Add notes about the interview result..."
                  rows={4}
                  fontSize="sm"
                  {...methods.register(
                    "resultNotes"
                  )}
                />

                <HStack
                  justify="flex-end"
                  pt={4}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending
                      ? "Updating..."
                      : "Update Result"}
                  </Button>
                </HStack>
              </VStack>
            </form>
          </FormProvider>
        </Dialog>
      </>
    );
  };