import React, { useState, useEffect } from "react";
import NewMember from "../../../../assets/media/svgs/dashboard-svgs/newMember.svg";
import Progress from "../../../../assets/media/svgs/dashboard-svgs/progress.svg";
import Resource from "../../../../assets/media/svgs/dashboard-svgs/resource.svg";
import NewCode from "../../../../assets/media/svgs/dashboard-svgs/newcode.svg";
import dayjs from "dayjs";
import { useGetNotifications } from "@src/hooks/usecommunity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiAcceptPrivateCommunity } from "@src/api/apicommunityforum";
import toast from "react-hot-toast";

const fallbackIcons = [NewMember, Progress, Resource, NewCode];

const Notification = () => {
  const [activeTab, setActiveTab] = useState<"notification" | "all">(
    "notification"
  );
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);


  const dummyNotifications = [
    {
      id: 1,
      message: "Your request to join ‘UK Health Support Group’ was approved 🎉",
      created_at: "2025-10-06T10:15:00Z",
      member_id: "m001",
    },
    {
      id: 2,
      message:
        "Dr. Smith mentioned you in a discussion on ‘Cardiac Care Updates’ ❤️",
      created_at: "2025-10-06T09:42:00Z",
    },
    {
      id: 3,
      message: "You have 3 new messages in ‘Mental Health Awareness’ group 💬",
      created_at: "2025-10-06T08:22:00Z",
    },
    {
      id: 4,
      message: "Your post ‘Nutrition Tips for Elderly’ got 12 new replies 🥗",
      created_at: "2025-10-05T21:55:00Z",
    },
    {
      id: 5,
      message: "A new community ‘UK Nurses Hub’ has been created 🏥",
      created_at: "2025-10-04T18:10:00Z",
    },
    {
      id: 6,
      message: "Weekly report: You gained 14 new followers 👥",
      created_at: "2025-10-03T14:35:00Z",
    },
  ];



  const { data, isLoading } = useGetNotifications({ page, limit: 5 });

useEffect(() => {
  if (data?.records) {
    setNotifications((prev) => [...prev, ...data.records]);
    setTotalPages(data.totalPages);
  } else {
    setNotifications(dummyNotifications);
    setTotalPages(1);
  }
}, [data]);



  const queryClient = useQueryClient();
  const { mutateAsync: acceptCommunity } = useMutation({
    mutationFn: ({ memberId, status }) =>
      ApiAcceptPrivateCommunity(memberId, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["useGetNotifications"]);
      if (data?.record?.status === "APPROVED")
        toast.success("Request Accepted!");
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
      <h2 className="mb-5 space-grotesk text-[25px] font-bold">
        Notifications
      </h2>
      <div className="bg-white p-5 rounded-[10px] h-[607px]">
        <div className="flex flex-wrap md:justify-start justify-center mb-2.5 border-b-2 border-b-[#007AB2]">
          {["notification", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "notification" | "all")}
              className={`cursor-pointer text-base font-medium px-8 py-[11.5px] w-[213px] transition-all text-[#007AB2] ${
                activeTab === tab ? "bg-[#E9F2F6]" : "bg-white cursor-pointer"
              }`}
            >
              {tab === "notification"
                ? "New Notifications"
                : "All Notifications"}
            </button>
          ))}
        </div>

        <div className="overflow-y-scroll h-[510px] pr-2">
          {isLoading && page === 1 ? (
            <p className="text-sm text-gray-500 text-center mt-10">
              Loading...
            </p>
          ) : notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-10">
              No notifications found.
            </p>
          ) : (
            <>
              {activeTab === "notification" &&
                notifications
                  .slice(0, 4)
                  .map((item, index) => renderNotification(item, index))}

              {activeTab === "all" && (
                <>
                  {notifications.map((item, index) =>
                    renderNotification(item, index)
                  )}
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
