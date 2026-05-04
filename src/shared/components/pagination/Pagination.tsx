import { Button, HStack, Text, Box } from "@chakra-ui/react";

import { ArrowDownIcon } from "@/assets/svg";
import { PaginationPropsTypes } from "@/shared/types";

export const Pagination: React.FC<PaginationPropsTypes> = ({
  totalPages,
  currentPage,
  pageSize,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  };

  return (
    <HStack gap={"6px"} justifyContent="center" width="100%" mt={"32px"}>
      <Box
        as="button"
        cursor={currentPage === 1 ? "default" : "pointer"}
        opacity={currentPage === 1 ? 0.5 : 1}
        onClick={() =>
          currentPage > 1 && onPageChange(currentPage - 1, pageSize)
        }
        height={"40px"}
        width={"40px"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ArrowDownIcon style={{ transform: "rotate(90deg)" }} />
      </Box>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            variant={currentPage === page ? "solid" : "ghost"}
            onClick={() => onPageChange(page, pageSize)}
            borderRadius={"8px"}
            width={"40px"}
            height={"40px"}
          >
            {page}
          </Button>
        ) : (
          <Text key={index} px={2}>
            ...
          </Text>
        )
      )}

      <Box
        as="button"
        cursor={currentPage === totalPages ? "default" : "pointer"}
        opacity={currentPage === totalPages ? 0.5 : 1}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1, pageSize)
        }
        height={"40px"}
        width={"40px"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ArrowDownIcon style={{ transform: "rotate(-90deg)" }} />
      </Box>
    </HStack>
  );
};
