import * as React from "react";
import { Field as ChakraField, Text } from "@chakra-ui/react";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, required, ...rest } = props;

    return (
      <ChakraField.Root ref={ref} {...rest} gap="8px">
        {label && (
          <ChakraField.Label>
            <Text>
              {label}

              {required && (
                <Text as="span" color="red">
                  {" "}
                  *
                </Text>
              )}
            </Text>
          </ChakraField.Label>
        )}

        {children}

        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}

        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    );
  }
);
