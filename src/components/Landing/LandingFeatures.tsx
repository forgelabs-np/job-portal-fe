"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { MotionSection } from "@/components/Landing/MotionSection";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { BarChart3, Building2, Globe, Plane, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type LandingFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
  chart?: boolean;
};

const features: LandingFeature[] = [
  {
    title: "Global Listings",
    description: "Access curated talent pools across regions with unified search and matching.",
    icon: Globe,
  },
  {
    title: "Agency Portal",
    description: "Operate placements, compliance, and communications from one command surface.",
    icon: Building2,
  },
  {
    title: "Verified Credentials",
    description: "Immutable documentation trails with audit-ready verification workflows.",
    icon: Shield,
  },
  {
    title: "Visa Automation",
    description: "Integrated legal checkpoints and document flows to accelerate deployment.",
    icon: Plane,
  },
  {
    title: "Predictive Analytics",
    description: "Forecast pipeline health, conversion, and time-to-hire with live signals.",
    icon: BarChart3,
    chart: true,
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
          mb={14}
        >
          Modular capabilities engineered for agencies operating at global scale.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {features.map((f, i) => (
            <MotionSection
              key={f.title}
              bg={landingColors.card}
              border="1px solid"
              borderColor={landingColors.border}
              borderRadius="2xl"
              p={8}
              transition="border-color 0.25s, box-shadow 0.25s"
              _hover={{
                borderColor: landingColors.gold,
                boxShadow: `0 0 0 1px ${landingColors.goldMuted}, 0 24px 48px rgba(0,0,0,0.45)`,
              }}
              delay={i * 0.06}
            >
              <Box color={landingColors.gold} mb={4}>
                <f.icon size={28} strokeWidth={1.75} />
              </Box>
              <Text fontSize="lg" fontWeight="700" color={landingColors.text} mb={2}>
                {f.title}
              </Text>
              <Text fontSize="sm" color={landingColors.textMuted} lineHeight="1.7">
                {f.description}
              </Text>
              {f.chart && (
                <Flex gap={1.5} mt={6} align="flex-end" h="48px">
                  {[40, 65, 45, 80, 55, 90].map((h, j) => (
                    <Box
                      key={j}
                      flex={1}
                      borderRadius="sm"
                      bg={`linear-gradient(180deg, ${landingColors.gold} 0%, rgba(212,175,55,0.25) 100%)`}
                      h={`${h}%`}
                      opacity={0.9}
                    />
                  ))}
                </Flex>
              )}
            </MotionSection>
          ))}
        </SimpleGrid>
      </Box>
    </MotionSection>
  );
}
