import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../inputfield";
import OnBoardingLayout from "./onboradinglayout";
import { IoMailOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { ApiForgot } from "@src/api/Auth-api/authapi";
import toast from "react-hot-toast";
import Spinner from "@src/Components/loaders/spinner";
import { useMutation } from "@tanstack/react-query";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();


  const { mutateAsync: forgotMutation, isPending: isForgotPending } = useMutation({
    mutationFn: ({ data }) => ApiForgot(data),

    onSuccess: async () => {
      navigate("/otp-verify");
      toast.success("OTP Sent Successfully");
    },
    onError: (error) => {},
  });

  const ForgotSubmit = async (data) => {
    await forgotMutation({ data });
  };

  return (
    <OnBoardingLayout logoParentClass="absolute top-36 right-0 left-0 flex justify-center">
      <div className="flex flex-col justify-center p-6 items-start min-h-screen">
        <h2 className="text-[#1A1A1A] font-[Space Grotesk] font-bold text-[35px] leading-[140%] tracking-[0%] mb-1">Forgot Password?</h2>

        <p className="font-[Geist] font-normal text-[16px] leading-[150%] tracking-[0%] text-[#252525CC] mb-4">Enter your email address and we'll send you an email with a link to reset your password.</p>

        <form onSubmit={handleSubmit(ForgotSubmit)} className="space-y-6 w-full">
          <InputField
            label="Email Address"
            asterisk={true}
            id="email"
            name="email"
            type="email"
            icon={IoMailOutline}
            placeholder="contact@organization.org"
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

          <button type="submit" className="w-full max-w-[570px] h-[46px] bg-[#28A2FF] text-white rounded-[10px] px-[10px] flex items-center justify-center gap-[10px] font-[Inter] font-semibold text-[14px] leading-[24px] tracking-[0%] transition-colors cursor-pointer">
            {isForgotPending ? <Spinner /> : "Update Password"}
          </button>

          <div className="mt-4 flex justify-center">
            <Link to="/login" className="text-[16px] font-[Geist] font-semibold leading-[25px] tracking-[0.5%] text-center text-[#28A2FF] underline decoration-solid decoration-[0.5px] decoration-offset-[0px]">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </OnBoardingLayout>
  );
};

export default ForgotPasswordPage;
