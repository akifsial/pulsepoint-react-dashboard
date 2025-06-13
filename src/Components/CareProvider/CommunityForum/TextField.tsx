import React from 'react';

const TextField = ({
  label,
  id,
  asterisk,
  placeholder,
  row = 3,
  className = "",
}) => {
  return (
    <>
      <div className="flex items-center gap-1 mb-1">
        <label
          htmlFor={id}
          className="block text-[16px] font-medium text-black leading-[140%] tracking-[0%] font-[Geist]"
        >
          {label}
        </label>
        {asterisk && <span className="text-red-500">*</span>}
      </div>

      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        rows={row}
        className={`w-full bg-[#FBFCFD] border border-[#2525251A] rounded-[8px] p-[15px] text-[16px] font-medium text-[#1A1A1A] leading-[140%] tracking-[0%] placeholder:text-[#25252580] focus:outline-none ${className}`}
      />
    </>
  );
};

export default TextField;
