"use client";

import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Stat,
  Text,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import { ElementType } from "react";
import {
  Briefcase,
  TrendingUp,
  Users,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  AgencyRecentJob,
  RecentApplication,
  RecentCandidate,
  useGetAgencyDashboardQuery,
} from "@/api/dashboard";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { useCurrentUserStore } from "@/store";
import PageNoData from "@/shared/ui/NoDataAvailable/PageNoData";

const AgencyDashboard = () => {
  const { profile } = useCurrentUserStore();
  const isApproved = profile?.profileApprovalStatus === "APPROVED";

  const { data: dashboard, isLoading } = useGetAgencyDashboardQuery({ enabled: isApproved });

  if (!isApproved) return null;

  if (isLoading) {
    return (
      <Box p={6}>
        <Skeleton height="40px" width="300px" mb={6} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={5} mb={6}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="100px" borderRadius="2xl" />
          ))}
        </SimpleGrid>
        <Grid templateColumns={{ base: "1fr", xl: "350px 1fr" }} gap={6} mb={6}>
          <Skeleton height="350px" borderRadius="2xl" />
          <Skeleton height="350px" borderRadius="2xl" />
        </Grid>
      </Box>
    );
  }

  if (!dashboard) {
    return (
      <PageNoData title="No Dashobard Data Found" description="There are no recent dashboard datas to display." />
    );
  }

  const {
    stats,
    recentApplications,
    recentCandidates,
    recentJobs,
    weeklyActivity,
  } = dashboard;

  const radialData = [
    {
      name: "Approval",
      value: stats?.approvalRate || 0,
    },
  ];

  const weeklyChartData = weeklyActivity?.days.map(
    (day: string, index: number) => ({
      day,
      submitted: weeklyActivity.applicationsSubmitted?.[index] || 0,
      shortlisted: weeklyActivity.applicationsShortlisted?.[index] || 0,
    })
  );

  return (
    <Box p={6} bg="#f7f8fa" minH="100vh">
      {/* Header */}
      <VStack align="start" mb={6} gap={0}>
        <Text fontSize="3xl" fontWeight="700">
          Agency Insights
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="600">
          REAL-TIME PERFORMANCE OVERVIEW
        </Text>
      </VStack>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={5} mb={6}>
        <StatCard
          label="TOTAL CANDIDATES"
          value={stats?.totalCandidates}
          icon={Users}
        />
        <StatCard
          label="TOTAL APPLICATIONS"
          value={stats?.totalApplications}
          icon={FileText}
        />
        <StatCard
          label="ASSIGNED JOBS"
          value={stats?.assignedJobs}
          icon={Briefcase}
        />
        <StatCard
          label="APPROVAL RATE"
          value={`${stats?.approvalRate}%`}
          icon={TrendingUp}
        />
      </SimpleGrid>

      {/* Charts Section */}
      <Grid templateColumns={{ base: "1fr", xl: "350px 1fr" }} gap={6} mb={6}>
        <GridItem>
          <Box
            bg="white"
            borderRadius="2xl"
            p={6}
            h="100%"
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack align="start" mb={5}>
              <Text fontSize="2xl" fontWeight="700">
                Success Rate
              </Text>
              <Text color="gray.500" fontSize="sm">
                Application approval metrics
              </Text>
            </VStack>

            <Flex justify="center" align="center" h="280px">
              <Box position="relative">
                <ResponsiveContainer width={250} height={250}>
                  <RadialBarChart
                    innerRadius="75%"
                    outerRadius="100%"
                    data={radialData}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={20}
                      fill={WEBSITE_THEME_COLOR}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>

                <VStack
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -30%)"
                  gap={0}
                >
                  <Text fontSize="5xl" fontWeight="800">
                    {stats?.approvalRate}%
                  </Text>
                  <Text fontSize="sm" color="gray.500" fontWeight="700">
                    APPROVED
                  </Text>
                </VStack>
              </Box>
            </Flex>
          </Box>
        </GridItem>

        <GridItem>
          <Box
            bg="white"
            borderRadius="2xl"
            p={6}
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack align="start" mb={5}>
              <Text fontSize="2xl" fontWeight="700">
                Weekly Activity
              </Text>
              <Text color="gray.500" fontSize="sm">
                Application submissions vs shortlists
              </Text>
            </VStack>

            <Box h="320px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="submitted"
                    name="Submitted"
                    radius={[8, 8, 0, 0]}
                    fill={WEBSITE_THEME_COLOR}
                  />
                  <Bar
                    dataKey="shortlisted"
                    name="Shortlisted"
                    radius={[8, 8, 0, 0]}
                    fill="#26a8c9"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </GridItem>
      </Grid>

      {/* Detailed Lists */}
      <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr" }} gap={6} mb={6}>
        {/* Recent Applications */}
        <Box
          bg="white"
          borderRadius="2xl"
          p={6}
          border="1px solid"
          borderColor="gray.100"
        >
          <HStack justify="space-between" mb={5}>
            <Text fontSize="xl" fontWeight="700">
              Recent Applications
            </Text>
            <Badge colorScheme="green">{recentApplications.length} New</Badge>
          </HStack>

          <VStack gap={4} align="stretch">
            {recentApplications.length === 0 ? (
              <PageNoData title="No Recent Applications" description="There are no recent applications to display." />
            ) : recentApplications.map((app: RecentApplication) => (
              <Box
                key={app.id}
                p={4}
                border="1px solid"
                borderColor="gray.100"
                borderRadius="xl"
                _hover={{ bg: "gray.50" }}
                transition="all 0.2s"
              >
                <HStack justify="space-between" mb={1}>
                  <Text fontWeight="700">{app.candidateName}</Text>
                  <Badge
                    colorPalette={
                      app.status === "SHORTLISTED"
                        ? "green"
                        : app.status === "REJECTED"
                          ? "red"
                          : "orange"
                    }
                  >
                    {app.status}
                  </Badge>
                </HStack>
                <HStack justify="space-between">
                  <HStack color="gray.500" fontSize="sm">
                    <Briefcase size={14} />
                    <Text>{app.jobTitle}</Text>
                  </HStack>
                  <HStack color="gray.500" fontSize="xs">
                    <Clock size={12} />
                    <Text>{new Date(app.appliedAt).toLocaleDateString()}</Text>
                  </HStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Recent Candidates */}
        <Box
          bg="white"
          borderRadius="2xl"
          p={6}
          border="1px solid"
          borderColor="gray.100"
        >
          <HStack justify="space-between" mb={5}>
            <Text fontSize="xl" fontWeight="700">
              New Candidates
            </Text>
            <Badge colorScheme="blue">{recentCandidates.length} Active</Badge>
          </HStack>

          <VStack gap={4} align="stretch">
            {recentCandidates.length === 0 ? (
              <PageNoData title="No Recent Candidates" description="There are no recent candidates to display." />
            ) : recentCandidates.map((candidate: RecentCandidate) => (
              <Box
                key={candidate.id}
                p={4}
                border="1px solid"
                borderColor="gray.100"
                borderRadius="xl"
                _hover={{ bg: "gray.50" }}
                transition="all 0.2s"
              >
                <HStack justify="space-between">
                  <VStack align="start" gap={0}>
                    <Text fontWeight="700">{candidate.fullName}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {candidate.trade}
                    </Text>
                  </VStack>
                  <Badge colorPalette={candidate.isEnabled ? "green" : "gray"}>
                    {candidate.isEnabled ? "ACTIVE" : "DISABLED"}
                  </Badge>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </Grid>

      {/* Recent Jobs */}
      <Box
        bg="white"
        borderRadius="2xl"
        p={6}
        border="1px solid"
        borderColor="gray.100"
      >
        <HStack justify="space-between" mb={5}>
          <Text fontSize="xl" fontWeight="700">
            Assigned Jobs
          </Text>
          <Badge colorScheme="purple">{recentJobs.length} Jobs</Badge>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {recentJobs.length === 0 ? (
            <Box gridColumn="1 / -1">
              <PageNoData title="No Assigned Jobs" description="There are no assigned jobs to display." />
            </Box>
          ) : recentJobs.map((job: AgencyRecentJob) => (
            <Box
              key={job.id}
              p={4}
              border="1px solid"
              borderColor="gray.100"
              borderRadius="xl"
              _hover={{ bg: "gray.50" }}
              transition="all 0.2s"
            >
              <HStack justify="space-between" mb={3}>
                <Text fontWeight="700" >
                  {job.title}
                </Text>
                <Badge colorPalette="green">{job.status}</Badge>
              </HStack>
              <Text fontSize="sm" color="gray.500" mb={3}>
                {job.country}
              </Text>
              <Progress.Root
                value={(job.remainingSlots / job.totalSlots) * 100}
                size="xs"
                borderRadius="full"
                colorPalette="green"
                mb={2}
              >
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
              <HStack justify="space-between">
                <Text fontSize="xs" color="gray.500">
                  {job.totalSlots - job.remainingSlots}/{job.totalSlots} Slots Filled
                </Text>
                <Text fontSize="xs" color="gray.500" fontWeight="600">
                  {job.remainingSlots} Left
                </Text>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ElementType;
}

const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <Box
      bg="white"
      p={5}
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.100"
      boxShadow="sm"
    >
      <HStack gap={4}>
        <Flex
          w="52px"
          h="52px"
          borderRadius="xl"
          bg="green.50"
          align="center"
          justify="center"
          _dark={{ bg: "green.900/20" }}
        >
          <Icon as={icon} boxSize={6} color="green.600" />
        </Flex>

        <Stat.Root>
          <Stat.Label color="gray.500" fontSize="xs" fontWeight="700">
            {label}
          </Stat.Label>
          <Stat.ValueText fontSize="3xl" fontWeight="800">
            {value}
          </Stat.ValueText>
        </Stat.Root>
      </HStack>
    </Box>
  );
};

export default AgencyDashboard;
