import React, { useEffect } from "react";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import Like from "../../../assets/media/svgs/dashboard-svgs/Like.svg";
import NewCode from "../../../assets/media/svgs/dashboard-svgs/newcode.svg";
import Msg from "../../../assets/media/svgs/dashboard-svgs/msg.svg";
import Hill from "../../../assets/media/svgs/dashboard-svgs/hill.svg";
import dayjs from "dayjs";
import { useGetNotifications } from "@src/hooks/usecommunity";
import Spinner from "@components/loaders/spinner";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "@components/Buttons/primarybutton";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiAcceptPrivateCommunity } from "@src/api/apicommunityforum";
import { useMeApi } from "@src/hooks/useusers";

const NotficationBar = ({ noticationLink }) => {
  const navigate = useNavigate();

  const { data: MeData, refetch: MeDataFetch } = useMeApi(navigate);

  useEffect(() => {
    MeDataFetch();
  });

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

  const { data, isLoading } = useGetNotifications();

  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role_type;
  const queryClient = useQueryClient();

  const {
    mutateAsync: savedCareProvidersMutation,
    isPending: savedCareProvidersPending,
  } = useMutation({
    mutationFn: ({ memberId, status }) =>
      ApiAcceptPrivateCommunity(memberId, status),

    onSuccess: async (data) => {
      queryClient.invalidateQueries(["useGetNotifications"]); 
      if (data?.record?.status == "APPROVED") {
        toast.success("Request Accepted!");
      } else {
        toast.success("Request Declined!");
      }
    },
    onError: (error) => {
    },
  });

  const handleAcceptPrivateCommunity = async (memberId, status) => {
    await savedCareProvidersMutation({ memberId, status });
  };

  return (
    <div className="border h-[300px] notificationBar border-[#2525251A] bg-white rounded-xl shadow-[0_0_8.9px_0_rgba(0,0,0,0.25)] md:w-[414px] w-[280px]">
      <div className="px-5  py-[17px]">
        <h4 className="font-semibold">Notifications</h4>
      </div>

      <div className="border-t h-[200px] overflow-y-scroll border-t-[#D5D7DA] px-2 py-4 md:p-4">
        {isLoading ? (
          <div className="text-center text-gray-500 text-sm py-10">
            Loading Notifications...
          </div>
        ) : data?.records && data.records.length > 0 ? (
          data.records.map((item, index) => (
            <div
              key={index}
            >
              <div
                onClick={() =>
                  userRole == "PATIENT"
                    ? navigate("/patient/notification")
                    : userRole == "CARE_PROVIDER"
                    ? navigate("/care-provider/notification")
                    : navigate("/admin/notification")
                }
                className="flex md:justify-start justify-between md:items-center gap-2 md:gap-4.5 mb-3"
              >
                <img
                  src={Like}
                  alt="Like"
                  className="rounded-[5px] md:mt-0 mt-1.5 md:h-9 h-6 w-6 md:w-9 object-cover"
                />
                <p className="flex justify-between flex-col w-[270px]">
                  <p className="md:pr-0 text-[12px] md:text-[14px] pr-20">{item.message}</p>
              
                </p>
                
              </div>
              {item?.member_id ? (
                <div className="flex pl-12 bg-red-500 gap-[8px]">
                  <button
                    onClick={(e) =>{
                      e.stopPropagation(); 
                      handleAcceptPrivateCommunity(item?.member_id, "APPROVED");
                    }}
                    className="flex items-center cursor-pointer justify-center text-white !mt-3 bg-[#2291E3] text-[12px] !w-[70px] !h-[30px] !rounded-[6px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.414a1 1 0 011.414-1.414l4.222 4.222 6.657-6.657a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() =>
                      handleAcceptPrivateCommunity(item?.member_id, "DECLINED")
                    }
                    className="flex items-center cursor-pointer justify-center text-white !mt-3 bg-red-600 text-[12px] !w-[70px] !h-[30px] !rounded-[6px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-sm py-10">
            No notifications found.
          </div>
        )}
      </div>

      <div
        onClick={() =>
          userRole == "PATIENT"
            ? navigate("/patient/notification")
            : userRole == "CARE_PROVIDER"
            ? navigate("/care-provider/notification")
            : navigate("/admin/notification")
        }
        className="cursor-pointer text-[#006EFF] font-medium text-[15px] bg-[#FAFAFA] border-t border-t-[#D5D7DA] flex justify-center items-center gap-2 p-[13px] rounded-b-xl rounded-bl-xl"
      >
        View all notifications
        <IoArrowForward size={18} color="#006EFF" />
      </div>
    </div>
  );
};

export default NotficationBar;
