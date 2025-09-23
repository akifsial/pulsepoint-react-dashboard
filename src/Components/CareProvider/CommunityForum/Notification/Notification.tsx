

import React, { useState, useEffect } from "react";
import NewMember from "../../../../assets/media/svgs/dashboard-svgs/newMember.svg";
import Progress from "../../../../assets/media/svgs/dashboard-svgs/progress.svg";
import Resource from "../../../../assets/media/svgs/dashboard-svgs/resource.svg";
import NewCode from "../../../../assets/media/svgs/dashboard-svgs/newcode.svg";
import dayjs from "dayjs";
import { useGetNotifications } from "@src/hooks/useCommunity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiAcceptPrivateCommunity } from "@src/api/ApiCommunityForum";
import toast from "react-hot-toast";

const fallbackIcons = [NewMember, Progress, Resource, NewCode];

const Notification = () => {
  const [activeTab, setActiveTab] = useState<"notification" | "all">("notification");
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading } = useGetNotifications({ page, limit: 5 });

  useEffect(() => {
    if (data?.records) {
      setNotifications((prev) => [...prev, ...data.records]);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const queryClient = useQueryClient();
  const { mutateAsync: acceptCommunity } = useMutation({
    mutationFn: ({ memberId, status }) => ApiAcceptPrivateCommunity(memberId, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["useGetNotifications"]);
      if (data?.record?.status === "APPROVED") toast.success("Request Accepted!");
      else toast.success("Request Declined!");
    },
  });

  const handleAction = (memberId: string, status: "APPROVED" | "DECLINED") => {
    acceptCommunity({ memberId, status });
  };

  const renderNotification = (item: any, index: number) => (
    <div
      key={item.id || index}
      className="relative py-3.5 flex items-center gap-2.5 font-medium text-base mb-2.5 last:mb-0"
    >
      <img
        src={fallbackIcons[index % fallbackIcons.length]}
        alt="Icon"
        className="rounded-[5px] h-9 w-9 object-cover"
      />
      <div className="flex flex-col items-start">
        <p>
          {item.message}
          <span className="block text-xs text-[#252525]/40">
            {dayjs(item?.created_at).format("h:mm A")}
          </span>
        </p>

        {item?.member_id && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleAction(item.member_id, "APPROVED")}
              className="flex cursor-pointer items-center justify-center text-white bg-[#2291E3] text-[12px] w-[70px] h-[30px] rounded-[6px]"
            >
              ✔
            </button>
            <button
              onClick={() => handleAction(item.member_id, "DECLINED")}
              className="flex cursor-pointer items-center justify-center text-white bg-red-600 text-[12px] w-[70px] h-[30px] rounded-[6px]"
            >
              ✖
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <h2 className="mb-5 space-grotesk text-[25px] font-bold">Notifications</h2>
      <div className="bg-white p-5 rounded-[10px] h-[607px]">
        {/* Tabs */}
        <div className="flex flex-wrap md:justify-start justify-center mb-2.5 border-b-2 border-b-[#007AB2]">
          {["notification", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "notification" | "all")}
              className={`cursor-pointer text-base font-medium px-8 py-[11.5px] w-[213px] transition-all text-[#007AB2] ${
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
          ) : notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-10">No notifications found.</p>
          ) : (
            <>
              {activeTab === "notification" &&
                notifications.slice(0, 4).map((item, index) =>
                  renderNotification(item, index)
                )}

              {activeTab === "all" && (
                <>
                  {notifications.map((item, index) => renderNotification(item, index))}
                  {page < totalPages && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="text-[#007AB2] cursor-pointer font-medium text-sm"
                      >
                        {isLoading ? "Loading..." : "Show More Notifications"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
