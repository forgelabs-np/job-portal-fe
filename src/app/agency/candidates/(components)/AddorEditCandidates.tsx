"use client";

import {
  CandidateProfile,
  MaritalStatus,
  useCreateCandidateMutation,
  useGetCandidateById,
} from "@/api/candidates";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Dialog, FormProvider, TextFieldInput } from "@/shared";
import { SelectFieldInput } from "@/shared/ui/Select";
import {
  Box,
  Button,
  Circle,
  HStack,
  Separator,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FileText, Folder, IdCard, User, Video } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface SectionHeaderProps {
  icon: React.ReactNode;
  label: string;
  step: number;
}

function SectionHeader({ icon, label, step }: SectionHeaderProps) {
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
    documentName: string;
    documentLink: string;
    notes: string;
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
      documentName: "",
      documentLink: "",
      notes: "",
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

  const methods = useForm<CandidateFormType>({
    defaultValues,
  });

  const { control, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const { mutate: createCandidate, isPending } = useCreateCandidateMutation();

  const { data: candidateData } = useGetCandidateById(Number(id));

  const handleClose = () => {
    resetId(undefined);
    reset(defaultValues);
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
            documentName: doc.documentName,
            documentLink: doc.documentLink,
            notes: doc.notes,
          })) ?? [],
      });
    }
  }, [candidateData, isEdit, methods]);

  const onSubmit = (data: CandidateFormType) => {
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
      documents: data.documents,
    };

    createCandidate(
      { data: payload },
      {
        onSuccess: () => {
          reset(defaultValues);
          handleClose();
        },
      },
    );
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      title={isEdit ? "Edit Candidate" : "Add New Candidate"}
      size="xl"
      hasCloseTrigger
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" maxH="75vh">
          <Box flex="1" overflowY="auto" px={1} pr={3}>
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

            {/* Documents */}
            <SectionHeader
              step={4}
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
                      name={`documents.${index}.documentName`}
                      label="Document Name"
                    />
                    <TextFieldInput
                      name={`documents.${index}.documentLink`}
                      label="Document Link"
                    />
                    <TextFieldInput
                      name={`documents.${index}.notes`}
                      label="Notes"
                    />
                  </SimpleGrid>

                  <Button
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
                variant="outline"
                onClick={() =>
                  append({
                    documentType: "",
                    documentName: "",
                    documentLink: "",
                    notes: "",
                  })
                }
              >
                Add Document
              </Button>
            </Box>

            <Box h={4} />
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

                    <StatusBadge status={candidateData?.statuses.slcStatus} />
                  </Box>

                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={1}>
                      Work Permit Status
                    </Text>

                    <StatusBadge
                      status={candidateData?.statuses.workPermitStatus}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={1}>
                      Visa Status
                    </Text>

                    <StatusBadge status={candidateData?.statuses.visaStatus} />
                  </Box>
                </SimpleGrid>
              </>
            )}
          </Box>

          {/* Footer */}
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
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={isPending}
              bg={WEBSITE_THEME_COLOR}
              minW="140px"
            >
              {isEdit ? "Save Changes" : "Create Candidate"}
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddOrEditCandidates;
