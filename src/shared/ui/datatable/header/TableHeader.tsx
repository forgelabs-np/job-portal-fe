import { Button, HStack, Text } from "@chakra-ui/react";

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
    <HStack justifyContent="space-between">
      <Text fontWeight="medium">{title}</Text>

      <HStack>
        {hasSearch && (
          <SearchInput
            value={searchText ?? ""}
            onChange={(searchText) => setSearchText?.(searchText)}
          />
        )}

        {actionButtonLabel && (
          <Button variant="solid" onClick={onActionButtonClick}>
            {actionButtonLabel}
          </Button>
        )}
      </HStack>
    </HStack>
  );
};
