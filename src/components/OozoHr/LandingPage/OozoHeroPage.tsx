"use client";

import { ROUTES } from "@/constants/routes";
import { Box, Button, Flex, Text, Container } from "@chakra-ui/react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

import { Globe, DEFAULT_LANDING_GLOBE_ARCS, DEFAULT_LANDING_GLOBE_MARKERS, landingGlobeColors } from "@/components/ui/globe";
import { landingColors } from "@/components/LandingPage/theme";

export function OozoHeroPage() {
    const reduce = useReducedMotion();

    return (
        <Box
            as="section"
            position="relative"
            bg="#050505"
            overflow="hidden"
            py={{ base: 20, md: 28 }}
        >
            {/* subtle gradient background */}
            <Box
                position="absolute"
                inset={0}
                bgGradient="radial(circle at 70% 30%, rgba(212,175,55,0.10), transparent 55%)"
                pointerEvents="none"
            />

            <Container maxW="1200px">
                <Flex
                    direction={{ base: "column", lg: "row" }}
                    align="center"
                    justify="space-between"
                    gap={{ base: 14, lg: 10 }}
                >
                    {/* LEFT CONTENT */}
                    <Box flex="1" zIndex={2}>
                        <Text
                            fontSize={{ base: "2.5rem", md: "3.5rem", lg: "4rem" }}
                            fontWeight="900"
                            lineHeight="1.05"
                            letterSpacing="-0.04em"
                            color="white"
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
                            color="rgba(255,255,255,0.65)"
                            maxW="520px"
                            lineHeight="1.8"
                        >
                            Empowering ambitious agencies and candidates with scalable,
                            high-performance recruitment infrastructure built for the modern world.
                        </Text>

                        {/* CTA */}
                        <Flex mt={10} gap={4} flexWrap="wrap">
                            <Link href={ROUTES.SIGNUP}>
                                <Button
                                    size="lg"
                                    px={10}
                                    borderRadius="full"
                                    bg={landingColors.gold}
                                    color="#0a0a0a"
                                    fontWeight="800"
                                    _hover={{
                                        transform: "translateY(-2px)",
                                        bg: landingColors.goldBright,
                                        boxShadow: "0 15px 40px rgba(212,175,55,0.25)",
                                    }}
                                    transition="all 0.25s ease"
                                >
                                    Get Started
                                </Button>
                            </Link>

                            <Link href={ROUTES.LOGIN}>
                                <Button
                                    size="lg"
                                    px={10}
                                    borderRadius="full"
                                    variant="outline"
                                    borderColor="rgba(255,255,255,0.25)"
                                    color="white"
                                    _hover={{
                                        borderColor: landingColors.gold,
                                        color: landingColors.gold,
                                        bg: "rgba(212,175,55,0.08)",
                                    }}
                                    transition="all 0.25s ease"
                                >
                                    Agency Login
                                </Button>
                            </Link>
                        </Flex>
                    </Box>

                    {/* RIGHT GLOBE */}
                    <Flex flex="1" justify="center" align="center">
                        <Box
                            position="relative"
                            w={{ base: "320px", md: "420px", lg: "480px" }}
                            h={{ base: "320px", md: "420px", lg: "480px" }}
                        >
                            {/* outer glow ring */}
                            <Box
                                position="absolute"
                                inset="-10%"
                                borderRadius="full"
                                bg="radial-gradient(circle, rgba(212,175,55,0.18), transparent 60%)"
                                filter="blur(10px)"
                            />

                            {/* glass frame */}
                            <Box
                                position="absolute"
                                inset={0}
                                borderRadius="full"
                                bg="rgba(255,255,255,0.02)"
                                border="1px solid rgba(255,255,255,0.08)"
                                boxShadow="0 40px 120px rgba(0,0,0,0.6)"
                                backdropFilter="blur(10px)"
                                overflow="hidden"
                            >
                                <Globe
                                    markers={DEFAULT_LANDING_GLOBE_MARKERS}
                                    arcs={DEFAULT_LANDING_GLOBE_ARCS}
                                    markerColor={landingGlobeColors.markerColor}
                                    arcColor={landingGlobeColors.arcColor}
                                    baseColor={landingGlobeColors.baseColor}
                                    glowColor={landingGlobeColors.glowColor}
                                    dark={landingGlobeColors.dark}
                                    mapBrightness={landingGlobeColors.mapBrightness}
                                    speed={reduce ? 0 : 0.0012}
                                />
                            </Box>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
}