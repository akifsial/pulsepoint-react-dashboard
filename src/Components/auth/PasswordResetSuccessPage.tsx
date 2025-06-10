import React from "react";
import { Link } from "react-router-dom"; // For navigation
import OnBoardingLayout from "./OnBoradingLayout";
import { IoCheckmarkCircle } from "react-icons/io5";

const PasswordResetSuccessPage = () => {
  return (
    <OnBoardingLayout>
      <div className="flex flex-col justify-center items-center text-center min-h-[400px]">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <IoCheckmarkCircle className="text-white text-3xl" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[#1A1A1A] font-[Space Grotesk] font-bold text-[35px] leading-[140%] tracking-[0%] mb-4">
          Password Reset Successfully
        </h2>

        {/* Success Message */}
        <p className="font-[Geist] font-normal text-[16px] leading-[150%] tracking-[0%] text-[#252525CC] mb-8 max-w-md">
          You have successfully changed password
        </p>

        {/* Back to Login Button */}
        <Link
          to="/login"
          className="inline-block font-[Geist] font-semibold text-[16px] text-[#28A2FF] underline hover:text-blue-600 transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </OnBoardingLayout>
  );
};

export default PasswordResetSuccessPage;