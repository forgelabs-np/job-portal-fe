"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { MotionSection } from "@/components/Landing/MotionSection";
import RadialOrbitalTimeline from "@/shared/components/RadialOrbitalTimeline";
import { Box, Text } from "@chakra-ui/react";
import { BarChart3, Building2, Globe, Plane, Shield } from "lucide-react";

const timelineData = [
  {
    id: 1,
    title: "Global Listings",
    date: "Feature 01",
    content:
      "Access curated talent pools across regions with unified search and matching.",
    category: "Discovery",
    icon: Globe,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Agency Portal",
    date: "Feature 02",
    content:
      "Operate placements, compliance, and communications from one command surface.",
    category: "Operations",
    icon: Building2,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 3,
    title: "Verified Credentials",
    date: "Feature 03",
    content:
      "Immutable documentation trails with audit-ready verification workflows.",
    category: "Compliance",
    icon: Shield,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 4,
    title: "Visa Automation",
    date: "Feature 04",
    content:
      "Integrated legal checkpoints and document flows to accelerate deployment.",
    category: "Legal",
    icon: Plane,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 72,
  },
  {
    id: 5,
    title: "Predictive Analytics",
    date: "Feature 05",
    content:
      "Forecast pipeline health, conversion, and time-to-hire with live signals.",
    category: "Intelligence",
    icon: BarChart3,
    relatedIds: [1, 4],
    status: "in-progress" as const,
    energy: 60,
  },
];

export function LandingFeatures() {
  return (
    <MotionSection
      id="solutions"
      as="section"
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 8 }}
    >
      <Box maxW="1280px" mx="auto">
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="800"
          color={landingColors.text}
          textAlign="center"
          mb={3}
        >
          Elite Ecosystem
        </Text>
        <Text
          textAlign="center"
          color={landingColors.textMuted}
          maxW="640px"
          mx="auto"
          mb={0}
        >
          Modular capabilities engineered for agencies operating at global scale.
        </Text>
      </Box>

      {/* Full-width orbital timeline — click any node to expand its detail card */}
      <Box w="full" h="600px" mt={-6}>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </Box>
    </MotionSection>
  );
}

export default {
  LandingFeatures,
};