import React from "react";
import InputField from "@components/InputField";
import TextField from "./TextField";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";

const Community1 = ({ onNext, onClose }) => {
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

      <InputField
        label="Create Community Name"
        asterisk
        id="name"
        name="name"
        type="text"
        placeholder="Enter Name"
        className="w-full h-[50px] rounded-[8px] px-[15px] bg-[#FBFCFD] border border-[#2525251A] font-[Geist] text-[16px] leading-[140%] text-sm text-[#1A1A1A] mb-1 focus:outline-none placeholder:text-sm placeholder:font-medium"
      />

      <TextField
        label="Add a description"
        asterisk
        id="msg"
        placeholder="Enter description"
        row={3}
        className="h-[110px] mb-6 text-sm"
      />

      <PrimaryButton
        btnText="Next"
        onClick={onNext}
        showImg={false}
        btnClass="flex items-center justify-center h-[46px] cursor-pointer w-full bg-[#28A2FF]  text-white py-5 px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
      />
    </>
  );
};

export default Community1;
