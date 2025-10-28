import { ApiMyReviews, ApiMySingleReviews } from "@src/api/apimyreviews";
import { useQuery } from "@tanstack/react-query";


export const useApiMyReviews = (
  search: string,
  rating: number,
  filterValue: boolean,
  page: number,
  sort: string,
  limit
) => {
  return useQuery({
    queryKey: ["useApiMyReviews", search, rating, filterValue, page, sort,limit],
    queryFn: () => ApiMyReviews(search, rating, filterValue, page, sort,limit),
    refetchOnWindowFocus: false,
  });
};



export const useApiMySingleReviews = (id: string | number) => {
  return useQuery({
    queryKey: ["useApiMySingleReviews", id],
    queryFn: () => ApiMySingleReviews(id),
    refetchOnWindowFocus: false,
  });
};
