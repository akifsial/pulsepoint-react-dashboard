import React, { ChangeEvent } from "react";
import { IoIosArrowDown } from "react-icons/io";

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
  className,
  optionsClass,
  asterisk,
  gray,
  selectName,
  iconClass,
  errorMessage,
  ...rest
}) => {
  const currentValue = value || (options?.length > 0 ? options[0]?.value : "");

  return (
    <div className={`mb-4 ${selectName}`}>
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
        <select
          id={id}
          value={currentValue}
          onChange={onChange}
          className={`w-full h-[50px] bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] p-[15px] font-[Geist] ${className} text-[16px] font-normal text-[#1A1A1A] leading-[140%] tracking-[0%] placeholder:text-gray-500 focus:outline-none ${
            gray ? "bg-gray-100" : ""
          } appearance-none`}
          {...rest}
        >
          {options?.map((option) => (
            <option key={option.value} className={`${optionsClass}`} value={option.value}>
              {option?.label}
            </option>
          ))}
        </select>


        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
  {id === "status" ? (
    <IoIosArrowDown
      className={`${value === "ACTIVE" ? "text-[#067647]" : "text-red-500"}`}
    />
  ) : (
    <IoIosArrowDown className="text-gray-500" />
  )}
</div>

      </div>

      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default SelectField;
