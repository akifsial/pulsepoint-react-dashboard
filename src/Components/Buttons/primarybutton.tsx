


import React from "react";
import { Link } from "react-router-dom";
import { PrimaryBtnProps } from "./types";
import Spinner from "@src/Components/loaders/spinner";

export const PrimaryButton: React.FC<PrimaryBtnProps> = ({
  btnText,
  btnTextClass = "",
  btnClass = "",
  img,
  showImg = false,
  imgClass = "",
  onClick,
  Link: linkTo,
  imgPosition = "left",
  isLoading = false,
  type = "button",
  disabled=false
}) => {
  const imageElement = showImg && img && (
    <img src={img} className={imgClass} alt="button icon" />
  );

  const textElement = <span className={btnTextClass}>{btnText}</span>;

  const content = (
    <div className="flex items-center gap-x-1 justify-center">
      {imgPosition === "left" ? (
        <>
          {imageElement}
          {textElement}
        </>
      ) : (
        <>
          {textElement}
          {imageElement}
        </>
      )}
    </div>
  );

  const buttonBody = isLoading ? <Spinner /> : content;

  const button = (
    <button
      className={`rounded-lg flex items-center justify-center ${disabled==true ?  "" : "cursor-pointer " } w-full flex justify-center bg-[#28A2FF] text-white py-3 px-4 rounded-lg font-medium text-lg transition-colors mt-6 cursor-pointer ${btnClass}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {buttonBody}
    </button>
  );

  return linkTo ? <Link to={linkTo}>{button}</Link> : button;
};
