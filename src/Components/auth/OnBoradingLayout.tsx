import React, { useState } from "react";
import dummyImage from "@assets/media/images/signup-img.png";
import signupLogo from "@assets/media/images/signup-logo.png";


const OnBoardingLayout = ({ children }) => {
    return (
            <div className="min-h-screen w-full bg-[linear-gradient(107.76deg,_#F4F7FF_-2.99%,_#DDEFF7_64.85%,_#D6E0F9_113.61%)] flex items-center justify-center gap-[20px] py-12 px-4 sm:px-6 lg:px-8">
            <div className="h-[759px] w-1/2 bg-[#FAFAFA]">
                {/* Image */}
                <img
                    src={dummyImage}
                    alt="User Image"
                    className="w-full h-full rounded-[10px]"
                />
            </div>

            {/* Form */}
            <div className="w-1/2 bg-white p-8 rounded-[10px] ">
                {/* Logo Image */}
                <div className="flex justify-center mb-6">
                    <img
                        src={signupLogo}
                        alt="Signup Logo"
                        className="w-[243px] h-[55px]"
                    />
                </div>

                {children}
                
            </div>
        </div>
    );
};

export default OnBoardingLayout;
