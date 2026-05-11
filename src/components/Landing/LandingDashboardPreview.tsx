"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { MotionSection } from "@/components/Landing/MotionSection";
import { ROUTES } from "@/constants/routes";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function LandingDashboardPreview() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -14, y: px * 16 });
  }, [reduce]);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <MotionSection as="section" py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }}>
      <Flex
        maxW="1280px"
        mx="auto"
        direction={{ base: "column", lg: "row" }}
        align="center"
        gap={{ base: 12, lg: 16 }}
      >
        <Box flex="1" maxW={{ lg: "44%" }}>
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="800"
            color={landingColors.text}
            mb={6}
            lineHeight="1.15"
          >
            Your Dashboard Command Center
          </Text>
          <Flex direction="column" gap={4} mb={8}>
            <Flex gap={3} align="flex-start">
              <Box
                mt={1.5}
                w="8px"
                h="8px"
                borderRadius="full"
                bg={landingColors.gold}
                flexShrink={0}
              />
              <Box>
                <Text fontWeight="700" color={landingColors.text} mb={1}>
                  Real-time Analytics
                </Text>
                <Text fontSize="sm" color={landingColors.textMuted} lineHeight="1.7">
                  Live funnel metrics, SLA tracking, and cohort performance without leaving the
                  surface.
                </Text>
              </Box>
            </Flex>
            <Flex gap={3} align="flex-start">
              <Box
                mt={1.5}
                w="8px"
                h="8px"
                borderRadius="full"
                bg={landingColors.gold}
                flexShrink={0}
              />
              <Box>
                <Text fontWeight="700" color={landingColors.text} mb={1}>
                  Integrated Tools
                </Text>
                <Text fontSize="sm" color={landingColors.textMuted} lineHeight="1.7">
                  Messaging, documents, and approvals unified so teams stay in flow.
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Link href={ROUTES.LOGIN} style={{ textDecoration: "none" }}>
            <Button
              size="lg"
              borderRadius="xl"
              px={8}
              bg={landingColors.gold}
              color="#0a0a0a"
              fontWeight="800"
              letterSpacing="0.08em"
              _hover={{
                bg: landingColors.goldBright,
                boxShadow: `0 12px 36px ${landingColors.goldMuted}`,
              }}
              transition="all 0.25s ease"
            >
              ACCESS DASHBOARD
            </Button>
          </Link>
        </Box>

        <Flex flex="1" justify="center" w="full" style={{ perspective: "1400px" }}>
          <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            animate={reduce ? {} : { rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{
              transformStyle: "preserve-3d",
              width: "100%",
              maxWidth: 440,
            }}
          >
            <Box
              borderRadius="2xl"
              border="1px solid"
              borderColor={landingColors.border}
              bg={`linear-gradient(155deg, ${landingColors.cardElevated} 0%, #0a0a0a 100%)`}
              p={6}
              boxShadow={`0 50px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(212,175,55,0.08)`}
              style={{ transform: "translateZ(24px)" }}
            >
              <Flex justify="space-between" align="center" mb={6}>
                <Text fontWeight="700" color={landingColors.text} fontSize="sm">
                  Operations
                </Text>
                <Box
                  px={2}
                  py={1}
                  borderRadius="md"
                  bg="rgba(212,175,55,0.15)"
                  color={landingColors.gold}
                  fontSize="xs"
                  fontWeight="700"
                >
                  LIVE
                </Box>
              </Flex>
              <GridMini />
            </Box>
          </motion.div>
        </Flex>
      </Flex>
    </MotionSection>
  );
}

function GridMini() {
  return (
    <Flex direction="column" gap={4}>
      <Flex gap={3}>
        <Box
          flex={1}
          bg={landingColors.surface}
          borderRadius="xl"
          p={4}
          border="1px solid"
          borderColor="rgba(255,255,255,0.06)"
        >
          <Text fontSize="xs" color={landingColors.textMuted} mb={1}>
            Active
          </Text>
          <Text fontSize="2xl" fontWeight="800" color={landingColors.gold}>
            248
          </Text>
        </Box>
        <Box
          flex={1}
          bg={landingColors.surface}
          borderRadius="xl"
          p={4}
          border="1px solid"
          borderColor="rgba(255,255,255,0.06)"
        >
          <Text fontSize="xs" color={landingColors.textMuted} mb={1}>
            Pipeline
          </Text>
          <Text fontSize="2xl" fontWeight="800" color={landingColors.gold}>
            112
          </Text>
        </Box>
      </Flex>
      <Box
        bg={landingColors.surface}
        borderRadius="xl"
        p={4}
        border="1px solid"
        borderColor="rgba(255,255,255,0.06)"
      >
        <Text fontSize="xs" color={landingColors.textMuted} mb={1}>
          Reach
        </Text>
        <Text fontSize="2xl" fontWeight="800" color={landingColors.gold}>
          1.2k
        </Text>
      </Box>
      <Box>
        <Flex justify="space-between" mb={2}>
          <Text fontSize="xs" color={landingColors.textMuted}>
            Placement velocity
          </Text>
          <Text fontSize="xs" color={landingColors.gold} fontWeight="700">
            72%
          </Text>
        </Flex>
        <Box h="8px" borderRadius="full" bg={landingColors.surface} overflow="hidden">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "72%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: "100%",
              borderRadius: 999,
              background: `linear-gradient(90deg, ${landingColors.gold} 0%, ${landingColors.goldBright} 100%)`,
            }}
          />
        </Box>
      </Box>
    </Flex>
  );
}
