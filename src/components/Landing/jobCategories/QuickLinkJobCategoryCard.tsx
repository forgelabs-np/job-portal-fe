"use client";

import { createElement } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import type { QuickJobCategory } from "./types";
import { getQuickCategoryIcon } from "./jobCategoryIcons";
import { jobCategorySectionTheme as t } from "./jobCategorySectionTheme";

export interface QuickLinkJobCategoryCardProps {
  item: QuickJobCategory;
}

export function QuickLinkJobCategoryCard({ item }: QuickLinkJobCategoryCardProps) {
  return (
    <Flex
      align="center"
      gap={4}
      bg="#f4f4f5"
      borderRadius="2xl"
      px={5}
      py={4}
      border="1px solid"
      borderColor="rgba(0,0,0,0.05)"
      flex={1}
      minW={0}
    >
      <Box color={t.olive} flexShrink={0}>
        {createElement(getQuickCategoryIcon(item.icon), {
          size: 22,
          strokeWidth: 2,
          "aria-hidden": true,
        })}
      </Box>
      <Text fontSize="sm" fontWeight="700" color="#18181b" flex={1} lineClamp={2}>
        {item.title}
      </Text>
      <Text
        fontSize="xs"
        fontWeight="700"
        color="#52525b"
        bg={t.cardBg}
        px={3}
        py={1}
        borderRadius="full"
        flexShrink={0}
        border="1px solid"
        borderColor="rgba(0,0,0,0.06)"
      >
        {item.openingsLabel}
      </Text>
    </Flex>
  );
}
