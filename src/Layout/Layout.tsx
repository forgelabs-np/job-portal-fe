"use client";

import { Box, Separator, Stack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isMarketingHome = pathname === "/";

  if (isMarketingHome) {
    return (
      <Box as="main" minH="100vh" w="100%" overflowX="hidden">
        {children}
      </Box>
    );
  }

  return (
    <>
      <Stack alignItems="stretch" minH="100vh" bg="white" gap={0}>
        <Navbar />
        <Separator borderColor="gray.200" />

        <Box flex="1" maxW="1280px" w="100%" mx="auto">
          {children}
        </Box>

        <Separator borderColor="gray.200" mt={5} />
        <Footer />
      </Stack>
    </>
  );
};
