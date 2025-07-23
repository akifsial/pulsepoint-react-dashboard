import { ApiMyReviews, ApiMySingleReviews } from "@src/api/ApiMyReviews";
import { useQuery } from "@tanstack/react-query";

export const useApiMyReviews = (search: string, rating: number,filterValue) => {
  return useQuery({
    queryKey: ["useApiMyReviews", search, rating,filterValue],
    queryFn: () => ApiMyReviews(search, rating,filterValue),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};

export const useApiMySingleReviews = (id: string | number) => {
  return useQuery({
    queryKey: ["useApiMySingleReviews", id],
    queryFn: () => ApiMySingleReviews(id),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};
