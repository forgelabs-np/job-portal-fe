"use client";
import { useGetAllCountries, useToggleRoleMutation } from "@/api/country";
import { CloseCircleIcon, SearchIcon } from "@/assets/svg";
import { CloseButton } from "@/shared";
import { useDebounce } from "@/utils/debounce";
import {
  Box,
  Button,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogPositioner,
  DialogRoot,
  Flex,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";

interface CountriesApiType {
  id: string;
  name: string;
  code: string;
  currencyCode: string;
  currencySymbol: string;
  isEnabled: boolean;
}

interface RegisterDestinationModalProps {
  open: boolean;
  onClose: () => void;
}

const CountryItem = ({ country }: { country: CountriesApiType }) => {
  const { mutate: toggleCountry, isPending } = useToggleRoleMutation();

  const handleToggle = (id: string) => {
    toggleCountry(id, {
      onSuccess: () => {},
    });
  };

  const flagUrl = `https://flagcdn.com/w40/${country.code.toLowerCase()}.png`;

  return (
    <HStack
      justify="space-between"
      px={4}
      py={3}
      borderRadius="xl"
      _hover={{ bg: "gray.50" }}
      transition="background 0.2s"
    >
      <HStack gap={3}>
        <Box
          width="40px"
          height="40px"
          borderRadius="lg"
          overflow="hidden"
          flexShrink={0}
        >
          <Image
            src={flagUrl}
            width={"40px"}
            height={"35px"}
            objectFit={"contain"}
            alt={country.name}
          />
          {/* <img
            src={flagUrl}
            alt={country.name}
            width={40}
            height={40}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            onError={(e) => {
              // fallback to a placeholder if flag not found
              (e.target as HTMLImageElement).src =
                `https://placehold.co/40x40/e2e8f0/94a3b8?text=${country.code}`;
            }}
          /> */}
        </Box>
        <VStack align="start" gap={0}>
          <Text fontWeight={600} fontSize="sm" color="gray.800">
            {country.name}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {country.code} • {country.currencyCode}
          </Text>
        </VStack>
      </HStack>

      <Button
        variant="ghost"
        size="sm"
        borderRadius="full"
        onClick={() => handleToggle(country.id)}
        loading={isPending}
        color={country.isEnabled ? "green.500" : "gray.400"}
        _hover={{ bg: country.isEnabled ? "green.50" : "gray.100" }}
        p={1}
        minW="auto"
        h="auto"
      >
        <LuPlus size={20} />
      </Button>
    </HStack>
  );
};

export const RegisterDestinationModal = ({
  open,
  onClose,
}: RegisterDestinationModalProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data: countries, isLoading } = useGetAllCountries(
    {
      keyword: debouncedSearch || undefined,
      page: 0,
      size: 200,
    },
    open,
  );

  const handleClose = () => {
    setSearch("");
    onClose();
  };

  return (
    <DialogRoot
      open={open}
      onOpenChange={handleClose}
      closeOnInteractOutside
      placement="center"
    >
      <DialogBackdrop />
      <DialogPositioner
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
      >
        <DialogContent
          borderRadius="2xl"
          minWidth="460px"
          maxWidth="500px"
          p={6}
          boxShadow="0px 0px 48px 0px rgba(0, 0, 0, 0.12)"
        >
          <DialogCloseTrigger color={"black"} />
          <DialogBody>
            <Flex w="full" justify="flex-end">
              <CloseButton
                size="xs"
                color="white"
                bg="red.500"
                rounded="full"
                onClick={handleClose}
              />
            </Flex>
            <HStack justify={"space-between"}>
              <VStack align="start" gap={1} mb={5}>
                <HStack gap={2}>
                  <Text fontSize="2xl" fontWeight={700} color="gray.900">
                    Register
                  </Text>
                  <Text
                    fontSize="2xl"
                    fontWeight={400}
                    color="green.600"
                    fontStyle="italic"
                  >
                    Destination
                  </Text>
                </HStack>
                <Text
                  fontSize="xs"
                  fontWeight={500}
                  color="gray.400"
                  letterSpacing="wider"
                >
                  SELECT A DESTINATION FROM THE GLOBAL REGISTRY.
                </Text>
              </VStack>
            </HStack>
            {/* Search */}
            <Box
              position="relative"
              mb={4}
              border="2px solid"
              borderColor="green.500"
              borderRadius="xl"
              px={3}
              py={2}
            >
              <HStack>
                <SearchIcon />
                <Input
                  placeholder="Type country name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  border="none"
                  outline="none"
                  _focus={{ boxShadow: "none", border: "none" }}
                  fontSize="sm"
                  p={0}
                />
              </HStack>
            </Box>

            {/* Country List */}
            <Box
              maxH="360px"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "#e2e8f0",
                  borderRadius: "4px",
                },
              }}
            >
              {isLoading ? (
                <VStack py={10}>
                  <Spinner color="green.500" />
                  <Text color="gray.400" fontSize="sm">
                    Loading countries...
                  </Text>
                </VStack>
              ) : countries?.length === 0 ? (
                <VStack py={10}>
                  <Text color="gray.400" fontSize="sm">
                    No countries found
                  </Text>
                </VStack>
              ) : (
                countries?.map((country: CountriesApiType) => (
                  <CountryItem key={country.id} country={country} />
                ))
              )}
            </Box>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};
