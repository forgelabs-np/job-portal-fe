import { Grid, Input } from "@chakra-ui/react";

import { SearchInputProps } from "@/shared/types";
import { SearchIcon } from "@/assets/svg";
import { InputGroup } from "./InputGroup";

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) => {
  return (
    <InputGroup
      startElement={
        <Grid
          placeItems="center"
          color="gray.500"
          // p="2"
       
        >
          <SearchIcon />
        </Grid>
      }
    >
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        paddingLeft="8 !important"
        width="280px"
        height="10"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        ml={2}
        _focus={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.1)",
          bg: "white",
        }}
        _hover={{
          borderColor: "gray.300",
          bg: "gray.50",
        }}
        bg="gray.50"
        color="gray.700"
        fontSize="sm"
        transition="all 0.2s ease-in-out"
        _placeholder={{
          color: "gray.400",
        }}
      />
    </InputGroup>
  );
};
