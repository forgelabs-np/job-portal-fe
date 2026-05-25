import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Box, Text, Badge, HStack, Button, Icon } from "@chakra-ui/react";
import {
  MapPin,
  Users,
  Briefcase,
  Eye,
} from "lucide-react";
import { Job } from "@/app/job/(components)/JobCard";

interface InterviewJobCardProps {
  job: Job;
  onViewCandidates: (jobId: number) => void;
}

export function InterviewJobCard({
  job,
  onViewCandidates,
}: InterviewJobCardProps) {
  const benefitIcons = [
    job.accommodationProvided && "🏠",
    job.foodProvided && "🍽️",
    job.transportationProvided && "🚌",
    job.medicalInsuranceProvided && "🏥",
    job.airTicketProvided && "✈️",
  ].filter(Boolean) as string[];

  const filledSlots = job.filledSlots ?? 0;
  const totalSlots = job.totalSlots ?? 0;
  const remainingSlots = job.remainingSlots ?? Math.max(totalSlots - filledSlots, 0);
  const filledPercent =
    totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0;

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderBottom="1px solid"
      borderRadius="2xl"
      bg="white"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
      overflow="hidden"
      display="flex"
      flexDirection="column"
      transition="all 0.2s ease"
      _hover={{
        borderColor: "green.200",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        transform: "translateY(-2px)",
      }}
    >
      {/* Top accent bar */}
      <Box h="3px" bg={job.isOpen ? WEBSITE_THEME_COLOR : "gray.300"} />

      <Box p={5} display="flex" flexDirection="column" gap={4} flex="1">
        {/* Header */}
        <HStack justify="space-between" align="flex-start">
          <Box flex="1" pr={2}>
            <Text
              fontWeight="700"
              fontSize="md"
              color="gray.900"
              _dark={{ color: "white" }}
              lineHeight="1.3"
              mb={1}
            >
              {job.title}
            </Text>
            <HStack gap={3} color="gray.400" fontSize="xs">
              <HStack gap={1}>
                <Icon as={MapPin} boxSize={3} />
                <Text>
                  {job.country.name}
                  {job.city ? ` · ${job.city}` : ""}
                </Text>
              </HStack>
              {job.contractDurationYears && (
                <HStack gap={1}>
                  <Icon as={Briefcase} boxSize={3} />
                  <Text>{job.contractDurationYears}yr contract</Text>
                </HStack>
              )}
            </HStack>
          </Box>
          <Badge
            colorPalette={job.isOpen ? "green" : "gray"}
            variant="subtle"
            borderRadius="full"
            px={3}
            py={0.5}
            fontSize="xs"
            fontWeight="600"
            flexShrink={0}
          >
            {job.isOpen ? "● Open" : "● Closed"}
          </Badge>
        </HStack>

        {/* Salary */}
        <Box
          bg="green.50"
          _dark={{ bg: "green.900" }}
          borderRadius="xl"
          px={4}
          py={3}
        >
          <Text
            fontSize="10px"
            fontWeight="700"
            color="green.600"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={0.5}
          >
            Monthly Salary
          </Text>
          <Text
            fontSize="lg"
            fontWeight="800"
            color={WEBSITE_THEME_COLOR}
            _dark={{ color: "green.200" }}
          >
            {job.salaryCurrency} {job.salaryAmount.toLocaleString()}
          </Text>
        </Box>

        <Box>
          <HStack justify="space-between" mb={1.5}>
            <HStack gap={1} color="gray.500" fontSize="xs">
              <Icon as={Users} boxSize={3} />
              <Text>Vacancies</Text>
            </HStack>
            <Text
              fontSize="xs"
              fontWeight="600"
              color="gray.600"
              _dark={{ color: "gray.300" }}
            >
              {filledSlots} / {totalSlots} filled
            </Text>
          </HStack>
          <Box
            bg="gray.100"
            _dark={{ bg: "gray.700" }}
            borderRadius="full"
            h="5px"
            overflow="hidden"
          >
            <Box
              bg={filledPercent > 80 ? "orange.400" : "green.500"}
              h="100%"
              w={`${filledPercent}%`}
              borderRadius="full"
              transition="width 0.4s ease"
            />
          </Box>
          <Text fontSize="10px" color="gray.400" mt={1}>
            {remainingSlots} slots remaining
          </Text>
        </Box>

        {benefitIcons.length > 0 && (
          <HStack gap={1.5} flexWrap="wrap">
            {benefitIcons.map((icon, i) => (
              <Box
                key={i}
                bg="gray.50"
                _dark={{ bg: "gray.700" }}
                borderRadius="lg"
                px={2}
                py={1}
                fontSize="sm"
                border="1px solid"
                borderColor="gray.100"
              >
                {icon}
              </Box>
            ))}
            <Text fontSize="10px" color="gray.400" ml={1}>
              Benefits
            </Text>
          </HStack>
        )}
      </Box>

      {/* Footer actions */}
      <Box
        px={5}
        py={3}
        borderTop="1px solid"
        borderColor="gray.100"
        _dark={{ borderColor: "gray.700" }}
        bg="gray.50"
      >
        <Button
          w="full"
          size="sm"
          borderRadius="lg"
          fontSize="xs"
          fontWeight="600"
          onClick={() => onViewCandidates(job.id)}
          bg={WEBSITE_THEME_COLOR}
          color="white"
          _hover={{ bg: "green.700" }}
        >
          <Icon as={Eye} boxSize={3.5} mr={1} />
          View Candidates
        </Button>
      </Box>
    </Box>
  );
}
