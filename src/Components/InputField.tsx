import React, { useState, ChangeEvent } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

// Defining types for the component props
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
  [rest: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label = "",
  id = "",
  type = "text",
  placeholder = "",
  value,
  onChange,
  icon: IconComponent,
  gray,
  asterisk,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full mb-4">
      {label && (
        <div className="flex">
          <label
            htmlFor={id}
            className="block mb-1 text-[16px] font-[500] text-black leading-[140%] tracking-[0%] font-[Geist]"
          >
            {label}
          </label>
          {asterisk && (
            <span className="text-red-500 font-medium text-[16px] leading-[140%] tracking-normal font-geist relative top-[-1px]">
              *
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full h-[50px] bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] p-[15px] flex justify-between items-center font-[Geist] text-[16px] font-medium text-[#1A1A1A] leading-[140%] tracking-[0%] placeholder:text-gray-500 focus:outline-none"
          {...rest}
        />
        <div className="absolute right-3 top-1/2 flex justify-center items-center transform -translate-y-1/2 cursor-pointer text-black">
          {isPassword ? (
            showPassword ? (
              <IoEyeOutline size={18} onClick={handleToggle} color="#292D32" />
            ) : (
              <IoEyeOffOutline
                size={18}
                onClick={handleToggle}
                color="#292D32"
              />
            )
          ) : (
            IconComponent && <IconComponent size={18} color="#292D32" /> // Render the icon dynamically
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
