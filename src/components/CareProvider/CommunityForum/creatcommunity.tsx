import React from "react";

import InputField from "@components/inputfield";
import TextField from "@components/CareProvider/CommunityForum/textfield";

const CreateCommunity = () => {
  return (
  <>
  <div className="bg-transparent">
      <div className="max-w-[596px] bg-white p-7.5 rounded-[10px] m-auto">
      <div className="text-center max-w-[435px] mx-auto mb-2.5">
        <h3 className="text-[25px] font-bold leading-8.5">
          Tell us about your community
        </h3>
        <p className="font-normal text-base">
          A name and description help people understand what your community is all about.
        </p>
      </div>

      <InputField
        label="Create Community Name"
        asterisk={true}
        id="name"
        name="name"
        type="text"
        placeholder="Enter Name"
        className="w-full h-[50px] rounded-[8px] px-[15px] bg-[#FBFCFD] border border-[#2525251A] font-[Geist] font-medium text-[16px] leading-[140%] tracking-[0%] text-[#1A1A1A] mb-3 focus:outline-none"
      />

      <TextField
        label="Add a description"
        asterisk={true}
        id="msg"
        placeholder="Enter description"
        row={3}
        className="h-[110px] mb-6"
      />

      <button
        type="submit"
        className="w-48 bg-[#28A2FF] text-white py-[9px] px-4 rounded-lg font-medium text-lg transition-colors"
      >
        Next
      </button>
    </div>
  </div>
  </>
  );
};

export default CreateCommunity;
