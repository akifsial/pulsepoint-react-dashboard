import React from "react";
import DragMedia from "./DragMedia";

const Community2 = ({ onNext, onBack }) => {
  return (
    <>
      <div className="text-center max-w-[501px] mx-auto mb-2.5 font-normal text-base">
        <h2 className="text-[25px] font-bold leading-8.5 font-[Space Grotesk]">Style your community</h2>
        <p>
          Adding visual flair will catch new members attention and help establish your community’s culture! You can update this at any time.
        </p>
      </div>

      <DragMedia
        label="Add Banner Image"
        required
        asterisk
        onChange={(e) => console.log("Selected file:", e.target.files[0])}
      />

      <DragMedia
        label="Add Profile Icon Image"
        required
        asterisk
        onChange={(e) => console.log("Selected file:", e.target.files[0])}
      />

      <div className="flex items-center gap-2.5 pt-1.5">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer w-48 bg-[#E4E4E4] border border-[#AFAFAF] text-[#252525] py-[13px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
        >
          Back
        </button>
        <button
          onClick={onNext}
          type="submit"
          className="cursor-pointer w-48 bg-[#28A2FF] text-white py-[13.5px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Community2;
