import React from "react";
import Drop from "../../../assets/media/svgs/dashboard-svgs/drop.svg";

const DragMedia = ({
  label = "",
  required = false,
  onChange,
  asterisk,
  imgType,
  file,
  className = "",
  id,
  error,
}) => {
  const imageUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-[16px] font-medium text-black font-[Geist]"
      >
        {label}
        {required && asterisk && <span className="text-red-500">*</span>}
      </label>

      <label
        htmlFor={id}
        className={`relative flex items-center justify-center p-3 w-full h-[120px] border-2 border-dashed ${
          error ? "border-red-500" : "border-[#E5E7EB]"
        } rounded-xl cursor-pointer bg-[#FBFCFD] hover:bg-gray-50 transition overflow-hidden ${className}`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-2 border border-[#E9EAEB] bg-white rounded-lg h-10 w-10 overflow-hidden">
              <img
                src={Drop}
                alt="Drop Icon"
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-sm font-medium text-[#535862]/80">
              <span className="text-[#005BE0]">Click to upload</span> or drag and drop
            </p>
            {imgType && (
              <span className="font-bold text-sm leading-5 text-[#252525]/80">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </span>
            )}
          </div>
        )}

        <input
          id={id}
          type="file"
          className="hidden"
          onChange={onChange}
        />
      </label>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default DragMedia;
