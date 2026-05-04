import { TextFieldInputProps } from "../input";
import { TextareaProps } from "../textarea";

export type FormControlProps =
  | ({
      inputType: "input";
    } & TextFieldInputProps)
  | ({
      inputType: "textarea";
    } & TextareaProps);
