"use client";

import { Box, Flex, Text, Button, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRoleModalStore } from "@/store/roleModalStore";
import { colors, landingColors } from "@/components/LandingPage/theme";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export function OozoCTASection() {
    const { openLoginModal } = useRoleModalStore();

    return (
        <Box
            as="section"
            position="relative"
            py={{ base: 16, md: 24 }}
            overflow="hidden"
            // bg={colors.darkGray}
            // style={{
            //     background: `linear-gradient(135deg, ${landingColors.gold} 0%, ${landingColors.gold} 50%, #f4d54bff 100%)`,
            // }}
            // bg={`linear-gradient(120deg, ${landingColors.gold} 0%, #a88b2c 45%, ${landingColors.goldBright} 100%)`}
            bg={colors.bgWarm}

        >
            {/* Decorative waves */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                h="200px"
                opacity={0.08}

                style={{
                    background: `radial-gradient(ellipse at 20% 100%, rgba(255,255,255,0.4) 0%, transparent 60%),
                       radial-gradient(ellipse at 80% 100%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
                }}
            />
            <Box
                position="absolute"
                top={0}
                right={0}
                w="400px"
                h="400px"
                borderRadius="full"
                opacity={0.06}
                style={{
                    background: "radial-gradient(circle, white 0%, transparent 70%)",
                    transform: "translate(30%, -30%)",
                }}
            />

            <Container maxW="1280px" position="relative" zIndex={1}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Text
                        fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
                        fontWeight="900"
                        color="black"
                        textAlign="center"
                        lineHeight={1.15}
                        mb={4}
                        maxW={"1000px"}
                        mx={"auto"}
                    >
                        Connecting Talent and Opportunity{" "}
                        <Text as="span" display={{ base: "block", md: "inline" }}>
                            Worldwide
                        </Text>
                    </Text>
                    <Text
                        fontSize="md"
                        color="gray.800"
                        textAlign="center"
                        maxW="620px"
                        mx="auto"
                        lineHeight={1.75}
                        mb={10}
                    >
                        Whether you&apos;re seeking skilled professionals or your next global career,
                        we help employers and job seekers connect with confidence and ease.
                    </Text>

                    <Flex justify="center" gap={4} flexWrap="wrap">
<Link href={ROUTES.LOGIN}>

                        <Button
                            h="48px"
                            px={7}
                            borderRadius="md"
                            border="2px solid"
                            borderColor="gray.600"
                            bg="transparent"
                            color="black"
                            fontWeight="700"
                            fontSize="sm"
                            _hover={{ bg: "gray.600", color: "white" }}
                            transition="all 0.25s"
                            gap={2}
                            // onClick={() => openLoginModal()}
                            >
                            Looking to hire?
                            <ArrowRight size={16} />
                        </Button>
                            </Link>
                            <Link href={ROUTES.CANDIDATE_LOGIN}>

                        <Button
                            h="48px"
                            px={7}
                            borderRadius="md"
                            bg={colors.gold}
                            color="black"
                            fontSize="sm"
                            _hover={{ bg: colors.goldDark, color: "white" }}
                            transition="all 0.25s"
                            gap={2}
                            // onClick={() => openLoginModal()}
                            >
                            Looking for work?
                            <ArrowRight size={16} />
                        </Button>
                            </Link>
                    </Flex>
                </motion.div>
            </Container>
        </Box>
    );
}