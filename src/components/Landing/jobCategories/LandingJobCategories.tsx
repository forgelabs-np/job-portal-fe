"use client";

import { useCallback, useMemo, useState } from "react";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { MotionSection } from "@/components/Landing/MotionSection";
import { DEFAULT_JOB_CATEGORIES_DATA } from "./defaultJobCategoriesData";
import { FeaturedJobCategoryCard } from "./FeaturedJobCategoryCard";
import { JobCategoryFilterBar } from "./JobCategoryFilterBar";
import { QuickLinkJobCategoryCard } from "./QuickLinkJobCategoryCard";
import { SideJobCategoryCard } from "./SideJobCategoryCard";
import { jobCategorySectionTheme as t } from "./jobCategorySectionTheme";
import type { JobCategoriesPanel, JobCategoriesSectionData } from "./types";

export interface LandingJobCategoriesProps {
  data?: JobCategoriesSectionData | null;
  activeFilterId?: string;
  onFilterChange?: (filterId: string) => void;
  onFeaturedCtaClick?: (filterId: string) => void;
}

function resolvePanel(
  data: JobCategoriesSectionData,
  activeId: string,
): JobCategoriesPanel {
  return data.panels[activeId] ?? data.panels[data.defaultFilterId];
}

export function LandingJobCategories({
  data: dataProp,
  activeFilterId: controlledActiveId,
  onFilterChange,
  onFeaturedCtaClick,
}: LandingJobCategoriesProps) {
  const data = dataProp ?? DEFAULT_JOB_CATEGORIES_DATA;
  const [internalFilterId, setInternalFilterId] = useState(
    data.defaultFilterId,
  );

  const activeFilterId = useMemo(() => {
    if (controlledActiveId !== undefined) return controlledActiveId;
    if (data.filters.some((f) => f.id === internalFilterId))
      return internalFilterId;
    return data.defaultFilterId;
  }, [controlledActiveId, data, internalFilterId]);

  const panel = useMemo(
    () => resolvePanel(data, activeFilterId),
    [data, activeFilterId],
  );

  const selectFilter = useCallback(
    (id: string) => {
      onFilterChange?.(id);
      if (controlledActiveId === undefined) {
        setInternalFilterId(id);
      }
    },
    [controlledActiveId, onFilterChange],
  );

  const sidePair = panel.sideCards.slice(0, 2);
  const quickRow = panel.quickLinks.slice(0, 3);

  return (
    <MotionSection
      as="section"
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 8 }}
      bg={t.sectionBg}
      color="#18181b"
    >
      <Box maxW="1280px" mx="auto">
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="800"
          color={t.title}
          textAlign="center"
          mb={3}
        >
          {data.title}
        </Text>
        <Text
          textAlign="center"
          color={t.bodyMuted}
          maxW="640px"
          mx="auto"
          mb={10}
          fontSize="md"
          lineHeight="1.7"
        >
          {data.subtitle}
        </Text>

        <JobCategoryFilterBar
          filters={data.filters}
          activeId={activeFilterId}
          onSelect={selectFilter}
        />

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 8, lg: 8 }}
          mt={{ base: 12, md: 14 }}
          align="stretch"
        >
          <FeaturedJobCategoryCard
            featured={panel.featured}
            onCtaClick={
              onFeaturedCtaClick
                ? () => onFeaturedCtaClick(activeFilterId)
                : undefined
            }
          />
          <Flex
            direction="column"
            gap={6}
            flex={{ lg: "0.85" }}
            minW={{ lg: "280px" }}
          >
            {sidePair.map((item) => (
              <SideJobCategoryCard key={item.id} item={item} />
            ))}
          </Flex>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mt={10}>
          {quickRow.map((item) => (
            <QuickLinkJobCategoryCard key={item.id} item={item} />
          ))}
        </SimpleGrid>
      </Box>
    </MotionSection>
  );
}

export type { JobCategoriesSectionData } from "./types";
export { DEFAULT_JOB_CATEGORIES_DATA } from "./defaultJobCategoriesData";
