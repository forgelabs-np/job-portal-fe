"use client";

import { Box, Flex, Text, Button, Container, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Clock,
  Calendar,
  Banknote,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { colors, fonts, radii } from "./theme";

const MotionBox = motion(Box);

// ─── Types — replace with your API response shape ───────────────────────────
export interface JobListing {
  id: number;
  company: string;
  companyLogo?: string;
  title: string;
  location: string;
  country: string;
  maleCount?: number;
  femaleCount?: number;
  hoursPerDay: number;
  daysPerWeek: number;
  deadline: string;
  daysLeft: number;
  salaryNPR: number;
  category: string;
}

// Default placeholder data — swap with API call
const defaultJobs: JobListing[] = [
  {
    id: 1,
    company: "EcoPure Technical Services",
    title: "Frontend Developer",
    location: "Ajman",
    country: "UAE",
    maleCount: 1,
    femaleCount: 30,
    hoursPerDay: 8,
    daysPerWeek: 6,
    deadline: "23/07/2026",
    daysLeft: 65,
    salaryNPR: 75732,
    category: "Healthcare",
  },
  {
    id: 2,
    company: "Gulf Manpower Solutions",
    title: "Caregiver – Elderly",
    location: "Doha",
    country: "Qatar",
    femaleCount: 15,
    hoursPerDay: 8,
    daysPerWeek: 5,
    deadline: "15/08/2026",
    daysLeft: 88,
    salaryNPR: 62000,
    category: "Caregiving",
  },
  {
    id: 3,
    company: "Horizon Construction",
    title: "Civil Construction Worker",
    location: "Riyadh",
    country: "Saudi Arabia",
    maleCount: 20,
    hoursPerDay: 10,
    daysPerWeek: 6,
    deadline: "30/06/2026",
    daysLeft: 42,
    salaryNPR: 55000,
    category: "Construction",
  },
];

const categories = [
  "All Categories",
  "Healthcare",
  "Caregiving",
  "Construction",
  "Security",
  "Hospitality",
  "Manufacturing & Factory",
];

interface Props {
  jobs?: JobListing[];
  isLoading?: boolean;
}

function JobCard({ job, index }: { job: JobListing; index: number }) {
  const urgent = job.daysLeft <= 45;
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
            {job.companyLogo ? (
              <Box as="img" src={job.companyLogo} alt={job.company} w="full" h="full" objectFit="cover" />
            ) : (
              <Text fontSize="lg" fontFamily={fonts.heading} fontWeight="800" color={colors.crimson}>
                {job.company.charAt(0)}
              </Text>
            )}
          </Box>
          <Box flex={1} minW={0}>
            <Text
              fontSize="xs"
              color={colors.textMuted}
              fontFamily={fonts.body}
              noOfLines={1}
            >
              {job.company}
            </Text>
            <Text
              fontSize="md"
              fontWeight="700"
              color={colors.text}
              fontFamily={fonts.heading}
              noOfLines={1}
            >
              {job.title}
            </Text>
          </Box>
          <Badge
            fontSize="2xs"
            fontFamily={fonts.body}
            fontWeight="700"
            bg={colors.bgWarm}
            color={colors.textMuted}
            borderRadius="sm"
            px={2}
            py={0.5}
          >
            {job.category}
          </Badge>
        </Flex>

        {/* Location */}
        <Flex align="center" gap={1.5}>
          <MapPin size={13} color={colors.textLight} />
          <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body}>
            {job.country} ({job.location})
          </Text>
        </Flex>

        {/* Gender count */}
        <Flex gap={3}>
          {job.maleCount !== undefined && (
            <Box
              bg={colors.bgWarm}
              borderRadius={radii.sm}
              px={3}
              py={1.5}
              flex={1}
            >
              <Flex align="center" gap={2}>
                <Users size={13} color={colors.textMuted} />
                <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body}>
                  Male
                </Text>
                <Text fontSize="xs" fontWeight="700" color={colors.text} fontFamily={fonts.body} ml="auto">
                  {job.maleCount}
                </Text>
              </Flex>
            </Box>
          )}
          {job.femaleCount !== undefined && (
            <Box
              bg={colors.bgWarm}
              borderRadius={radii.sm}
              px={3}
              py={1.5}
              flex={1}
            >
              <Flex align="center" gap={2}>
                <Users size={13} color={colors.textMuted} />
                <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body}>
                  Female
                </Text>
                <Text fontSize="xs" fontWeight="700" color={colors.text} fontFamily={fonts.body} ml="auto">
                  {job.femaleCount}
                </Text>
              </Flex>
            </Box>
          )}
        </Flex>

        {/* Meta info */}
        <Flex direction="column" gap={1.5}>
          <Flex align="center" gap={2}>
            <Clock size={13} color={colors.textLight} />
            <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body}>
              {job.hoursPerDay} hrs | {job.daysPerWeek} days
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Calendar size={13} color={colors.textLight} />
            <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body}>
              {job.deadline}
            </Text>
            <Text
              fontSize="2xs"
              fontWeight="700"
              color={urgent ? colors.crimson : colors.gold}
              fontFamily={fonts.body}
              ml={1}
            >
              • {job.daysLeft} days left
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Banknote size={13} color={colors.textLight} />
            <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body}>
              {job.salaryNPR.toLocaleString()} NRs/month
            </Text>
          </Flex>
        </Flex>

        {/* CTA */}
        <Button
          mt="auto"
          bg={colors.crimson}
          color="white"
          fontFamily={fonts.body}
          fontWeight="700"
          fontSize="xs"
          borderRadius="md"
          h="38px"
          _hover={{ bg: colors.crimsonDark }}
          transition="all 0.2s"
          gap={2}
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
      h="320px"
    >
      {[80, 120, 60, 60, 40].map((w, i) => (
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

export function JobsSection({ jobs = defaultJobs, isLoading = false }: Props) {
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
            <Text fontSize="2xs" fontWeight="800" color="white" fontFamily={fonts.body} letterSpacing="widest" textTransform="uppercase">
              Current Hiring
            </Text>
          </Flex>
          <Text
            fontFamily={fonts.heading}
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="800"
            color={colors.text}
            lineHeight={1.2}
            mb={3}
          >
            Find latest jobs open for Nepali workers
          </Text>
          <Text fontSize="sm" color={colors.textMuted} fontFamily={fonts.body} lineHeight={1.7} maxW="640px">
            Interpid brings you the newest job openings in Nepal and abroad. Choose from many
            trusted companies and apply easily with our simple process.
          </Text>
        </Box>

        {/* Category tabs */}
        <Flex gap={2} mb={8} flexWrap="wrap">
          {categories.map((cat, i) => (
            <Box
              key={cat}
              as="button"
              px={4}
              py={2}
              borderRadius="md"
              fontSize="sm"
              fontFamily={fonts.body}
              fontWeight="600"
              cursor="pointer"
              transition="all 0.2s"
              bg={i === 0 ? colors.gold : colors.white}
              color={i === 0 ? colors.white : colors.textMuted}
              border="1px solid"
              borderColor={i === 0 ? colors.gold : colors.border}
              _hover={i !== 0 ? { borderColor: colors.crimson, color: colors.crimson } : {}}
            >
              {cat}
              {i !== 0 && <Text as="span" ml={1} fontSize="xs">↗</Text>}
            </Box>
          ))}
        </Flex>

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
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
        </Box>

        {/* View all */}
        <Flex justify="flex-end">
          <Button
            bg={colors.gold}
            color="white"
            fontFamily={fonts.body}
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
        </Flex>
      </Container>
    </Box>
  );
}