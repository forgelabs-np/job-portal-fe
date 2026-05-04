"use client";

import { useController, useFormContext } from "react-hook-form";
import { Textarea as ChakraTextarea } from "@chakra-ui/react";

import { FormWrapper } from "../wrapper";
import { TextareaProps } from "@/shared/types";

export const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  disabled,
  required,
  resize = "none",
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    field: { value, ...restField },
  } = useController({
    name,
    control,
  });

  const errorText = errors?.[name]?.message as string;

  return (
    <>
      <FormWrapper
        label={label}
        required={required}
        disabled={disabled}
        errorText={errorText}
      >
        <ChakraTextarea
          id={name}
          value={value ?? ""}
          resize={resize}
          {...rest}
          {...restField}
        />
      </FormWrapper>
    </>
  );
};
