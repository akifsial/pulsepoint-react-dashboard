import {
  ApiGetCareProviders,
  ApiGetCareProvidersSingle,
  ApiGetRecentSearches,
  ApiStats,
} from "@src/api/apidashboard";
import { useQuery } from "@tanstack/react-query";

export const useStatsApi = () => {
  return useQuery({
    queryKey: ["useStatsApi"], 
    queryFn: () => ApiStats(),
    refetchOnWindowFocus: false,
  });
};

export const useCareProviders = (search: string, rating: number,page:number,sort) => {
  return useQuery({
    queryKey: ["useCareProviders", search, rating,page,sort],
    queryFn: () => ApiGetCareProviders(search, rating,page,sort),
    refetchOnWindowFocus: false,

  });
};


export const useCareProviderSingle = (id: number) => {
  return useQuery({
    queryKey: ["useCareProviderSingle",id], 
    queryFn: () => ApiGetCareProvidersSingle(id),
    enabled: !!id, 
    refetchOnWindowFocus: false,
  });
};

export const useRecentSearches = () => {
  return useQuery({
    queryKey: ["useRecentSearches"], 
    queryFn: () => ApiGetRecentSearches(),
    refetchOnWindowFocus: false,
  });
};
