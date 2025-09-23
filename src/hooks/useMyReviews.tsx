import { ApiMyReviews, ApiMySingleReviews } from "@src/api/ApiMyReviews";
import { useQuery } from "@tanstack/react-query";

// export const useApiMyReviews = (search: string, rating: number,filterValue,page, sort,) => {
//   return useQuery({
//     queryKey: ["useApiMyReviews", search, rating,filterValue,page, sort],
//     queryFn: () => ApiMyReviews(search, rating,filterValue,page, sort),
//     // enabled: !!search, // only fetch when search is not empty
//     refetchOnWindowFocus: false,
//   });
// };


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
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};
