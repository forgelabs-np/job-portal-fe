import { Box, Separator, Stack } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
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
