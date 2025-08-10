import React, { useState } from "react";
import NewMember from "../../../../assets/media/svgs/dashboard-svgs/newMember.svg";
import Progress from "../../../../assets/media/svgs/dashboard-svgs/progress.svg";
import Resource from "../../../../assets/media/svgs/dashboard-svgs/resource.svg";
import NewCode from "../../../../assets/media/svgs/dashboard-svgs/newcode.svg";
import dayjs from "dayjs";
import { useGetNotifications } from "@src/hooks/useCommunity";

const fallbackIcons = [NewMember, Progress, Resource, NewCode];

const Notification = () => {
  const [activeTab, setActiveTab] = useState<"notification" | "all">("notification");

  const [page, setPage] = useState(1); // current page for API
  const [notifications, setNotifications] = useState([]); // accumulated notifications
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading } = useGetNotifications({ page, limit: 5 });

  // Append new records whenever page changes
  React.useEffect(() => {
    if (data?.records) {
      setNotifications((prev) => [...prev, ...data.records]);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const handleShowMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const newNotifications = notifications.slice(0, 4);
  const notificationsToShow = activeTab === "notification" ? newNotifications : notifications;

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
          {isLoading && page === 1 ? (
            <p className="text-sm text-gray-500 text-center mt-10">Loading...</p>
          ) : notificationsToShow.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-10">
              No notifications found.
            </p>
          ) : (
            <>
              {notificationsToShow.map((item, index) => (
                <div
                  key={item.id || index}
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
              ))}

              {/* Show More Button */}
              {activeTab === "all" && page < totalPages && (
                <div className="text-center mt-4">
                  <button
                    onClick={handleShowMore}
                    className="text-[#007AB2] cursor-pointer font-medium text-sm"
                  >
                    {isLoading ? "Loading..." : "Show More Notifications"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
