import React from 'react';

const TextField = ({
  label,
  id,
  asterisk,
  placeholder,
  row = 3,
  className = "",
  onChange
}) => {
  return (
    <>
      <div className="flex items-center mb-2.5">
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
        className={`w-full h-[50px] rounded-[8px] px-[15px] bg-[#FBFCFD] border border-[#2525251A] font-[Geist] py-2.5 font-normal text-[16px] leading-[140%] text-[#1A1A1A] mb-1 focus:outline-none placeholder:text-sm placeholder:font-medium ${className}`}
        onChange={onChange}
      />
    </>
  );
};

export default TextField;
