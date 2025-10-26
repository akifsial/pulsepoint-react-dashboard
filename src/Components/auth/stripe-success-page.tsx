import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StripeSuccessPage = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(20);
  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role_type;

  useEffect(() => {
    if (counter === 0) {
      if (userRole == "PATIENT") {
        navigate("/patient/dashboard");
      } else {
        navigate("/care-provider");
      }
      return;
    }
    const timer = setTimeout(() => setCounter(counter - 1), 1000);

    return () => clearTimeout(timer); 
  }, [counter, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your payment was processed successfully. A confirmation
          email has been sent to you.
        </p>
        <button
          onClick={
            userRole == "PATIENT"
              ? () => navigate("/patient/dashboard")
              : () => navigate("/care-provider")
          }
          className="px-6 py-3 bg-green-500 cursor-pointer text-white font-semibold rounded-full hover:bg-green-600 transition-all duration-200"
        >
          Go to Dashboard
        </button>
        <span className=" ml-8 text-gray-500 font-semibold">
          Redirecting in {counter}s...
        </span>
      </div>
    </div>
  );
};

export default StripeSuccessPage;
