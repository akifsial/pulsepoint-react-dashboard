import React, { useState, ReactNode} from "react";
import dummyImage from "@assets/media/images/signup-img.png";
import signupLogo from "@assets/media/images/signup-logo.png";

interface OnBoardingLayoutProps {
  children: ReactNode;
  noShowLogo?: boolean; // Added prop to control logo visibility
}

// const OnBoardingLayout = ({ children }) => {
const OnBoardingLayout: React.FC<OnBoardingLayoutProps> = ({ children, noShowLogo }) => {
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
        {/* Logo Image: Only render if noShowLogo is false */}
                 {!noShowLogo && (
                <div className="flex justify-center">
                    <img
                        src={signupLogo}
                        alt="Signup Logo"
                        className="w-[243px] h-[55px]"
                    />
                </div>
                existtall181
)}
                {children}
                
            </div>
        </div>
    );
};

export default OnBoardingLayout;
