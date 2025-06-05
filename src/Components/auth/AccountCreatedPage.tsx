import React from "react";
import { Link } from "react-router-dom"; // For navigation
import { IoCheckmarkCircle } from "react-icons/io5"; // Tick mark icon
import OnBoardingLayout from "./OnBoradingLayout";

const AccountCreatedPage = () => {
  return (
    <OnBoardingLayout>
      <div className="flex flex-col justify-center items-center min-h-screen">
        {/* Tick mark icon */}
        <IoCheckmarkCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Account Created Successfully
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          You have successfully created your account.
        </p>
        {/* Link to back to login page */}
        <Link to="/login" className="text-blue-600 underline">
          Back to Login
        </Link>
      </div>
    </OnBoardingLayout>
  );
};

export default AccountCreatedPage;
