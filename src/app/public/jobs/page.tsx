"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Container,
  Badge,
  Image,
  Input,
  InputGroup,
  Select,
  Stack,
  IconButton,
  Grid,
  Spinner,
  Separator,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Clock,
  Calendar,
  Banknote,
  ArrowRight,
  Search,
  Filter,
  X,
  Briefcase,
  Building2,
  Globe,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useGetCandidateJobs } from "@/api/candidate-api";
import { colors, radii } from "@/components/LandingPage/theme";
import { SelectFieldInput } from "@/shared/ui/Select";
import { FormProvider } from "@/shared";
import { useForm } from "react-hook-form";

const MotionBox = motion(Box);

// Types based on API response
export interface Country {
  id: number;
  name: string;
  code: string;
  currencyCode: string | null;
  currencySymbol: string | null;
  isEnabled: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
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

// Helper functions
const getDaysLeft = (deadline: string): number => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const formatDeadline = (deadline: string): string => {
  const date = new Date(deadline);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

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

const getCompanyName = (job: JobListing): string => {
  const words = job.description.split(' ');
  for (let i = 0; i < Math.min(words.length, 15); i++) {
    if (words[i].includes('Corp') || words[i].includes('Ltd') || 
        words[i].includes('Company') || words[i].includes('Inc')) {
      return words[i];
    }
  }
  return `${job.country.name} Recruitment`;
};

function JobCard({ job, index }: { job: JobListing; index: number }) {
  const daysLeft = getDaysLeft(job.deadline);
  const urgent = daysLeft <= 45;
  const category = getCategoryFromJob(job);
  const companyName = getCompanyName(job);
  const hoursPerDay = Math.round(job.workingHoursPerWeek / 6);
  const daysPerWeek = job.workingHoursPerWeek > 40 ? 6 : 5;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/public/jobs/${job.id}`} style={{ textDecoration: 'none' }}>
        <Box
          bg={colors.white}
          border="1px solid"
          borderColor={colors.border}
          borderRadius={radii.lg}
          p={5}
          _hover={{
            borderColor: colors.crimson,
            boxShadow: "0 12px 40px rgba(139,26,26,0.08)",
            transform: "translateY(-4px)",
          }}
          transition="all 0.3s"
          h="full"
          display="flex"
          flexDirection="column"
          gap={4}
          cursor="pointer"
          boxShadow={"xl"}
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

          {/* Stats */}
          <Flex gap={3}>
            <Box bg={colors.bgWarm} borderRadius={radii.sm} px={3} py={1.5} flex={1}>
              <Flex align="center" gap={2}>
                <Users size={13} color={colors.textMuted} />
                <Text fontSize="xs" color={colors.textMuted}>Gender</Text>
                <Text fontSize="xs" fontWeight="700" color={colors.text} ml="auto">
                  {job.genderPreference === 'MALE' ? 'Male Only' : 
                   job.genderPreference === 'FEMALE' ? 'Female Only' : 'Any'}
                </Text>
              </Flex>
            </Box>
            <Box bg={colors.bgWarm} borderRadius={radii.sm} px={3} py={1.5} flex={1}>
              <Flex align="center" gap={2}>
                <Briefcase size={13} color={colors.textMuted} />
                <Text fontSize="xs" color={colors.textMuted}>Slots</Text>
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
              <Text fontSize="2xs" fontWeight="700" color={urgent ? colors.crimson : colors.gold}>
                • {daysLeft} days left
              </Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Banknote size={13} color={colors.textLight} />
              <Text fontSize="xs" color={colors.textMuted}>
                {job.salaryAmount.toLocaleString()} {job.salaryCurrency}/{job.salaryPeriod.toLowerCase()}
              </Text>
            </Flex>
          </Flex>

          {/* Benefits */}
          <Flex gap={2} flexWrap="wrap">
            {job.accommodationProvided && <Badge fontSize="2xs" bg="green.50" color="green.700">🏠 Accommodation</Badge>}
            {job.foodProvided && <Badge fontSize="2xs" bg="orange.50" color="orange.700">🍽️ Food</Badge>}
            {job.transportationProvided && <Badge fontSize="2xs" bg="blue.50" color="blue.700">🚌 Transport</Badge>}
            {job.medicalInsuranceProvided && <Badge fontSize="2xs" bg="red.50" color="red.700">🏥 Insurance</Badge>}
          </Flex>

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
            View Details
            <ArrowRight size={14} />
          </Button>
        </Box>
      </Link>
    </MotionBox>
  );
}

function FilterSidebar({ filters, onFilterChange }: any) {
  const categories = ["All", "Healthcare", "Caregiving", "Construction", "Security", "Hospitality", "Manufacturing & Factory"];
  const countries = ["All", "Malta", "UAE", "Qatar", "Saudi Arabia"];
  const salaryRanges = ["All", "0-500", "500-1000", "1000-1500", "1500+"];
  const methods=useForm()

  return (
    <FormProvider methods={methods} onSubmit={(data) => onFilterChange(data)}>

    <Box
      bg={colors.white}
      border="1px solid"
      borderColor={colors.border}
      borderRadius={radii.lg}
      p={5}
      position="sticky"
      top="20px"
    >
      <Flex justify="space-between" align="center" mb={4}>
  <Text fontWeight="700" color={colors.text}>
    Filters
  </Text>

  <IconButton
    aria-label="Clear filters"
    size="sm"
    variant="ghost"
    onClick={() =>
      onFilterChange({
        category: "All",
        country: "All",
        salaryRange: "All",
      })
    }
  >
    <X size={16} />
  </IconButton>
</Flex>

      <Separator mb={4} />

      {/* Category Filter */}
     {/* Category Filter */}
<Box mb={4}>
  <Text fontSize="sm" fontWeight="600" mb={2} color={colors.text}>
    Category
  </Text>

  <SelectFieldInput
    name="category"
    label=""
    placeholder="Select category"
    options={categories.map((cat) => ({
      label: cat,
      value: cat,
    }))}
  />
</Box>

{/* Country Filter */}
<Box mb={4}>
  <Text fontSize="sm" fontWeight="600" mb={2} color={colors.text}>
    Country
  </Text>

  <SelectFieldInput
    name="country"
    label=""
    placeholder="Select country"
    options={countries.map((country) => ({
        label: country,
        value: country,
    }))}
  />
</Box>

{/* Salary Filter */}
<Box mb={4}>
  <Text fontSize="sm" fontWeight="600" mb={2} color={colors.text}>
    Salary Range (EUR)
  </Text>

  <SelectFieldInput
    name="salaryRange"
    label=""
    placeholder="Select salary range"
    options={salaryRanges.map((range) => ({
        label: range,
      value: range,
    }))}
  />
</Box>

     
    </Box>
</FormProvider>
  );
}

export default function JobsPage() {
  const { data: apiData, isLoading } = useGetCandidateJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    country: "All",
    salaryRange: "All",
  });
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  
  const jobs = apiData || [];
  
  useEffect(() => {
    let filtered = [...jobs];
    
    // Search filter
    if (searchTerm) {
        filtered = filtered.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Category filter
    if (filters.category !== "All") {
        filtered = filtered.filter(job => getCategoryFromJob(job) === filters.category);
    }
    
    // Country filter
    if (filters.country !== "All") {
        filtered = filtered.filter(job => job.country.name === filters.country);
    }
    
    // Salary filter
    if (filters.salaryRange !== "All") {
      filtered = filtered.filter(job => {
          const salary = job.salaryAmount;
          switch (filters.salaryRange) {
          case "0-500": return salary <= 500;
          case "500-1000": return salary > 500 && salary <= 1000;
          case "1000-1500": return salary > 1000 && salary <= 1500;
          case "1500+": return salary > 1500;
          default: return true;
        }
    });
}

setFilteredJobs(filtered);
  }, [searchTerm, filters, jobs]);
  
  return (
      <Box  minH="100vh" py={{ base: 8, md: 12 }}>
      <Container maxW="1280px">
        {/* Header */}
        <Box mb={8}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Box>
              <Flex display="inline-flex" align="center" bg={colors.crimson} px={3} py={1} borderRadius={radii.sm} mb={4}>
                <Text fontSize="2xs" fontWeight="800" color="white" letterSpacing="widest" textTransform="uppercase">
                  Job Opportunities
                </Text>
              </Flex>
              <Text fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight="800" color={colors.text} mb={2}>
                Find Your Dream Job
              </Text>
              <Text fontSize="sm" color={colors.textMuted}>
                {filteredJobs.length} jobs found for you
              </Text>
            </Box>
            
            {/* Search Bar */}
            <InputGroup maxW="400px" startElement={  <Search size={18} color={colors.textMuted} />}>
          
              <Input
                placeholder="Search jobs by title, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg={colors.white}
                borderColor={colors.border}
                _hover={{ borderColor: colors.crimson }}
                _focus={{ borderColor: colors.crimson }}
              />
            </InputGroup>
          </Flex>
        </Box>

        {/* Main Content */}
        <Flex gap={6} direction={{ base: "column", lg: "row" }}>
          {/* Sidebar */}
          <Box w={{ base: "100%", lg: "280px" }}>
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </Box>

          {/* Job Grid */}
          <Box flex={1}>
            {isLoading ? (
              <Flex justify="center" align="center" h="400px">
                <Spinner size="xl" color={colors.crimson} />
              </Flex>
            ) : filteredJobs.length === 0 ? (
              <Flex direction="column" align="center" justify="center" h="400px" gap={4}>
                <Text fontSize="lg" color={colors.textMuted}>No jobs found</Text>
                <Button
                  bg={colors.crimson}
                  color="white"
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({ category: "All", country: "All", salaryRange: "All" });
                  }}
                >
                  Clear Filters
                </Button>
              </Flex>
            ) : (
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={6}
              >
                {filteredJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </Grid>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}