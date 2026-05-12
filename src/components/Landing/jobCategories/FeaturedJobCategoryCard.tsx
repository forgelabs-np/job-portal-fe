"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FeaturedJobCategory } from "./types";
import { jobCategorySectionTheme as t } from "./jobCategorySectionTheme";

export interface FeaturedJobCategoryCardProps {
  featured: FeaturedJobCategory;
  onCtaClick?: () => void;
}

export function FeaturedJobCategoryCard({ featured, onCtaClick }: FeaturedJobCategoryCardProps) {
  const ctaInner = (
    <>
      {featured.ctaLabel}
      <ArrowRight size={18} style={{ marginLeft: 8 }} aria-hidden />
    </>
  );

  return (
    <Box
      position="relative"
      borderRadius="3xl"
      overflow="hidden"
      minH={{ base: "320px", md: "420px" }}
      flex={{ lg: "1.15" }}
      boxShadow="lg"
    >
      <Box
        position="absolute"
        inset={0}
        bgImage={`url(${featured.imageUrl})`}
        bgSize="cover"
        bgPos="center"
        aria-hidden
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-t, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 45%, transparent 100%)"
      />
      <Flex
        position="relative"
        direction="column"
        justify="flex-end"
        h="full"
        minH={{ base: "320px", md: "420px" }}
        p={{ base: 6, md: 10 }}
        gap={4}
      >
        <Text
          fontSize="xs"
          fontWeight="800"
          letterSpacing="0.2em"
          color={t.goldAccent}
          textTransform="uppercase"
        >
          {featured.eyebrow}
        </Text>
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" color="white" lineHeight="1.1">
          {featured.title}
        </Text>
        <Text fontSize="sm" color="rgba(255,255,255,0.88)" lineHeight="1.75" maxW="lg">
          {featured.description}
        </Text>
        <Flex align="center" gap={5} flexWrap="wrap" pt={2}>
          {featured.ctaHref ? (
            <Link href={featured.ctaHref} style={{ textDecoration: "none" }}>
              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                borderRadius="xl"
                px={7}
                py={3}
                bg={t.goldAccent}
                color="white"
                fontWeight="700"
                fontSize="sm"
                letterSpacing="0.04em"
                transition="all 0.2s ease"
                cursor="pointer"
                _hover={{ bg: t.olive, transform: "translateY(-1px)" }}
              >
                {ctaInner}
              </Box>
            </Link>
          ) : (
            <Button
              type="button"
              borderRadius="xl"
              px={7}
              py={6}
              h="auto"
              bg={t.goldAccent}
              color="white"
              fontWeight="700"
              fontSize="sm"
              letterSpacing="0.04em"
              onClick={onCtaClick}
              _hover={{ bg: t.olive, transform: "translateY(-1px)" }}
              transition="all 0.2s ease"
            >
              {ctaInner}
            </Button>
          )}
          {featured.secondaryLine ? (
            <Text fontSize="sm" color="rgba(255,255,255,0.85)" fontWeight="500">
              {featured.secondaryLine}
            </Text>
          ) : null}
        </Flex>
      </Flex>
    </Box>
  );
}
