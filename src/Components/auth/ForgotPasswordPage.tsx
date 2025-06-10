import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import InputField from "../InputField"; // Reusable input component for form fields
import OnBoardingLayout from "./OnBoradingLayout";
import { IoMailOutline } from "react-icons/io5";

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: any = {
      email: "",
    };

    if (!formData.email) newErrors.email = "Email Address is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission (password reset link sent)
      console.log("Password reset link sent to:", formData.email);
    }
  };

  return (
    <OnBoardingLayout>
      <div className="flex flex-col justify-center items-start min-h-screen">
        {/* Heading */}
        <h2 className="text-[#1A1A1A] font-[Space Grotesk] font-bold text-[35px] leading-[140%] tracking-[0%] mb-4">
          Forgot Password?
        </h2>

        {/* Content */}
        <p className="font-[Geist] font-normal text-[16px] leading-[150%] tracking-[0%] text-[#252525CC] mb-6">
          Enter your email address and we'll send you an email with a link to
          reset your password.
        </p>

        {/* Email Address Input Field */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          <InputField
            label="Email Address"
            asterisk={true}
            id="email"
            name="email"
            type="email"
            value={formData.email}
            icon={IoMailOutline}
            onChange={handleChange}
            errorMessage={errors.email}
            placeholder="contact@organization.org"
            className="w-full max-w-[570px] h-[50px] rounded-[8px] px-[15px] bg-[#FBFCFD] border border-[#2525251A] font-[Geist] font-medium text-[16px] leading-[140%] tracking-[0%] text-[#1A1A1A] mb-3"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}

          {/* Update Password Button */}
          <button
            type="submit"
            className="w-full max-w-[570px] h-[46px] bg-[#28A2FF] text-white rounded-[10px] px-[10px] flex items-center justify-center gap-[10px] font-[Inter] font-semibold text-[14px] leading-[24px] tracking-[0%] transition-colors"
          >
            Update Password
          </button>

          {/* Back to Login Link */}
          <div className="mt-4 flex justify-center">
            <Link
              to="/login"
              className="text-[16px] font-[Geist] font-semibold leading-[25px] tracking-[0.5%] text-center text-[#28A2FF] underline decoration-solid decoration-[0.5px] decoration-offset-[0px]"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </OnBoardingLayout>
  );
};

export default ForgotPasswordPage;
