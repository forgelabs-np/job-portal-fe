import { Box, HStack, Text, NativeSelect } from "@chakra-ui/react";

import { PageSizeSelectorProps } from "@/shared/datatable";

const ROWS_OPTIONS = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
];

export const PageSizeSelector = ({
  pageSize,
  setPageSize,
}: PageSizeSelectorProps) => {
  return (
    <HStack 
      whiteSpace="nowrap" 
      color="gray.600" 
      fontSize="sm"
      gap={2}
    >
      <Text>Show</Text>

      <Box width="16">
        <NativeSelect.Root>
          <NativeSelect.Field
            value={pageSize.toString()}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPageSize(Number(e.target.value))}
            height="8"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            bg="white"
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.1)",
            }}
            _hover={{
              borderColor: "gray.300",
            }}
            fontSize="sm"
            px={2}
          >
            {ROWS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>

      <Text>entries</Text>
    </HStack>
  );
};
