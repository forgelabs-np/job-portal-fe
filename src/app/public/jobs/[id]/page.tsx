"use client";

import { useGetCandidateJobs } from "@/api/candidate-api";
import { colors, radii } from "@/components/LandingPage/theme";
import {
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Grid,
    IconButton,
    Separator,
    Spinner,
    Stack,
    Tag,
    Text
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Banknote,
    Bookmark,
    Bus,
    Calendar,
    Clock,
    FileText,
    Heart,
    Home,
    MapPin,
    Plane,
    Send,
    Share2,
    Utensils
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);

// Types (same as before)
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

const getDaysLeft = (deadline: string): number => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
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

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
//   const toast = useToast();
  const { data: apiData, isLoading } = useGetCandidateJobs();
  const [job, setJob] = useState<JobListing | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (apiData) {
      const foundJob = apiData.find(
        (j: JobListing) => j.id === parseInt(params.id as string)
      );
      setJob(foundJob || null);
    }
  }, [apiData, params.id]);

  const handleApply = () => {
   
    router.push(`/jobs/${job?.id}/apply`);
  };

  

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg={colors.bgSection}>
        <Spinner size="xl" color={colors.crimson} />
      </Flex>
    );
  }

  if (!job) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg={colors.bgSection} direction="column" gap={4}>
        {/* <Alert status="error" w="auto" borderRadius="md">
          <AlertIcon />
          Job not found
        </Alert> */}
        <Link href="/public/jobs">
          <Button bg={colors.crimson} color="white">
            Back to Jobs
          </Button>
        </Link>
      </Flex>
    );
  }

  const daysLeft = getDaysLeft(job.deadline);
  const isUrgent = daysLeft <= 15;
  const companyName = getCompanyName(job);
  const hoursPerDay = Math.round(job.workingHoursPerWeek / 6);
  const daysPerWeek = job.workingHoursPerWeek > 40 ? 6 : 5;

  return (
    <Box  minH="100vh" py={{ base: 6, md: 10 }}>
      <Container maxW="1200px">
        {/* Back Button */}
       <Link href="/public/jobs">
  <Button
    variant="ghost"
    mb={6}
    color={colors.textMuted}
    _hover={{ color: colors.crimson }}
  >
    <ArrowLeft size={18} />
    Back to Jobs
  </Button>
</Link>

        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          {/* Main Content */}
          <Box>
            {/* Header */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            //   bg={colors.white}
              border="1px solid"
              borderColor={colors.border}
              borderRadius={radii.lg}
              p={6}
              mb={6}
              shadow="md"
                            //   bg={colors.borderLight}

            >
              <Flex justify="space-between" align="start" mb={4} wrap="wrap" gap={4} >
                <Box flex={1}>
                  <Flex align="center" gap={3} mb={3}>
                    <Box
                      w="56px"
                      h="56px"
                      borderRadius={radii.md}
                      bg={colors.bgWarm}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="2xl" fontWeight="800" color={colors.crimson}>
                        {companyName.charAt(0)}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={colors.textMuted}>{companyName}</Text>
                      <Text fontSize="2xl" fontWeight="800" color={colors.text}>
                        {job.title}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="center" gap={4} flexWrap="wrap">
                    <Badge
                      bg={job.status === "OPEN" ? "green.50" : "red.50"}
                      color={job.status === "OPEN" ? "green.700" : "red.700"}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {job.status}
                    </Badge>
                    {isUrgent && (
                      <Badge bg="red.50" color="red.700" px={3} py={1} borderRadius="full">
                        Urgent Hiring
                      </Badge>
                    )}
                  </Flex>
                </Box>
                
               <Flex gap={2}>
  {/* <IconButton
    aria-label="Save job"
    variant="outline"
    borderColor={colors.border}
    color={isSaved ? colors.crimson : colors.textMuted}
  >
    <Bookmark size={18} />
  </IconButton> */}

  <IconButton
    aria-label="Share job"
    variant="outline"
    borderColor={colors.border}
    onClick={handleShare}
  >
    <Share2 size={18} />
  </IconButton>
</Flex>
              </Flex>

              <Separator my={4} />

              {/* Key Info Grid */}
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                <Flex align="center" gap={3}>
                  <Box color={colors.crimson}>
                    <MapPin size={18} />
                  </Box>
                  <Box>
                    <Text fontSize="xs" color={colors.textMuted}>Location</Text>
                    <Text fontSize="sm" fontWeight="600">{job.country.name}, {job.city}</Text>
                  </Box>
                </Flex>
                <Flex align="center" gap={3}>
                  <Box color={colors.crimson}>
                    <Banknote size={18} />
                  </Box>
                  <Box>
                    <Text fontSize="xs" color={colors.textMuted}>Salary</Text>
                    <Text fontSize="sm" fontWeight="600">
                      {job.salaryAmount.toLocaleString()} {job.salaryCurrency}/{job.salaryPeriod.toLowerCase()}
                    </Text>
                  </Box>
                </Flex>
                <Flex align="center" gap={3}>
                  <Box color={colors.crimson}>
                    <Clock size={18} />
                  </Box>
                  <Box>
                    <Text fontSize="xs" color={colors.textMuted}>Working Hours</Text>
                    <Text fontSize="sm" fontWeight="600">{hoursPerDay} hrs/day, {daysPerWeek} days/week</Text>
                  </Box>
                </Flex>
                <Flex align="center" gap={3}>
                  <Box color={colors.crimson}>
                    <Calendar size={18} />
                  </Box>
                  <Box>
                    <Text fontSize="xs" color={colors.textMuted}>Application Deadline</Text>
                    <Text fontSize="sm" fontWeight="600">{formatDate(job.deadline)}</Text>
                    <Text fontSize="xs" color={isUrgent ? colors.crimson : colors.gold}>
                      {daysLeft} days remaining
                    </Text>
                  </Box>
                </Flex>
              </Grid>
            </MotionBox>

            {/* Job Description */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              bg={colors.white}
              border="1px solid"
              borderColor={colors.border}
              borderRadius={radii.lg}
              p={6}
              mb={6}
                            shadow="md"

            >
              <Text fontSize="xl" fontWeight="700" mb={4}>Job Description</Text>
              <Text fontSize="sm" color={colors.text} lineHeight="1.7" mb={4}>
                {job.description}
              </Text>
              
              <Text fontSize="xl" fontWeight="700" mb={4} mt={6}>Requirements</Text>
              <Text fontSize="sm" color={colors.text} lineHeight="1.7" mb={4}>
                {job.requirements}
              </Text>

              {/* Skills */}
              <Box mt={4}>
  <Text fontSize="sm" fontWeight="600" mb={2}>
    Required Skills:
  </Text>

  <Flex gap={2} flexWrap="wrap">
    {job.requiredSkills.split(",").map((skill, index) => (
      <Tag.Root
        key={index}
        size="sm"
        bg={colors.bgWarm}
        color={colors.text}
      >
        <Tag.Label>{skill.trim()}</Tag.Label>
      </Tag.Root>
    ))}
  </Flex>
</Box>
            </MotionBox>

            {/* Benefits & Perks */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              bg={colors.white}
              border="1px solid"
              borderColor={colors.border}
              borderRadius={radii.lg}
              p={6}
                            shadow="md"

            >
              <Text fontSize="xl" fontWeight="700" mb={4}>Benefits & Perks</Text>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                {job.accommodationProvided && (
                  <Flex align="center" gap={3}>
                    <Home size={18} color={colors.crimson} />
                    <Box>
                      <Text fontSize="sm" fontWeight="600">Accommodation</Text>
                      <Text fontSize="xs" color={colors.textMuted}>{job.accommodationDetails || "Provided by company"}</Text>
                    </Box>
                  </Flex>
                )}
                {job.foodProvided && (
                  <Flex align="center" gap={3}>
                    <Utensils size={18} color={colors.crimson} />
                    <Box>
                      <Text fontSize="sm" fontWeight="600">Food</Text>
                      <Text fontSize="xs" color={colors.textMuted}>{job.foodDetails || "Meals provided"}</Text>
                    </Box>
                  </Flex>
                )}
                {job.transportationProvided && (
                  <Flex align="center" gap={3}>
                    <Bus size={18} color={colors.crimson} />
                    <Box>
                      <Text fontSize="sm" fontWeight="600">Transportation</Text>
                      <Text fontSize="xs" color={colors.textMuted}>{job.transportationDetails || "Company provided"}</Text>
                    </Box>
                  </Flex>
                )}
                {job.medicalInsuranceProvided && (
                  <Flex align="center" gap={3}>
                    <Heart size={18} color={colors.crimson} />
                    <Box>
                      <Text fontSize="sm" fontWeight="600">Medical Insurance</Text>
                      <Text fontSize="xs" color={colors.textMuted}>{job.medicalInsuranceDetails || "Comprehensive coverage"}</Text>
                    </Box>
                  </Flex>
                )}
                {job.airTicketProvided && (
                  <Flex align="center" gap={3}>
                    <Plane size={18} color={colors.crimson} />
                    <Box>
                      <Text fontSize="sm" fontWeight="600">Air Ticket</Text>
                      <Text fontSize="xs" color={colors.textMuted}>{job.airTicketDetails || "Provided"}</Text>
                    </Box>
                  </Flex>
                )}
              </Grid>

              {job.additionalBenefits && (
                <Box mt={4}>
                  <Text fontSize="sm" fontWeight="600" mb={2}>Additional Benefits:</Text>
                  <Text fontSize="sm" color={colors.textMuted}>{job.additionalBenefits}</Text>
                </Box>
              )}
            </MotionBox>
          </Box>

          {/* Sidebar - Application */}
          <Box>
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              position="sticky"
              top="20px"

            >
              {/* Application Card */}
              <Box
                bg={colors.white}
                border="1px solid"
                borderColor={colors.border}
                borderRadius={radii.lg}
                p={6}
                mb={6}
                                            shadow="md"

              >
                <Text fontSize="lg" fontWeight="700" mb={4}>Apply Now</Text>
                
                <Stack gap={3} mb={6}>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color={colors.textMuted}>Total Slots:</Text>
                    <Text fontSize="sm" fontWeight="600">{job.totalSlots}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color={colors.textMuted}>Remaining Slots:</Text>
                    <Text fontSize="sm" fontWeight="600" color={colors.crimson}>{job.remainingSlots}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color={colors.textMuted}>Experience Required:</Text>
                    <Text fontSize="sm" fontWeight="600">{job.minExperienceYears}-{job.maxExperienceYears} years</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color={colors.textMuted}>Education:</Text>
                    <Text fontSize="sm" fontWeight="600">{job.educationLevel}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color={colors.textMuted}>Contract Duration:</Text>
                    <Text fontSize="sm" fontWeight="600">{job.contractDurationYears} years</Text>
                  </Flex>
                </Stack>

                <Button
                  w="full"
                  bg={colors.crimson}
                  color="white"
                  size="lg"
                  onClick={handleApply}
                  _hover={{ bg: colors.crimsonDark }}
                  mb={3}
                >
                    <Send size={18} />
                  Apply Now
                </Button>
                
              <Button
  w="full"
  variant="outline"
  borderColor={colors.border}
  color={colors.text}
>
  <FileText size={18} style={{ marginRight: 8 }} />
  Download Job Details
</Button>
              </Box>

              {/* Additional Info */}
              {/* <Box
                bg={colors.bgWarm}
                borderRadius={radii.lg}
                p={6}
              >
                <Text fontSize="sm" fontWeight="700" mb={3}>Important Information</Text>
                <Stack gap={2}>
                  <Flex align="center" gap={2}>
                    <CheckCircle size={14} color="green" />
                    <Text fontSize="xs">No application fee</Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <CheckCircle size={14} color="green" />
                    <Text fontSize="xs">Free visa processing</Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <CheckCircle size={14} color="green" />
                    <Text fontSize="xs">Medical insurance included</Text>
                  </Flex>
                </Stack>
                
                <Separator my={4} />
                
                <Text fontSize="xs" color={colors.textMuted} textAlign="center">
                  For inquiries, contact us at<br />
                  +977 1-1234567<br />
                  support@interpid.com
                </Text>
              </Box> */}
            </MotionBox>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}