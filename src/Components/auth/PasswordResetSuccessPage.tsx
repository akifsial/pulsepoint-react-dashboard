import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import OnBoardingLayout from "./OnBoradingLayout";
import { IoCheckmarkCircle } from "react-icons/io5";
import successIcon from "@assets/media/images/reset-success-icon.png"; // Adjust the path if necessary

const PasswordResetSuccessPage = () => {
  return (
    <OnBoardingLayout>
      <div className="flex flex-col justify-center items-center text-center min-h-[400px]">
        {/* Success Icon */}
        <div className="mb-4">
          <div className="w-[86px] h-[86px] rounded-full flex items-center justify-center">
            <img src={successIcon} alt="Success Icon" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[#1A1A1A] font-[Space Grotesk] font-bold text-[35px] leading-[140%] tracking-[0%] mb-4">
          Password Reset Successfully
        </h2>

        {/* Success Message */}
        <p className="font-[Geist] font-normal text-[16px] leading-[25px] tracking-[0.5%] text-[#49475A] mb-4 max-w-md">
          You have successfully changed password
        </p>

        {/* Back to Login Button */}
        <div className="flex justify-center">
          <Link
            to="/login"
            className="text-[16px] font-[Geist] font-semibold leading-[25px] tracking-[0.5%] text-center text-[#28A2FF] underline decoration-solid decoration-[0.5px] decoration-offset-[0px]"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </OnBoardingLayout>
  );
};

export default PasswordResetSuccessPage;
