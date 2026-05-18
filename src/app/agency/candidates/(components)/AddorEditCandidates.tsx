"use client";

import {
  CandidateProfile,
  MaritalStatus,
  useCreateCandidateMutation,
  useGetCandidateById,
  useUploadCandidateDocMutation,
} from "@/api/candidates";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Dialog, FormProvider, TextFieldInput, FileDropzone } from "@/shared";
import { SelectFieldInput } from "@/shared/ui/Select";
import {
  Box,
  Button,
  Circle,
  HStack,
  Separator,
  SimpleGrid,
  Text,
  Steps,
  Flex,
} from "@chakra-ui/react";
import { FileText, Folder, IdCard, User, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider as ReactHookFormProvider, useFieldArray, useForm } from "react-hook-form";
import { successNotification, errorNotification } from "@/utils/toast";

interface SectionHeaderProps {
  icon: React.ReactNode;
  label: string;
  step: number;
}

export function SectionHeader({ icon, label, step }: SectionHeaderProps) {
  return (
    <HStack gap={3} mb={4} mt={6}>
      <Circle
        size="32px"
        bg={WEBSITE_THEME_COLOR}
        color="white"
        fontSize="xs"
        fontWeight="bold"
        flexShrink={0}
      >
        {step}
      </Circle>

      <HStack
        gap={2}
        color={WEBSITE_THEME_COLOR}
        _dark={{ color: "green.300" }}
      >
        {icon}

        <Text
          fontWeight="600"
          fontSize="sm"
          letterSpacing="wide"
          textTransform="uppercase"
        >
          {label}
        </Text>
      </HStack>

      <Separator
        flex="1"
        borderColor="green.100"
        _dark={{ borderColor: "green.900" }}
      />
    </HStack>
  );
}

const MARITAL_STATUS_OPTIONS = [
  { label: "Single", value: "SINGLE" },
  { label: "Married", value: "MARRIED" },
  { label: "Divorced", value: "DIVORCED" },
  { label: "Widowed", value: "WIDOWED" },
];



const SALARY_PERIOD_OPTIONS = [
  {
    label: "hourly", value: "HOURLY"

  },
  {
    label: "Weekly", value: "WEEKLY"

  }
  , {
    label: "Monthly", value: "MONTHLY"

  }, {
    label: "Annually", value: "ANNUALLY"

  }
]

const DOCUMENT_TYPE_OPTIONS = [
  { label: "PCC", value: "PCC" },
  { label: "SLC", value: "SLC" },
  { label: "VISA", value: "VISA" },
  { label: "CV", value: "CV" },
  { label: "CERTIFICATE", value: "CERTIFICATE" },
  { label: "EXPERIENCE_LETTER", value: "EXPERIENCE_LETTER" },
  { label: "TRAINING_CERTIFICATE", value: "TRAINING_CERTIFICATE" },
  { label: "MEDICAL_CERTIFICATE", value: "MEDICAL_CERTIFICATE" },
];

export interface CandidateFormType {
  firstName: string;
  lastName: string;
  trade: string;
  dateOfBirth: string;
  maritalStatus: MaritalStatus;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  documentsFolderLink: string;
  introVideoLink: string;

  documents: {
    documentType: string;
    notes: string;
    file: File | any | null;
  }[];
}

const defaultValues: CandidateFormType = {
  firstName: "",
  lastName: "",
  trade: "",
  dateOfBirth: "",
  maritalStatus: "SINGLE",
  passportNumber: "",
  passportIssueDate: "",
  passportExpiryDate: "",
  documentsFolderLink: "",
  introVideoLink: "",

  documents: [
    {
      documentType: "",
      notes: "",
      file: null,
    },
  ],
};

