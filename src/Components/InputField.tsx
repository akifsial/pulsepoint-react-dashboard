import React, { useState, ChangeEvent } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface InputFieldProps {
  label?: string;
  asterisk?: boolean;
  id?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ComponentType<{ size: number; color: string }>;
  gray?: boolean;
  errorMessage?: string;
  fieldName?: string;
  iconUrl?: string;
  [rest: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label = "",
  id = "",
  type = "text",
  placeholder = "",
  // value,
  onChange,
  icon: IconComponent,
  gray,
  asterisk,
  fieldName,
  register,
  registerName,
  validation,
  defaultValidation,
  errors,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleToggle = () => setShowPassword((prev) => !prev);

  return (
    <div className={`mb-4 ${fieldName}`}>
      {label && (
        <div className="flex">
          <label
            htmlFor={id}
            className="block mb-2.5 text-[16px] font-[500] text-black leading-[140%] tracking-[0%] font-[Geist]"
          >
            {label}
          </label>
          {asterisk && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          {...(register && registerName
            ? register(registerName, validation || defaultValidation)
            : {})}
          className="w-full h-[50px] bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] px-4 font-[Geist] text-[16px] font-normal text-[#1A1A1A] placeholder:text-gray-500 focus:outline-none"
          {...rest}
        />

        {IconComponent && !isPassword && (
          <div className="absolute right-3 top-[50%] transform -translate-y-1/2 cursor-pointer">
            <IconComponent size={18} color="#25252580" />
          </div>
        )}

        {isPassword && (
          <div className="absolute right-3 top-[50%] transform -translate-y-1/2 cursor-pointer">
            {showPassword ? (
              <IoEyeOutline size={18} onClick={handleToggle} color="#292D32" />
            ) : (
              <IoEyeOffOutline
                size={18}
                onClick={handleToggle}
                color="#292D32"
              />
            )}
          </div>
        )}
      </div>
      {errors?.[registerName] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[registerName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputField;
