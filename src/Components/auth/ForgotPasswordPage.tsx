import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import InputField from "../InputField"; // Reusable input component for form fields
import OnBoardingLayout from "./OnBoradingLayout";

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
      <div className="flex flex-col justify-center items-center min-h-screen">
        {/* Heading */}
        <h2 className="text-[#1A1A1A] font-[Space Grotesk] font-bold text-[35px] leading-[140%] tracking-[0%] mb-4">
          Forgot Password?
        </h2>
        
        {/* Content */}
        <p className="text-[#25252580] text-[14px] font-[Geist] font-normal leading-[100%] tracking-[1.6%] mb-6">
          Enter your email address and we'll send you an email with a link to reset your password.
        </p>

        {/* Email Address Input Field */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          <InputField
            label="Email Address*"
            asterisk={true}
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            errorMessage={errors.email}
            placeholder="contact@organization.org"
            style="font-[Geist] font-[500] text-[16px] leading-[140%] tracking-[0%]"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}

          {/* Update Password Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-lg transition-colors"
          >
            Update Password
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-4">
          <Link
            to="/login"
            className="text-[16px] text-center font-[Geist] font-semibold text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </OnBoardingLayout>
  );
};

export default ForgotPasswordPage;
