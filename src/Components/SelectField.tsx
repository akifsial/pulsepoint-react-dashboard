import React, { ChangeEvent } from "react";
import { IoIosArrowDown } from "react-icons/io";

// Defining types for the component props
interface SelectFieldProps {
  label?: string;
  asterisk?: boolean;
  id?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  icon?: React.ComponentType<{ size: number; color: string }>;
  gray?: boolean;
  errorMessage?: string;
  [rest: string]: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label = "",
  id = "",
  value,
  onChange,
  options,
  asterisk,
  gray,
  errorMessage,
  ...rest
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <div className="flex">
          <label
            htmlFor={id}
            className="block mb-1 text-[14px] font-[400] text-[#252525] leading-[1.08] tracking-[0%] align-bottom font-[Geist]"
          >
            {label}
          </label>
          {asterisk && (
            <span className="text-red-500 font-medium text-[16px] leading-[140%] tracking-normal font-geist relative top-[-1px]">
              *
            </span>
          )}{" "}
        </div>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`py-3 px-4 border border-[#252525B2] rounded-[8px] bg-[#FBFCFD] w-full h-[50px] ${
            gray ? "bg-gray-100" : ""
          } appearance-none`}
          {...rest}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black">
          {/* Render the custom icon (React Icon) */}
          <IoIosArrowDown />
        </div>
      </div>
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default SelectField;
