import { useEffect, useState } from "react";
import backArrow from "@assets/media/svgs/dashboard-svgs/arrow-left.svg";
import communityBg from "@assets/media/images/dashboard-images/community-bg.png";
import topSenior from "@assets/media/images/dashboard-images/topSernior.jpg";
import PrivateLock from "@assets/media/svgs/dashboard-svgs/PrivateLock.png";
import Calender from "@assets/media/svgs/dashboard-svgs/calendar.svg";
import Global from "@assets/media/svgs/dashboard-svgs/global.svg";
import { PrimaryButton } from "@src/Components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import addCommunity from "@assets/media/svgs/dashboard-svgs/addCommunity.svg";
import OurFeed from "./ourfeed";
import Model from "@components/model/model";
import CreatePost from "./backfeed/createpost";
import PatientInfo from "@src/Components/CareProvider/patientinfo";
import { useGetSpecificCommunity } from "@src/hooks/usecommunity";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ApiDeleteCommunity,
  ApiJoinCommunity,
} from "@src/api/apicommunityforum";
import toast from "react-hot-toast";
import LeaveCommunityModal from "@src/Components/Model/leavecommunitymodal";
import { useNavigate } from "react-router-dom";
import Spinner from "@components/loaders/spinner";
import CommunityAccountPosts from "@src/Components/communityaccountposts";
import PopularCommunity from "./popularcommunity";
import CommunitiesSpinner from "@src/Components/Loaders/communitiesspinner";
import DeleteModal from "@src/Components/Model/deletemodal";

