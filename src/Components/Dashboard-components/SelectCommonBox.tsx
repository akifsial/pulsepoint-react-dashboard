import React from "react";
import { ChevronDown } from "lucide-react";

type OptionType = {
  label: string;
  value: string | number;
};

type SelectCommonBoxProps = {
  label?: string;
  options: OptionType[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  disabled?: boolean;
  placeholder?: string;
};

const SelectCommonBox: React.FC<SelectCommonBoxProps> = ({
  label,
  options,
  value,
  onChange,
  className = "",
  selectClassName = "",
  labelClassName = "",
  wrapperClassName = "",
  disabled = false,
  placeholder = "Select an option",
}) => {
  return (
    <div className={`relative ${wrapperClassName}`}>
      {label && (
        <label className={`block mb-1 text-sm font-medium ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className={`relative`}>
        <select
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none pr-10 pl-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${selectClassName} ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Lucide dropdown icon */}
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default SelectCommonBox;
