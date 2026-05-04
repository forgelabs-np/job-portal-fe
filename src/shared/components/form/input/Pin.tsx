"use client";

import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { PinInput as ChakraPinInput, Group } from "@chakra-ui/react";

import { FormWrapper } from "../wrapper";
import { CustomPinInputProps, PinInputProps } from "@/shared/types";

const CustomPinInput = React.forwardRef<HTMLInputElement, CustomPinInputProps>(
  function PinInput(props, ref) {
    const { count = 4, inputProps, rootRef, attached, ...rest } = props;

    return (
      <ChakraPinInput.Root ref={rootRef} {...rest}>
        <ChakraPinInput.HiddenInput ref={ref} {...inputProps} />
        <ChakraPinInput.Control>
          <Group attached={attached}>
            {Array.from({ length: count }).map((_, index) => (
              <ChakraPinInput.Input
                key={index}
                index={index}
                _focus={{
                  borderColor: "primary.300",
                  outline: "none",
                }}
              />
            ))}
          </Group>
        </ChakraPinInput.Control>
      </ChakraPinInput.Root>
    );
  }
);

export const PinInput = ({ name, label, placeholder = "" }: PinInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    control,
    name,
  });

  const errorText = errors?.[name]?.message as string;

  return (
    <FormWrapper label={label} errorText={errorText}>
      <CustomPinInput
        type="alphanumeric"
        count={8}
        onValueChange={(event) => field.onChange(event.value.join(""))}
        placeholder={placeholder}
      />
    </FormWrapper>
  );
};
