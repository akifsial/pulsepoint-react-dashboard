import React from "react";
import CommunityTopics from "./CommunityTopics";
import DragMedia from "./DragMedia";
import TextField from "./TextField";

const FlagPost = ({onSubmit}) => {
  return (
    <>
      <div className="text-center mb-2.5 font-normal text-base">
        <h2 className="text-[25px] font-bold leading-8.5 font-[Space Grotesk] mb-1.5">
          Report A Post
        </h2>
        <p>
          Tell us why you're flagging this post. Our team will review it
          shortly.
        </p>
      </div>
      <CommunityTopics
        asterisk
        title={"Select a reason for flagging"}
        text1={"Spam or advertising"}
        text2={"Harassment or bullying"}
        text3={"Misinformation"}
        text4={"Off-topic or irrelevent"}
        text5={"Hate speech or abusive content"}
      />
      <TextField
        label="Additional Comments (optional):"
        asterisk
        id="msg"
        placeholder="Enter description"
        row={2}
        className="h-[90px] mb-6"
      />

      <DragMedia
        label="Upload Image (optional):"
        required
        asterisk
        imgType
        
        className="p-4"
        onChange={(e) => console.log("Selected file:", e.target.files[0])}
      />

      <button
      onClick={onSubmit}
          type="submit"
          className="cursor-pointer w-full bg-[#28A2FF] text-white py-[13.5px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
        >
          Submit Report
        </button>
    </>
  );
};

export default FlagPost;
