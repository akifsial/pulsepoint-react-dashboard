import React, { useState } from "react";
import InputField from "@components/InputField";
import TextField from "./TextField";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { useForm } from "react-hook-form";

const Community1 = ({
  onNext,
  onClose,
  setName,
  setDescription, }) => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <>
      <div className="text-center max-w-[435px] mx-auto mb-2.5 font-normal text-base">
        <h2 className="text-[25px] font-bold leading-8.5 font-[Space Grotesk]">
          Tell us about your community
        </h2>
        <p>
          A name and description help people understand what your community is
          all about.
        </p>
      </div>



      <div className="flex">
        <label
          htmlFor={2}
          className="block mb-2.5 text-[16px] font-[500] text-black leading-[140%] tracking-[0%] font-[Geist]"
        >
          Create Community Name
        </label>
        {<span className="text-red-500 ml-1">*</span>}
      </div>

      <input
        type="text"
        placeholder="Enter Name"
        {...register("name", { required: "Name is required" })}
        className="w-full mb-1 h-[50px] mb-5 bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] px-4 font-[Geist] text-[16px] font-normal text-[#1A1A1A] placeholder:text-gray-500 focus:outline-none"
        onChange={(e) => setName(e.target.value)}
      />

      <label
        htmlFor={2}
        className="block mb-2.5 text-[16px] font-[500] text-black leading-[140%] tracking-[0%] font-[Geist]"
      >
        Add a Description
      </label>

      <textarea
        // id={id}
        // name={id}
        placeholder={"Enter description"}
        // rows={row}
        className={`w-full  h-[90px] rounded-[8px] px-[15px] bg-[#FBFCFD] border border-[#2525251A] font-[Geist] py-2.5 font-normal text-[16px] leading-[140%] text-[#1A1A1A] mb-1 focus:outline-none placeholder:text-sm placeholder:font-medium `}
        onChange={(e) => (setDescription(e.target.value))}
      // value={value}
      />

      <PrimaryButton
        btnText="Next"
        showImg={false}
        btnClass="flex items-center mt-6 justify-center h-[46px] cursor-pointer w-full bg-[#28A2FF]  text-white py-5 px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
        onClick={onNext}
      />
    </>
  );
};

export default Community1;
