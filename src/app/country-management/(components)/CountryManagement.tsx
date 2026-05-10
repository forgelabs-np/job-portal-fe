"use client";
import { CountriesApiType, PaginatedCountriesResponse, useGetAllCountries } from "@/api/country";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button } from "@/shared";
import { Datatable } from "@/shared/ui/datatable";
import { PaginationState } from "@/shared/datatable";
import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { RegisterDestinationModal } from "./AddCountryModal";

const CountryManagement = () => {
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  
  const { data, isLoading } = useGetAllCountries({
    page: pageParams.pageIndex,
    size: pageParams.pageSize,
    
  }, true);
  console.log(data, "data");

  const columns = useMemo<ColumnDef<CountriesApiType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "S.N.",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "name",
        header: "Country Name",
        cell: ({ row }) => (
          <HStack gap={3}>
            <Image
              src={`https://flagcdn.com/w40/${row.original.code.toLowerCase()}.png`}
              alt={row.original.name}
              width={16}
              height={10}
              objectFit={"contain"}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <Text fontSize="sm">{row.original.name}</Text>
          </HStack>
        ),
      },
      { accessorKey: "code", header: "Country Code" },
      { accessorKey: "currencyCode", header: "currencyCode" },
    ],
    [],
  );

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Agencies
      </Text>
      <Stack gap={4}>
        <HStack justify="flex-end">
          <Button bg={WEBSITE_THEME_COLOR} onClick={() => setModalOpen(true)}>
            Add Country
          </Button>
        </HStack>

        <Datatable 
          columns={columns} 
          data={data?.content ?? []} 
          isLoading={isLoading}
          serverPagination={{
            currentPage: pageParams.pageIndex,
            totalPages: data?.totalPages ?? 0,
            totalElements: data?.totalElements ?? 0,
            pageSize: pageParams.pageSize,
          }}
          header={{
            title: "Countries",
            hasSearch: true,
          }}
        />

        <RegisterDestinationModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </Stack>
    </>
  );
};

export default CountryManagement;
