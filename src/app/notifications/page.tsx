"use client";

import { VStack } from "@chakra-ui/react";
import { NotificationsPage } from "./(components)/NotificationsPage";

export default function NotificationsPageRoute() {
  return (
    <VStack align="stretch" gap={4}>
      <NotificationsPage />
    </VStack>
  );
}
