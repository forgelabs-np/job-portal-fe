import * as React from "react";
import { Group, InputElement, InputElementProps } from "@chakra-ui/react";
import { InputGroupProps } from "@/shared/types";

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(props, ref) {
    const {
      startElement,
      startElementProps,
      endElement,
      endElementProps,
      children,
      startOffset = "6px",
      endOffset = "6px",
      ...rest
    } = props;

    const child =
      React.Children.only<React.ReactElement<InputElementProps>>(children);

    return (
      <Group ref={ref} {...rest} width="full">
        {startElement && (
          <InputElement pointerEvents="none" {...startElementProps}>
            {startElement}
          </InputElement>
        )}

        {React.cloneElement(child, {
          ...(startElement && {
            ps: `calc(var(--input-height) - ${startOffset})`,
          }),
          ...(endElement && { pe: `calc(var(--input-height) - ${endOffset})` }),
          ...children.props,
        })}

        {endElement && (
          <InputElement
            placement="end"
            borderRadius="8px"
            width="49px"
            {...endElementProps}
          >
            {endElement}
          </InputElement>
        )}
      </Group>
    );
  }
);
