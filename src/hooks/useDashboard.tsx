// src/hooks/useUsers.js
import {
  ApiGetCareProviders,
  ApiGetCareProvidersSingle,
  ApiStats,
} from "@src/api/ApiDashboard";
import { useQuery } from "@tanstack/react-query";

export const useStatsApi = () => {
  return useQuery({
    queryKey: ["useStatsApi"], // this enables caching per set of params
    queryFn: () => ApiStats(),
  });
};

export const useCareProviders = () => {
  return useQuery({
    queryKey: ["useCareProviders"], // this enables caching per set of params
    queryFn: () => ApiGetCareProviders(),
  });
};

export const useCareProviderSingle = (id: number) => {
  return useQuery({
    queryKey: ["useCareProviderSingle", id], // cache by ID
    queryFn: () => ApiGetCareProvidersSingle(id),
    enabled: !!id, // only fetch if id exists
  });
};
