import {
  ConditionalValue,
  TextareaProps as ChakraTextareaProps,
} from "@chakra-ui/react";

export type TextareaProps = ChakraTextareaProps & {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  resize?: ConditionalValue<"none" | "horizontal" | "vertical" | "both">;
};
