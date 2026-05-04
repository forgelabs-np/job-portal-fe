"use client";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";

// Icons
const DashboardIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="12.01" strokeWidth="3" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const features = [
  {
    icon: <DashboardIcon />,
    title: "Real-time Visibility",
    description:
      "Monitor job slots, staff performance, and candidate status in a unified high-fidelity dashboard.",
    featured: false,
  },
  {
    icon: <ShieldIcon />,
    title: "Institutional Compliance",
    description:
      "Built-in verification workflows ensure every candidate meets international labor standards.",
    featured: true,
  },
  {
    icon: <BriefcaseIcon />,
    title: "Slot Management",
    description:
      "Precision slot allocation prevents over-booking and streamlines the distribution pipeline.",
    featured: false,
  },
];

export default function FeaturesSection() {
  return (
    <Box py={{ base: 16, md: 24 }} px={{ base: 6, md: 8 }}>
      <Box textAlign="center" mb={{ base: 12, md: 16 }}>
        <Text
          as="h2"
          fontWeight="800"
          fontSize={{ base: "36px", md: "52px", lg: "60px" }}
          color="#0f1f17"
          letterSpacing="-0.03em"
          lineHeight="1.1"
          mb={4}
        >
          One platform,{" "}
          <Text as="span" fontStyle="italic" fontWeight="400" color="#166534">
            infinite
          </Text>{" "}
          control.
        </Text>
        <Text
          fontSize={{ base: "15px", md: "17px" }}
          color="#6b7280"
          maxW="480px"
          mx="auto"
          lineHeight="1.7"
        >
          Everything you need to manage international labor distribution at
          scale.
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        gap={6}
        maxW="1100px"
        mx="auto"
        alignItems="center"
      >
        {features.map((feature) => (
          <Box
            key={feature.title}
            bg={feature.featured ? "white" : "transparent"}
            border={"1.5px solid #eef0f3"}
            role="group"
            borderRadius="2xl"
            p={8}
            transition="all 0.2s ease"
            _hover={{
              bg: "white",
              border: "1.5px solid #e5e7eb",
              boxShadow:
                "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
              transform: "scale(1.04)",
            }}
          >
            <Box
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w="48px"
              h="48px"
              borderRadius="xl"
              bg={"#ebf7f7"}
              color="#166534"
              mb={8}
              _groupHover={{
                bg: "#dcfce7",
                transform: "scale(1.1)",
              }}
            >
              {feature.icon}
            </Box>

            <Text
              fontWeight="700"
              fontSize={{ base: "18px", md: "20px" }}
              color="#0f1f17"
              letterSpacing="-0.01em"
              mb={3}
            >
              {feature.title}
            </Text>

            <Text
              fontFamily="'Georgia', serif"
              fontSize="14px"
              color="#6b7280"
              lineHeight="1.75"
            >
              {feature.description}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
