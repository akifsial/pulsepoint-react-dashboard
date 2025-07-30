import { useState } from "react";
import backArrow from "@assets/media/svgs/dashboard-svgs/arrow-left.svg";
import communityBg from "@assets/media/images/dashboard-images/community-bg.png";
import topSenior from "@assets/media/images/dashboard-images/topSernior.jpg";
import Calender from "@assets/media/svgs/dashboard-svgs/calendar.svg";
import Global from "@assets/media/svgs/dashboard-svgs/global.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import addCommunity from "@assets/media/svgs/dashboard-svgs/addCommunity.svg";
import OurFeed from "./OurFeed";
import Model from "@components/Model/Model";
// import CreatePost from "./Notification/Notification";
import CreatePost from "./BackFeed/CreatePost";
import PatientInfo from "@components/CareProvider/PatientInfo";
import { useGetSpecificCommunity } from "@src/hooks/useCommunity";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiJoinCommunity } from "@src/api/ApiCommunityForum";
import toast from "react-hot-toast";
import LeaveCommunityModal from "@components/Model/LeaveCommunityModal";

const CommunityAccount = ({ setOpenBackFeed }) => {
  const [joined, setJoined] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState();

  const handleJoinClick = () => setJoined(true);
  const handleAddCommunityClick = () => setJoined(false);

  const { id } = useParams();
  const { data } = useGetSpecificCommunity(id ?? "");

  const queryClient = useQueryClient();

  const {
    mutateAsync: communityJoinMutation,
    isPending: isPendingCommunityJoin,
  } = useMutation({
    mutationFn: (data) => ApiJoinCommunity(data),

    onSuccess: async () => {
      setIsLeaveModalOpen(false);
      queryClient.invalidateQueries(["useGetSpecificCommunity"]); // refetch list
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleJoinCommunity = async () => {
    // if (isLeaveModalOpen==false) {
    //   return setIsLeaveModalOpen(true)
    // }
    const data1 = {
      community_id: id,
    };

    await communityJoinMutation(data1);
  };

  return (
    <>
      {!showPatientInfo ? (
        <div className="mb-[25px]">
          {/* Fixed header */}
          <div
            className="flex items-center gap-2.5 cursor-pointer px-5 py-4 bg-transparent sticky top-0 z-10"
            onClick={() => setOpenBackFeed(false)}
          >
            <img src={backArrow} alt="backArrow" />
            <h2 className="text-xl font-semibold text-[#252525] font-[Space Grotesk]">
              Back to Feed
            </h2>
          </div>

          {/* Scrollable content area */}
          <div
            className="h-[603px] overflow-y-scroll pr-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Hide scrollbar in WebKit browsers */}
            <style jsx>{`
              ::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <div className="rounded-xl bg-white mb-[14px]">
              <div
                className="h-[147px] relative"
                style={{
                  backgroundImage: `url(${communityBg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              <div className="relative">
                <div className="absolute w-[101px] bottom-[-50px] left-6">
                  <img
                    src={topSenior}
                    className="w-24 h-24 rounded-full object-cover border border-gray-200 shadow-[0_0_0_5px_white]"
                    alt="topSenior"
                  />
                  <span className="absolute bottom-2 right-3 w-4 h-4 bg-[#52C343] rounded-full shadow-[0_0_0_6px_white]" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-[75px] pb-5 px-5">
                <div className="max-w-[535px]">
                  <h2
                    className="text-xl font-semibold text-[#252525] font-[Space Grotesk] mb-2 cursor-pointer"
                    onClick={() => setShowPatientInfo(true)}
                  >
                    {data?.title}
                  </h2>
                  <div className="flex gap-3.5 mb-2">
                    <div className="flex gap-0.5">
                      <img src={Calender} alt="" />
                      <p>Create Post</p>
                    </div>
                    <div className="flex gap-0.5">
                      <img src={Global} alt="" />
                      <p>Public</p>
                    </div>
                  </div>
                  <p>{data?.description}</p>
                </div>

                <div className="pl-10 border-l border-l-black">
                  <div className="flex items-center mb-4">
                    <div className="pr-6">
                      <p>
                        <b>{data?.member_count}</b>
                      </p>
                      <p>Members</p>
                    </div>
                    <div className="pl-6 border-l border-black/20">
                      <p>
                        <b>20K</b>
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-[#52C343] rounded-full"></span>
                        Online
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    {data?.is_joined ? (
                      <PrimaryButton
                        btnText="Create Post"
                        showImg={true}
                        img={addCommunity}
                        imgClass="w-[19px] h-[19px] object-cover"
                        imgPosition="left"
                        btnClass="border-1 border-[#000] w-fit h-[46px] !rounded-[10px] !px-4 py-[10px] text-sm text-[#252525] font-semibold leading-[33px] gap-2 flex items-center justify-center"
                        onClick={() => setShowCreatePostModal(true)}
                      />
                    ) : (
                      ""
                    )}

                    {data?.is_joined ? (
                      <PrimaryButton
                        btnText="Leave Community"
                        showImg={false}
                        btnClass="w-[142px] h-[46px] !rounded-[10px] border border-black bg-[#252525] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
                        onClick={() =>
                          data?.is_joined == true
                            ? setIsLeaveModalOpen(true)
                            : handleJoinCommunity
                        }
                      />
                    ) : (
                      <PrimaryButton
                        btnText="Join Community"
                        showImg={false}
                        btnClass="w-fit h-[46px] !rounded-[10px] bg-[#007AB2] !px-4 py-[10px] text-sm text-white font-semibold leading-[33px] gap-2 flex items-center justify-center"
                        onClick={handleJoinCommunity}
                      />
                    )}
                    <LeaveCommunityModal
                      loading={isPendingCommunityJoin}
                      onLeave={handleJoinCommunity}
                      isOpen={isLeaveModalOpen}
                      onClose={() => setIsLeaveModalOpen(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {data?.is_joined == true ? <OurFeed data={data}  /> : <h3 className="text-center mt-25">Joined Community to see posts</h3>}
          </div>
        </div>
      ) : (
        <PatientInfo setShowPatientInfo={setShowPatientInfo} />
      )}

      {showCreatePostModal && (
        <Model setIsOpen={setShowCreatePostModal} className="max-w-[600px]">
          <CreatePost communityId={id} setIsOpen={setShowCreatePostModal} />
        </Model>
      )}
    </>
  );
};

export default CommunityAccount;
