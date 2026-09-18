"use client";

import { Box, Container, Flex, Grid, Text } from "@chakra-ui/react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { MotionSection } from "./OozoMotionSection";
import { landingColors } from "@/components/LandingPage/theme";

const locations = [
    { name: "Abu Dhabi", label: "Headquarters", description: "Al Saman Tower, Block B, Floor 7, Office 10, Hamdan Street, Abu Dhabi", phone: "+971 2 678 3515", href: "tel:+97126783515" },
    { name: "Dubai", label: "Regional coordination", description: "Candidate sourcing project coordination and employer support.", href: "/public/contact" },
    { name: "Kuwait · Salmiya", label: "Candidate support", description: "Candidate support and vacancy enquiries in Kuwait.", href: "/public/contact" },
    { name: "Qatar", label: "Application channel", description: "Vacancy sourcing and candidate application support.", href: "/public/contact" },
] as const;

export function GlobalSupportSection() {
    return (
        <MotionSection as="section" id="global-support" py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }} bg={"#06243C"} color={landingColors.text} overflow="hidden">
            <Container maxW="1280px" position="relative">
                <Box position="absolute" right={{ base: "-100px", md: "-40px" }} top="-120px" w="420px" h="420px" border="1px solid" borderColor={landingColors.border} borderRadius="full" opacity={0.45} pointerEvents="none" />
                <Box position="absolute" right="80px" top="-40px" w="240px" h="240px" border="1px solid" borderColor={landingColors.border} borderRadius="full" opacity={0.35} pointerEvents="none" />
                <Flex direction={{ base: "column", lg: "row" }} justify="space-between" gap={10} mb={{ base: 10, md: 14 }} position="relative">
                    <Box maxW="600px"><Text color={landingColors.goldBright} fontSize="xs" fontWeight="800" letterSpacing="0.18em" textTransform="uppercase" mb={4}>OOZO network
</Text><Text as="h2" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="900" lineHeight="1.04" letterSpacing="-0.04em">Local support. International reach.</Text></Box>
                    <Text maxW="400px" color={landingColors.textMuted} fontSize={{ base: "sm", md: "md" }} lineHeight="1.8" alignSelf={{ lg: "flex-end" }}>Our regional teams keep employer coordination and candidate support connected across the Gulf.</Text>
                </Flex>
                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={3} position="relative">
                    {locations.map((location, index) => {
                        const isPhone = "phone" in location;
                        return (
                            <Link key={location.name} href={location.href} style={{ display: "block", textDecoration: "none" }}>
                                <Box display="flex" flexDirection="column" justifyContent="space-between" minH={{ base: "210px", md: "240px" }} p={{ base: 5, md: 6 }} border="1px solid" borderColor="rgba(255,255,255,0.12)" borderRadius="14px" bg="rgba(255,255,255,0.035)" transition="all 0.25s ease" _hover={{ bg: "rgba(212,175,55,0.1)", borderColor: landingColors.gold, transform: "translateY(-4px)" }}>
                                <Flex justify="space-between" align="flex-start"><Box color={landingColors.gold}><MapPin size={19} strokeWidth={1.7} /></Box><Text fontSize="xs" color="rgba(255,255,255,0.38)" fontFamily={"'JetBrains Mono', monospace"}>0{index + 1}</Text></Flex>
                                <Box mt={8}><Text fontSize="lg" fontWeight="800" color="white" mb={1}>{location.name}</Text><Text color={landingColors.goldBright} fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="0.08em" mb={3}>{location.label}</Text><Text color={landingColors.textMuted} fontSize="sm" lineHeight="1.65">{location.description}</Text>{isPhone ? <Flex align="center" gap={2} mt={4} color="white"><Phone size={14} /><Text fontSize="sm" fontWeight="700">{location.phone}</Text></Flex> : <Flex align="center" gap={1} mt={4} color={"white"}><Text fontSize="xs" fontWeight="700">Contact the team</Text><ArrowUpRight size={14} /></Flex>}</Box>
                                </Box>
                            </Link>
                        );
                    })}
                </Grid>
            </Container>
        </MotionSection>
    );
}