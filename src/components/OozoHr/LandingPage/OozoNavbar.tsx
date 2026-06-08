"use client";

import { EnvelopeWhiteIcon, FacebookWhiteIcon, InstagramWhiteIcon, LocationMarkerIcon, LogoIcon, PhoneWhiteIcon, TwitterWhiteIcon } from "@/assets/svg/landing";
import { ROUTES } from "@/constants/routes";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useRoleModalStore } from "@/store/roleModalStore";
import { colors, fonts } from "@/components/LandingPage/theme";
import { RoleModal } from "@/components/ui/RoleModal";

const navLinks = [
    { label: "About", href: ROUTES.PUBLIC.ABOUT },
    { label: "Job Listing", href: "/public/jobs" },
    { label: "Hiring Companies", href: "#companies" },
    { label: "Our Specialization", href: ROUTES.PUBLIC.SPECIALIZATION },
    { label: "Recruitment Process", href: ROUTES.PUBLIC.RECRUITMENT_PROCESS },
    { label: "Contact Us", href: ROUTES.PUBLIC.CONTACT },
];

export function OozoNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const { loginOpen, openLoginModal, closeLoginModal } = useRoleModalStore();


    return (
        <>
            <Box as="header" position="sticky" top={0} zIndex={100}>
                {/* ── Crimson topbar — extra bottom padding so the white card overlaps it ── */}
                <Box bg={colors.crimsonDark} pt={2.5} pb="36px">
                    <Box maxW="1300px" mx="auto" px={{ base: 4, md: 6 }}>
                        <Flex
                            justify="space-between"
                            align="center"
                            gap={4}
                            flexWrap="wrap"
                        >
                            {/* Contact info */}
                            <Flex gap={6} align="center" flexWrap="wrap" color={"white"}>
                                <Flex align="center" gap={1.5} >
                                    <PhoneWhiteIcon />
                                    <Text fontFamily={fonts.mono} fontSize="xs">
                                        +977-9851194513 / 4560531
                                    </Text>
                                </Flex>
                                <Flex align="center" gap={1.5}>
                                    <EnvelopeWhiteIcon />
                                    <Text fontSize="xs">info@interpidhr.com</Text>
                                </Flex>
                                <Flex align="center" gap={1.5} display={{ base: "none", md: "flex" }}>
                                    <LocationMarkerIcon />
                                    <Text fontSize="xs">Sinamangal 9, Kathmandu, Nepal</Text>
                                </Flex>
                            </Flex>

                            {/* Social icons */}
                            <Flex gap={3} align="center">
                                {[
                                    { key: "f", label: <FacebookWhiteIcon /> },
                                    { key: "ig", label: <InstagramWhiteIcon /> },
                                    { key: "x", label: <TwitterWhiteIcon /> },
                                ].map((s) => (
                                    <Box
                                        key={s.key}



                                        transition="background 0.2s"
                                        cursor="pointer"
                                    >

                                        {s.label}
                                    </Box>
                                ))}
                            </Flex>
                        </Flex>
                    </Box>
                </Box>

                {/* ── White nav card — negative margin pulls it up over the red topbar ── */}
                <Box
                    mt="-26px"
                    px={{ base: 3, md: 6 }}
                    maxW="1400px"
                    mx="auto"
                >
                    <Box
                        bg={colors.white}
                        borderRadius="2xl"
                        boxShadow="0 4px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)"
                        border="1px solid"
                        borderColor={colors.borderLight}
                    >
                        {/* Main nav row */}
                        <Flex
                            align="center"
                            justify="space-between"
                            px={{ base: 4, md: 6 }}
                            py={3}
                            gap={4}
                        >
                            <Link href={ROUTES.HOME}>
                                <LogoIcon />
                            </Link>
                            {/* Logo */}
                            {/* <Flex
              as="a"
              href="/"
              align="center"
              gap={2}
              flexShrink={0}
              textDecoration="none"
              > */}
                            {/* <Image src={InterpidLogo.src} alt="Interpid Logo" w={"150px"} h={"85px"} objectFit={"contain"}/> */}
                            {/* </Flex> */}

                            {/* Desktop nav links */}
                            <Flex
                                as="ul"
                                gap={0}
                                align="center"
                                display={{ base: "none", xl: "flex" }}
                                listStyleType="none"
                                flex={1}
                                justify="center"
                                m={0}
                                p={0}
                            >
                                {navLinks.map((link) => (
                                    <Link key={link.label} href={link.href}>
                                        <Box as="li" listStyleType="none">
                                            <Box
                                                as="a"
                                                px={3.5}
                                                py={2}
                                                borderRadius="md"
                                                fontSize="sm"
                                                fontWeight="500"
                                                color={colors.textMuted}
                                                fontFamily={fonts.body}
                                                _hover={{ color: colors.crimson }}
                                                transition="color 0.2s"
                                                display="block"
                                                textDecoration="none"
                                                whiteSpace="nowrap"
                                            >
                                                {link.label}
                                            </Box>
                                        </Box>
                                    </Link>
                                ))}
                            </Flex>

                            {/* Right: search + divider + auth buttons */}
                            <Flex align="center" gap={2} flexShrink={0}>
                                {/* Search */}
                                <Box
                                    as="button"
                                    display={{ base: "none", lg: "flex" }}
                                    alignItems="center"
                                    justifyContent="center"
                                    w="36px"
                                    h="36px"
                                    bg="transparent"
                                    border="none"
                                    color={colors.textMuted}
                                    cursor="pointer"
                                    borderRadius="md"
                                    _hover={{ color: colors.crimson }}
                                    transition="color 0.2s"
                                >
                                    <Search size={18} />
                                </Box>

                                {/* Divider */}
                                <Box
                                    w="1px"
                                    h="24px"
                                    bg={colors.border}
                                    display={{ base: "none", lg: "block" }}
                                    mx={1}
                                />

                                {/* Log In */}
                                <Button
                                    as="a"
                                    size="sm"
                                    variant="outline"
                                    borderColor={colors.crimson}
                                    borderWidth="1.5px"
                                    color={colors.crimson}
                                    fontFamily={fonts.body}
                                    fontWeight="600"
                                    fontSize="sm"
                                    borderRadius="md"
                                    h="36px"
                                    px={5}
                                    display={{ base: "none", md: "flex" }}
                                    bg="transparent"
                                    _hover={{ bg: colors.crimson, color: "white" }}
                                    transition="all 0.2s"
                                    textDecoration="none"
                                    onClick={() => openLoginModal()}

                                >
                                    Log In
                                </Button>

                                {/* Sign Up */}
                                <Button
                                    as="a"
                                    size="sm"
                                    bg={colors.crimson}
                                    color="white"
                                    fontFamily={fonts.body}
                                    fontWeight="600"
                                    fontSize="sm"
                                    borderRadius="md"
                                    h="36px"
                                    px={5}
                                    display={{ base: "none", md: "flex" }}
                                    _hover={{ bg: colors.crimsonDark }}
                                    transition="all 0.2s"
                                    textDecoration="none"
                                    border="none"
                                    onClick={() => setRegisterOpen(true)}

                                >
                                    Sign Up
                                </Button>

                                {/* Mobile hamburger */}
                                <Box
                                    as="button"
                                    display={{ base: "flex", xl: "none" }}
                                    alignItems="center"
                                    justifyContent="center"
                                    w="36px"
                                    h="36px"
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor={colors.border}
                                    bg="transparent"
                                    cursor="pointer"
                                    color={colors.text}
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                >
                                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                                </Box>
                            </Flex>
                        </Flex>

                        {/* Mobile dropdown */}
                        <AnimatePresence>
                            {mobileOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{ overflow: "hidden" }}
                                >
                                    <Box
                                        borderTop="1px solid"
                                        borderColor={colors.border}
                                        px={4}
                                        py={4}
                                    >
                                        {navLinks.map((link) => (
                                            <Link key={link.label} href={link.href}>
                                                <Box
                                                    key={link.label}
                                                    as="a"
                                                    display="block"
                                                    py={2.5}
                                                    px={3}
                                                    borderRadius="md"
                                                    fontSize="sm"
                                                    fontWeight="500"
                                                    color={colors.textMuted}
                                                    fontFamily={fonts.body}
                                                    _hover={{ color: colors.crimson, bg: colors.bgWarm }}
                                                    transition="all 0.2s"
                                                    textDecoration="none"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {link.label}
                                                </Box>
                                            </Link>
                                        ))}

                                        <Flex
                                            gap={2}
                                            mt={4}
                                            pt={4}
                                            borderTop="1px solid"
                                            borderColor={colors.border}
                                        >
                                            <Button
                                                flex={1}
                                                variant="outline"
                                                borderColor={colors.crimson}
                                                borderWidth="1.5px"
                                                color={colors.crimson}
                                                fontFamily={fonts.body}
                                                fontWeight="600"
                                                borderRadius="md"
                                                bg="transparent"
                                                _hover={{ bg: colors.crimson, color: "white" }}
                                                onClick={() => setRegisterOpen(true)}

                                            >
                                                Log In
                                            </Button>
                                            <Button
                                                flex={1}
                                                bg={colors.crimson}
                                                color="white"
                                                fontFamily={fonts.body}
                                                fontWeight="600"
                                                borderRadius="md"
                                                _hover={{ bg: colors.crimsonDark }}
                                                onClick={() => setRegisterOpen(true)}

                                            >
                                                Sign Up
                                            </Button>
                                        </Flex>
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>
                </Box>
            </Box>
            <RoleModal open={loginOpen} onClose={() => closeLoginModal()} mode="login" />
            <RoleModal open={registerOpen} onClose={() => setRegisterOpen(false)} mode="register" />
        </>
    );
}