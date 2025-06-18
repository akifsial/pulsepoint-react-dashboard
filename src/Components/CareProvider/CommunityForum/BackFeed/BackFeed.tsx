import React, { useState } from "react";
import backArrow from "../../../../assets/media/svgs/dashboard-svgs/arrow-left.svg";
import communityBg from "../../../../assets/media/images/dashboard-images/community-bg.png";
import topSenior from "../../../../assets/media/images/dashboard-images/topSernior.jpg";
import Calender from "../../../../assets/media/svgs/dashboard-svgs/calendar.svg";
import Global from "../../../../assets/media/svgs/dashboard-svgs/global.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import addCommunity from "@assets/media/svgs/dashboard-svgs/addCommunity.svg";
import { useNavigate } from "react-router-dom";
import OurFeed from "../OurFeed";

const BackFeed = ({ setOpenBackFeed }) => {
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();

  const handleJoinClick = () => {
    setJoined(true);
  };

  const handleAddCommunityClick = () => {
    // Reopen same page
    setJoined(false); // Optional: you can reset state
  };

  return (
    <>
      <div className="mb-[25px]">
        <div className="flex items-center mb-4.5 gap-2.5">
          <img
            src={backArrow}
            alt="backArrow"
            className="cursor-pointer"
            onClick={() => setOpenBackFeed(false)}
          />
          <h2 className="text-xl font-semibold text-[#252525] font-[Space Grotesk]">
            Back to Feed
          </h2>
        </div>

        <div className="">
          <div className="rounded-xl bg-white mb-[25px] overflow-hidden">
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
            <div className=" max-w-[535px] ">
              <h2 className="text-xl font-semibold text-[#252525] font-[Space Grotesk] mb-2">
                Johns Hopkins Hospital
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
              <p>
                Welcome to r/Doctor — A community for all who hold or are pursuing
                the title of Doctor, whether in science, technology, engineering,
                mathematics.
              </p>
            </div>

            <div className=" pl-10 border-l border-l-black">
              <div className="flex items-center mb-4">
                <div className="pr-6">
                  <p><b>67K</b></p>
                  <p>Members</p>
                </div>
                <div className="pl-6 border-l border-black/20">
                  <p><b>20K</b></p>
                  <p className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#52C343] rounded-full"></span>
                    Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <PrimaryButton
                  btnText="Create Post"
                  showImg={true}
                  img={addCommunity}
                  imgClass="w-[19px] h-[19px] object-cover"
                  imgPosition="left"
                  btnClass="border-1 border-[#000] w-[130px] h-[46px] !rounded-[10px] px-4 py-[10px] text-sm text-[#252525] font-semibold leading-[33px] gap-2 flex items-center justify-center "
                />

                {!joined ? (
                  <PrimaryButton
                    btnText="Join Community"
                    showImg={false}
                    btnClass="w-[131px] h-[46px] !rounded-[10px] bg-[#007AB2] px-4 py-[10px] text-sm text-white font-semibold leading-[33px] gap-2 flex items-center justify-center"
                    onClick={handleJoinClick}
                  />
                ) : (
                  <PrimaryButton
                    btnText="Leave Community"
                    showImg={false}
                    btnClass="w-[142px] h-[46px] !rounded-[10px] border border-black bg-[#252525] text-white px-4 py-[10px] text-sm text-black font-semibold leading-[33px] gap-2 flex items-center justify-center"
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

    </>
  );
};

export default BackFeed;
