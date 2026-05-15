import { NoDataFoundImage } from "@/assets/images";
import { BoxOpenIcon } from "@/assets/svg";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface PageNoDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const PageNoData = ({
  title = "No Data Found",
  description = "We couldn't find what you're looking for.",
  icon,
}: PageNoDataProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={16}
      px={6}
      bg="gray.50"
      // borderRadius="xl"
      // borderWidth="1px"
      // borderStyle="dashed"
      // borderColor="gray.300"
      w="full"
      minH="300px"
    >
      <Box color="red.400" mb={4} css={{ "& > svg": { width: "60px", height: "60px" } }}>
        <Image src={NoDataFoundImage.src} alt="no data found" width={60} height={60} />
        {/* {icon || <BoxOpenIcon color="red.400" />} */}
      </Box>
      <Text fontSize="xl" fontWeight="semibold" color="gray.800" mb={2}>
        {title}
      </Text>
      <Text fontSize="md" color="gray.500" maxW="sm">
        {description}
      </Text>
    </Box>
  );
};

export default PageNoData;
