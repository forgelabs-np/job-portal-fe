"use client";

import { useGetApprovedCountries } from "@/api/country";
import {
  CreateJobFormType,
  useCreateJobMutation,
  useGetJobsById,
} from "@/api/job";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { createJobDefaultValues } from "@/constants/defaultVaules";
import { Dialog, FormProvider, TextFieldInput } from "@/shared";
import { SwitchFieldInput } from "@/shared/components/form/input/Switch";
import { SelectFieldInput } from "@/shared/ui/Select";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  HStack,
  Circle,
  Separator,
} from "@chakra-ui/react";
import {
  Briefcase,
  Users,
  DollarSign,
  FileText,
  Gift,
  Clock,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface SectionHeaderProps {
  icon: React.ReactNode;
  label: string;
  step: number;
}

const GENDER_OPTIONS = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Any", value: "ANY" },
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

interface BenefitRowProps {
  switchName: string;
  switchLabel: string;
  detailName: string;
  detailLabel: string;
}

function BenefitRow({
  switchName,
  switchLabel,
  detailName,
  detailLabel,
}: BenefitRowProps) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.100"
      _dark={{ borderColor: "gray.700", bg: "gray.800" }}
      borderRadius="lg"
      p={4}
      bg="gray.50"
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <SwitchFieldInput name={switchName} label={switchLabel} />
      <TextFieldInput name={detailName} label={detailLabel} />
    </Box>
  );
}

