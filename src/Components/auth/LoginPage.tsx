import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import InputField from "../InputField";
import { IoMailOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import OnBoardingLayout from "./OnBoradingLayout";
import googleIcon from "@assets/media/images/google.png";
import fbIcon from "@assets/media/images/fb.png";
import twiterIcon from "@assets/media/images/twiter.png";
import SocialLoginSection from "../SocialLoginSection"; // Import the new component

const LoginPage = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: any = {
      usernameOrEmail: "",
      password: "",
    };

    if (!formData.usernameOrEmail)
      newErrors.usernameOrEmail = "Email or Username is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission
      console.log("Login Submitted", formData);

      // Navigate to the dashboard or account page after successful login
      // navigate("/dashboard"); (Uncomment and use if you have a routing setup)
    }
  };

  function handleSocialLogin(provider: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <OnBoardingLayout>
      <div className="flex flex-col min-h-screen p-6 items-center justify-center">
        <h2 className="text-[35px] font-bold leading-[140%] tracking-[0%] text-[#1A1A1A] font-space-grotesk mb-4">
          Login
        </h2>
        <p className="text-[16px] font-normal leading-[150%] tracking-[0%] text-[#252525CC] font-geist mb-6">
          Join to explore and share care insights.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          {/* Email or Username Input */}
          <InputField
            label="Email or Username"
            asterisk={true}
            icon={IoMailOutline}
            id="usernameOrEmail"
            name="usernameOrEmail"
            type="text"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            errorMessage={errors.usernameOrEmail}
            placeholder="e.g. john"
          />
          {errors.usernameOrEmail && (
            <p className="mt-1 text-sm text-red-600">
              {errors.usernameOrEmail}
            </p>
          )}

          {/* Password Input */}
          <InputField
            label="Create a Password"
            asterisk={true}
            icon={IoLockClosedOutline}
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            errorMessage={errors.password}
            placeholder="***************"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
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
            className="w-full bg-[#28A2FF] text-white py-3 px-4 rounded-lg font-medium text-lg transition-colors"
          >
            Login
          </button>
          {/* calling component for Social icons */}
          <SocialLoginSection
            action="login"
            handleSocialLogin={handleSocialLogin}
          />
          {/* "Don't have an account yet?" Section */}
          <div className="flex justify-center mt-6">
            <p className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal text-[#49475A] font-[Geist]">
              Don’t have an account yet?{" "}
              <Link
                to="/signup"
                className="text-[16px] leading-[25px] tracking-[0.005em] text-center align-middle font-normal underline text-[#28A2FF] font-[Geist]"
              >
                Register now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </OnBoardingLayout>
  );
};

export default LoginPage;
