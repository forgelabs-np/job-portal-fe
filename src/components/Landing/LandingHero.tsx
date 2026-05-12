"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import {
  DEFAULT_LANDING_GLOBE_ARCS,
  DEFAULT_LANDING_GLOBE_MARKERS,
  Globe,
  landingGlobeColors,
} from "@/components/ui/cobe-globe";
import { ROUTES } from "@/constants/routes";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

export function LandingHero() {
  const reduce = useReducedMotion();

  return (
    <Box
      id="top"
      as="section"
      position="relative"
      overflow="hidden"
      pt={{ base: 12, md: 20 }}
      pb={{ base: 16, md: 24 }}
      px={{ base: 4, md: 8 }}
    >
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at 70% 30%, rgba(212,175,55,0.12) 0%, transparent 45%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="20%"
        left="-10%"
        w="40%"
        h="40%"
        borderRadius="full"
        bg={landingColors.goldMuted}
        filter="blur(120px)"
        opacity={0.4}
        pointerEvents="none"
      />

      <Flex
        maxW="1280px"
        mx="auto"
        direction={{ base: "column", lg: "row" }}
        align="center"
        gap={{ base: 14, lg: 8 }}
      >
        <Box flex="1" maxW={{ lg: "52%" }} zIndex={1}>
          <Text
            fontSize={{ base: "2.2rem", md: "3.25rem", lg: "3.5rem" }}
            fontWeight="800"
            lineHeight="1.08"
            color={landingColors.text}
            letterSpacing="-0.03em"
          >
            Global Talent{" "}
            <Text as="span" color={landingColors.gold}>
              Seamlessly
            </Text>{" "}
            Integrated
          </Text>
          <Text
            mt={6}
            fontSize={{ base: "md", md: "lg" }}
            color={landingColors.textMuted}
            lineHeight="1.7"
            maxW="520px"
          >
            Empowering the world&apos;s most ambitious agencies and candidates with
            scalable high-performance recruitment.
          </Text>
          <Flex mt={10} gap={4} flexWrap="wrap">
            <Link href={ROUTES.SIGNUP} style={{ textDecoration: "none" }}>
              <Button
                size="lg"
                borderRadius="xl"
                px={8}
                bg={landingColors.gold}
                color="#0a0a0a"
                fontWeight="800"
                letterSpacing="0.06em"
                _hover={{
                  bg: landingColors.goldBright,
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 40px ${landingColors.goldMuted}`,
                }}
                transition="all 0.25s ease"
              >
                GET STARTED
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN} style={{ textDecoration: "none" }}>
              <Button
                size="lg"
                borderRadius="xl"
                px={8}
                variant="outline"
                borderWidth="2px"
                borderColor="rgba(255,255,255,0.35)"
                color={landingColors.text}
                fontWeight="700"
                letterSpacing="0.06em"
                bg="transparent"
                _hover={{
                  borderColor: landingColors.gold,
                  color: landingColors.gold,
                  bg: "rgba(212,175,55,0.06)",
                }}
                transition="all 0.25s ease"
              >
                AGENCY LOGIN
              </Button>
            </Link>
          </Flex>
        </Box>

        <Flex
          flex="1"
          justify="center"
          align="center"
          position="relative"
          minH={{ base: "380px", md: "min(520px, 52vh)" }}
          w="full"
        >
          <Box
            position="relative"
            w="min(100%, clamp(300px, 58vw, 480px))"
            h="min(100%, clamp(300px, 58vw, 480px))"
            aspectRatio={1}
          >
            <Box
              position="absolute"
              inset="-8%"
              borderRadius="full"
              bg={`radial-gradient(circle, ${landingColors.goldMuted} 0%, transparent 65%)`}
              filter="blur(8px)"
            />
            <Box
              position="relative"
              w="full"
              h="full"
              borderRadius="3xl"
              // bg={`linear-gradient(145deg, #1f1f1f 0%, #0a0a0a 50%, #151515 100%)`}
              // border="1px solid"
              // borderColor={landingColors.border}
              // boxShadow={`0 40px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.06)`}
              overflow="hidden"
            >
              <Box w="full" h="full" p={{ base: 2, md: 3 }}>
                <Box w="full" h="full" minH={{ base: "260px", md: "320px" }}>
                  <Globe
                    markers={DEFAULT_LANDING_GLOBE_MARKERS}
                    arcs={DEFAULT_LANDING_GLOBE_ARCS}
                    markerColor={landingGlobeColors.markerColor}
                    arcColor={landingGlobeColors.arcColor}
                    baseColor={landingGlobeColors.baseColor}
                    glowColor={landingGlobeColors.glowColor}
                    dark={landingGlobeColors.dark}
                    mapBrightness={landingGlobeColors.mapBrightness}
                    speed={reduce ? 0 : 0.00135}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
