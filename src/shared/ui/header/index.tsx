import { HeaderProps } from "@/shared/types";
import { Heading, Text, VStack } from "@chakra-ui/react";

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <VStack alignItems="start" gap="4px">
      <Heading fontWeight="400">{title}</Heading>
      <Text color="system.text.light.light">{description}</Text>
    </VStack>
  );
};
