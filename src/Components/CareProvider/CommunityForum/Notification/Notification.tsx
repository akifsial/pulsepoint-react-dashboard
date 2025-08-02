import React, { useState } from "react";
import NewMember from "../../../../assets/media/svgs/dashboard-svgs/newMember.svg";
import Progress from "../../../../assets/media/svgs/dashboard-svgs/progress.svg";
import Resource from "../../../../assets/media/svgs/dashboard-svgs/resource.svg";
import NewCode from "../../../../assets/media/svgs/dashboard-svgs/newcode.svg";
import dayjs from "dayjs";
import { useGetNotifications } from "@src/hooks/useCommunity";

const fallbackIcons = [NewMember, Progress, Resource, NewCode];

const Notfication = () => {
  const [activeTab, setActiveTab] = useState<"notification" | "all">("notification");

  const { data, isLoading } = useGetNotifications();

  const allNotifications = data?.records || [];

  const newNotifications = allNotifications.slice(0, 4);

  const notificationsToShow = activeTab === "notification" ? newNotifications : allNotifications;

  return (
    <>
      <h2 className="mb-5">Notifications</h2>
      <div className="bg-white p-5 rounded-[10px] h-[607px]">
        {/* Tabs */}
        <div className="flex mb-2.5 border-b-2 border-b-[#007AB2] w-[426px]">
          {["notification", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "notification" | "all")}
              className={`text-base font-medium px-8 py-[11.5px] w-[213px] transition-all text-[#007AB2] ${
                activeTab === tab ? "bg-[#E9F2F6]" : "bg-white cursor-pointer"
              }`}
            >
              {tab === "notification" ? "New Notifications" : "All Notifications"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-scroll h-[510px] pr-2">
          {isLoading ? (
            <p className="text-sm text-gray-500 text-center mt-10">Loading...</p>
          ) : notificationsToShow.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-10">
              No notifications found.
            </p>
          ) : (
            notificationsToShow.map((item, index) => (
              <div
                key={index}
                className="relative py-3.5 flex items-center gap-2.5 font-medium leading-5.5 text-base mb-2.5 last:mb-0"
              >
                <img
                  src={fallbackIcons[index % fallbackIcons.length]}
                  alt="Icon"
                  className="rounded-[5px] h-9 w-9 object-cover"
                />
                <p>
                  {item.message}
                  <span className="block text-xs text-[#252525]/40">
                    {dayjs(item?.created_at).format("h:mm A")}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Notfication;
