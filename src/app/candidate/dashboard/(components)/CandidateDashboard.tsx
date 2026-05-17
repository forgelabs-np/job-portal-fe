"use client";

import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
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
  FileText,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CandidateRecentApplication,
  CandidateRecentJob,
  useGetCandidateDashboardQuery,
} from "@/api/candidate-api";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import PageNoData from "@/shared/ui/NoDataAvailable/PageNoData";

const COLORS = [WEBSITE_THEME_COLOR, "#26a8c9", "#f59e0b", "#ef4444", "#8b5cf6"];

const CandidateDashboard = () => {
  const { data: dashboard, isLoading } = useGetCandidateDashboardQuery();

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
      <PageNoData
        title="No Dashboard Data Found"
        description="There are no dashboard stats to display yet."
      />
    );
  }

  const {
    stats,
    recentApplications,
    recentJobs,
    statusDistribution,
    weeklyActivity,
  } = dashboard;

  const pieData = [
    { name: "Pending", value: statusDistribution?.pending || 0 },
    { name: "Shortlisted", value: statusDistribution?.shortlisted || 0 },
    { name: "Approved", value: statusDistribution?.approved || 0 },
    { name: "Rejected", value: statusDistribution?.rejected || 0 },
    { name: "Withdrawn", value: statusDistribution?.withdrawn || 0 },
  ].filter((d) => d.value > 0);

  const weeklyChartData = weeklyActivity?.days?.map(
    (day: string, index: number) => ({
      day,
      applied: weeklyActivity.applicationsSubmitted?.[index] || 0,
    }),
  );

  return (
    <Box p={6} bg="#f7f8fa" minH="100vh">
      {/* Header */}
      <VStack align="start" mb={6} gap={0}>
        <Text fontSize="3xl" fontWeight="700">
          My Dashboard
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="600">
          YOUR JOB APPLICATION OVERVIEW
        </Text>
      </VStack>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={5} mb={6}>
        <StatCard
          label="TOTAL APPLICATIONS"
          value={stats?.totalApplications ?? 0}
          icon={FileText}
        />
        <StatCard
          label="PENDING"
          value={stats?.pendingApplications ?? 0}
          icon={Clock}
        />
        <StatCard
          label="SHORTLISTED"
          value={stats?.shortlistedApplications ?? 0}
          icon={CheckCircle2}
        />
        <StatCard
          label="AVAILABLE JOBS"
          value={stats?.availableJobs ?? 0}
          icon={Briefcase}
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
                Application Status
              </Text>
              <Text color="gray.500" fontSize="sm">
                Distribution of your applications
              </Text>
            </VStack>

            <Flex justify="center" align="center" h="280px">
              {pieData.length === 0 ? (
                <Text color="gray.400" fontSize="sm">
                  No application data yet
                </Text>
              ) : (
                <ResponsiveContainer width={280} height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
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
                Your application submissions this week
              </Text>
            </VStack>

            <Box h="320px">
              {!weeklyChartData || weeklyChartData.length === 0 ? (
                <Flex h="100%" align="center" justify="center">
                  <Text color="gray.400" fontSize="sm">
                    No activity data yet
                  </Text>
                </Flex>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="applied"
                      name="Applications"
                      radius={[8, 8, 0, 0]}
                      fill={WEBSITE_THEME_COLOR}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Box>
        </GridItem>
      </Grid>

      {/* Recent Lists */}
      <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr" }} gap={6}>
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
            <Badge colorScheme="green">
              {recentApplications?.length ?? 0} Recent
            </Badge>
          </HStack>

          <VStack gap={4} align="stretch">
            {!recentApplications || recentApplications.length === 0 ? (
              <PageNoData
                title="No Recent Applications"
                description="You haven't applied to any jobs yet."
              />
            ) : (
              recentApplications.map((app: CandidateRecentApplication) => (
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
                    <Text fontWeight="700">{app.jobTitle}</Text>
                    <Badge
                      colorPalette={
                        app.status === "SHORTLISTED" || app.status === "APPROVED"
                          ? "green"
                          : app.status === "REJECTED"
                            ? "red"
                            : app.status === "WITHDRAWN"
                              ? "gray"
                              : "orange"
                      }
                    >
                      {app.status}
                    </Badge>
                  </HStack>
                  <HStack justify="space-between">
                    <HStack color="gray.500" fontSize="sm">
                      <MapPin size={14} />
                      <Text>
                        {app.jobCity}, {app.jobCountry}
                      </Text>
                    </HStack>
                    <HStack color="gray.500" fontSize="xs">
                      <Clock size={12} />
                      <Text>
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </Text>
                    </HStack>
                  </HStack>
                </Box>
              ))
            )}
          </VStack>
        </Box>

        {/* Available Jobs */}
        <Box
          bg="white"
          borderRadius="2xl"
          p={6}
          border="1px solid"
          borderColor="gray.100"
        >
          <HStack justify="space-between" mb={5}>
            <Text fontSize="xl" fontWeight="700">
              Latest Jobs
            </Text>
            <Badge colorScheme="purple">
              {recentJobs?.length ?? 0} Jobs
            </Badge>
          </HStack>

          <VStack gap={4} align="stretch">
            {!recentJobs || recentJobs.length === 0 ? (
              <PageNoData
                title="No Jobs Available"
                description="There are no recent job postings to display."
              />
            ) : (
              recentJobs.map((job: CandidateRecentJob) => (
                <Box
                  key={job.id}
                  p={4}
                  border="1px solid"
                  borderColor="gray.100"
                  borderRadius="xl"
                  _hover={{ bg: "gray.50" }}
                  transition="all 0.2s"
                >
                  <HStack justify="space-between" mb={1}>
                    <Text fontWeight="700">{job.title}</Text>
                    <Badge colorPalette="green">{job.status}</Badge>
                  </HStack>
                  <HStack justify="space-between">
                    <HStack color="gray.500" fontSize="sm">
                      <MapPin size={14} />
                      <Text>{job.country}</Text>
                    </HStack>
                    <Text fontSize="xs" color="gray.500" fontWeight="600">
                      {job.remainingSlots}/{job.totalSlots} Slots Left
                    </Text>
                  </HStack>
                </Box>
              ))
            )}
          </VStack>
        </Box>
      </Grid>
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

export default CandidateDashboard;
