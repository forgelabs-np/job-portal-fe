import { ConditionalValue } from "@chakra-ui/react";
import { TextFieldInputProps } from "../input";

export type TextareaProps = TextFieldInputProps & {
  resize?: ConditionalValue<"none" | "horizontal" | "vertical" | "both">;
};
