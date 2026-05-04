"use client";

import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Box, Flex, Text } from "@chakra-ui/react";

import { ArrowDownIcon } from "@/assets/svg";
import { FilterSelectProps } from "@/shared/types";

export const FilterSelect = ({ name, options, icon }: FilterSelectProps) => {
  if (!Array.isArray(options)) options = [];

  const { control } = useFormContext();
  const { field } = useController({
    control,
    name,
  });
  const { onChange, value: formValue } = field;

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const value = options.find(({ value }) => value === formValue);

  return (
    <Box cursor="pointer" position="relative" w={icon ? "140px" : "120px"}>
      <Flex
        align="center"
        gap="4px"
        onClick={() => setIsOpen(!isOpen)}
        justifyContent={icon ? "space-between" : "space-evenly"}
      >
        {icon}

        <Text fontSize={{ base: "12px", md: "14px" }} fontWeight={500}>
          {value?.label}
        </Text>
        <ArrowDownIcon
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </Flex>

      {isOpen && (
        <Box
          left={icon ? "15px" : "0px"}
          width={"116px"}
          position="absolute"
          bg="white"
          borderRadius="8px"
          boxShadow="md"
          mt="11px"
          p="8px"
          zIndex={3}
          gap={"20px"}
        >
          {options.map(({ label, value }) => (
            <Text
              key={value}
              p="8px"
              cursor="pointer"
              _hover={{ bg: "gray.100", borderRadius: "4px" }}
              onClick={() => handleSelect(value)}
            >
              {label}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
};
