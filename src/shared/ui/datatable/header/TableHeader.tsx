import { Button, HStack, VStack, Text, Box } from "@chakra-ui/react";

import { SearchInput } from "@/shared/components";
import { TableHeaderProps } from "@/shared/datatable";

export const TableHeader = ({
  title,
  hasSearch = true,
  searchText,
  setSearchText,
  actionButtonLabel,
  onActionButtonClick,
}: TableHeaderProps) => {
  return (
    <VStack gap={4} align="stretch" mb={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
      >
        <Text 
          fontSize="lg" 
          fontWeight="semibold" 
          color="gray.800"
        >
          {title}
        </Text>

        <HStack gap={3}>
          {hasSearch && (
            <SearchInput
              value={searchText ?? ""}
              onChange={(searchText) => setSearchText?.(searchText)}
            />
          )}

          {actionButtonLabel && (
            <Button 
              variant="solid" 
              onClick={onActionButtonClick}
              bg="blue.600"
              color="white"
              _hover={{
                bg: "blue.700",
              }}
              _active={{
                bg: "blue.800",
              }}
            >
              {actionButtonLabel}
            </Button>
          )}
        </HStack>
      </Box>
    </VStack>
  );
};
