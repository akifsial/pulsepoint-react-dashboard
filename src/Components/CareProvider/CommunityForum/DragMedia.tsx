import React from "react";
import Drop from "../../../assets/media/svgs/dashboard-svgs/drop.svg";

const DragMedia = ({
  label = "Upload File",
  required = false,
  onChange,
  asterisk,
  imgType,
  className = "",
}) => {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-[16px] font-[500] text-black leading-[140%] tracking-[0%] font-[Geist]">
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
        className={`flex flex-col items-center justify-center p-3 w-full max-h-[128px] border-2 border-dashed border-[#E5E7EB] rounded-xl cursor-pointer bg-[#FBFCFD] hover:bg-gray-50 transition ${className}`}
      >
        <div className="flex flex-col items-center justify-center">
          <div
            className="mb-0 border border-[#E9EAEB] bg-white rounded-lg h-10 w-10"
            style={{
              boxShadow: `
                0px 1px 2px 0px rgba(16, 24, 40, 0.04),
                inset 0px -2px 0px 0px rgba(10, 13, 18, 0.04),
                inset 0px 0px 0px 1px rgba(10, 13, 18, 0.12)
              `,
            }}
          >
            <span
              className="w-full h-full flex items-center justify-center mb-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <img src={Drop} alt="ImgDrop" />
            </span>
          </div>
          <p className="text-sm font-medium text-[#535862]/80">
            <span className="text-[#005BE0]">Click to upload</span> or drag and
            drop
          </p>
          {imgType && (
            <span className="font-bold text-sm leading-5 text-[#252525]/80">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </span>
          )}
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
