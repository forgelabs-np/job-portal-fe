"use client";

import { Box, Container, Flex, Grid, Text } from "@chakra-ui/react";
import {
    ClipboardCheck,
    FileCheck2,
    Headphones,
    Plane,
    Search,
    ShieldCheck,
    UserRoundCheck,
} from "lucide-react";
import { MotionSection } from "./OozoMotionSection";
import { colors, landingColors } from "@/components/LandingPage/theme";

const steps = [
    { number: "01", title: "Source", description: "Targeted campaigns and candidate sourcing.", icon: Search },
    { number: "02", title: "Assess", description: "CV review, screening, and eligibility checks.", icon: ClipboardCheck },
    { number: "03", title: "Prepare", description: "Interviews, trade tests, and readiness preparation.", icon: UserRoundCheck },
    { number: "04", title: "Select", description: "Employer evaluation and final selection.", icon: ShieldCheck },
    { number: "05", title: "Process", description: "Documentation, permits, and visa support.", icon: FileCheck2 },
    { number: "06", title: "Deploy", description: "Travel and arrival coordination.", icon: Plane },
    { number: "07", title: "Support", description: "Joining confirmation and follow-up.", icon: Headphones },
] as const;

export function RecruitmentProcessSection() {
    return (
        <MotionSection
            as="section"
            id="recruitment-process"
            py={{ base: 16, md: 24 }}
            px={{ base: 4, md: 8 }}
            bg={colors.bg}
        >
            <Container maxW="1280px">
                <Flex direction={{ base: "column", lg: "row" }} justify="space-between" gap={8} mb={{ base: 10, md: 14 }}>
                    <Box maxW="560px">
                        <Text color={colors.crimson} fontSize="xs" fontWeight="800" letterSpacing="0.18em" textTransform="uppercase" mb={4}>
                            The OOZO method
                        </Text>
                        <Text as="h2" color={colors.text} fontSize={{ base: "3xl", md: "5xl" }} fontWeight="900" lineHeight="1.04" letterSpacing="-0.04em">
                            A clear path from need to new beginning.
                        </Text>
                    </Box>
                    <Text maxW="420px" color={colors.textMuted} fontSize={{ base: "sm", md: "md" }} lineHeight="1.8" alignSelf={{ lg: "flex-end" }}>
                        Every placement moves through a coordinated sequence of checks, conversations, and practical support, so employers and candidates always know what comes next.
                    </Text>
                </Flex>

                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={{ base: 3, md: 4 }}>
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <Box
                                key={step.number}
                                position="relative"
                                bg={colors.white}
                                border="1px solid"
                                borderColor={colors.borderLight}
                                borderRadius="16px"
                                p={{ base: 5, md: 6 }}
                                minH={{ lg: "190px" }}
                                transition="all 0.25s ease"
                                _hover={{ transform: "translateY(-4px)", borderColor: colors.gold, boxShadow: "0 16px 34px rgba(26,26,26,0.08)" }}
                                _after={index < steps.length - 1 ? { content: '""', display: { base: "none", lg: index === 3 || index === 6 ? "none" : "block" }, position: "absolute", top: "50%", right: "-17px", width: "17px", borderTop: "1px dashed", borderColor: colors.gold, zIndex: 1 } : undefined}
                            >
                                <Flex justify="space-between" align="flex-start" mb={8}>
                                    <Box w="42px" h="42px" borderRadius="12px" bg={landingColors.goldMuted} color={colors.goldDark} display="flex" alignItems="center" justifyContent="center">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </Box>
                                    <Text fontFamily={"'JetBrains Mono', monospace"} fontSize="xs" color={colors.textLight} fontWeight="700">{step.number}</Text>
                                </Flex>
                                <Text color={colors.text} fontSize="lg" fontWeight="800" mb={2}>{step.title}</Text>
                                <Text color={colors.textMuted} fontSize="sm" lineHeight="1.65">{step.description}</Text>
                            </Box>
                        );
                    })}
                </Grid>
            </Container>
        </MotionSection>
    );
}