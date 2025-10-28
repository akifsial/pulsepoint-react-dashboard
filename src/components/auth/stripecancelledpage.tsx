import React from "react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StripeCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-white p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="text-red-500 w-20 h-20 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          You’ve cancelled the payment process. If this was a mistake, you can try again anytime.
        </p>
        <button
          onClick={() => navigate("/patient/feature")}
          className="px-6 cursor-pointer py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default StripeCancelPage;
