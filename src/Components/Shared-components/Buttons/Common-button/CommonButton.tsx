import React from "react";
import { Link } from "react-router-dom";
import { PrimaryBtnProps } from "./types";

export const PrimaryButton: React.FC<PrimaryBtnProps> = ({
  btnText,
  btnTextClass = "",
  btnClass = "",
  img,
  imgalt = "",
  showImg = false,
  imgClass = "",
  onClick,
  linkTo,
  imgPosition = "left",
  disabled = false,
}) => {
  const imageElement =
    showImg && img ? <img src={img} className={imgClass} alt={imgalt} /> : null;

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

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={`rounded-[20px] cursor-pointer ${disabled ? "opacity-50 pointer-events-none" : ""} ${btnClass}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`rounded-[20px] cursor-pointer h-[36px] px-[10px] py-[8px] ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${btnClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
