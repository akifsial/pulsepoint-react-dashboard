import React, { useState } from "react";
import { data, Link, useLocation } from "react-router-dom"; // For navigation
import InputField from "../input-field";
import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import OnBoardingLayout from "./on-borading-layout";
import SocialLoginSection from "../social-login-section"; // Import the new component
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ApiLogin } from "@src/api/authapi/auth-api";
import dummyImage from "@assets/media/images/signup-img.png";
import signupLogo from "@assets/media/images/signup-logo.png";

import { useForm } from "react-hook-form";
import Spinner from "@components/loaders/spinner";
import toast from "react-hot-toast";
import { connectSocket } from "@src/socket/socket";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  });
  const localtion = useLocation();
  const pathname = location.pathname;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const navigate = useNavigate();

  function handleSocialLogin(provider: string): void {
    throw new Error("Function not implemented.");
  }

  const { mutateAsync: loginMutation, isPending: isLoginLoading } = useMutation({
    mutationFn: ({ data }) => ApiLogin(data),

    onSuccess: async (response) => {
      const token = localStorage.getItem("token");

      // const socket = connectSocket(token);
      connectSocket(token);

      // socket.on("connect", () => {
      // });

      if (response?.user?.role_type == "PATIENT") {
        navigate("/patient/dashboard");
      }
      if (response?.user?.role_type == "CARE_PROVIDER") {
        navigate("/care-provider");
      }
      if (response?.user?.role_type == "ADMIN") {
        navigate("/admin");
      }
      toast.success("Login Successful");
    },
    onError: (response) => {},
  });

  const LoginSubmit = async (data) => {
    await loginMutation({ data });
  };

  return (
    // <OnBoardingLayout logoParentClass="absolute top-14 right-0 left-0 flex justify-center">
    <div className="grid  lg:grid-cols-2 gap-5 sm:p-7 bg-[linear-gradient(107.76deg,_#F4F7FF_-2.99%,_#DDEFF7_64.85%,_#D6E0F9_113.61%)]">
      <div className="lg:flex hidden">
        <img src={dummyImage} alt="User Image" className="w-full h-full min-h-[759px] rounded-[10px]" />
      </div>

      <div className="flex bg-white rounded-[10px] px-3 md:!px-[60px] flex-col lg:min-h-[700px] min-h-screen sm:mt-0  lg:py-0 py-10 justify-center ">
        <div className="flex mb-4 items-center justify-center">
          <img src={signupLogo} alt="Signup Logo" className="w-[243px] h-[55px]" />
        </div>
        <h2 className=" !text-[25px] sm:!text-[35px] font-bold leading-[140%] tracking-[0%] text-[#1A1A1A] font-space-grotesk mb-2">Login</h2>
        <p className="text-[14px] sm:text-[16px] font-normal leading-[150%] tracking-[0%] text-[#252525CC] font-geist mb-4">Join to explore and share care insights.</p>
        <form onSubmit={handleSubmit(LoginSubmit)} className="space-y-6 w-full items-center">
          {/* Email or Username Input */}
          <InputField
            label="Email"
            asterisk={true}
            icon={IoPersonOutline}
            type="text"
            onChange={handleChange}
            placeholder="e.g. john"
            register={register}
            className="pr-10"
            registerName="email"
            errors={errors}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            }}
          />

          {/* Password Input */}
          <InputField
            label="Create a Password"
            asterisk={true}
            icon={IoLockClosedOutline}
            id="password"
            name="password"
            type="password"
            // value={formData.password}
            onChange={handleChange}
            placeholder="***************"
            register={register}
            registerName="password"
            errors={errors}
            className="pr-10"
            validation={{
              required: "Password is required",
            }}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center flex-wrap gap-5 justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                // value="email"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-1.5 scale-125 border-[#FFFFFF] align-middle text-center"
              />
              <label htmlFor="rememberMe" className="text-[16px] leading-[100%] tracking-[0.016em] text-[#252525] text-center align-middle font-medium font-[Geist]">
                Remember me
              </label>
            </div>

            {/* Forgot Password */}
            <Link to="/forgot-password" className="text-[16px] leading-[100%] tracking-[0.016em] text-[#252525] text-center align-middle font-medium font-[Geist] hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-[#28A2FF] flex justify-center items-center text-white h-[50px] px-4 rounded-lg font-medium text-lg transition-colors cursor-pointer mb-1">
            <span>{isLoginLoading ? <Spinner /> : "Login"}</span>
          </button>
          {/* calling component for Social icons */}
          <SocialLoginSection action="signup" handleSocialLogin={handleSocialLogin} />
          {/* "Don't have an account yet?" Section */}
          <div className="flex justify-center">
            <p className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal text-[#49475A] font-[Geist]">
              Don’t have an account yet?{" "}
              <Link to="/signup" className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal underline text-[#28A2FF] font-[Geist]">
                Register now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    // </OnBoardingLayout>
  );
};

export default LoginPage;
