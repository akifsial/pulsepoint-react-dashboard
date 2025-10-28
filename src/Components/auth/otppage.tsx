import React, { useState, useEffect } from "react";
import OnBoardingLayout from "./onboradinglayout";
import OtpInput from "react-otp-input";
import { PrimaryButton } from "@src/Components/Buttons/primarybutton";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ApiVerifyOtp } from "@src/api/authapi/authapi";
import { useNavigate } from "react-router-dom";
import Spinner from "@components/loaders/spinner";

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();

  useEffect(() => {
    if (timer <= 0) return; 

    const id = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearTimeout(id); 
  }, [timer]);

  const { mutateAsync: otpVerifyMutation, isPending: otpVerifyLoading } = useMutation({
    mutationFn: (otp) => ApiVerifyOtp(otp),

    onSuccess: async () => {
      toast.success("OTP Matched!");
      navigate("/reset-password");
    },
    onError: (error) => {
    },
  });

  const otpVerifySubmit = () => {
    otpVerifyMutation({ otp: otp });
  };
  return (
    <OnBoardingLayout>
      <div className="flex  justify-center items-center py-8 ">
        <div className="p-8 rounded-xl  w-[400px]">
          <h2 className="text-center uber-move !text-[28px] !font-semibold mb-2">Account Verification</h2>
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

          <PrimaryButton btnText={`${otpVerifyLoading ? "Loading..." : `Verify Code In ${timer}s`}`} onClick={otpVerifySubmit} disabled={timer == 50 && true} />

        </div>
      </div>
    </OnBoardingLayout>
  );
};

export default OTPPage;
