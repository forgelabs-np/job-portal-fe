"use client";

import { useState } from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { colors, fonts } from "./theme";
import { InterpidLogo } from "@/assets/images/landing";
import { EnvelopeWhiteIcon, FacebookWhiteIcon, InstagramWhiteIcon, LocationMarkerIcon, LogoIcon, PhoneIcon, PhoneWhiteIcon, TwitterWhiteIcon } from "@/assets/svg/landing";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Job Listing", href: "#jobs" },
  { label: "Hiring Companies", href: "#companies" },
  { label: "Our Specialization", href: "#specialization" },
  { label: "Recruitment Process", href: "#process" },
  { label: "Contact Us", href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
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
                <PhoneWhiteIcon  />
                <Text fontFamily={fonts.mono} fontSize="xs">
                  +977-9851194513 / 4560531
                </Text>
              </Flex>
              <Flex align="center" gap={1.5}>
                <EnvelopeWhiteIcon />
                <Text fontSize="xs">info@interpidhr.com</Text>
              </Flex>
              <Flex align="center" gap={1.5} display={{ base: "none", md: "flex" }}>
                <LocationMarkerIcon/>
                <Text fontSize="xs">Sinamangal 9, Kathmandu, Nepal</Text>
              </Flex>
            </Flex>

            {/* Social icons */}
            <Flex gap={3} align="center">
              {[
                { key: "f", label: <FacebookWhiteIcon/> },
                { key: "ig", label: <InstagramWhiteIcon/> },
                { key: "x", label:<TwitterWhiteIcon/> },
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
            <LogoIcon/>
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
                <Box as="li" key={link.label} listStyleType="none">
                  <Box
                    as="a"
                    href={link.href}
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
                href="#login"
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
              >
                Log In
              </Button>

              {/* Sign Up */}
              <Button
                as="a"
                href="#signup"
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
                    <Box
                      key={link.label}
                      as="a"
                      href={link.href}
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
  );
}