import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import InputField from "../InputField";
import OnBoardingLayout from "./OnBoradingLayout";
import { IoLockClosedOutline } from "react-icons/io5";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    createPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    createPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {
      createPassword: "",
      confirmPassword: "",
    };

    if (!formData.createPassword) {
      newErrors.createPassword = "Password is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.createPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Password reset successful:", formData);
      // Navigate to login page or show success message
      alert("Password updated successfully!");
      window.location.href = "/password-reset-success";
    }
  };

  return (
    <OnBoardingLayout>
      <div className="flex flex-col min-h-screen p-6 justify-center items-start">
        <h2 className="text-[#1A1A1A] font-[Space Grotesk] font-bold text-[35px] leading-[140%] tracking-[0%] mb-4">
          Reset Password
        </h2>

        <p className="font-[Geist] font-normal text-[16px] leading-[150%] tracking-[0%] text-[#252525CC] mb-6">
          Enter your new password and reset your password{" "}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <InputField
            label="Create a Password"
            asterisk={true}
            id="createPassword"
            name="createPassword"
            type="password"
            value={formData.createPassword}
            icon={IoLockClosedOutline}
            onChange={handleChange}
            errorMessage={errors.createPassword}
            placeholder="***************"
            showPasswordToggle={true}
          />

          <InputField
            label="Confirm Password"
            asterisk={true}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            icon={IoLockClosedOutline}
            onChange={handleChange}
            errorMessage={errors.confirmPassword}
            placeholder="***************"
            showPasswordToggle={true}
          />

          <button
            type="submit"
            className="w-full h-[46px] bg-[#28A2FF] text-white rounded-[10px] px-[10px] flex items-center justify-center gap-[10px] font-[Inter] font-semibold text-[14px] leading-[24px] tracking-[0%] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Update Password
          </button>
        </form>
      </div>
    </OnBoardingLayout>
  );
};

export default ResetPasswordPage;
