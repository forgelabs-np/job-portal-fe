import { FormControlProps } from "@/shared/types";
import { TextFieldInput } from "../input";
import { Textarea } from "../textarea";

export const FormControl = ({ inputType, ...restProps }: FormControlProps) => {
  switch (inputType) {
    case "input":
      return <TextFieldInput {...restProps} />;

    case "textarea":
      return <Textarea {...restProps} />;
  }
};
