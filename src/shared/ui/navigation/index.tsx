"use client";

import { HStack } from "@chakra-ui/react";

import { ArrowDownIcon } from "@/assets/svg";
import { NavigationProps } from "@/shared/types";

export const Navigation = ({ swiper, isBeginning, isEnd }: NavigationProps) => {
  return (
    <HStack gap={8}>
      <ArrowDownIcon
        style={{
          cursor: isBeginning ? "default" : "pointer",
          opacity: isBeginning ? 0.5 : 1,
          transform: "rotate(90deg)",
        }}
        onClick={() => !isBeginning && swiper?.slidePrev()}
      />
      <ArrowDownIcon
        style={{
          cursor: isEnd ? "default" : "pointer",
          opacity: isEnd ? 0.5 : 1,
          transform: "rotate(-90deg)",
        }}
        onClick={() => !isEnd && swiper?.slideNext()}
      />
    </HStack>
  );
};
