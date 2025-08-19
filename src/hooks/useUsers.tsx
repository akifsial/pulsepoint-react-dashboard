// src/hooks/useUsers.js
import {
  ApiAllSavedCareProviders,
  ApiInsuranceTypes,
  ApiMe,
  ApiProviderTypes,
} from "@src/api/ApiUsers";
import { useQuery } from "@tanstack/react-query";

export const useMeApi = (params = {}) => {
  return useQuery({
    queryKey: ["useMeApi"], // this enables caching per set of params
    queryFn: () => ApiMe(),
    refetchOnWindowFocus: false,
  });
};

// export const useMeApi = (token: string | null) => {
//   return useQuery({
//     queryKey: ['me', token],
//     queryFn: () => ApiMe(token), // fetchMe uses token in headers
//     enabled: !!token, // ✅ Only run if token exists
//   });
// };

export const useAllSavedCareProviders = (search: string, rating: number,sort) => {
  return useQuery({
    queryKey: ["useAllSavedCareProviders", search, rating,sort], // this enables caching per set of params
    queryFn: () => ApiAllSavedCareProviders(search, rating,sort),
    refetchOnWindowFocus: false,
  });
};

export const useAllApiProviderTypes = () => {
  return useQuery({
    queryKey: ["useAllApiProviderTypes"], // this enables caching per set of params
    queryFn: () => ApiProviderTypes(),
    refetchOnWindowFocus: false,
  });
};

export const useAllApiInsuranceTypes = () => {
  return useQuery({
    queryKey: ["useAllApiInsuranceTypes"], // this enables caching per set of params
    queryFn: () => ApiInsuranceTypes(),
    refetchOnWindowFocus: false,
  });
};
