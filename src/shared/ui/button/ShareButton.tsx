import { HStack, Text } from "@chakra-ui/react";

import { ShareIcon } from "@/assets/svg";

export const ShareButton = () => {
  return (
    <HStack gap="4px">
      <Text color="black">Share</Text>
      <ShareIcon />
    </HStack>
  );
};
