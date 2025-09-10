// import React from "react";
// import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa"; // Correct icon imports

// const TopBar: React.FC = () => {
//   const userInfo=JSON.parse(localStorage.getItem("userInfo"))
//   return (
//     <div className="bg-[#2DB3FF] text-white text-sm py-2">
//       <div className=" mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//         <span className="">User Name : {userInfo?.user_name}</span>
//         <span className="font-geist font-normal text-[16px] leading-[24px] tracking-normal">
//           {new Date().toLocaleDateString("en-US", {
//             weekday: "long",
//             month: "long",
//             day: "2-digit",
//             year: "numeric",
//           })}
//         </span>

//         {/* <div className="flex space-x-3" style={{ width: '100%', height: '24px', position: 'absolute', top: '13px', left: '1191px' }}>
//           <FaFacebook className="h-4 w-4 cursor-pointer hover:opacity-80" />
//           <FaLinkedin className="h-4 w-4 cursor-pointer hover:opacity-80" />
//           <FaInstagram className="h-4 w-4 cursor-pointer hover:opacity-80" />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default TopBar;


import React from "react";
// import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa"; // Correct icon imports
import linkedin from "@assets/media/svgs/basil_linkedin-solid.svg"
import instagram from "@assets/media/svgs/line-md_instagram.svg"
import facebook from "@assets/media/svgs/ri_facebook-fill.svg"

const TopBar: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userRole = userInfo?.role_type;
  const isAuthenticated = !!userRole; // agar koi role hai to logged in maana

return (
    <div className="bg-[#2DB3FF] px-4 py-4 lg:px-8 flex justify-between w-full items-center text-white text-sm h-[40px]">
      <div className="w-full  flex justify-between items-center">
        {/* Left side (username if logged in and not admin) */}
        {isAuthenticated && userRole !== "ADMIN" && (
          <span>User Name : {userInfo?.user_name}</span>
        )}

        {/* Middle (Date) */}
        <span className="font-geist font-normal md:block hidden text-[16px] leading-[24px] tracking-normal">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </span>

        {/* Right side (Social icons) */}
        <div className="flex space-x-3">
          <img src={facebook} className="cursor-pointer w-[24px] h-[24px]" alt="" />
          <div className="border-r h-[11px] my-auto" />
          <img src={linkedin} className="w-[24px] cursor-pointer h-[24px]" alt="" />
          <div className="border-r h-[11px] my-auto" />
          <img src={instagram} className="w-[24px] h-[24px] cursor-pointer" alt="" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
