import React, { useState } from "react";
import dummyImage from "@assets/media/images/signup-img.png";
import signupLogo from "@assets/media/images/signup-logo.png";


const OnBoardingLayout = ({ children }) => {
    return (
            <div className="min-h-screen w-full bg-[linear-gradient(107.76deg,_#F4F7FF_-2.99%,_#DDEFF7_64.85%,_#D6E0F9_113.61%)] flex items-center justify-center gap-[20px] py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 w-1/2 bg-[#FAFAFA]">
                {/* Image */}
                <img
                    src={dummyImage}
                    alt="User Image"
                    className="w-full h-auto object-cover rounded-[10px]"
                />
            </div>

            {/* Form */}
            <div className="w-full bg-white p-8 rounded-[10px] ">
                {/* Logo Image */}
                <div className="flex justify-center mb-6">
                    <img
                        src={signupLogo}
                        alt="Signup Logo"
                        className="w-[243px] h-[55px]"
                    />
                </div>
                <div className="h-screen overflow-y-auto">
                    <p className="text-[#1A1A1A] text-[35px] font-bold leading-[140%] tracking-normal font-[Space Grotesk] mb-3">
                    Sign Up
                </p>
                <p className="text-[#252525CC] text-[16px] font-normal leading-[150%] tracking-[0%] font-[Geist] mb-6">
                    Join to explore and share care insights
                </p>

                {children}
                </div>
            </div>
        </div>
    );
};

export default OnBoardingLayout;
