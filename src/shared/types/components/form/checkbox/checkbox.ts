import { Checkbox } from "@chakra-ui/react";

export type CheckboxProps = Checkbox.RootProps & {
  icon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rootRef?: React.Ref<HTMLLabelElement>;
};
