import Image from "next/image";
import { Text, VStack } from "@chakra-ui/react";

import { EmptyStateProps } from "@/shared/types";
import { EmptyStateImage } from "@/assets/images";

export const EmptyState = ({
  title = "No Items!",
  description,
}: EmptyStateProps) => {
  return (
    <VStack alignItems="center" justifyContent="center" width="full">
      <Image src={EmptyStateImage} alt="Empty State" width={304} height={272} />
      <Text
        color="system.text.normal.light"
        marginTop="16px"
        marginBottom="2px"
      >
        {title}
      </Text>

      {description && (
        <Text color="system.text.light.light">{description}</Text>
      )}
    </VStack>
  );
};
