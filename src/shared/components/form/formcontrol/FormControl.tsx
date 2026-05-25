import { FormControlProps } from "@/shared/types";
import { TextFieldInput } from "../input";
import { Textarea } from "../textarea";

export const FormControl = (props: FormControlProps) => {
  switch (props.inputType) {
    case "input":
      return <TextFieldInput {...props} />;

    case "textarea":
      return <Textarea {...props} />;
  }
};
