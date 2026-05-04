"use client"; // ← Add this at the top

import { ColorVariantProps } from "@/shared/types";
import { Box, HStack, Text } from "@chakra-ui/react";

export const Tag = ({
  color,
  name,
  onClick,
  backgroundColor,
}: ColorVariantProps) => {
  return (
    <HStack
      padding="12px 16px"
      border="1px solid"
      borderColor="system.neutral.separator.light"
      width="fit-content"
      cursor="pointer"
      userSelect="none"
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {color && (
        <Box boxSize="20px" borderRadius="50%" backgroundColor={color} />
      )}
      <Text
        color="system.text.primary.light"
        whiteSpace="nowrap"
        ml={color ? "8px" : "0px"}
      >
        {name}
      </Text>
    </HStack>
  );
};
