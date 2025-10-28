import React from "react";
import { Link } from "react-router-dom";
import { PrimaryBtnProps } from "./types";
interface ExtendedBtnProps extends PrimaryBtnProps {
  suffixImg?: string;
  suffixImgAlt?: string;
  suffixImgClass?: string;
}
export const PrimaryButton: React.FC<ExtendedBtnProps> = ({
  btnText,
  btnTextClass = "",
  btnClass = "",
  img,
  imgalt = "",
  showImg = false,
  imgClass = "",
  suffixImg,
  suffixImgAlt = "",
  suffixImgClass = "",
  onClick,
  linkTo,
  imgPosition = "left",
  disabled = false,
  type = "",
}) => {
  const prefixImage =
    showImg && img ? <img src={img} className={imgClass} alt={imgalt} /> : null;

  const suffixImage = suffixImg ? (
    <img src={suffixImg} className={suffixImgClass} alt={suffixImgAlt} />
  ) : null;

  const textElement = (
    <span className={btnTextClass}>
      {typeof btnText === "string" ? btnText : <>{btnText}</>}
    </span>
  );

  const content = (
    <div className="flex items-center gap-x-1.5 justify-center">
      {imgPosition === "left" && prefixImage}
      {textElement}
      {imgPosition === "right" && prefixImage}
      {suffixImage}
    </div>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={`rounded-[20px] cursor-pointer ${
          disabled ? "opacity-50 pointer-events-none" : ""
        } ${btnClass}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`rounded-[20px] ${disabled==true ? "" : "cursor-pointer"} !p-0 h-[36px] ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${btnClass}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      value={btnText}
    >
      {content}
    </button>
  );
};
