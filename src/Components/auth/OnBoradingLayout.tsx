import React, { ReactNode } from "react";
import dummyImage from "@assets/media/images/signup-img.png";
import signupLogo from "@assets/media/images/signup-logo.png";

interface OnBoardingLayoutProps {
  children: ReactNode;
  noShowLogo?: boolean; 
  logoParentClass?: string; 
}

// const OnBoardingLayout = ({ children }) => {
const OnBoardingLayout: React.FC<OnBoardingLayoutProps> = ({
  children,
  noShowLogo,
  logoParentClass,
}) => {
  return (
    <div className="h-full w-full bg-[linear-gradient(107.76deg,_#F4F7FF_-2.99%,_#DDEFF7_64.85%,_#D6E0F9_113.61%)] flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-[20px] py-6 lg:py-12 px-4 sm:px-6 lg:px-8">
      {" "}
      <div className="hidden shrink-0 lg:block lg:w-1/2 xl:w-1/2  bg-[#FAFAFA] rounded-[10px] overflow-hidden">
        <img
          src={dummyImage}
          alt="User Image"
          className="w-full h-full min-h-[759px] rounded-[10px]"
        />
      </div>
      {/* Form */}
      <div className="h-full min-h-[759px] w-1/2 lg:w-1/2 xl:w-1/2 rounded-[10px] bg-white shadow-sm p-3 lg:p-[28px] flex flex-col justify-center gap-[10px] overflow-y-auto">
        {" "}
        {/* Logo Image: Only render if noShowLogo is false */}
        {!noShowLogo && (
          <div className={`flex justify-center ${logoParentClass}`}>
            <img
              src={signupLogo}
              alt="Signup Logo"
              className="w-[243px] h-[55px]"
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default OnBoardingLayout;
