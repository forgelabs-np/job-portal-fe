"use client";

import { useController, useFormContext } from "react-hook-form";
import { Input as ChakraInput } from "@chakra-ui/react";

import { FormWrapper } from "../wrapper";
import { InputGroup } from "./InputGroup";
import { TextFieldInputProps } from "@/shared/types";

export const TextFieldInput: React.FC<TextFieldInputProps> = ({
  type = "text",
  label,
  name,
  required,
  disabled,
  endElement,
  startElement,
  borderColor,
  borderRadius,
  inputRef,
  width,
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
        borderColor={borderColor}
        borderRadius={borderRadius}
      >
        <InputGroup
          endElement={endElement}
          startElement={startElement}
          width={width}
        >
          <ChakraInput
            type={type}
            id={name}
            value={value ?? ""}
            paddingRight={endElement ? "50px !important" : ""}
            paddingLeft={startElement ? "50px !important" : ""}
            borderColor={borderColor}
            rounded={borderRadius}
            {...rest}
            {...restField}
          />
        </InputGroup>
      </FormWrapper>
    </>
  );
};
