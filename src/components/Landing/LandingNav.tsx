"use client";

import { landingColors, landingNavLinks } from "@/components/Landing/landingTheme";
import { ROUTES } from "@/constants/routes";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollTo = (href: string) => {
    setOpen(false);
    if (!href.startsWith("#")) return;
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={200}
      borderBottom="1px solid"
      borderColor={landingColors.border}
      bg="rgba(3,3,3,0.75)"
      backdropFilter="blur(16px)"
      style={{ WebkitBackdropFilter: "blur(16px)" }}
    >
      <Flex
        maxW="1280px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={4}
        align="center"
        justify="space-between"
        gap={4}
      >
        <Link href="/">
          <Flex align="baseline" gap={1}>
            <Text fontWeight="800" fontSize="xl" color={landingColors.text}>
              Global
            </Text>
            <Text fontWeight="600" fontSize="xl" color={landingColors.gold}>
              Talent
            </Text>
          </Flex>
        </Link>

        <Flex
          display={{ base: "none", lg: "flex" }}
          gap={10}
          align="center"
          justify="center"
          flex={1}
        >
          {landingNavLinks.map((link) => (
            <Text
              key={link.href}
              as="button"
              type="button"
              fontSize="xs"
              letterSpacing="0.2em"
              fontWeight="600"
              color={landingColors.textMuted}
              cursor="pointer"
              transition="color 0.2s"
              _hover={{ color: landingColors.gold }}
              onClick={() => scrollTo(link.href)}
            >
              {link.label}
            </Text>
          ))}
        </Flex>

        <Flex align="center" gap={3}>
          <Link href={ROUTES.SIGNUP} style={{ textDecoration: "none" }}>
            <Button
              display={{ base: "none", sm: "inline-flex" }}
              borderRadius="full"
              px={6}
              bg={landingColors.gold}
              color="#0a0a0a"
              fontWeight="700"
              fontSize="sm"
              _hover={{
                bg: landingColors.goldBright,
                boxShadow: `0 0 24px ${landingColors.goldMuted}`,
              }}
              transition="all 0.25s ease"
            >
              JOIN THE COMMUNITY
            </Button>
          </Link>

          <Button
            display={{ base: "inline-flex", lg: "none" }}
            variant="ghost"
            color={landingColors.text}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            px={2}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Button>
        </Flex>
      </Flex>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <Flex
              display={{ base: "flex", lg: "none" }}
              direction="column"
              px={4}
              pb={4}
              gap={3}
              borderTop="1px solid"
              borderColor={landingColors.border}
            >
              {landingNavLinks.map((link) => (
                <Text
                  key={link.href}
                  as="button"
                  type="button"
                  py={2}
                  fontSize="sm"
                  color={landingColors.textMuted}
                  onClick={() => scrollTo(link.href)}
                >
                  {link.label}
                </Text>
              ))}
              <Link href={ROUTES.SIGNUP} onClick={() => setOpen(false)} style={{ textDecoration: "none" }}>
                <Button w="full" borderRadius="lg" bg={landingColors.gold} color="#0a0a0a">
                  JOIN THE COMMUNITY
                </Button>
              </Link>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
