import { PinInput as ChakraPinInput } from "@chakra-ui/react";

export type CustomPinInputProps = ChakraPinInput.RootProps & {
  rootRef?: React.Ref<HTMLDivElement>;
  count?: number;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  attached?: boolean;
};

export type PinInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
};
