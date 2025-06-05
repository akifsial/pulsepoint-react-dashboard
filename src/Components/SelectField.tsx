import React, { ChangeEvent } from "react";

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
  icon: IconComponent,
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
            className="block mb-1 text-[16px] font-[500] text-black leading-[140%] tracking-[0%] font-[Geist]"
          >
            {label}
          </label>
          {asterisk && <span className="text-red-500">*</span>}
        </div>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ${gray ? 'bg-gray-100' : ''}`}
          {...rest}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black">
          {IconComponent && <IconComponent size={18} color="#292D32" />}
        </div>
      </div>
      {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default SelectField;
