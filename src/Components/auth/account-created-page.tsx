import React from "react";
import { Link } from "react-router-dom"; 
import OnBoardingLayout from "./on-borading-layout";
import successIcon from "@assets/media/images/reset-success-icon.png"; 

const AccountCreatedPage = () => {
  return (
    <OnBoardingLayout noShowLogo={true}>
      <div className="flex flex-col justify-center items-center text-center h-full p-6">
        {/* Success Icon */}
        <div className="mb-4">
          <div className="w-[86px] h-[86px] rounded-full flex items-center justify-center">
            <img src={successIcon} alt="Success Icon" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[#1A1A1A] font-[Space Grotesk] font-bold text-[35px] leading-[140%] tracking-[0%] mb-4">
          Account Created Successfully
        </h2>

        {/* Success Message */}
        <p className="font-[Geist] font-normal text-[16px] leading-[25px] tracking-[0.5%] text-[#49475A] mb-4 max-w-md">
          You have successfully created your account
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

export default AccountCreatedPage;
