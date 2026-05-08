"use client";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useAuthStore } from "@/store";
import { Avatar, MenuRoot } from "@/shared";
import { Sidebar } from "./sidebar/Sidebar";
import { useState } from "react";

const SIDEBAR_EXPANDED = "240px";
const SIDEBAR_COLLAPSED = "72px";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuthStore();
  const isAdmin = user?.roles?.includes("ADMIN");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box display="flex" minH="100vh" bg="gray.50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        ml={collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED}
        transition="margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
        minH="100vh"
        minW={0}
      >
        {/* Sticky Header */}
        <Box
          bg="white"
          borderBottom="1px solid"
          borderBottomColor="gray.200"
          px={6}
          py={4}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          position="sticky"
          top={0}
          zIndex={10}
          boxShadow="0 1px 0 rgba(0,0,0,0.06)"
        >
          <HStack gap={4}>
            <Box textAlign="right">
              <Text fontSize="sm" fontWeight="600" color="gray.900">
                {user?.sub}
              </Text>
              <Text
                fontSize="xs"
                color="gray.500"
                letterSpacing="0.04em"
                textTransform="uppercase"
              >
                {isAdmin ? "Admin" : "Agency"}
              </Text>
            </Box>
            <MenuRoot>
              <Avatar
                size="sm"
                name={user?.name || "U"}
                bg="teal.600"
                color="white"
              />
            </MenuRoot>
          </HStack>
        </Box>

        {/* Page Content */}
        <Box flex={1} p={6} overflowY="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
