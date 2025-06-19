import React from "react";

const User = ({data}) => {
  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="flex items-center mb-2 text-sm">
          <span className="min-w-[130px] text-[rgba(37, 37, 37, 0.5)]">
            {item.label}
          </span>
          <span className="text-[15px] font-medium text-[#252525]">{item.value}</span>
        </div>
      ))}
    </>
  );
};

export default User;
