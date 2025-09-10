import React from "react";

const User = ({data}) => {
  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="flex flex-wrap justify-between font-normal items-center mb-2 md:gap-10 gap-3 text-base">
         
           <span className="w-fit text-[#252525]/50">
            {item.label}
          </span>
         
           <span className="w-fit text-[15px] md:text-end text-start font-medium text-[#252525]">{item.value}</span>
         </div>
      ))}
    </>
  );
};

export default User;
