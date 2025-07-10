// src/hooks/useUsers.js
import { ApiAllSavedCareProviders, ApiMe } from "@src/api/ApiUsers";
import { useQuery } from "@tanstack/react-query";

export const useMeApi = (params = {}) => {
  return useQuery({
    queryKey: ["useMeApi"], // this enables caching per set of params
    queryFn: () => ApiMe(),
    refetchOnWindowFocus: false,
  });
};

export const useAllSavedCareProviders = () => {
  return useQuery({
    queryKey: ["useAllSavedCareProviders"], // this enables caching per set of params
    queryFn: () => ApiAllSavedCareProviders(),
    refetchOnWindowFocus: false,
  });
};