interface AddOrEditJobProps {
  onClose: () => void;
  open: boolean;
  id?: number;
  resetId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const AddOrEditJob = ({ onClose, open, id, resetId }: AddOrEditJobProps) => {
  const { data: countriesData } = useGetApprovedCountries();
  console.log(countriesData, "idddd");
  const countryOptions = (countriesData ?? []).map((c) => ({
    label: c.name,
    value: c.id,
  }));
  const isEdit = !!id;

  const methods = useForm<CreateJobFormType>({
    defaultValues: createJobDefaultValues,
  });

  const { reset } = methods;

  const { mutate: create, isPending } = useCreateJobMutation();

  const { data: jobsByIdData } = useGetJobsById(Number(id));
  const handleClose = () => {
    resetId(undefined);
    onClose();
  };

  useEffect(() => {
    if (isEdit && jobsByIdData) {
      const job = jobsByIdData;

      methods.reset({
        ...job,
        countryId: job?.country?.id,
        preferredNationalities: job?.preferredNationalities?.join(", "),
        accommodationProvided: job?.accommodationProvided ?? false,
        foodProvided: job?.foodProvided ?? false,
        transportationProvided: job?.transportationProvided ?? false,
        medicalInsuranceProvided: job?.medicalInsuranceProvided ?? false,
        airTicketProvided: job?.airTicketProvided ?? false,

        deadline: job?.deadline
          ? new Date(job.deadline).toISOString().split("T")[0]
          : "",
      });
    }
  }, [isEdit, jobsByIdData, methods]);

  const onSubmit = async (data: CreateJobFormType) => {
    try {
      const payload = {
        title: data.title,
        countryId: Number(data.countryId),
        city: data.city,
        description: data.description,
        requirements: data.requirements,
        totalSlots: Number(data.totalSlots),
        salaryAmount: Number(data.salaryAmount),
        salaryPeriod: data.salaryPeriod,
        genderPreference: data.genderPreference,
        preferredNationalities: data.preferredNationalities
          ? data.preferredNationalities
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
          : [],
        workingHoursPerWeek: Number(data.workingHoursPerWeek),
        minExperienceYears:
          data.minExperienceYears && Number(data.minExperienceYears),

        maxExperienceYears:
          data.maxExperienceYears && Number(data.maxExperienceYears),
        requiredSkills: data.requiredSkills,
        educationLevel: data.educationLevel,
        contractDurationYears:
          data.contractDurationYears && Number(data.contractDurationYears),
        probationPeriodMonths:
          data.probationPeriodMonths && Number(data.probationPeriodMonths),

        overtimePolicy: data.overtimePolicy,
        leavePolicy: data.leavePolicy,
        terminationClause: data.terminationClause,
        accommodationProvided: data.accommodationProvided,
        accommodationDetails: data.accommodationDetails,
        foodProvided: data.foodProvided,
        foodDetails: data.foodDetails,
        transportationProvided: data.transportationProvided,
        transportationDetails: data.transportationDetails,
        medicalInsuranceProvided: data.medicalInsuranceProvided,
        medicalInsuranceDetails: data.medicalInsuranceDetails,
        airTicketProvided: data.airTicketProvided,
        airTicketDetails: data.airTicketDetails,
        additionalBenefits: data.additionalBenefits,
        deadline: data.deadline
          ? new Date(data.deadline).toISOString()
          : undefined,
        ...(isEdit ? { id: id } : {}),
      };

      await create(
        { data: payload },
        {
          onSuccess: () => {
            reset(createJobDefaultValues);
            onClose();
          },
        },
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      title={isEdit ? "Edit Job" : "Add New Job"}
      size="xl"
      hasCloseTrigger
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" maxH="75vh">
          <Box flex="1" overflowY="auto" px={1} pr={3}>
            <SectionHeader
              step={1}
              icon={<Briefcase size={15} />}
              label="Basic Information"
            />
            <SimpleGrid columns={2} gap={4}>
              <TextFieldInput name="title" label="Job Title" required />
              <SelectFieldInput
                name="countryId"
                label="Country"
                options={countryOptions}
                placeholder="Select a country"
                required
              />{" "}
              <TextFieldInput name="city" label="City" />
              <TextFieldInput name="deadline" label="Deadline" type="date" />
            </SimpleGrid>
            <Box mt={4} display="flex" flexDirection="column" gap={4}>
              <TextFieldInput name="description" label="Description" required />
              <TextFieldInput
                name="requirements"
                label="Requirements"
                required
              />
            </Box>

            {/* 2 · Slots & Compensation */}
            <SectionHeader
              step={2}
              icon={<DollarSign size={15} />}
              label="Slots & Compensation"
            />
            <SimpleGrid columns={3} gap={4}>
              <TextFieldInput
                name="totalSlots"
                label="Total Slots"
                type="number"
                required
                placeholder="Enter total slots"

              />
              <TextFieldInput
                name="salaryAmount"
                label="Salary Amount"
                type="number"
                required
                placeholder="Enter salary amount"
              />
              <SelectFieldInput name="salaryPeriod" label="Salary Period" options={SALARY_PERIOD_OPTIONS} placeholder="Select salary period"
              />
            </SimpleGrid>

            <SectionHeader
              step={3}
              icon={<Users size={15} />}
              label="Candidate Requirements"
            />
            <SimpleGrid columns={2} gap={4}>
              <SelectFieldInput
                name="genderPreference"
                label="Gender Preference"
                options={GENDER_OPTIONS}
                placeholder="Select gender"
                required
              />
              <TextFieldInput
                name="preferredNationalities"
                label="Preferred Nationalities"
              />
              <TextFieldInput
                name="workingHoursPerWeek"
                label="Working Hours / Week"
                type="number"
                required
              />
              <TextFieldInput name="educationLevel" label="Education Level" />
              <TextFieldInput
                name="minExperienceYears"
                label="Min Experience (yrs)"
                type="number"
              />
              <TextFieldInput
                name="maxExperienceYears"
                label="Max Experience (yrs)"
                type="number"
              />
            </SimpleGrid>
            <Box mt={4}>
              <TextFieldInput name="requiredSkills" label="Required Skills" />
            </Box>

            <SectionHeader
              step={4}
              icon={<FileText size={15} />}
              label="Contract & Work Terms"
            />
            <SimpleGrid columns={2} gap={4}>
              <TextFieldInput
                name="contractDurationYears"
                label="Contract Duration (yrs)"
                type="number"
              />
              <TextFieldInput
                name="probationPeriodMonths"
                label="Probation Period (months)"
                type="number"
              />
              <TextFieldInput name="overtimePolicy" label="Overtime Policy" />
              <TextFieldInput name="leavePolicy" label="Leave Policy" />
              <TextFieldInput
                name="terminationClause"
                label="Termination Clause"
              />
            </SimpleGrid>

            <SectionHeader
              step={5}
              icon={<Gift size={15} />}
              label="Benefits"
            />
            <SimpleGrid columns={2} gap={3}>
              <BenefitRow
                switchName="accommodationProvided"
                switchLabel="Accommodation"
                detailName="accommodationDetails"
                detailLabel="Details"
              />
              <BenefitRow
                switchName="foodProvided"
                switchLabel="Food"
                detailName="foodDetails"
                detailLabel="Details"
              />
              <BenefitRow
                switchName="transportationProvided"
                switchLabel="Transportation"
                detailName="transportationDetails"
                detailLabel="Details"
              />
              <BenefitRow
                switchName="medicalInsuranceProvided"
                switchLabel="Medical Insurance"
                detailName="medicalInsuranceDetails"
                detailLabel="Details"
              />
              <BenefitRow
                switchName="airTicketProvided"
                switchLabel="Air Ticket"
                detailName="airTicketDetails"
                detailLabel="Details"
              />
            </SimpleGrid>
            <Box mt={4}>
              <TextFieldInput
                name="additionalBenefits"
                label="Additional Benefits"
              />
            </Box>

            {/* bottom padding so last field isn't hidden by footer */}
            <Box h={4} />
          </Box>

          {/* ── Fixed footer ── */}
          <Box
            pt={4}
            mt={2}
            borderTop="1px solid"
            borderColor="gray.200"
            _dark={{ borderColor: "gray.700" }}
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
              minW="120px"
            >
              {isEdit ? "Save Changes" : "Create Job"}
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddOrEditJob;
