import { InputProps } from "@chakra-ui/react";

export interface TextFieldInputProps extends InputProps {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;

  endElement?: React.ReactNode;
  startElement?: React.ReactNode;

  borderColor?: string;
  borderRadius?: string;

  inputRef?: React.Ref<HTMLInputElement>;

  width?: string | number;
}