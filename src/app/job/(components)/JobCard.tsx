import { Box, Text, Badge, HStack, Button, Icon } from "@chakra-ui/react";
import { Eye, Pencil, Trash2, MapPin, Users } from "lucide-react";

interface Country {
  name: string;
  currencyCode: string;
}

export interface Job {
  id: number;
  title: string;
  country: Country;
  city: string;
  totalSlots: number;
  filledSlots: number;
  remainingSlots: number;
  status: string;
  isOpen: boolean;
  salaryAmount: number;
  salaryCurrency: string;
  salaryPeriod: string;
  genderPreference: string;
  preferredNationalities: string[];
  workingHoursPerWeek: number | null;
  contractDurationYears: number | null;
  overtimePolicy: string | null;
  accommodationProvided: boolean;
  accommodationDetails: string | null;
  foodProvided: boolean;
  foodDetails: string | null;
  transportationProvided: boolean;
  transportationDetails: string | null;
  medicalInsuranceProvided: boolean;
  medicalInsuranceDetails: string | null;
  airTicketProvided: boolean;
  airTicketDetails: string | null;
  leavePolicy: string | null;
  probationPeriodMonths: number | null;
  terminationClause: string | null;
  additionalBenefits: string | null;
}

interface JobCardProps {
  job: Job;
  onView: (job: Job) => void;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}

export function JobCard({ job, onView, onEdit, onDelete }: JobCardProps) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p={5}
      bg="white"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
      w="fit-content"
      display="flex"
      flexDirection="column"
      gap={6}
    >
      <HStack justify="space-between" align="flex-start">
        <Text fontWeight="semibold" fontSize="md">
          {job.title}
        </Text>
        <Badge
          colorPalette={job.isOpen ? "green" : "gray"}
          variant="subtle"
          borderRadius="full"
          px={3}
        >
          {job.status.charAt(0) + job.status.slice(1).toLowerCase()}
        </Badge>
      </HStack>

      <HStack gap={4} color="gray.500" fontSize="sm">
        <HStack gap={1}>
          <Icon as={MapPin} boxSize={4} />
          <Text>{job.country.name}</Text>
        </HStack>
        <HStack gap={1}>
          <Icon as={Users} boxSize={4} />
          <Text>
            {job.filledSlots}/{job.totalSlots} vacancies
          </Text>
        </HStack>
      </HStack>

      <Text fontSize="sm">
        Salary:{" "}
        <Text as="span" fontWeight="semibold">
          {job.salaryCurrency} {job.salaryAmount.toLocaleString()}
        </Text>
      </Text>

      <HStack gap={5} mt={1}>
        <Button variant="outline" size="sm" onClick={() => onView(job)}>
          <Eye />
          View
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(job)}>
          <Pencil />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          colorPalette="red"
          onClick={() => onDelete(job)}
        >
          <Trash2 />
          Delete
        </Button>
      </HStack>
    </Box>
  );
}
