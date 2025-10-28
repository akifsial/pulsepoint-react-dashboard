import DragMedia from "@src/Components/CareProvider/CommunityForum/dragmedia";
import React from "react";
const ChangePhoto = () => {
  return (
    <>
      <div className="text-center max-w-[435px] mx-auto mb-2.5 font-normal text-base">
        <h2 className="text-[25px] font-bold leading-8.5 font-[Space Grotesk]">
          Upload Profile Photo
        </h2>
        <p>You have successfully changed password</p>
      </div>
      <DragMedia
        required
        imgType
        className="p-4"
      />
      <button
        type="submit"
        className="cursor-pointer w-full bg-[#28A2FF] text-white py-[13.5px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
      >
        Upload Photo
      </button>
    </>
  );
};
export default ChangePhoto;
