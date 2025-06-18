import React from 'react'
import InputField from "../../../InputField"
import DragMedia from "../DragMedia"

const CreatePost = ({ setIsOpen }) => {
  const handleSubmit = () => {
    // Optional: Add your post submission logic here
    setIsOpen(false); // Close the modal
  };

  return (
    <>
      <div className="text-center max-w-[435px] mx-auto mb-2.5 font-normal text-base">
        <h2 className="text-[25px] font-bold leading-8.5 font-[Space Grotesk]">
          Create post
        </h2>
        <p>Add details to publish post in community</p>
      </div>

      <InputField
        label="Add A Title"
        id="title"
        name="title"
        type="text"
        placeholder="Enter title"
        className="w-full h-[50px] rounded-[8px] px-[15px] bg-[#FBFCFD] border border-[#2525251A] font-[Geist] text-[16px] leading-[140%] text-sm text-[#1A1A1A] mb-1 focus:outline-none placeholder:text-sm placeholder:font-medium"
      />

      <InputField
        label="Add a description"
        id="description"
        name="description"
        type="text"
        placeholder="Enter description"
        className="w-full h-[50px] rounded-[8px] px-[15px] bg-[#FBFCFD] border border-[#2525251A] font-[Geist] text-[16px] leading-[140%] text-sm text-[#1A1A1A] mb-1 focus:outline-none placeholder:text-sm placeholder:font-medium"
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
        type="button"
        onClick={handleSubmit}
        className="cursor-pointer w-full bg-[#28A2FF] text-white py-[13.3px] px-4 rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#007AB2]"
      >
        Add Post in Community
      </button>
    </>
  );
};

export default CreatePost;
  