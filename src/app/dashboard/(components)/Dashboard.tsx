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
} from "@chakra-ui/react";
import { ElementType } from "react";

import { Briefcase, Building2, TrendingUp, Users } from "lucide-react";

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

import { RecentAgency, RecentJob, useGetDashboardQuery } from "@/api/dashboard";
import { WEBSITE_THEME_COLOR } from "@/constants/color";

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardQuery();

  const dashboard = data;

  console.log(dashboard, "dash");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!dashboard) {
    return <Text>No dashboard data found</Text>;
  }

  const { stats, recentJobs, recentAgencies, weeklyActivity } = dashboard;

  const fulfillmentRate =
    stats?.totalSlots > 0
      ? Math.round((stats.filledSlots / stats.totalSlots) * 100)
      : 0;

  const radialData = [
    {
      name: "Fulfillment",
      value: fulfillmentRate,
    },
  ];

  const slotDistributionData = recentJobs?.map((job: RecentJob) => ({
    name: job.title,
    total: job.totalSlots,
    filled: job.filledSlots,
    remaining: job.remainingSlots,
  }));

  const weeklyChartData = weeklyActivity?.days.map(
    (day: string, index: number) => ({
      day,
      jobs: weeklyActivity.jobsCreated?.[index] || 0,
      agencies: weeklyActivity.agenciesJoined?.[index] || 0,
      candidates: weeklyActivity.candidatesSubmitted?.[index] || 0,
    }),
  );

  return (
    <Box p={6} bg="#f7f8fa" minH="100vh">
      {/* Header */}
      <VStack align="start" mb={6} gap={0}>
        <Text fontSize="3xl" fontWeight="700">
          Dashboard Intelligence
        </Text>

        <Text fontSize="sm" color="gray.500" fontWeight="600">
          GLOBAL MASTER CONTROL PANEL
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={5} mb={6}>
        <StatCard
          label="ACTIVE JOBS"
          value={stats?.openJobs}
          icon={Briefcase}
        />

        <StatCard
          label="TOTAL AGENCIES"
          value={stats?.totalAgencies}
          icon={Building2}
        />

        <StatCard label="CANDIDATES" value={stats?.filledSlots} icon={Users} />

        <StatCard
          label="AVG. FULFILLMENT"
          value={`${fulfillmentRate}%`}
          icon={TrendingUp}
        />
      </SimpleGrid>

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
                Fulfillment Rate
              </Text>

              <Text color="gray.500" fontSize="sm">
                Global slot progress
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
                    {fulfillmentRate}%
                  </Text>

                  <Text fontSize="sm" color="gray.500" fontWeight="700">
                    ALLOCATED
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
                Slot Distribution
              </Text>

              <Text color="gray.500" fontSize="sm">
                Capacity vs Usage per Category
              </Text>
            </VStack>

            <Box h="320px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slotDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar dataKey="total" radius={[8, 8, 0, 0]} fill="#26a8c9" />

                  <Bar dataKey="filled" radius={[8, 8, 0, 0]} fill="#910707" />

                  <Bar
                    dataKey="remaining"
                    radius={[8, 8, 0, 0]}
                    fill="#009419"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </GridItem>
      </Grid>

      <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr" }} gap={6}>
        <Box
          bg="white"
          borderRadius="2xl"
          p={6}
          border="1px solid"
          borderColor="gray.100"
        >
          <HStack justify="space-between" mb={5}>
            <Text fontSize="xl" fontWeight="700">
              Recent Jobs
            </Text>

            <Badge colorScheme="green">{recentJobs.length} Jobs</Badge>
          </HStack>

          <VStack gap={4} align="stretch">
            {recentJobs.map((job: RecentJob) => (
              <Box
                key={job.id}
                p={4}
                border="1px solid"
                borderColor="gray.100"
                borderRadius="xl"
              >
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="700">{job.title}</Text>

                  <Badge colorScheme="green">{job.status}</Badge>
                </HStack>

                <Text fontSize="sm" color="gray.500" mb={3}>
                  {job.country}
                </Text>

                <Progress.Root
                  value={
                    job.totalSlots > 0
                      ? (job.filledSlots / job.totalSlots) * 100
                      : 0
                  }
                  size="sm"
                  borderRadius="full"
                  colorPalette={"green"}
                >
                  <Progress.Track borderRadius="full">
                    <Progress.Range borderRadius="full" />
                  </Progress.Track>
                </Progress.Root>

                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.500">
                    {job.filledSlots}/{job.totalSlots} Filled
                  </Text>

                  <Text fontSize="sm" color="gray.500">
                    {job.remainingSlots} Remaining
                  </Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box
          bg="white"
          borderRadius="2xl"
          p={6}
          border="1px solid"
          borderColor="gray.100"
        >
          <Text fontSize="xl" fontWeight="700" mb={5}>
            Weekly Activity
          </Text>

          <Box h="350px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyChartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="jobs" radius={[8, 8, 0, 0]} fill="#2d850a" />

                <Bar dataKey="agencies" radius={[8, 8, 0, 0]} fill="#fd4d40" />

                <Bar
                  dataKey="candidates"
                  radius={[8, 8, 0, 0]}
                  fill="#000000"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Grid>

      <Box
        mt={6}
        bg="white"
        borderRadius="2xl"
        p={6}
        border="1px solid"
        borderColor="gray.100"
      >
        <HStack justify="space-between" mb={5}>
          <Text fontSize="xl" fontWeight="700">
            Recent Agencies
          </Text>

          <Badge colorScheme="blue">{recentAgencies.length} Agencies</Badge>
        </HStack>

        <VStack gap={4} align="stretch">
          {recentAgencies.map((agency: RecentAgency) => (
            <Box
              key={agency.id}
              p={4}
              border="1px solid"
              borderColor="gray.100"
              borderRadius="xl"
            >
              <HStack justify="space-between">
                <VStack align="start" gap={0}>
                  <Text fontWeight="700">{agency.fullName}</Text>

                  <Text fontSize="sm" color="gray.500">
                    {agency.email}
                  </Text>
                </VStack>

                <Badge colorScheme="green">{agency.approvalStatus}</Badge>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;

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
    >
      <HStack gap={4}>
        <Flex
          w="52px"
          h="52px"
          borderRadius="xl"
          bg="green.50"
          align="center"
          justify="center"
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

          {/* Optional */}
          {/* <Stat.HelpText>Updated today</Stat.HelpText> */}
        </Stat.Root>
      </HStack>
    </Box>
  );
};
