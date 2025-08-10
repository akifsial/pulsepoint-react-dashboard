import React from "react";

const User = ({data}) => {
  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="md:flex font-normal items-center mb-2 gap-4 text-base">
         
           <span className="min-w-[248px] text-[#252525]/50 md:mr-0 mr-2">
            {item.label}
          </span>
         
           <span className="text-[15px] font-medium text-[#252525]">{item.value}</span>
         </div>
      ))}
    </>
  );
};

export default User;
