import InputField from "@components/input-field";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import React, { useState } from "react";
import backArrow from "../../assets/media/svgs/dashboard-svgs/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiChangePassword } from "@src/api/authapi/auth-api";

const ManagePassword = () => {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync: updatePatientProfile,
    isPending: updatePatientProfileLoader,
  } = useMutation({
    mutationFn: (data) => ApiChangePassword(data),

    onSuccess: async () => {
      toast.success("Profile Updated Successfully");
      queryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list
    },
    onError: (error) => {
      toast.error(
        error?.message == "INCORRECT_OLD_PASSWORD"
          ? "Incorrect Old Password"
          : error?.message
      );
    },
  });

  const passwordChangeSubmit = async (data) => {
    if (data.confirm_new_password !== data.new_password) {
      return toast.error("New Password & Confirm Password Not Matched");
    }
    // const password={password:data?.pasword}
    await updatePatientProfile({
      old_password: data.old_password,
      new_password: data?.new_password,
    });
  };

  return (
    <>
      <div
        className="flex items-center mb-6 gap-2.5 cursor-pointer"
        onClick={() => Navigate(-1)}
      >
        <img src={backArrow} alt="backArrow" />
        <h2 className="text-[25px] font-bold space-grotesk text-[#181D27] font-[Space Grotesk]">
          Back to Profile details
        </h2>
      </div>

      <div className="rounded-[10px] bg-white py-10 px-3 sm:p-10">
        <h4 className="font-bold space-grotesk text-[#252525] text-xl leading-tight mb-7">
          Update Password
        </h4>
        <form onSubmit={handleSubmit(passwordChangeSubmit)}>
          <InputField
            label="Old Password"
            type="password"
            id="password1"
            placeholder="**********************"
            // value={password}
            fieldName="sm:w-[300px] w-full"
            onChange={(e) => setPassword(e.target.value)}
            asterisk={false}
            register={register}
            registerName="old_password"
            errors={errors}
            validation={{ required: "Old password is required" }}
          />
          <InputField
            label="New Password"
            type="password"
            id="password2"
            placeholder="**********************"
            // value={password1}
            fieldName="sm:w-[300px] w-full"
            onChange={(e) => setPassword1(e.target.value)}
            asterisk={false}
            register={register}
            registerName="new_password"
            errors={errors}
            validation={{ required: "Password is required" }}
          />
          <InputField
            label="Confirm Password"
            type="password"
            id="password3"
            placeholder="**********************"
            // value={password2}
            fieldName="sm:w-[300px] w-full"
            onChange={(e) => setPassword2(e.target.value)}
            asterisk={false}
            register={register}
            errors={errors}
            registerName="confirm_new_password"
            validation={{ required: "Confirm password is required" }}
          />
          <PrimaryButton
            btnText="Save Changes"
            showImg={false}
            btnClass="md:w-[22%] sm:w-[30%] w-full h-[46px] mt-6.5 !rounded-[10px] border border-[#28A2FF] bg-[#28A2FF] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
            disabled={updatePatientProfileLoader}
          />
        </form>
      </div>
    </>
  );
};

export default ManagePassword;
