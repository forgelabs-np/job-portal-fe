"use client";

import { Field } from "../components/form/wrapper";
import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Option {
  label: string;
  value: string | number;
}

interface MultiSelectFieldInputProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
}

export function MultiSelectFieldInput({
  name,
  label,
  options,
  placeholder = "Select options",
  required,
}: MultiSelectFieldInputProps) {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const selected: (string | number)[] = useWatch({ control, name }) ?? [];

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (value: string | number) => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setValue(name, next, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <Field
      label={label}
      required={required}
      errorText={errors[name]?.message as string}
      invalid={!!errors[name]}
    >
      <Box position="relative" ref={containerRef} width="full">
        {/* Trigger */}
        <Flex
          align="center"
          justify="space-between"
          px={3}
          py="6px"
          border="1px solid"
          borderColor={open ? "blue.500" : "gray.200"}
          borderRadius="md"
          cursor="pointer"
          bg="white"
          _dark={{
            bg: "gray.800",
            borderColor: open ? "blue.400" : "gray.600",
          }}
          boxShadow={open ? "0 0 0 1px var(--chakra-colors-blue-500)" : "none"}
          transition="border-color 0.15s, box-shadow 0.15s"
          onClick={() => setOpen((prev) => !prev)}
          minH="38px"
          userSelect="none"
          flexWrap="wrap"
          gap={1.5}
        >
          {selected.length === 0 ? (
            <Text
              fontSize="sm"
              color="gray.400"
              _dark={{ color: "gray.500" }}
              flex={1}
            >
              {placeholder}
            </Text>
          ) : (
            <Flex flex={1} flexWrap="wrap" gap={1.5} align="center">
              {options
                .filter((o) => selected.includes(o.value))
                .map((o) => (
                  <Flex
                    key={o.value}
                    align="center"
                    gap={1}
                    px={2}
                    py="2px"
                    bg="blue.50"
                    _dark={{ bg: "blue.900" }}
                    border="1px solid"
                    borderColor="blue.200"
                    _dark-border={{ borderColor: "blue.700" }}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="500"
                    color="blue.700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Text>{o.label}</Text>
                    <Box
                      as="span"
                      cursor="pointer"
                      color="blue.400"
                      _hover={{ color: "red.500" }}
                      lineHeight={1}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(o.value);
                      }}
                    >
                      ✕
                    </Box>
                  </Flex>
                ))}
            </Flex>
          )}
          <Box
            color="gray.500"
            transition="transform 0.2s"
            transform={open ? "rotate(180deg)" : "rotate(0deg)"}
            flexShrink={0}
            alignSelf="center"
          >
            <MdKeyboardArrowDown size={18} />
          </Box>
        </Flex>

        {/* Dropdown */}
        {open && (
          <Box
            position="absolute"
            top="calc(100% + 4px)"
            left={0}
            right={0}
            zIndex={50}
            bg="white"
            _dark={{ bg: "gray.800" }}
            border="1px solid"
            borderColor="gray.200"
            _dark-border={{ borderColor: "gray.600" }}
            borderRadius="md"
            boxShadow="md"
            maxH="220px"
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-thumb": {
                background: "var(--chakra-colors-gray-300)",
                borderRadius: "4px",
              },
            }}
          >
            {options.length === 0 ? (
              <Text px={4} py={3} fontSize="sm" color="gray.400">
                No options available
              </Text>
            ) : (
              options.map((opt) => {
                const isChecked = selected.includes(opt.value);
                return (
                  <Flex
                    key={opt.value}
                    align="center"
                    gap={3}
                    px={4}
                    py="10px"
                    cursor="pointer"
                    bg={isChecked ? "blue.50" : "transparent"}
                    _dark={{ bg: isChecked ? "blue.900" : "transparent" }}
                    _hover={{
                      bg: isChecked ? "blue.50" : "gray.50",
                      _dark: { bg: isChecked ? "blue.900" : "gray.700" },
                    }}
                    transition="background 0.12s"
                    onClick={() => toggle(opt.value)}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    _last={{ borderBottom: "none" }}
                  >
                    <Checkbox.Root
                      checked={isChecked}
                      onCheckedChange={() => toggle(opt.value)}
                      size="sm"
                      colorPalette="blue"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control borderRadius="4px" />
                    </Checkbox.Root>
                    <Text
                      fontSize="sm"
                      fontWeight={isChecked ? "500" : "400"}
                      color={isChecked ? "blue.700" : "gray.700"}
                      _dark={{
                        color: isChecked ? "blue.300" : "gray.200",
                      }}
                    >
                      {opt.label}
                    </Text>
                  </Flex>
                );
              })
            )}
          </Box>
        )}
      </Box>
    </Field>
  );
}
