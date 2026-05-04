import { Box, Image } from "@chakra-ui/react";
import React from "react";

const ImageSection = () => {
  return (
    <Box
      maxW={"1000px"}
      mx={"auto"}
      py={{ base: 16, md: 24 }}
      px={{ base: 6, md: 8 }}
    >
      <Box
        bg={"white"}
        p={3}
        border={"1px solid"}
        borderColor={"#e5e7eb"}
        rounded={"xl"}
      >
        <Image
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80"
          alt="Field grass representing growth"
          width="100%"
          height={{ base: "300px", md: "520px" }}
          objectFit="cover"
          display="block"
          rounded={"xl"}
        />
      </Box>
    </Box>
  );
};

export default ImageSection;
