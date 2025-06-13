import React from "react";
import Drop from "../../../assets/media/svgs/dashboard-svgs/drop.svg";

const DragMedia = ({
  label = "Upload File",
  required = false,
  onChange,
  asterisk,
  className = "",
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-1 text-[16px] font-[500] text-black leading-[140%] tracking-[0%] font-[Geist]">
        {label}{" "}
        {required && (
          <span className="text-red-500">
            {" "}
            {asterisk && <span className="text-red-500">*</span>}
          </span>
        )}
      </label>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-[86px] border-2 p-3 border-dashed border-[#E5E7EB] rounded-lg cursor-pointer bg-[#FBFCFD] hover:bg-gray-50 transition"
      >
        <div className="flex flex-col items-center justify-center">
          <div
            className="mb-2 border border-[#E9EAEB] bg-white rounded-lg h-10 w-10"
            style={{
              boxShadow: `
  0px 1px 2px 0px rgba(16, 24, 40, 0.04),
  inset 0px -2px 0px 0px rgba(10, 13, 18, 0.04),
  inset 0px 0px 0px 1px rgba(10, 13, 18, 0.12)
`,
            }}
          >
            <span
              className="w-full h-full  flex items-center justify-center "
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <img src={Drop} alt="" />
            </span>
          </div>
          <p className="text-sm font-medium text-[rgba(83, 88, 98, 0.8)]">
            <span className="text-[#005BE0] ">Click to upload</span> or drag and
            drop
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default DragMedia;
