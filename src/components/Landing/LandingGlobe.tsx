"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { MotionSection } from "@/components/Landing/MotionSection";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import { Box, Flex, Text } from "@chakra-ui/react";

export function LandingGlobe() {
  return (
    <MotionSection
      as="section"
      py={{ base: 14, md: 22 }}
      px={{ base: 4, md: 8 }}
      bgGradient="linear(to-b, transparent, rgba(212,175,55,0.03), transparent)"
    >
      <Flex
        maxW="1280px"
        mx="auto"
        direction={{ base: "column", lg: "row" }}
        align="center"
        gap={{ base: 10, lg: 14 }}
      >
        <Box flex={1} maxW={{ lg: "42%" }}>
          <Text
            fontSize="sm"
            letterSpacing="0.2em"
            fontWeight="700"
            color={landingColors.gold}
            mb={4}
          >
            LIVE NETWORK
          </Text>
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="800"
            color={landingColors.text}
            lineHeight="1.15"
            mb={4}
          >
            Presence where{" "}
            <Text as="span" color={landingColors.gold}>
              placements
            </Text>{" "}
            converge
          </Text>
          <Text color={landingColors.textMuted} fontSize="sm" lineHeight="1.8" maxW="md">
            Agencies and candidates stay synchronized across regions. Drag the globe to explore
            active corridors — the same canvas powers operational awareness inside the platform.
          </Text>
        </Box>

        <Box
          flex={1}
          w="full"
          minH={{ base: "300px", md: "360px" }}
          h={{ base: "360px", md: "420px" }}
          maxW="480px"
          mx="auto"
          borderRadius="2xl"
          border="1px solid"
          borderColor={landingColors.border}
          bg={landingColors.card}
          overflow="hidden"
          boxShadow={`0 0 60px ${landingColors.goldMuted}`}
        >
          <InteractiveGlobe
            size={480}
            dotColor="rgba(212, 175, 55, ALPHA)"
            arcColor="rgba(212, 175, 55, 0.4)"
            markerColor="rgba(244, 208, 108, 1)"
            autoRotateSpeed={0.0016}
          />
        </Box>
      </Flex>
    </MotionSection>
  );
}
