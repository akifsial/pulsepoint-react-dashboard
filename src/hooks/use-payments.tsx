import { ApiPaymentsHistory } from "@src/api/api-payments";
import { useQuery } from "@tanstack/react-query";

export const UseApiPaymentsHistory = () => {
  return useQuery({
    queryKey: ["UseApiPaymentsHistory"],
    queryFn: () => ApiPaymentsHistory(),
    refetchOnWindowFocus: false,
  });
};
