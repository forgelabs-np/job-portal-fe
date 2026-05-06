"use client";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { Avatar, MenuItem, MenuRoot } from "@/shared";
import { Sidebar } from "./sidebar/Sidebar";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Box display="flex" minH="100vh" bg="gray.50">
      {/* Sidebar */}
      <Sidebar />

      <Box flex={1} display="flex" flexDirection="column">
        {/* Header */}
        <Box
          bg="white"
          borderBottom="1px solid"
          borderBottomColor="gray.200"
          px={6}
          py={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="sticky"
          top={0}
          zIndex={10}
        >
          <Box />
          <HStack gap={4}>
            <HStack gap={3}>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="600" color="gray.900">
                  {user?.name || "User"}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {user?.workspace === "gateway" ? "GLOBAL MASTER" : "AGENCY"}
                </Text>
              </Box>
              <MenuRoot>
                {/* <MenuButton as={Box} cursor="pointer"> */}
                <Avatar
                  size="sm"
                  name={user?.name || "U"}
                  bg="teal.600"
                  color="white"
                />
                {/* </MenuButton> */}
                {/* <MenuList> */}
                {/* <MenuItem value="" onClick={handleLogout}>
                  Sign Out
                </MenuItem> */}
                {/* </MenuList> */}
              </MenuRoot>
            </HStack>
          </HStack>
        </Box>

        {/* Page Content */}
        <Box flex={1} p={2} overflowY="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