const CommunityAccount = ({ setOpenBackFeed }) => {
  const [joined, setJoined] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
  
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userInfo")).id;
  const userType = JSON.parse(localStorage.getItem("userInfo")).role_type;

  const handleJoinClick = () => setJoined(true);
  const handleAddCommunityClick = () => setJoined(false);

  const { id } = useParams();
  const { data, refetch, isLoading, isFetching, isError } =
    useGetSpecificCommunity(id ?? "");


  const location = useLocation(); 

  useEffect(() => {
    refetch();
  }, [location]);

  const queryClient = useQueryClient();

  const {
    mutateAsync: communityJoinMutation,
    isPending: isPendingCommunityJoin,
  } = useMutation({
    mutationFn: (data) => ApiJoinCommunity(data),

    onSuccess: async () => {
      setIsLeaveModalOpen(false);
      queryClient.invalidateQueries(["useGetSpecificCommunity"]); 
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleJoinCommunity = async () => {
    const data1 = {
      community_id: id,
    };

    await communityJoinMutation(data1);
  };

  const [showInitialLoader, setShowInitialLoader] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setShowInitialLoader(false);
    }
  }, [isLoading]);


  const {
    mutateAsync: deleteCommunityMutation,
  } = useMutation({
    mutationFn: ({ communityId }) => ApiDeleteCommunity(communityId),

    onSuccess: async () => {
      toast.success("Community Deleted Successfully");
            queryClient.invalidateQueries(["useGetCommunityPost"]);

      if (userType == "PATIENT") {
        navigate("/patient/community-forum");
      } else {
        navigate("/care-provider/community-forum");
      }
    },
    onError: (error) => {
    },
  });

  const handleDeleteCommunity = async (communityId) => {
    await deleteCommunityMutation({ communityId });
  };
  return (
    <>

      {showInitialLoader ? (
        <div className="text-center flex mt-30 justify-center">
          <CommunitiesSpinner />
        </div>
      ) : isError ? (
        <p className="!text-[30px]">something went wrong</p>
      ) : data ? (
        <div className="mb-[25px]">
          <div
            className="flex items-center gap-2.5 cursor-pointer pb-4 bg-transparent sticky top-0 z-10"
            onClick={() => {
              userType == "CARE_PROVIDER"
                ? navigate("/care-provider/community-form")
                : navigate("/patient/community-forum");
            }}
          >
            <img src={backArrow} alt="backArrow" />
            <h2 className="text-xl space-grotesk font-bold text-[#252525]  font-[Space Grotesk]">
              Back to Feed
            </h2>
          </div>

          <div
            className="h-[603px] overflow-y-scroll pr-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx>{`
              ::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <div className="rounded-xl bg-white mb-[14px]">
              <div className="h-[147px] relative">
                <img
                  className="h-[100%] w-full object-cover"
                  src={
                    data?.banner_image
                      ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                          data?.banner_image
                        }`
                      : topSenior
                  }
                  alt=""
                />
              </div>

              <div className="relative">
                <div className="absolute w-[101px] bottom-[-50px] left-6">
                  <img
                    src={
                      data?.profile_icon_image
                        ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                            data?.profile_icon_image
                          }`
                        : topSenior
                    }
                    className="w-24 h-24 rounded-full object-cover border border-gray-200 shadow-[0_0_0_5px_white]"
                    alt="topSenior"
                  />
                  <span className="absolute bottom-2 right-3 w-4 h-4 bg-[#52C343] rounded-full shadow-[0_0_0_6px_white]" />
                </div>
              </div>

              <div className="md:flex md:items-center justify-between pt-[75px] pb-5 px-5">
                <div className="max-w-[535px] md:mb-0 mb-3">
                  <h2
                    className="text-xl space-grotesk font-semibold text-[#252525] font-[Space Grotesk] mb-2 cursor-pointer"
                    onClick={() => setShowPatientInfo(true)}
                  >
                    {data?.title}
                  </h2>
                  <div className="flex items-center gap-3.5 mb-2">
                    <div className="flex items-center gap-0.5">
                      <img
                        src={Calender}
                        alt="Calendar"
                        className="w-5 h-5 object-contain"
                      />
                      <p className="pt-1">Create Post</p>
                    </div>
                  
                    <div className="flex items-center ">
                    
                      {data?.type === "PUBLIC" ? (
                        <img
                          src={Global}
                          alt=""
                          className="w-7 pr-1.5 object-contain"
                        />
                      ) : (
                        <img
                          src={PrivateLock}
                          alt=""
                          className="w-7 object-contain"
                        />
                      )}
                      <p className="text-sm font-medium">
                        {data?.type === "PRIVATE" ? "Private" : "Public"}
                      </p>
                    </div>
                  </div>
                  <p>{data?.description}</p>
                </div>

                <div className="md:pl-10 md:border-l md:border-l-black">
                  <div className="flex items-center mb-4">
                    <div className="pr-6">
                      <p>
                        <b>{data?.member_count}</b>
                      </p>
                      <p>Members</p>
                    </div>
                    <div className="pl-6 border-l border-black/20">
                      <p>
                        <b>{data?.online_members_count}</b>
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-[#52C343] rounded-full"></span>
                        Online
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3.5">
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

                    {userId == data?.creator_id ? (
                      <PrimaryButton
                        btnText="Delete Community"
                        showImg={false}
                        btnClass="w-fit h-[46px] !rounded-[10px] bg-red-600 !px-4 py-[10px] text-sm text-white font-semibold leading-[33px] gap-2 flex items-center justify-center"
                        onClick={() => setIsDeleteModal(true)}
                      />
                    ) : (
                      <div>
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
                        ) : data?.is_pending_private ?   (
                          <PrimaryButton
                            btnText={isPendingCommunityJoin ? <Spinner/> : `Request Sent`}

                            showImg={false}
                            btnClass="min-w-[150px] h-[46px]  !rounded-[10px] bg-[#D3D3D3] !px-4 py-[10px] text-sm text-black font-semibold leading-[33px] gap-2 flex items-center justify-center"
                            onClick={handleJoinCommunity}
                          />
                        ) :  
                        
                        <PrimaryButton
                            btnText={isPendingCommunityJoin ? <Spinner/> : `Join Community`}
                            showImg={false}
                            btnClass="min-w-[150px] h-[46px] !rounded-[10px] bg-[#007AB2] !px-4 py-[10px] text-sm text-white font-semibold leading-[33px] gap-2 flex items-center justify-center"
                            onClick={handleJoinCommunity}
                          />
                        }
                      </div>
                    )}

                    <DeleteModal
                      isOpen={isDeleteModal}
                      onClose={() => setIsDeleteModal(false)}
                      onDelete={()=>handleDeleteCommunity(data?.id)}
                    />

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
   

            {data?.is_joined ? (
              data.community_posts && data.community_posts.length > 0 ? (
                <OurFeed data={data?.community_posts} />
              ) : (
                <h3 className="text-center mt-6 text-gray-500">
                  No data found
                </h3>
              )
            ) : (
              <h3 className="text-center mt-6 text-gray-500">
                Join the community to see posts
              </h3>
            )}
          </div>
        </div>
      ) : (
        <p className="text-[30px] mt-40 text-center !text-extrabold">
          No communities found
        </p>
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
