import React from "react";
import googleIcon from "@assets/media/images/google.png";
import fbIcon from "@assets/media/images/fb.png";
import twiterIcon from "@assets/media/images/twiter.png";
import { Link, useNavigate } from "react-router-dom";
interface SocialLoginSectionProps {
  action: "login" | "signup"; // This prop determines whether it's for Login or Sign Up
  handleSocialLogin: (provider: string) => void;
}

const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  action,
  handleSocialLogin,
}) => {
  // const handleNavigate=()=>{
  //   window.open("https://phpstack-1250693-5723234.cloudwaysapps.com/api/v1/auth/google/callback","_self")
  // }

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_APP_API_URL}auth/google`;
  };

  const loginWithFacebook = () => {
    window.location.href = `${import.meta.env.VITE_APP_API_URL}auth/facebook`;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="flex items-center w-[306px] h-[11px] gap-[23px]">
        <div className="w-[70px] h-[1.5px] bg-[#252525] opacity-20" />
        <p className="text-[16px] leading-[26px] font-semibold text-[#252525] align-middle font-[Geist] opacity-50">
          {action === "signup" ? "Or Sign up With" : "Or Log in With"}
        </p>
        <div className="w-[70px] h-[1.5px] bg-[#252525] opacity-20" />
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-1 mt-4">
        {/* <Link to={"https://phpstack-1250693-5723234.cloudwaysapps.com/api/v1/auth/google/callback"}> */}
        <img
          src={googleIcon}
          alt="Google"
          className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity"
          // onClick={() => handleSocialLogin("google")}
          onClick={() => loginWithGoogle()}
        />
        {/* </Link> */}
        <img
          src={twiterIcon}
          alt="Twitter"
          className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleSocialLogin("twitter")}
        />
        <img
          src={fbIcon}
          alt="Facebook"
          className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => loginWithFacebook()}
        />
      </div>
    </div>
  );
};

export default SocialLoginSection;
