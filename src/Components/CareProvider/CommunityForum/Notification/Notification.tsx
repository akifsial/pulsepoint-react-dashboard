import React, { useState } from "react";
import NewMember from "../../../../assets/media/svgs/dashboard-svgs/newMember.svg"
import Progress from "../../../../assets/media/svgs/dashboard-svgs/progress.svg"
import Resource from "../../../../assets/media/svgs/dashboard-svgs/resource.svg"
import NewCode from "../../../../assets/media/svgs/dashboard-svgs/newcode.svg";

const Notfication = () => {
      const [activeTab, setActiveTab] = useState("notification");
  const notifications = [
    {
      icon: NewMember,
      message: "A new member, @DevGuru, just joined the forum.",
    },
    {
      icon: Progress,
      message: "You’ve reached 10,000 total forum posts this month!",
    },
    {
      icon: Resource,
      message: "New topic created: “Best resources for first-time moderators”",
    },
    {
      icon: NewCode,
      message: "A post by @BookLover123 was flagged for inappropriate content in General Discussion.",
    },
  ];

  return (
    <>
  <h2 className="mb-5">Notifications</h2>
         <div className="bg-white p-5 rounded-[10px] h-[607px]">

  <div className="flex mb-2.5 border-b-2 border-b-[#007AB2] w-[426px]">
        {["notification", "all"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-base font-medium px-8 py-[11.5px] w-[213px] transition-all text-[#007AB2] ${
              activeTab === tab ? "bg-[#E9F2F6] " : "bg-white  cursor-pointer"
            }`}
          >
            {tab === "notification" ? "New Notifications" : "All Notifications"}
          </button>
        ))}
      </div>

          {notifications.map((item, index) => (
            <div
              key={index}
              className="relative py-3.5 flex items-center gap-2.5 font-medium leading-5.5 text-base mb-2.5 last:mb-0"
            >
                <img src={item.icon} alt="Like" className="rounded-[5px] h-9 w-9 object-cover"/>
            
              <p>
                {item.message}
                <span className="block text-xs text-[#252525]/20">
                  2 Hours ago
                </span>
              </p>
            </div>
          ))}
    </div>
    </>
 
  );
};

export default Notfication;
