import React, { useState } from "react";
import DragMedia from "./dragmedia";
import { PrimaryButton } from "@src/Components/Sharedcomponents/Buttons/Commonbutton/commonbutton";

const Community2 = ({ onNext, onBack,img1, setImg1, img2, setImg2 }) => {


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

      <DragMedia
        label="Add Banner Image"
        required
        asterisk
        id="banner-file"
        file={img1}
        onChange={(e) => setImg1(e.target.files[0])}
      />

      <DragMedia
        label="Add Profile Icon Image"
        required
        asterisk
        id="profile-file"
        file={img2}
        onChange={(e) => setImg2(e.target.files[0])}
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
          showImg={false}
          onClick={onNext}
          btnClass="flex items-center justify-center h-[46px] cursor-pointer w-[192px] bg-[#28A2FF]  text-white py-5 px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
        />
      </div>
    </>
  );
};

export default Community2;
