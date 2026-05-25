import { Box, Separator, Stack } from "@chakra-ui/react";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/LandingPage/Navbar";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isMarketingHome = pathname === "/";
  const isPublicPage = pathname.startsWith("/public"); // ← add this

  if (isMarketingHome) {  // ← include it here
    return (
      <Box as="main" minH="100vh" w="100%" overflowX="hidden">
        {children}
      </Box>
    );
  }

  if (isPublicPage) {
    return (
      <Stack alignItems="stretch" minH="100vh" bg="white" gap={0}>
        <Navbar />
        <Box flex="1" w="100%" mx="auto">
          {children}
        </Box>
        <Separator borderColor="gray.200" mt={5} />
      </Stack>
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
      </Stack>
    </>
  );
};
