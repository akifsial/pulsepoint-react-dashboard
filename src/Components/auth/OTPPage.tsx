import React, { useState, useEffect } from "react";
import OnBoardingLayout from "./OnBoradingLayout";
import OtpInput from "react-otp-input";
import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ApiVerifyOtp } from "@src/api/AuthApi/AuthApi";
import { useNavigate } from "react-router-dom";
import Spinner from "@components/Loaders/Spinner";

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();

  useEffect(() => {
    if (timer <= 0) return; // Stop when timer reaches 50

    const id = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearTimeout(id); // Cleanup on re-render
  }, [timer]);

  const { mutateAsync: otpVerifyMutation, isPending: otpVerifyLoading } =
    useMutation({
      mutationFn: (otp) => ApiVerifyOtp(otp),

      onSuccess: async () => {
        toast.success("OTP Matched!");
        navigate("/reset-password");
      },
      onError: (error) => {
        console.error("OTP Not Matched:", error);
      },
    });

  const otpVerifySubmit = () => {
    otpVerifyMutation({ otp: otp });
  };
  return (
    <OnBoardingLayout>
      <div className="flex  justify-center items-center py-8 ">
        <div className="p-8 rounded-xl  w-[400px]">
          <h2 className="text-center uber-move !text-[28px] !font-semibold mb-2">
            Account Verification
          </h2>
          <p className="text-center text-sm mb-5">Enter verify code below</p>

          <div className="mb-5 flex justify-center">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={{
                width: "40px",
                height: "45px",
                margin: "0 5px",
                fontSize: "20px",
                borderRadius: "2px",
                border: "1px solid #ccc",
                textAlign: "center",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <PrimaryButton
            btnText={`${
              otpVerifyLoading ? <Spinner /> : `Verify Code In ${timer}s`
            }`}
            onClick={otpVerifySubmit}
            disabled={timer == 50 && true}
          />

          {/* <PrimaryButton
            btnText="Resend Code"
            btnClass={`text-center text-sm text-[#000] mt-3 cursor-pointer  ${
              timer == 0 ? "hover:underline" : ""
            }`}
            onClick={handleResendCode}
            disabled={timer == 0 ? false : true}
          /> */}
        </div>
      </div>
    </OnBoardingLayout>
  );
};

export default OTPPage;
