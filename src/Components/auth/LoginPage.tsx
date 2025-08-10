import React, { useState } from "react";
import { data, Link, useLocation } from "react-router-dom"; // For navigation
import InputField from "../InputField";
import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import OnBoardingLayout from "./OnBoradingLayout";
import SocialLoginSection from "../SocialLoginSection"; // Import the new component
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ApiLogin } from "@src/api/AuthApi/AuthApi";
// import Toast from "@components/Toast/Toast";
import { useForm } from "react-hook-form";
import Spinner from "@components/Loaders/Spinner";
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

  const { mutateAsync: loginMutation, isPending: isLoginLoading } = useMutation(
    {
      mutationFn: ({ data }) => ApiLogin(data),

      onSuccess: async (response) => {
        console.log("NUTELA", response.user.role_type);
        toast.success("Login Successful");

        const token = JSON.parse(localStorage.getItem("token"));

        // const socket = connectSocket(token);
        connectSocket(token);

        // socket.on("connect", () => {
        //   console.log("Socket connected ✅");
        // });

        if (response?.user?.role_type == "PATIENT") {
          navigate("/patient/dashboard");
        } else {
          navigate("/care-provider");
        }
      },
      onError: (response) => {
        // toast.error(error?.response?.data?.message);
        console.log("eooeoeoeo", response);
      },
    }
  );

  const LoginSubmit = async (data) => {
    await loginMutation({ data });
  };

  return (
    <OnBoardingLayout logoParentClass="absolute top-14 right-0 left-0 flex justify-center">
      <div className="flex flex-col min-h-screen sm:mt-0 mt-[60px] p-2 sm:p-6 justify-center ">
        <h2 className=" !text-[25px] sm:!text-[35px] font-bold leading-[140%] tracking-[0%] text-[#1A1A1A] font-space-grotesk mb-2">
          Login
        </h2>
        <p className="text-[14px] sm:text-[16px] font-normal leading-[150%] tracking-[0%] text-[#252525CC] font-geist mb-4">
          Join to explore and share care insights.
        </p>
        <form
          onSubmit={handleSubmit(LoginSubmit)}
          className="space-y-6 w-full items-center"
        >
          {/* Email or Username Input */}
          <InputField
            label="Email"
            asterisk={true}
            icon={IoPersonOutline}
            type="text"
            onChange={handleChange}
            placeholder="e.g. john"
            register={register}
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
              <label
                htmlFor="rememberMe"
                className="text-[16px] leading-[100%] tracking-[0.016em] text-[#252525] text-center align-middle font-medium font-[Geist]"
              >
                Remember me
              </label>
            </div>

            {/* Forgot Password */}
            <Link
              to="/forgot-password"
              className="text-[16px] leading-[100%] tracking-[0.016em] text-[#252525] text-center align-middle font-medium font-[Geist] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#28A2FF] flex justify-center text-white py-3 px-4 rounded-lg font-medium text-lg transition-colors cursor-pointer mb-1"
          >
            <span>{isLoginLoading ? <Spinner /> : "Login"}</span>
          </button>
          {/* calling component for Social icons */}
          <SocialLoginSection
            action="signup"
            handleSocialLogin={handleSocialLogin}
          />
          {/* "Don't have an account yet?" Section */}
          <div className="flex justify-center">
            <p className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal text-[#49475A] font-[Geist]">
              Don’t have an account yet?{" "}
              {pathname == "/patient/login" ? (
                <Link
                  to="/patient/signup"
                  className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal underline text-[#28A2FF] font-[Geist]"
                >
                  Register now
                </Link>
              ) : (
                <Link
                  to="/care-provider/signup"
                  className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal underline text-[#28A2FF] font-[Geist]"
                >
                  Register now
                </Link>
              )}
            </p>
          </div>
        </form>
      </div>
    </OnBoardingLayout>
  );
};

export default LoginPage;
