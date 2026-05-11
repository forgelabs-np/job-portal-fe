"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { MotionSection } from "@/components/Landing/MotionSection";
import { Box, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Digital Onboarding",
    body: "Guided intake, credential capture, and role calibration in a single secure session.",
    side: "left" as const,
    icon: Sparkles,
  },
  {
    title: "Elite Vetting",
    body: "Multi-layer verification, reference synthesis, and readiness scoring before release.",
    side: "right" as const,
    icon: ShieldCheck,
  },
  {
    title: "Direct Deployment",
    body: "Handshake to contract with live status, compliance checkpoints, and travel readiness.",
    side: "left" as const,
    icon: Rocket,
  },
];

function StepDot({ Icon }: { Icon: typeof Sparkles }) {
  return (
    <Flex
      w="56px"
      h="56px"
      borderRadius="full"
      bg={landingColors.card}
      border="2px solid"
      borderColor={landingColors.gold}
      boxShadow={`0 0 24px ${landingColors.goldMuted}`}
      align="center"
      justify="center"
      color={landingColors.gold}
      zIndex={2}
    >
      <Icon size={26} />
    </Flex>
  );
}

export function LandingProcess() {
  return (
    <MotionSection
      id="about"
      as="section"
      py={{ base: 16, md: 28 }}
      px={{ base: 4, md: 8 }}
      bgGradient="linear(to-b, transparent, rgba(212,175,55,0.05), transparent)"
    >
      <Box maxW="960px" mx="auto" position="relative">
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="800"
          color={landingColors.text}
          textAlign="center"
          mb={4}
        >
          Seamless Velocity
        </Text>
        <Text textAlign="center" color={landingColors.textMuted} mb={12}>
          A linear pipeline engineered for speed without sacrificing rigor.
        </Text>

        <Stack gap={4} display={{ base: "flex", md: "none" }}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Box
                  bg={landingColors.card}
                  border="1px solid"
                  borderColor={landingColors.border}
                  borderRadius="xl"
                  p={6}
                >
                  <Flex align="center" gap={3} mb={3}>
                    <StepDot Icon={Icon} />
                    <Text fontWeight="800" color={landingColors.text} fontSize="lg">
                      {step.title}
                    </Text>
                  </Flex>
                  <Text color={landingColors.textMuted} lineHeight="1.75" fontSize="sm">
                    {step.body}
                  </Text>
                </Box>
              </motion.div>
            );
          })}
        </Stack>

        <Box display={{ base: "none", md: "block" }} position="relative">
          <Box
            position="absolute"
            left="50%"
            top="40px"
            bottom="40px"
            w="2px"
            transform="translateX(-50%)"
            bg={`linear-gradient(180deg, ${landingColors.gold} 0%, rgba(212,175,55,0.2) 50%, ${landingColors.gold} 100%)`}
            borderRadius="full"
            zIndex={0}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLeft = step.side === "left";
            const copy = (
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <Text fontWeight="800" color={landingColors.text} fontSize="xl" mb={3}>
                  {step.title}
                </Text>
                <Text color={landingColors.textMuted} lineHeight="1.75" fontSize="sm">
                  {step.body}
                </Text>
              </motion.div>
            );

            return (
              <Grid
                key={step.title}
                templateColumns="1fr 80px 1fr"
                gap={2}
                alignItems="center"
                mb={16}
              >
                {isLeft ? (
                  <>
                    <GridItem textAlign="right" pr={6}>
                      {copy}
                    </GridItem>
                    <GridItem display="flex" justifyContent="center">
                      <StepDot Icon={Icon} />
                    </GridItem>
                    <GridItem />
                  </>
                ) : (
                  <>
                    <GridItem />
                    <GridItem display="flex" justifyContent="center">
                      <StepDot Icon={Icon} />
                    </GridItem>
                    <GridItem textAlign="left" pl={6}>
                      {copy}
                    </GridItem>
                  </>
                )}
              </Grid>
            );
          })}
        </Box>
      </Box>
    </MotionSection>
  );
}
