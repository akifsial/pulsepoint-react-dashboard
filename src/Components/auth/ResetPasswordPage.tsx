import React, { useState } from "react";
// import { Link } from "react-router-dom";
import InputField from "../InputField";
import OnBoardingLayout from "./OnBoradingLayout";
import { IoLockClosedOutline } from "react-icons/io5";
import { ApiResetPassword } from "@src/api/AuthApi/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "@components/Loaders/Spinner";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const { mutateAsync: resetMutation, isPending: isResetLoading } = useMutation(
    {
      mutationFn: ({ data }) => ApiResetPassword(data),

      onSuccess: async () => {
        toast.success("Password Reset Successfully");
        navigate("/login");
        localStorage.clear();
      },
      onError: (error) => {
      },
    }
  );

  const resetSubmit = async (data) => {
    const pass = {
      password: data.old_password,
      // new_password: data?.createPassword,
    };
    await resetMutation({ data: pass });
  };

  return (
    <OnBoardingLayout logoParentClass="absolute top-35 right-0 left-0 flex justify-center">
      <div className="flex flex-col min-h-screen p-6 justify-center items-start">
        <h2 className="text-[#1A1A1A] font-[Space Grotesk] font-bold text-[35px] leading-[140%] tracking-[0%] mb-1">
          Reset Password
        </h2>

        <p className="font-[Geist] font-normal text-[16px] leading-[150%] tracking-[0%] text-[#252525CC] mb-4">
          Enter your new password and reset your password{" "}
        </p>

        <form onSubmit={handleSubmit(resetSubmit)} className="space-y-6 w-full">
          <InputField
            label="Create a Password"
            asterisk={true}
            id="createPassword"
            name="old_password"
            type="password"
            icon={IoLockClosedOutline}
            placeholder="***************"
            showPasswordToggle={true}
            register={register}
            registerName="old_password"
            errors={errors}
            validation={{
              required: "Password is required",
            }}
          />

          <InputField
            label="Confirm Password"
            asterisk={true}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            icon={IoLockClosedOutline}
            placeholder="***************"
            showPasswordToggle={true}
            register={register}
            registerName="confirmPassword"
            errors={errors}
            validation={{
              required: "Confirm Password is required",
            }}
          />

          <button
            type="submit"
            className="w-full h-[46px] bg-[#28A2FF] text-white rounded-[10px] px-[10px] flex items-center justify-center gap-[10px] font-[Inter] font-semibold text-[14px] leading-[24px] tracking-[0%] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
          >
            {isResetLoading ? <Spinner /> : "Update Password"}
          </button>
        </form>
      </div>
    </OnBoardingLayout>
  );
};

export default ResetPasswordPage;
