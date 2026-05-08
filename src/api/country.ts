import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface CountriesApiType {
  id: number;
  name: string;
  code: string;
  currencyCode: string;
  currencySymbol: string;
  isEnabled: boolean;
}

const getApprovedCountries = () => {
  return httpClient.get<ApiResponse<CountriesApiType[]>>(
    api.ADMIN.APPROVED_COUNTRIES,
  );
};

export const useGetApprovedCountries = () => {
  return useQuery({
    queryFn: () => getApprovedCountries(),
    queryKey: [api.ADMIN.APPROVED_COUNTRIES],
    select: (resp) => resp?.data?.data,
    // enabled: !!params?.status,
  });
};

interface CountriesParams {
  keyword?: string;
  page?: number;
  size?: number;
}

const getAllCountries = (params: CountriesParams) => {
  return httpClient.get<ApiResponse<CountriesApiType[]>>(
    api.ADMIN.ALL_COUNTRIES,
    { params },
  );
};

export const useGetAllCountries = (
  params: CountriesParams = {},
  isOpen: boolean,
) => {
  return useQuery({
    queryFn: () => getAllCountries(params),
    queryKey: [api.ADMIN.ALL_COUNTRIES, params],
    select: (resp) => resp?.data?.data?.content,
    enabled: !!isOpen,
  });
};
const toggleCountry = (id: string) => {
  const url = api.ADMIN.TOGGLE_COUNTRY.replace("{id}", id);
  return httpClient.patch(url);
};

export const useToggleRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleCountry(id),
    onSuccess: (response, id) => {
      console.log(response?.data?.message, "toast");
      successNotification(response?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.APPROVED_COUNTRIES],
      });
      queryClient.invalidateQueries({ queryKey: [`role-${id}`] });
    },
    onError: ({
      error,
    }: {
      error: AxiosError<{ message: string; error: string }>;
    }) => {
      errorNotification(error?.response?.data?.message);
    },
  });
};
