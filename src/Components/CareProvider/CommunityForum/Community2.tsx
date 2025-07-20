import React, { useState } from "react";
import DragMedia from "./DragMedia";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { useForm, Controller } from "react-hook-form";

const Community2 = ({ onNext, onBack }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    onNext(data);
  };

  return (
    <>
      <div className="text-center max-w-[501px] mx-auto mb-2.5 font-normal text-base">
        <h2 className="text-[25px] font-bold leading-8.5 font-[Space Grotesk]">
          Style your community
        </h2>
        <p>
          Adding visual flair will catch new members attention and help
          establish your community’s culture! You can update this at any time.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="banner"
          control={control}
          rules={{ required: "Banner image is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DragMedia
              label="Add Banner Image"
              required
              asterisk
              id="banner-file"
              file={value}
              onChange={(e) => onChange(e.target.files[0])}
              error={error?.message}
            />
          )}
        />

        <Controller
          name="profile"
          control={control}
          rules={{ required: "Profile image is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DragMedia
              label="Add Profile Icon Image"
              required
              asterisk
              id="profile-file"
              file={value}
              onChange={(e) => onChange(e.target.files[0])}
              error={error?.message}
            />
          )}
        />

        <div className="flex items-center gap-2.5 pt-1.5">
          <PrimaryButton
            btnText="Back"
            onClick={onBack}
            showImg={false}
            btnClass="flex items-center justify-center h-[46px] w-[192px] cursor-pointer w-48 bg-[#E4E4E4] border border-[#AFAFAF] text-[#252525] py-[13px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
          />
          <PrimaryButton
            btnText="Next"
            type="submit"
            showImg={false}
            btnClass="flex items-center justify-center h-[46px] cursor-pointer w-[192px] bg-[#28A2FF]  text-white py-5 px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
          />
        </div>
      </form>
    </>
  );
};


export default Community2;
