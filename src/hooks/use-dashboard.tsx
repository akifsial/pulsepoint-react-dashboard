// src/hooks/useUsers.js
import {
  ApiGetCareProviders,
  ApiGetCareProvidersSingle,
  ApiGetRecentSearches,
  ApiStats,
} from "@src/api/api-dashboard";
import { useQuery } from "@tanstack/react-query";

export const useStatsApi = () => {
  return useQuery({
    queryKey: ["useStatsApi"], // this enables caching per set of params
    queryFn: () => ApiStats(),
    refetchOnWindowFocus: false,
  });
};

export const useCareProviders = (search: string, rating: number,page:number,sort) => {
  return useQuery({
    queryKey: ["useCareProviders", search, rating,page,sort],
    queryFn: () => ApiGetCareProviders(search, rating,page,sort),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
        // { keepPreviousData: true }

  });
};

// ................................................................

export const useCareProviderSingle = (id: number) => {
  return useQuery({
    queryKey: ["useCareProviderSingle",id], // cache by ID
    queryFn: () => ApiGetCareProvidersSingle(id),
    enabled: !!id, // only fetch if id exists
    refetchOnWindowFocus: false,
  });
};

export const useRecentSearches = () => {
  return useQuery({
    queryKey: ["useRecentSearches"], // cache by ID
    queryFn: () => ApiGetRecentSearches(),
    refetchOnWindowFocus: false,
  });
};
