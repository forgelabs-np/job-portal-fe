"use client";

import { useGetCandidateJobs } from "@/api/candidate-api";
import { Badge, Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Calendar,
  Clock,
  MapPin,
  Users
} from "lucide-react";
import Link from "next/link";
import { colors, radii } from "./theme";

const MotionBox = motion(Box);

// ─── Types based on API response ───────────────────────────
export interface Country {
  id?: number;
  name: string;
  code?: string;
  currencyCode: string | null;
  currencySymbol?: string | null;
  isEnabled?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface JobListing {
  id: number;
  title: string;
  country: Country;
  city: string;
  description: string;
  requirements: string;
  totalSlots: number;
  filledSlots: number | null;
  remainingSlots: number;
  appliedCount: number | null;
  status: "OPEN" | "CLOSED" | string;
  isOpen: boolean | null;
  salaryAmount: number;
  salaryCurrency: string;
  salaryPeriod: string;
  genderPreference: "MALE" | "FEMALE" | "ANY" | string;
  preferredNationalities: string[];
  minExperienceYears: number;
  maxExperienceYears: number;
  requiredSkills: string;
  educationLevel: string;
  workingHoursPerWeek: number;
  contractDurationYears: number;
  overtimePolicy: string;
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
  leavePolicy: string;
  probationPeriodMonths: number;
  terminationClause: string;
  additionalBenefits: string;
  deadline: string;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: string | null;
  isPublic: boolean;
}

// Helper function to calculate days left from deadline
const getDaysLeft = (deadline: string): number => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Helper function to format deadline date
const formatDeadline = (deadline: string): string => {
  const date = new Date(deadline);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Helper to get category from title/description/skills
const getCategoryFromJob = (job: JobListing): string => {
  const searchText = `${job.title} ${job.description} ${job.requiredSkills}`.toLowerCase();
  
  if (searchText.includes('healthcare') || searchText.includes('nurse') || searchText.includes('medical')) 
    return 'Healthcare';
  if (searchText.includes('caregiver') || searchText.includes('elderly') || searchText.includes('care giving')) 
    return 'Caregiving';
  if (searchText.includes('construct') || searchText.includes('welder') || searchText.includes('builder')) 
    return 'Construction';
  if (searchText.includes('security') || searchText.includes('guard')) 
    return 'Security';
  if (searchText.includes('hospitality') || searchText.includes('hotel') || searchText.includes('restaurant')) 
    return 'Hospitality';
  if (searchText.includes('manufactur') || searchText.includes('factory') || searchText.includes('production')) 
    return 'Manufacturing & Factory';
  
  return 'General';
};

// Helper to get company name (extract from description or use default)
const getCompanyName = (job: JobListing): string => {
  // If there's no explicit company field, derive from job title or description
  const words = job.description.split(' ');
  for (let i = 0; i < Math.min(words.length, 15); i++) {
    if (words[i].includes('Corp') || words[i].includes('Ltd') || 
        words[i].includes('Company') || words[i].includes('Inc')) {
      return words[i];
    }
  }
  return `${job.country.name} Recruitment`;
};

interface Props {
  jobs?: JobListing[];
  isLoading?: boolean;
}

function JobCard({ job, index }: { job: JobListing; index: number }) {
  const daysLeft = getDaysLeft(job.deadline);
  const urgent = daysLeft <= 45;
  const category = getCategoryFromJob(job);
  const companyName = getCompanyName(job);
  
  // Calculate daily working hours from weekly hours
  const hoursPerDay = Math.round(job.workingHoursPerWeek / 6);
  const daysPerWeek = job.workingHoursPerWeek > 40 ? 6 : 5;

  // Calculate monthly salary in NPR (assuming conversion rate, adjust as needed)
  const salaryNPR = job.salaryCurrency === 'EUR' 
    ? Math.round(job.salaryAmount * 145) // Approximate EUR to NPR
    : job.salaryCurrency === 'USD'
    ? Math.round(job.salaryAmount * 130) // Approximate USD to NPR
    : Math.round(job.salaryAmount);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box
        bg={colors.white}
        border="1px solid"
        borderColor={colors.border}
        borderRadius={radii.lg}
        p={5}
        _hover={{
          borderColor: colors.crimson,
          boxShadow: "0 12px 40px rgba(139,26,26,0.08)",
          transform: "translateY(-2px)",
        }}
        transition="all 0.25s"
        h="full"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        {/* Company header */}
        <Flex align="flex-start" gap={3}>
          <Box
            w="48px"
            h="48px"
            borderRadius={radii.md}
            bg={colors.bgWarm}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            overflow="hidden"
          >
            <Text fontSize="lg" fontWeight="800" color={colors.crimson}>
              {companyName.charAt(0)}
            </Text>
          </Box>
          <Box flex={1} minW={0}>
            <Text fontSize="xs" color={colors.textMuted}>
              {companyName}
            </Text>
            <Text fontSize="md" fontWeight="700" color={colors.text} >
              {job.title}
            </Text>
          </Box>
          <Badge
            fontSize="2xs"
            fontWeight="700"
            bg={colors.bgWarm}
            color={colors.textMuted}
            borderRadius="sm"
            px={2}
            py={0.5}
          >
            {category}
          </Badge>
        </Flex>

        {/* Location */}
        <Flex align="center" gap={1.5}>
          <MapPin size={13} color={colors.textLight} />
          <Text fontSize="xs" color={colors.textMuted}>
            {job.country.name} ({job.city})
          </Text>
        </Flex>

        {/* Gender count / Preference */}
        <Flex gap={3}>
          <Box
            bg={colors.bgWarm}
            borderRadius={radii.sm}
            px={3}
            py={1.5}
            flex={1}
          >
            <Flex align="center" gap={2}>
              <Users size={13} color={colors.textMuted} />
              <Text fontSize="xs" color={colors.textMuted}>
                Gender
              </Text>
              <Text fontSize="xs" fontWeight="700" color={colors.text} ml="auto">
                {job.genderPreference === 'MALE' ? 'Male Only' : 
                 job.genderPreference === 'FEMALE' ? 'Female Only' : 
                 'Any Gender'}
              </Text>
            </Flex>
          </Box>
          <Box
            bg={colors.bgWarm}
            borderRadius={radii.sm}
            px={3}
            py={1.5}
            flex={1}
          >
            <Flex align="center" gap={2}>
              <Users size={13} color={colors.textMuted} />
              <Text fontSize="xs" color={colors.textMuted}>
                Slots Left
              </Text>
              <Text fontSize="xs" fontWeight="700" color={colors.text} ml="auto">
                {job.remainingSlots}/{job.totalSlots}
              </Text>
            </Flex>
          </Box>
        </Flex>

        {/* Meta info */}
        <Flex direction="column" gap={3}>
          <Flex align="center" gap={2}>
            <Clock size={13} color={colors.textLight} />
            <Text fontSize="xs" color={colors.textMuted}>
              {hoursPerDay} hrs/day | {daysPerWeek} days/week
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Calendar size={13} color={colors.textLight} />
            <Text fontSize="xs" color={colors.textMuted}>
              Deadline: {formatDeadline(job.deadline)}
            </Text>
            <Text
              fontSize="2xs"
              fontWeight="700"
              color={urgent ? colors.crimson : colors.gold}
              ml={1}
            >
              • {daysLeft} days left
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Banknote size={13} color={colors.textLight} />
            <Text fontSize="xs" color={colors.textMuted}>
              {job.salaryAmount.toLocaleString()} {job.salaryCurrency}/{job.salaryPeriod.toLowerCase()}
            </Text>
            <Text fontSize="2xs" color={colors.textMuted}>
              (~{salaryNPR.toLocaleString()} NRs)
            </Text>
          </Flex>
        </Flex>

        {/* Benefits summary */}
        <Flex gap={2} flexWrap="wrap">
          {job.accommodationProvided && (
            <Badge fontSize="2xs" bg="green.50" color="green.700">🏠 Accommodation</Badge>
          )}
          {job.foodProvided && (
            <Badge fontSize="2xs" bg="orange.50" color="orange.700">🍽️ Food</Badge>
          )}
          {job.transportationProvided && (
            <Badge fontSize="2xs" bg="blue.50" color="blue.700">🚌 Transport</Badge>
          )}
          {job.medicalInsuranceProvided && (
            <Badge fontSize="2xs" bg="red.50" color="red.700">🏥 Insurance</Badge>
          )}
        </Flex>

        {/* CTA */}
        <Button
          mt="auto"
          bg={colors.crimson}
          color="white"
          fontWeight="700"
          fontSize="xs"
          borderRadius="md"
          _hover={{ bg: colors.crimsonDark }}
          transition="all 0.2s"
          gap={2}
          py={6}
          w={"fit-content"}
        >
          View more detail
          <ArrowRight size={14} />
        </Button>
      </Box>
    </MotionBox>
  );
}

function SkeletonCard() {
  return (
    <Box
      bg={colors.white}
      border="1px solid"
      borderColor={colors.border}
      borderRadius={radii.lg}
      p={5}
      h="400px"
    >
      {[80, 120, 60, 60, 40, 30].map((w, i) => (
        <Box
          key={i}
          h="14px"
          w={`${w}%`}
          bg={colors.bgWarm}
          borderRadius="sm"
          mb={3}
          style={{ animation: "pulse 1.5s ease-in-out infinite" }}
        />
      ))}
    </Box>
  );
}

export function JobsSection({ jobs: propJobs, isLoading = false }: Props) {
  const { data: apiData, isLoading: apiLoading } = useGetCandidateJobs();
  
  // Use API data if available, otherwise use prop jobs
  const jobs = apiData || propJobs || [];
  const loading = isLoading || apiLoading;

  console.log(jobs, "landing page jobs");

  return (
    <Box
      as="section"
      id="jobs"
      bg={colors.bgSection}
      py={{ base: 16, md: 24 }}
    >
      <Container maxW="1280px">
        {/* Heading */}
        <Box mb={10}>
          <Flex display="inline-flex" align="center" bg={colors.crimson} px={3} py={1} borderRadius={radii.sm} mb={4}>
            <Text fontSize="2xs" fontWeight="800" color="white" letterSpacing="widest" textTransform="uppercase">
              Current Hiring
            </Text>
          </Flex>
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="800"
            color={colors.text}
            lineHeight={1.2}
            mb={3}
          >
            Find latest jobs open for Nepali workers
          </Text>
          <Text fontSize="sm" color={colors.textMuted} lineHeight={1.7} maxW="640px">
            Interpid brings you the newest job openings in Nepal and abroad. Choose from many
            trusted companies and apply easily with our simple process.
          </Text>
        </Box>

        {/* Job grid */}
        <Box
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
          mb={8}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
        </Box>

        {/* View all */}
<Flex justify="flex-end">
  <Link href="/public/jobs">
    <Button
      bg={colors.gold}
      color="white"
      fontWeight="700"
      fontSize="sm"
      px={6}
      h="44px"
      borderRadius="md"
      _hover={{ bg: colors.goldLight }}
      transition="all 0.2s"
      gap={2}
    >
      View All Jobs Listings
      <ArrowRight size={16} />
    </Button>
  </Link>
</Flex>
      </Container>
    </Box>
  );
}