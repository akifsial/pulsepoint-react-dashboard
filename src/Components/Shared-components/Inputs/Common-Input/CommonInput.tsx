import React from "react";
import type { CommonInputProps } from "./types";

const CommonInput: React.FC<CommonInputProps> = ({
  placeholder,
  type = "text",
  value,
  onChange,
  showImg = false,
  imgSrc,
  imgLeft = true,
  inputClassName = "",
  containerClassName = "",
  imgClassName= "",
  ...rest
}) => {
  return (
    <div
      className={`flex bg-black items-center border border-black/80 rounded-[md] px-3 py-2 bg-white gap-2 ${containerClassName}`}
    >
      {showImg && imgLeft && imgSrc && (
        <img src={imgSrc} alt="icon" className={`w-4 h-4  ${imgClassName}`} />
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`flex-1 outline-none bg-transparent ${inputClassName}`}
        {...rest}
      />

      {showImg && !imgLeft && imgSrc && (
        <img src={imgSrc} alt="icon" className="w-4 h-4" />
      )}
    </div>
  );
};

export default CommonInput;
