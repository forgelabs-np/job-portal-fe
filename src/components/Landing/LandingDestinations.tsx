"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { MotionSection } from "@/components/Landing/MotionSection";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const destinations = [
  {
    country: "Australia",
    description:
      "High-growth corridors across Sydney and Melbourne with regulated mobility pathways.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
  },
  {
    country: "Canada",
    description:
      "Enterprise demand in technology and healthcare with transparent visa frameworks.",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=900&q=80",
  },
  {
    country: "Japan",
    description:
      "Precision industries and innovation hubs ideal for senior engineering talent.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
  },
] as const;

export function LandingDestinations() {
  return (
    <MotionSection as="section" py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }}>
      <Box maxW="1280px" mx="auto">
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="800"
          color={landingColors.text}
          textAlign="center"
          mb={3}
        >
          Prime Destinations
        </Text>
        <Text
          textAlign="center"
          color={landingColors.textMuted}
          maxW="560px"
          mx="auto"
          mb={14}
        >
          Deploy talent where markets move fastest — with localized intelligence on every
          corridor.
        </Text>

        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          {destinations.map((d, i) => (
            <MotionSection
              key={d.country}
              flex={1}
              bg={landingColors.card}
              border="1px solid"
              borderColor={landingColors.border}
              borderRadius="2xl"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              delay={i * 0.1}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
                style={{ overflow: "hidden", height: 200 }}
              >
                <Box
                  h="200px"
                  w="full"
                  bgImage={`url(${d.image})`}
                  bgSize="cover"
                  bgPos="center"
                />
              </motion.div>
              <Box p={6} flex={1} display="flex" flexDirection="column">
                <Text fontSize="xl" fontWeight="800" color={landingColors.gold} mb={2}>
                  {d.country}
                </Text>
                <Text fontSize="sm" color={landingColors.textMuted} lineHeight="1.7" flex={1}>
                  {d.description}
                </Text>
                <Button
                  mt={6}
                  alignSelf="flex-start"
                  variant="outline"
                  borderColor={landingColors.gold}
                  color={landingColors.gold}
                  borderRadius="lg"
                  size="sm"
                  fontWeight="700"
                  letterSpacing="0.1em"
                  _hover={{
                    bg: "rgba(212,175,55,0.12)",
                    borderColor: landingColors.goldBright,
                  }}
                >
                  LEARN MORE
                </Button>
              </Box>
            </MotionSection>
          ))}
        </Flex>
      </Box>
    </MotionSection>
  );
}
