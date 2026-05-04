import { SearchIcon } from "@/assets/svg";

import { TextFieldInput } from "./TextField";
import { SearchInputProps } from "@/shared/types";

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  return <TextFieldInput {...props} startElement={<SearchIcon />} />;
};
