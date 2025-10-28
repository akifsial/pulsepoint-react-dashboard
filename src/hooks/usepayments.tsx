import { ApiPaymentsHistory } from "@src/api/apipayments";
import { useQuery } from "@tanstack/react-query";

export const UseApiPaymentsHistory = () => {
  return useQuery({
    queryKey: ["UseApiPaymentsHistory"],
    queryFn: () => ApiPaymentsHistory(),
    refetchOnWindowFocus: false,
  });
};
