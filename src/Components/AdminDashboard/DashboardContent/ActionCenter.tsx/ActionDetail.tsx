import React from "react";
import tick from "@assets/media/svgs/tickcircle.svg"

const notifications = [
  {
    icon: tick,
    text: "Profile update approved for Dr. Susan Blake at CareWell",
    title: "02:32 PM (10/4/2025)",
  },
  {
    icon: tick,
    text: "New review flagged for review at Serenity Hospice",
    title: "02:32 PM (09/4/2025)",
  },
  {
    icon: tick,
    text: "Content update request submitted by Sunrise Medical Group",
    title: "02:32 PM (10/4/2025)",
  },
  {
     icon: tick,
    text: "Plan upgrade request received from Harmony Dialysis Center",
    title: "02:32 PM (10/4/2025)",
  },
];


const ActionDetail = () => {
  return (
    <div >
      {notifications.map((item, index) => (
        <div key={index} className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 text-[14px] font-normal font-giest leading-5 max-w-[292px] ">
            <img src={item.icon} alt="icon" className="w-5 relative top-1.5"/>
            <p>{item.text}</p>
          </div>
          <span className="text-[12px] font-medium font-giest text-[#252525] rounded-[9px] bg-[#F4FAFF] p-2">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default ActionDetail;
