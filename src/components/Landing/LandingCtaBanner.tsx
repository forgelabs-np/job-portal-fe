"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { MotionSection } from "@/components/Landing/MotionSection";
import { ROUTES } from "@/constants/routes";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export function LandingCtaBanner() {
  return (
    <MotionSection py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }}>
      <Box maxW="1280px" mx="auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
            gap={8}
            borderRadius="3xl"
            px={{ base: 8, md: 14 }}
            py={{ base: 10, md: 12 }}
            bg={`linear-gradient(120deg, ${landingColors.gold} 0%, #a88b2c 45%, ${landingColors.goldBright} 100%)`}
            boxShadow={`0 30px 80px ${landingColors.goldMuted}`}
          >
            <Box maxW="640px">
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="900"
                color="#0a0a0a"
                lineHeight="1.2"
                mb={3}
              >
                Elevate Your Career to Global Horizons
              </Text>
              <Text color="rgba(10,10,10,0.75)" fontSize="sm" lineHeight="1.7">
                Join the community building the next standard for cross-border talent — with the
                infrastructure to match.
              </Text>
            </Box>
            <Link href={ROUTES.SIGNUP} style={{ textDecoration: "none", flexShrink: 0 }}>
              <Button
                size="lg"
                borderRadius="xl"
                px={8}
                bg="#0a0a0a"
                color={landingColors.goldBright}
                fontWeight="800"
                letterSpacing="0.08em"
                _hover={{
                  bg: "#151515",
                  transform: "translateY(-2px)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                }}
                transition="all 0.25s ease"
              >
                GET STARTED NOW
              </Button>
            </Link>
          </Flex>
        </motion.div>
      </Box>
    </MotionSection>
  );
}
