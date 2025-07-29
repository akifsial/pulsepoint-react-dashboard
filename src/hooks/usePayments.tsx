import { ApiPaymentsHistory } from "@src/api/ApiPayments";
import { useQuery } from "@tanstack/react-query";

export const UseApiPaymentsHistory = () => {
  return useQuery({
    queryKey: ["UseApiPaymentsHistory"],
    queryFn: () => ApiPaymentsHistory(),
    // enabled: !!search, // only fetch when search is not empty
    refetchOnWindowFocus: false,
  });
};
