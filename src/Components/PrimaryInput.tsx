import React, { useState } from "react";
import { CommonInputsProps } from "./types/index";
// import searchIcon from "@assets/media/images";
import {
  Eye,
  EyeClosed,
  EyeClosedIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";

const PrimaryInput: React.FC<CommonInputsProps> = ({
  showImg,
  inputClass,
  placeholder,
  register,
  registerName,
  requiredText,
  validation,
  errors,
  defaultValidation = "Required",
  type = "text",
  eyeIcon = false,
  label,
  disabled = false,
  onChange,
  // passwordShow,
  // setPasswordShow
}) => {
  const [passwordShow, setPasswordShow] = useState(false);
  return (
    // max-w-[366px]
    <div className="relative ">
      {showImg && (
        <img
          // src={searchIcon}
          alt="Search"
          className="absolute left-3 top-1/2 -translate-y-1/2 size-5"
        />
      )}
      <div className="relative">
        {label ? (
          <label className="block text-[12px] font-bold mb-[6px] text-[#252525]">
            {label}
          </label>
        ) : (
          ""
        )}
        {type === "textarea" ? (
          <textarea
            placeholder={placeholder}
            {...(register && registerName
              ? register(
                  registerName,
                  validation || { required: "This field is required" }
                )
              : {})}
            className={`w-full rounded-xl bg-white placeholder:text-[12px] shadow_bg placeholder:text-[var(--text-muted)] outline-none resize-none ${
              showImg ? "pl-10" : "pl-3"
            } pr-3 ${inputClass} text-[14px]`}
            disabled={disabled}
          />
        ) : (
          <input
            type={
              eyeIcon && passwordShow
                ? "text"
                : eyeIcon && passwordShow == false
                ? "password"
                : type
            }
            placeholder={placeholder}
            {...(register && registerName
              ? register(
                  registerName,
                  validation || { required: "This field is required" }
                )
              : {})}
            className={`w-full rounded-xl bg-white pr-[50px] placeholder:text-[12px] shadow_bg placeholder:text-[var(--text-muted)] py-[14px] outline-none ${
              showImg ? "pl-10" : "pl-3"
            } pr-3 ${inputClass} text-[14px]`}
            disabled={disabled}
          />
        )}

        {eyeIcon ? (
          passwordShow ? (
            <Eye
              className="absolute w-5  top-3 right-4 cursor-pointer"
              onClick={() => setPasswordShow(!passwordShow)}
            />
          ) : (
            <EyeOffIcon
              onClick={() => setPasswordShow(!passwordShow)}
              className="absolute w-5  top-3 right-4 cursor-pointer"
            />
          )
        ) : (
          ""
        )}
      </div>
      {/* {errors?.[registerName] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[registerName]?.message as string}
        </p>
      )} */}
      {errors && registerName && errors[registerName]?.message && (
        <p className="text-sm text-red-500 mt-1">
          {String(errors[registerName]?.message)}
        </p>
      )}
    </div>
  );
};

export default PrimaryInput;
