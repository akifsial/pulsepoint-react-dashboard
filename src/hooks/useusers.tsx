import { ApiAllSavedCareProviders, ApiInsuranceTypes, ApiMe, ApiProviderTypes } from "@src/api/apiusers";
import { useQuery } from "@tanstack/react-query";

export const useMeApi = (navigate, enabled = true) => {
  return useQuery({
    queryKey: ["useMeApi"],
    queryFn: () => ApiMe(navigate),
    enabled,
    refetchOnWindowFocus: false,
  });
};

export const useAllSavedCareProviders = (search: string, rating: number, page, sort) => {
  return useQuery({
    queryKey: ["useAllSavedCareProviders", search, rating, page, sort], 
    queryFn: () => ApiAllSavedCareProviders(search, rating, page, sort),
    refetchOnWindowFocus: false,
  });
};

export const useAllApiProviderTypes = () => {
  return useQuery({
    queryKey: ["useAllApiProviderTypes"], 
    queryFn: () => ApiProviderTypes(),
    refetchOnWindowFocus: false,
  });
};

export const useAllApiInsuranceTypes = () => {
  return useQuery({
    queryKey: ["useAllApiInsuranceTypes"], 
    queryFn: () => ApiInsuranceTypes(),
    refetchOnWindowFocus: false,
  });
};
