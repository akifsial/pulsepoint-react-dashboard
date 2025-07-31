import { useGetNotifications } from "@src/hooks/useCommunity";
import React from "react";
import { v4 as uuid } from "uuid";
const NotificationDropdown: React.FC = () => {
  const dropdownOptions = [
    { id: uuid, name: "5 Star Rating", value: "5" },
    { id: uuid, name: "4 Star Rating", value: "4" },
    { id: uuid, name: "3 Star Rating", value: "3" },
    { id: uuid, name: "2 Star Rating", value: "2" },
    { id: uuid, name: "1 Star Rating", value: "1" },
  ];


  return (
    <div style={{ boxShadow: "0px 4px 5.7px 0px #00000040" }}>
      {dropdownOptions.map((item: any) => {
        return (
          <div key={item.id}>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none">
              <p className="text-[#252525] text-sm font-medium">{item.name}</p>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationDropdown;
