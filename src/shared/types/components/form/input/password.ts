import { TextFieldInputProps } from "./textField";

export type PasswordInputProps = Omit<
  TextFieldInputProps,
  "inputLeftElement" | "inputRightElement"
>;
