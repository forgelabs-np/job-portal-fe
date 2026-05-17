"use client";

import { RoleModal } from "@/components/ui/RoleModal";
import { Button } from "@/shared";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { GlobeIcon } from "./Footer";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
  >
    {open ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ) : (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
);

// const navLinks = ["Staff Portal", "Agencies", "Platform Admin"];
// const navLinks = [];

export const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  console.log(mobileOpen, "open");
  const router = useRouter();

  return (
    <>
      <Box
        pos="sticky"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        transition="all 0.3s ease"
        bg="rgba(255,255,255,0.72)"
        backdropFilter="blur(16px)"
        style={{ WebkitBackdropFilter: "blur(16px)" }}
        borderBottom="1px solid rgba(0,0,0,0.06)"
        boxShadow="0 2px 20px rgba(0,0,0,0.04)"
      >
        {/* Top bar */}
        <Flex
          py={3.5}
          px={{ base: 4, sm: 6, md: 8, xl: 0 }}
          maxW={{ base: "full", xl: "1280px" }}
          mx="auto"
          align="center"
          justify="space-between"
        >
          {/* Logo */}
          <Flex
            align="center"
            gap={2.5}
            flexShrink={0}
            onClick={() => router.push("/")}
            cursor={"pointer"}
          >
            <Box
              w="36px"
              h="36px"
              bg={WEBSITE_THEME_COLOR}
              borderRadius="10px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <GlobeIcon />
            </Box>
            <Text
              fontWeight="800"
              fontSize={{ base: "20px", md: "26px" }}
              color="#0f1f17"
              letterSpacing="-0.02em"
            >
              Nexu
              <Text
                as="span"
                color={WEBSITE_THEME_COLOR}
                fontStyle="italic"
                fontFamily="'Georgia', serif"
              >
                Flow
              </Text>
            </Text>
          </Flex>

          {/* Desktop nav links */}
          {/* <HStack
            gap={8}
            color="gray.700"
            fontWeight={600}
            display={{ base: "none", lg: "flex" }}
          >
            {navLinks.map((link) => (
              <Text
                key={link}
                cursor="pointer"
                fontSize="15px"
                _hover={{ color: WEBSITE_THEME_COLOR }}
                transition="color 0.15s ease"
              >
                {link}
              </Text>
            ))}
          </HStack> */}

          <HStack gap={6} display={{ base: "none", md: "flex" }}>
            <Text
              cursor="pointer"
              fontWeight={600}
              fontSize="15px"
              onClick={() => setLoginOpen(true)}
              _hover={{ color: WEBSITE_THEME_COLOR }}
              transition="color 0.15s ease"
            >
              Login
            </Text>
            <Button
              variant="solid"
              bg={WEBSITE_THEME_COLOR}
              rounded="2xl"
              fontWeight={600}
              fontSize="15px"
              onClick={() => setRegisterOpen(true)}
            >
              Sign Up
            </Button>
          </HStack>

          {/* Mobile right side */}
          <HStack gap={3} display={{ base: "flex", md: "none" }}>
            {/* Login + Sign Up visible on sm and above */}
            <Text
              cursor="pointer"
              fontWeight={600}
              fontSize="14px"
              onClick={() => setLoginOpen(true)}
              _hover={{ color: WEBSITE_THEME_COLOR }}
              transition="color 0.15s ease"
              display={{ base: "none", sm: "block" }}
            >
              Login
            </Text>
            <Button
              variant="solid"
              bg={WEBSITE_THEME_COLOR}
              rounded="2xl"
              fontWeight={600}
              fontSize="13px"
              px={4}
              h="36px"
              onClick={() => setRegisterOpen(true)}
              display={{ base: "none", sm: "flex" }}
            >
              Sign Up
            </Button>

            {/* Hamburger */}
            <Box
              as="button"
              onClick={() => setMobileOpen((v) => !v)}
              color="#0f1f17"
              bg="transparent"
              border="none"
              cursor="pointer"
              p={1.5}
              borderRadius="lg"
              _hover={{ bg: "rgba(0,0,0,0.05)" }}
              transition="background 0.15s ease"
              aria-label="Toggle menu"
            >
              <HamburgerIcon open={mobileOpen} />
            </Box>
          </HStack>
        </Flex>

        {/* Mobile dropdown */}
        <Box
          display={{ base: "block", lg: "none" }}
          overflow="hidden"
          maxH={mobileOpen ? "400px" : "0px"}
          transition="max-height 0.35s ease"
          borderTop={mobileOpen ? "1px solid rgba(0,0,0,0.06)" : "none"}
        >
          <VStack
            align="stretch"
            px={{ base: 4, sm: 6 }}
            py={mobileOpen ? 4 : 0}
            gap={0}
          >
            {/* {navLinks.map((link) => (
              <Text
                key={link}
                py={3.5}
                fontWeight={600}
                fontSize="15px"
                color="gray.700"
                cursor="pointer"
                borderBottom="1px solid rgba(0,0,0,0.05)"
                _hover={{ color: WEBSITE_THEME_COLOR }}
                transition="color 0.15s ease"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </Text>
            ))} */}

            {/* Login + Sign Up on xs screens only */}
            <Flex gap={3} pt={4} pb={2} display={{ base: "flex", sm: "none" }}>
              <Box
                flex={1}
                as="button"
                border="1.5px solid"
                borderColor={WEBSITE_THEME_COLOR}
                color={WEBSITE_THEME_COLOR}
                fontWeight={700}
                fontSize="14px"
                py={2.5}
                borderRadius="2xl"
                cursor="pointer"
                bg="transparent"
                onClick={() => {
                  setLoginOpen(true);
                  setMobileOpen(false);
                }}
              >
                Login
              </Box>
              <Box
                flex={1}
                as="button"
                bg={WEBSITE_THEME_COLOR}
                color="white"
                fontWeight={700}
                fontSize="14px"
                py={2.5}
                borderRadius="2xl"
                cursor="pointer"
                border="none"
                onClick={() => {
                  setRegisterOpen(true);
                  setMobileOpen(false);
                }}
              >
                Sign Up
              </Box>
            </Flex>
          </VStack>
        </Box>
      </Box>

      <RoleModal open={loginOpen} onClose={() => setLoginOpen(false)} mode="login" />
      <RoleModal open={registerOpen} onClose={() => setRegisterOpen(false)} mode="register" />
    </>
  );
};