interface AddOrEditCandidatesProps {
  onClose: () => void;
  open: boolean;
  id?: number;
  resetId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const getStatusStyles = (status?: string) => {
  switch (status) {
    case "NOT_STARTED":
      return {
        color: "gray.700",
        bg: "gray.100",
      };

    case "PENDING":
      return {
        color: "orange.700",
        bg: "orange.100",
      };

    case "DISPATCHED":
      return {
        color: "blue.700",
        bg: "blue.100",
      };

    case "RECEIVED":
      return {
        color: "green.700",
        bg: "green.100",
      };

    default:
      return {
        color: "gray.700",
        bg: "gray.100",
      };
  }
};

export const StatusBadge = ({ status }: { status?: string }) => {
  const styles = getStatusStyles(status);

  return (
    <Text
      px={3}
      py={1}
      rounded="full"
      fontSize="xs"
      fontWeight="700"
      width="fit-content"
      textTransform="capitalize"
      color={styles.color}
      bg={styles.bg}
      border="1px solid"
      borderColor={styles.bg}
    >
      {status?.replaceAll("_", " ") || "-"}
    </Text>
  );
};

const AddOrEditCandidates = ({
  onClose,
  open,
  id,
  resetId,
}: AddOrEditCandidatesProps) => {
  const isEdit = !!id;
  const [currentStep, setCurrentStep] = useState(0);
  const [createdCandidateId, setCreatedCandidateId] = useState<number | null>(null);

  const methods = useForm<CandidateFormType>({
    defaultValues,
  });

  const { control, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const { mutate: createCandidate, isPending } = useCreateCandidateMutation();
  const { mutateAsync: uploadDocument, isPending: isUploadingDocuments } =
    useUploadCandidateDocMutation();

  const { data: candidateData } = useGetCandidateById(Number(id));

  const handleClose = () => {
    resetId(undefined);
    reset(defaultValues);
    setCreatedCandidateId(null);
    setCurrentStep(0);
    onClose();
  };

  useEffect(() => {
    if (isEdit && candidateData) {
      const candidate = candidateData;

      methods.reset({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        trade: candidate.trade,
        dateOfBirth: candidate.dateOfBirth,
        maritalStatus: candidate.maritalStatus,
        passportNumber: candidate.passportNumber,
        passportIssueDate: candidate.passportIssueDate,
        passportExpiryDate: candidate.passportExpiryDate,
        documentsFolderLink: candidate.documentsFolderLink,
        introVideoLink: candidate.introVideoLink,

        documents:
          candidate.documents?.map((doc) => ({
            documentType: doc.documentType,
            notes: doc.notes || "",
            file: doc,
          })) ?? [],
      });
    }
  }, [candidateData, isEdit, methods]);

  const handleNextStep = (data: CandidateFormType) => {
    const payload: CandidateProfile = {
      id: id ?? 0,
      firstName: data.firstName,
      lastName: data.lastName,
      trade: data.trade,
      dateOfBirth: data.dateOfBirth,
      maritalStatus: data.maritalStatus,
      passportNumber: data.passportNumber,
      passportIssueDate: data.passportIssueDate,
      passportExpiryDate: data.passportExpiryDate,
      documentsFolderLink: data.documentsFolderLink,
      introVideoLink: data.introVideoLink,
      documents: [],
    };

    createCandidate(
      { data: payload },
      {
        onSuccess: (response: any) => {
          if (!isEdit) {
            const newId = response?.data?.data?.id;
            if (newId) {
              setCreatedCandidateId(newId);
            }
          }
          setCurrentStep(1);
        },
      },
    );
  };

  const handlePreviousStep = () => {
    setCurrentStep(0);
  };

  const handleUploadDocuments = async () => {
    const finalCandidateId = id ?? createdCandidateId;

    if (!finalCandidateId) {
      errorNotification("Candidate ID not found. Please complete step 1 first.");
      return;
    }

    const docList = methods.getValues("documents") || [];
    const docsToUpload = docList.filter(
      (doc) => doc.file instanceof File && doc.documentType
    );

    if (docsToUpload.length === 0) {
      handleClose();
      return;
    }

    try {
      await Promise.all(
        docsToUpload.map((doc) => {
          return uploadDocument({
            candidateId: finalCandidateId,
            documentType: doc.documentType,
            file: doc.file!,
          });
        })
      );


      handleClose();
    } catch (err) {

    }
  };

  const isBusy = isPending || isUploadingDocuments;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      title={isEdit ? "Edit Candidate" : "Add New Candidate"}
      size="xl"
      hasCloseTrigger
    >
      {currentStep === 0 ? (
        <FormProvider methods={methods} onSubmit={handleNextStep}>
          <Box display="flex" flexDirection="column" height="65vh" overflow="hidden">
            {/* Stepper Indicator */}
            <Steps.Root step={currentStep} count={2} mb={6} px={1} flexShrink={0}>
              <Steps.List>
                <Steps.Item index={0} title="Profile Info">
                  <Steps.Indicator />
                  <Box>
                    <Steps.Title>Profile Details</Steps.Title>
                    <Steps.Description>
                      Personal, job and passport details
                    </Steps.Description>
                  </Box>
                  <Steps.Separator />
                </Steps.Item>
                <Steps.Item index={1} title="Upload Documents">
                  <Steps.Indicator />
                  <Box>
                    <Steps.Title>Candidate Documents</Steps.Title>
                    <Steps.Description>
                      Upload verification documents
                    </Steps.Description>
                  </Box>
                  <Steps.Separator />
                </Steps.Item>
              </Steps.List>
            </Steps.Root>

            <Box
              display="flex"
              flexDirection="column"
              flex={1}
              minH={0}
              overflow="hidden"
            >
              <Box display="flex" flexDirection="column" flex={1} minH={0} overflow="hidden">
                <Box flex={1} overflowY="auto" px={1} pb={4}>
                  {/* Personal Info */}
                  <SectionHeader
                    step={1}
                    icon={<User size={15} />}
                    label="Personal Information"
                  />

                  <SimpleGrid columns={2} gap={4}>
                    <TextFieldInput name="firstName" label="First Name" required />
                    <TextFieldInput name="lastName" label="Last Name" required />
                    <TextFieldInput name="trade" label="Job" required />
                    <TextFieldInput
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      required
                    />
                    <SelectFieldInput
                      name="maritalStatus"
                      label="Marital Status"
                      options={MARITAL_STATUS_OPTIONS}
                      placeholder="Select status"
                      required
                    />
                  </SimpleGrid>

                  {/* Passport */}
                  <SectionHeader
                    step={2}
                    icon={<IdCard size={15} />}
                    label="Passport Details"
                  />

                  <SimpleGrid columns={2} gap={4}>
                    <TextFieldInput
                      name="passportNumber"
                      label="Passport Number"
                      required
                    />
                    <TextFieldInput
                      name="passportIssueDate"
                      label="Issue Date"
                      type="date"
                      required
                    />
                    <TextFieldInput
                      name="passportExpiryDate"
                      label="Expiry Date"
                      type="date"
                      required
                    />
                  </SimpleGrid>

                  {/* Links */}
                  <SectionHeader
                    step={3}
                    icon={<Folder size={15} />}
                    label="Documents & Media"
                  />

                  <Box display="flex" flexDirection="column" gap={4}>
                    <TextFieldInput
                      name="documentsFolderLink"
                      label="Documents Folder Link"
                    />
                    <TextFieldInput name="introVideoLink" label="Intro Video Link" />
                  </Box>

                  {isEdit && (
                    <>
                      <SectionHeader
                        step={4}
                        icon={<FileText size={15} />}
                        label="Candidate Status"
                      />
                      <SimpleGrid columns={2} gap={6} mb={5} p={5}>
                        <Box>
                          <Text fontSize="sm" color="gray.500" mb={1}>
                            PCC Status
                          </Text>
                          <StatusBadge status={candidateData?.statuses?.pccStatus} />
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500" mb={1}>
                            SLC Status
                          </Text>
                          <StatusBadge status={candidateData?.statuses?.slcStatus} />
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500" mb={1}>
                            Work Permit Status
                          </Text>
                          <StatusBadge
                            status={candidateData?.statuses?.workPermitStatus}
                          />
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500" mb={1}>
                            Visa Status
                          </Text>
                          <StatusBadge status={candidateData?.statuses?.visaStatus} />
                        </Box>
                      </SimpleGrid>
                    </>
                  )}
                </Box>

                {/* Step 0 Footer */}
                <Box
                  pt={4}
                  mt={2}
                  borderTop="1px solid"
                  borderColor="gray.200"
                  _dark={{
                    borderColor: "gray.700",
                  }}
                  display="flex"
                  justifyContent="flex-end"
                  gap={3}
                  flexShrink={0}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isBusy}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    loading={isBusy}
                    bg={WEBSITE_THEME_COLOR}
                    minW="140px"
                  >
                    Save & Continue &rarr;
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </FormProvider>
      ) : (
        <ReactHookFormProvider {...methods}>
          <Box display="flex" flexDirection="column" height="65vh" overflow="hidden">
            {/* Stepper Indicator */}
            <Steps.Root step={currentStep} count={2} mb={6} px={1} flexShrink={0}>
              <Steps.List>
                <Steps.Item index={0} title="Profile Info">
                  <Steps.Indicator />
                  <Box>
                    <Steps.Title>Profile Details</Steps.Title>
                    <Steps.Description>
                      Personal, job and passport details
                    </Steps.Description>
                  </Box>
                  <Steps.Separator />
                </Steps.Item>
                <Steps.Item index={1} title="Upload Documents">
                  <Steps.Indicator />
                  <Box>
                    <Steps.Title>Candidate Documents</Steps.Title>
                    <Steps.Description>
                      Upload verification documents
                    </Steps.Description>
                  </Box>
                  <Steps.Separator />
                </Steps.Item>
              </Steps.List>
            </Steps.Root>

            <Box
              display="flex"
              flexDirection="column"
              flex={1}
              minH={0}
              overflow="hidden"
            >
              <Box display="flex" flexDirection="column" flex={1} minH={0} overflow="hidden">
                <Box flex={1} overflowY="auto" px={1} pb={4}>
                  {/* Documents */}
                  <SectionHeader
                    step={1}
                    icon={<FileText size={15} />}
                    label="Candidate Documents"
                  />

                  <Box display="flex" flexDirection="column" gap={4}>
                    {fields.map((field, index) => (
                      <Box
                        key={field.id}
                        border="1px solid"
                        borderColor="gray.200"
                        _dark={{
                          borderColor: "gray.700",
                        }}
                        rounded="lg"
                        p={4}
                      >
                        <SimpleGrid columns={2} gap={4}>
                          <SelectFieldInput
                            name={`documents.${index}.documentType`}
                            label="Document Type"
                            options={DOCUMENT_TYPE_OPTIONS}
                            placeholder="Select document type"
                            required
                          />

                          <TextFieldInput
                            name={`documents.${index}.notes`}
                            label="Notes"
                          />

                          <Box gridColumn="span 2">
                            <FileDropzone
                              value={methods.watch(`documents.${index}.file`)}
                              onChange={(file) =>
                                methods.setValue(`documents.${index}.file`, file)
                              }
                              label="Document File"
                            />
                          </Box>
                        </SimpleGrid>

                        <Button
                          type="button"
                          mt={4}
                          size="sm"
                          colorPalette="red"
                          variant="outline"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        append({
                          documentType: "",
                          notes: "",
                          file: null,
                        })
                      }
                    >
                      Add Document
                    </Button>
                  </Box>
                </Box>

                {/* Step 1 Footer */}
                <Box
                  pt={4}
                  mt={2}
                  borderTop="1px solid"
                  borderColor="gray.200"
                  _dark={{
                    borderColor: "gray.700",
                  }}
                  display="flex"
                  justifyContent="flex-end"
                  gap={3}
                  flexShrink={0}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isBusy}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    disabled={isBusy}
                  >
                    Previous
                  </Button>

                  <Button
                    // type="submit"
                    onClick={handleUploadDocuments}
                    loading={isBusy}
                    bg={WEBSITE_THEME_COLOR}
                    minW="140px"
                  >
                    Submit & Finish
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </ReactHookFormProvider>
      )}
    </Dialog>
  );
};

export default AddOrEditCandidates;
