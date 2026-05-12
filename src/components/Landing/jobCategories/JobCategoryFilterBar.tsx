"use client";

import { Button, Flex } from "@chakra-ui/react";
import type { JobCategoryFilter } from "./types";
import { jobCategorySectionTheme as t } from "./jobCategorySectionTheme";

export interface JobCategoryFilterBarProps {
  filters: JobCategoryFilter[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function JobCategoryFilterBar({ filters, activeId, onSelect }: JobCategoryFilterBarProps) {
  return (
    <Flex role="tablist" aria-label="Job category sectors" flexWrap="wrap" gap={3} justify="center">
      {filters.map((f) => {
        const active = f.id === activeId;
        return (
          <Button
            key={f.id}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onSelect(f.id)}
            borderRadius="full"
            px={6}
            py={2}
            h="auto"
            fontSize="sm"
            fontWeight="600"
            border="none"
            bg={active ? t.oliveActive : t.pillInactiveBg}
            color={active ? "white" : t.pillInactiveColor}
            _hover={{
              bg: active ? t.olive : "#d4d4d8",
            }}
            transition="background 0.2s ease, color 0.2s ease"
            boxShadow={active ? "md" : "none"}
          >
            {f.label}
          </Button>
        );
      })}
    </Flex>
  );
}
