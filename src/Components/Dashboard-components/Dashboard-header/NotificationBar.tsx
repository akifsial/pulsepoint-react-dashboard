import React from "react";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import Like from "../../../assets/media/svgs/dashboard-svgs/Like.svg";
import NewCode from "../../../assets/media/svgs/dashboard-svgs/newcode.svg";
import Msg from "../../../assets/media/svgs/dashboard-svgs/msg.svg";
import Hill from "../../../assets/media/svgs/dashboard-svgs/hill.svg";
import { useGetNotifications } from "@src/hooks/useCommunity";
import dayjs from "dayjs";

const NotficationBar = ({ noticationLink }) => {
  const notifications = [
    {
      icon: Like,
      message:
        "Your review for “Sunnyvale Nursing Home” has been submitted successfully.",
    },
    {
      icon: NewCode,
      message:
        "New care providers added near your zip code (94107) – explore them now.",
    },
    {
      icon: Msg,
      message:
        "Dr. Angela Brooks replied to your question in the Community Forum.",
    },
    {
      icon: Hill,
      message:
        "“Greenhill Rehab Center” has received a new 5-star rating – check it out now!",
    },
  ];

  const { data } = useGetNotifications();
  console.log("data notifiy", data);

  return (
    <div className="border h-[300px]  border-[#2525251A] bg-white rounded-xl shadow-[0_0_8.9px_0_rgba(0,0,0,0.25)] w-[414px]">
      <div className="px-5  py-[17px]">
        <h4 className="font-semibold">Notifications</h4>
      </div>

      <div className="border-t h-[200px] overflow-y-scroll border-t-[#D5D7DA] p-4">
        {data?.records && data.records.length > 0 ? (
          data.records.map((item, index) => (
            <div
              key={index}
              className="relative py-[11px] flex items-center gap-2.5 font-medium leading-5.5 text-sm mb-[5px] last:mb-0"
            >
              <img
                src={Like}
                alt="Like"
                className="rounded-[5px] h-9 w-9 object-cover"
              />
              <p>
                {item.message}
                <span className="block absolute right-0 top-[20%] text-right text-xs text-[#252525]/40">
                  {dayjs(item?.created_at).format("h:mm A")}
                </span>
              </p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-sm py-10">
            No notifications found.
          </div>
        )}
      </div>

      <div className="text-[#006EFF] font-medium text-[15px] bg-[#FAFAFA] border-t border-t-[#D5D7DA] flex justify-center items-center gap-2 p-[13px] rounded-b-xl rounded-bl-xl">
        <Link to={noticationLink}>View All Messages</Link>
        <IoArrowForward size={18} color="#006EFF" />
      </div>
    </div>
  );
};

export default NotficationBar;
