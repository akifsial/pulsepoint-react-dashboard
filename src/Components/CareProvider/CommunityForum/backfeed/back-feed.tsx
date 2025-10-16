import { useState } from "react";
import backArrow from "../../../../assets/media/svgs/dashboard-svgs/arrow-left.svg";
import communityBg from "../../../../assets/media/images/dashboard-images/community-bg.png";
import topSenior from "../../../../assets/media/images/dashboard-images/topSernior.jpg";
import Calender from "../../../../assets/media/svgs/dashboard-svgs/calendar.svg";
import PrivateLock from "@assets/media/svgs/dashboard-svgs/PrivateLock.png";
import Global from "../../../../assets/media/svgs/dashboard-svgs/global.svg";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import addCommunity from "@assets/media/svgs/dashboard-svgs/addCommunity.svg";
import OurFeed from "../our-feed";
import Model from "@components/model/model";
import CreatePost from "./create-post";
import PatientInfo from "@components/careprovider/patient-info";

const BackFeed = ({ setOpenBackFeed, selectedCommunity }) => {
  const [joined, setJoined] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(false);

  const handleJoinClick = () => setJoined(true);
  const handleAddCommunityClick = () => setJoined(false);

  return (
    <>
      {/* {!showPatientInfo ? ( */}
      <div className="mb-[25px]">
        {/* Fixed header */}
        <div
          className="flex items-center gap-2.5 cursor-pointer py-4 bg-transparent sticky top-0 z-10"
          onClick={() => setOpenBackFeed(false)}
        >
          <img src={backArrow} alt="backArrow" />
          <h2 className="text-xl font-semibold text-[#252525] font-[Space Grotesk]">
            Back to Feed
          </h2>
        </div>

        {/* Scrollable content area */}
        <div
          className="h-[603px] overflow-y-scroll pr-"
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

            <div className="lg:flex lg:items-center lg:justify-between pt-[75px] pb-5 px-5">
              <div className="max-w-[535px] lg:mb-0 mb-5">
                <h2
                  className="text-xl font-semibold text-[#252525] font-[Space Grotesk] mb-2 cursor-pointer"
                  onClick={() => setShowPatientInfo(true)}
                >
                  Johns Hopkins Hospital
                </h2>
                <div className="flex gap-3.5 mb-2">
                  <div className="flex gap-0.5">
                    <img
                      src={Calender}
                      alt="Calendar"
                      className="w-5 h-5 object-contain"
                    />
                    <p>Create Post</p>
                  </div>
                  <div className="flex gap-0.5">
                    {selectedCommunity?.type === "PUBLIC" ? (
                      <img
                      src={PrivateLock}
                      alt=""
                      className="w-7 object-contain"
                      />
                    ) : (
                      <img
                        src={Global}
                        alt=""
                        className="w-7 pr-1.5 object-contain"
                      />
                    )}
                    <p className="text-sm font-medium">
                      {selectedCommunity?.type === "PRIVATE"
                        ? "Private"
                        : "Public"}
                    </p>
                  </div>
                </div>
                <p>
                  Welcome to r/Doctor — A community for all who hold or are
                  pursuing the title of Doctor, whether in science, technology,
                  engineering, mathematics.
                </p>
              </div>

              <div className="lg:pl-10 lg:border-l lg:border-l-black">
                <div className="flex items-center mb-4">
                  <div className="pr-6">
                    <p>
                      <b>67K</b>
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

                <div className="flex flex-wrap items-center gap-3.5">
                  <PrimaryButton
                    btnText="Create Post"
                    showImg={true}
                    img={addCommunity}
                    imgClass="w-[19px] h-[19px] object-cover"
                    imgPosition="left"
                    btnClass="border-1 border-[#000] w-fit h-[46px] !rounded-[10px] !px-4 py-[10px] text-sm text-[#252525] font-semibold leading-[33px] gap-2 flex items-center justify-center"
                    onClick={() => setShowCreatePostModal(true)}
                  />

                  {!joined ? (
                    <PrimaryButton
                      btnText="Join Community"
                      showImg={false}
                      btnClass="w-fit h-[46px] !rounded-[10px] bg-[#007AB2] !px-4 py-[10px] text-sm text-white font-semibold leading-[33px] gap-2 flex items-center justify-center"
                      onClick={handleJoinClick}
                    />
                  ) : (
                    <PrimaryButton
                      btnText="Leave Community"
                      showImg={false}
                      btnClass="w-[142px] h-[46px] !rounded-[10px] border border-black bg-[#252525] text-white px-4 py-[10px] text-sm font-semibold leading-[33px] gap-2 flex items-center justify-center"
                      onClick={handleAddCommunityClick}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <OurFeed />
        </div>
      </div>
      {/* ) : ( */}
      {/* <PatientInfo setShowPatientInfo={setShowPatientInfo} /> */}
      {/* )} */}

      {showCreatePostModal && (
        <Model setIsOpen={setShowCreatePostModal} className="max-w-[600px]">
          <CreatePost setIsOpen={setShowCreatePostModal} />
        </Model>
      )}
    </>
  );
};

export default BackFeed;
