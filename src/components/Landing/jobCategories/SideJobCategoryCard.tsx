"use client";

import { createElement } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { SideJobCategory } from "./types";
import { getSideCategoryIcon } from "./jobCategoryIcons";
import { jobCategorySectionTheme as t } from "./jobCategorySectionTheme";

export interface SideJobCategoryCardProps {
  item: SideJobCategory;
}

export function SideJobCategoryCard({ item }: SideJobCategoryCardProps) {
  return (
    <Box
      bg={t.cardBg}
      borderRadius="2xl"
      p={6}
      boxShadow="md"
      border="1px solid"
      borderColor="rgba(0,0,0,0.06)"
      flex={1}
      display="flex"
      flexDirection="column"
      minH="0"
    >
      <Flex
        align="center"
        justify="center"
        w="48px"
        h="48px"
        borderRadius="xl"
        bg="#f4f4f5"
        color={t.olive}
        mb={4}
      >
        {createElement(getSideCategoryIcon(item.icon), {
          size: 22,
          strokeWidth: 2,
          "aria-hidden": true,
        })}
      </Flex>
      <Text fontSize="lg" fontWeight="800" color="#18181b" mb={2}>
        {item.title}
      </Text>
      <Text fontSize="sm" color={t.bodyMuted} lineHeight="1.65" flex={1}>
        {item.description}
      </Text>
      <Flex align="center" justify="space-between" mt={6} flexWrap="wrap" gap={3}>
        <Text fontSize="sm" fontWeight="800" color={t.goldAccent}>
          {item.rolesAvailable}
        </Text>
        {item.viewHref ? (
          <Link href={item.viewHref} style={{ textDecoration: "none" }}>
            <Text
              as="span"
              fontSize="sm"
              fontWeight="700"
              color="#18181b"
              _hover={{ color: t.olive }}
              cursor="pointer"
            >
              View &gt;
            </Text>
          </Link>
        ) : (
          <Text as="span" fontSize="sm" fontWeight="700" color="#18181b">
            View &gt;
          </Text>
        )}
      </Flex>
    </Box>
  );
}
