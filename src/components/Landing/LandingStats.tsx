"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { MotionSection } from "@/components/Landing/MotionSection";
import { Box, Flex, Text } from "@chakra-ui/react";

const stats = [
  { value: "10k+", label: "Total Talent" },
  { value: "500+", label: "Agency Partners" },
  { value: "25+", label: "Active Countries" },
  { value: "99%", label: "Success Rate" },
] as const;

export function LandingStats() {
  return (
    <MotionSection as="section" py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }}>
      <Flex
        maxW="1100px"
        mx="auto"
        wrap="wrap"
        justify="space-around"
        gap={{ base: 8, md: 6 }}
        borderY="1px solid"
        borderColor={landingColors.border}
        py={{ base: 10, md: 12 }}
      >
        {stats.map((s) => (
          <Box key={s.label} textAlign="center" minW="140px">
            <Text
              fontSize={{ base: "2.5rem", md: "3rem" }}
              fontWeight="800"
              color={landingColors.gold}
              lineHeight="1"
            >
              {s.value}
            </Text>
            <Text
              mt={3}
              fontSize="sm"
              letterSpacing="0.12em"
              fontWeight="600"
              color={landingColors.text}
            >
              {s.label}
            </Text>
          </Box>
        ))}
      </Flex>
    </MotionSection>
  );
}
