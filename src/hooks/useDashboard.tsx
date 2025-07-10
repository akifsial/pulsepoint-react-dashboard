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
    refetchOnWindowFocus: false,
  });
};

// export const useCareProviders = () => {
//   return useQuery({
//     queryKey: ["useCareProviders"], // this enables caching per set of params
//     queryFn: () => ApiGetCareProviders(),
//     refetchOnWindowFocus: false,
//   });
// };

export const useCareProviders = (search: string,rating:number) => {

  return useQuery({
    queryKey: ["useCareProviders", search,rating],
    queryFn: () => ApiGetCareProviders(search,rating),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};

// Use CareProviders

// interface CareProviderProps {
//   sort?:string,
//   value?:string | number,
// }

// export const useCareProviders = (props:CareProviderProps) => {
//   return useQuery({
//     queryKey: ["useCareProviders", props], // this enables caching per set of params
//     queryFn: () => ApiGetCareProviders(props),
//     // enabled: !!value, // runs only if `id` is truthy
//   });
// };

export const useCareProviderSingle = (id: number) => {
  return useQuery({
    queryKey: ["useCareProviderSingle", id], // cache by ID
    queryFn: () => ApiGetCareProvidersSingle(id),
    enabled: !!id, // only fetch if id exists
    refetchOnWindowFocus: false,
  });
};
