"use client";

import { Box, Container, Flex, Grid, Text } from "@chakra-ui/react";
import {
    Building2,
    Factory,
    HeartPulse,
    Leaf,
    Truck,
    Utensils,
    Wrench,
    Waves,
} from "lucide-react";
import { MotionSection } from "./OozoMotionSection";
import { colors } from "@/components/LandingPage/theme";

const industries = [
    { title: "Construction & MEP", description: "Electricians, technicians, mechanics, and skilled trades.", icon: Wrench },
    { title: "Hospitality & F&B", description: "Kitchen, service, housekeeping, and hotel teams.", icon: Utensils },
    { title: "Logistics & Manufacturing", description: "Warehouse, production, and machine operators.", icon: Factory },
    { title: "Transport & Drivers", description: "Light, heavy, trailer, and delivery drivers.", icon: Truck },
    { title: "Healthcare", description: "Nursing and care professionals subject to licensing.", icon: HeartPulse },
    { title: "Oil, Gas & Industrial", description: "Technical and project-based workforce.", icon: Waves },
    { title: "Agriculture", description: "Farm, greenhouse, and machinery operators.", icon: Leaf },
    { title: "Facilities & Service", description: "Cleaning, security, retail, and support roles.", icon: Building2 },
] as const;

export function IndustriesSection() {
    return (
        <MotionSection as="section" id="specialization" py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }} bg={colors.white}>
            <Container maxW="1280px">
                <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "flex-end" }} gap={5} mb={{ base: 10, md: 12 }}>
                    <Box>
                        <Text color={colors.goldDark} fontSize="xs" fontWeight="800" letterSpacing="0.18em" textTransform="uppercase" mb={4}>Where we work</Text>
                        <Text as="h2" color={colors.text} fontSize={{ base: "3xl", md: "5xl" }} fontWeight="900" lineHeight="1.04" letterSpacing="-0.04em">People for the work that matters.</Text>
                    </Box>
                    <Text maxW="390px" color={colors.textMuted} fontSize={{ base: "sm", md: "md" }} lineHeight="1.8">From essential services to complex industrial projects, our network reaches the roles that keep businesses moving.</Text>
                </Flex>

                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
                    {industries.map((industry, index) => {
                        const Icon = industry.icon;
                        return (
                            <Box key={industry.title} role="group" border="1px solid" borderColor={colors.borderLight} borderRadius="14px" p={{ base: 5, md: 6 }} minH="205px" display="flex" flexDirection="column" justifyContent="space-between" transition="all 0.25s ease" _hover={{ bg: colors.bg, borderColor: colors.gold, transform: "translateY(-4px)" }}>
                                <Flex justify="space-between" align="flex-start">
                                    <Box w="40px" h="40px" borderRadius="10px" bg={index % 2 === 0 ? "rgba(139,26,26,0.08)" : "rgba(212,160,23,0.13)"} color={index % 2 === 0 ? colors.crimson : colors.goldDark} display="flex" alignItems="center" justifyContent="center"><Icon size={19} strokeWidth={1.8} /></Box>
                                    <Text fontSize="xs" color={colors.textLight} fontFamily={"'JetBrains Mono', monospace"}>0{index + 1}</Text>
                                </Flex>
                                <Box mt={8}><Text color={colors.text} fontSize="md" fontWeight="800" mb={2}>{industry.title}</Text><Text color={colors.textMuted} fontSize="sm" lineHeight="1.65">{industry.description}</Text></Box>
                            </Box>
                        );
                    })}
                </Grid>
            </Container>
        </MotionSection>
    );
}