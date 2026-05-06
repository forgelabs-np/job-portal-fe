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
          boxSize="10"
          color="system.inputGroup.element"
          css={{
            "& > svg": {
              boxSize: "5",
            },
          }}
        >
          <SearchIcon />
        </Grid>
      }
    >
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        paddingLeft="10 !important"
      />
    </InputGroup>
  );
};
