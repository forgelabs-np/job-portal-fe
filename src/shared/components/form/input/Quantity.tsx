import * as React from "react";

import { HStack, Box, Input as ChakraInput } from "@chakra-ui/react";

import { AddIcon, SubtractIcon } from "@/assets/svg";
import { QuantityInputProps } from "@/shared/types";

export const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  width = "80px",
  minimum = 1,
  maximum = 100,
}) => {
  const [tempValue, setTempValue] = React.useState(value?.toString());

  React.useEffect(() => {
    setTempValue(value?.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setTempValue(newValue);
    }
  };

  const validateAndSetValue = () => {
    if (tempValue === "") {
      setTempValue(minimum.toString());
      onChange(minimum);
    } else {
      let numValue = Number(tempValue);
      if (numValue < minimum) numValue = minimum;
      if (numValue > maximum) numValue = maximum;
      onChange(numValue);
      setTempValue(numValue.toString());
    }
  };

  const increment = () => onChange(Math.min(value + 1, maximum));

  const decrement = () => onChange(Math.max(value - 1, minimum));

  return (
    <HStack gap={"12px"}>
      <Box
        as="button"
        cursor={"pointer"}
        onClick={decrement}
        bg={"grey.100"}
        borderRadius="4px"
        p={2}
      >
        <SubtractIcon />
      </Box>

      <ChakraInput
        value={tempValue}
        height={"40px !important"}
        onChange={handleChange}
        onBlur={validateAndSetValue}
        minH={0}
        textAlign="center"
        width={width}
      />

      <Box
        as="button"
        cursor={"pointer"}
        onClick={increment}
        bg={"grey.100"}
        borderRadius="4px"
        p={2}
        h={"40px"}
      >
        <AddIcon />
      </Box>
    </HStack>
  );
};
