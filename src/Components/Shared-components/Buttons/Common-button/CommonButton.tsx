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
    <div className="flex items-center gap-x-2 justify-center">
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
        className={`rounded-lg cursor-pointer ${
          disabled ? "opacity-50 pointer-events-none" : ""
        } ${btnClass}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`rounded-lg cursor-pointer w-full ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${btnClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
