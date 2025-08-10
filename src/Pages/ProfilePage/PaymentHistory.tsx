import React from "react";
import { BadgeCheck, XCircle } from "lucide-react";
import { UseApiPaymentsHistory } from "@src/hooks/usePayments";
import PaymentHistoryLoader from "@components/Loaders/PaymentHistoryLoader";

type PaymentRecord = {
  id: string;
  amount: number;
  currency: string;
  status: "success" | "failed";
  date: string;
  email: string;
};

const dummyPayments: PaymentRecord[] = [
  {
    id: "pay_001",
    amount: 4999,
    currency: "USD",
    status: "success",
    date: "2025-07-28T10:07:03.906Z",
    email: "user@example.com",
  },
  {
    id: "pay_002",
    amount: 999,
    currency: "USD",
    status: "failed",
    date: "2025-07-27T14:23:13.123Z",
    email: "fail@example.com",
  },
];

const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const formatAmount = (amount: number, currency: string) => {
  return `${(amount / 100).toFixed(2)} ${currency}`;
};

const PaymentHistoryPage = () => {
  const { data, isLoading } = UseApiPaymentsHistory();

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Payment History
        </h2>

        {isLoading ? (
         <PaymentHistoryLoader />
        ) : data?.records?.length === 0 ? (
          <p className="text-center text-gray-500">No payments found.</p>
        ) : (
          <div className="space-y-4">
            {data?.records?.map((payment) => (
              <div
                key={payment.id}
                className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition"
              >
                <div>
                  <b className="text-md mb-2 text-gray-500">{payment.plan}</b>
                  <p className="text-green-500  font-semibold">
                    ${payment.amount}
                  </p>
                  <p className="text-xs  text-red -400 mt-1">
                    Expired at : {formatDate(payment?.current_period_end)}
                  </p>
                </div>

                <div className="mt-3 md:mt-0">
                  {payment.status === "active" ? (
                    <span className="inline-flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                      <BadgeCheck className="w-4 h-4 mr-1" />
                      Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
                      <XCircle className="w-4 h-4 mr-1" />
                      Expired
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
