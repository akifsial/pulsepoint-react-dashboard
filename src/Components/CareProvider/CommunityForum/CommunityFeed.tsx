import React, { useState } from "react";
import userProfile from "@assets/media/svgs/dashboard-svgs/userProfile.svg";
import postImage from "@assets/media/images/dashboard-images/postImage.png";
import arrowUp from "@assets/media/svgs/dashboard-svgs/arrow-up-btn.svg";
import arrowDowm from "@assets/media/svgs/dashboard-svgs/arrow-down-btn.svg";
import share from "@assets/media/svgs/dashboard-svgs/share.svg";
import comment from "@assets/media/svgs/dashboard-svgs/comment.svg";
import home from "@assets/media/svgs/dashboard-svgs/home.svg";
import popular from "@assets/media/svgs/dashboard-svgs/popular.svg";
import Flagwhite from "@assets/media/svgs/dashboard-svgs/flag4.svg";
import Flagblue from "@assets/media/svgs/dashboard-svgs/flag3.svg";
import Save from "@assets/media/svgs/dashboard-svgs/save.svg";
import SaveBlue from "@assets/media/svgs/dashboard-svgs/saveBlue.svg";

import WhiteHome from "@assets/media/svgs/dashboard-svgs/homeWhite.svg";
import Whitepopular from "@assets/media/svgs/dashboard-svgs/popularWhite.svg";

const postList = [
  {
    userImage: userProfile,
    userName: "Cody Fisher",
    userPost: "Posted by: caregiverSon89",
    title: "How do I convince my dad to accept home care?",
    desc: "My 78-year-old dad is struggling with mobility, but refuses help at home. Has anyone had success getting through to a stubborn parent?",
    postImage: postImage,
    userTime: "Today at 3:00PM",
    userReview:
      "My 78-year-old dad is struggling with mobilityMy 78-year-old dad is struggling with mobilityMy 78-year-old dad is struggling with mobility",
  },
  {
    userImage: userProfile,
    userName: "Cody Fisher",
    userPost: "Posted by: caregiverSon89",
    title: "How do I convince my dad to accept home care?",
    desc: "My 78-year-old dad is struggling with mobility, but refuses help at home. Has anyone had success getting through to a stubborn parent?",
    postImage: postImage,
    userTime: "Today at 3:00PM",
    userReview:
      "My 78-year-old dad is struggling with mobilityMy 78-year-old dad is struggling with mobilityMy 78-year-old dad is struggling with mobility",
  },
];

const buttons = [
  {
    btnText: "32k",
    btnIcon: arrowUp,
    downarrow: arrowDowm,
  },
  {
    btnText: "2.2k",
    btnIcon: comment,
  },
  {
    btnText: "Share",
    btnIcon: share,
  },
];

const CommunityFeed = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [activePostActions, setActivePostActions] = useState(null);
  const togglePostActions = (index) => {
    if (activePostActions === index) {
      setActivePostActions(null);
    } else {
      setActivePostActions(index);
    }
  };

  const filteredPosts = activeTab === "home" ? postList : postList.slice(0, 1);

  return (
    <div
      className={`sm:w-[813px] sm:h-[661px] overflow-y-auto transition-colors duration-300`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <h2 className="text-xl font-semibold mb-3.5 text-[#252525]">Your Feed</h2>
      <div className="flex gap-[5px] mb-6">
  <button
    onClick={() => setActiveTab("home")}
    className={`flex items-center gap-2 px-4 py-[7px] rounded-[20px] transition-all ${
      activeTab === "home"
        ? "bg-[#28A2FF] text-white"
        : "bg-[#D9E7EE] text-[#252525]"
    }`}
  >
    <img src={activeTab === "home" ? WhiteHome : home} alt="Home" />
    Home
  </button>

  <button
    onClick={() => setActiveTab("Popular")}
    className={`flex items-center gap-2 px-4 py-[7px] rounded-[20px] transition-all ${
      activeTab === "Popular"
        ? "bg-[#28A2FF] text-white"
        : "bg-[#D9E7EE] text-[#252525]"
    }`}
  >
    <img src={activeTab === "Popular" ? Whitepopular : popular} alt="Popular" />
    Popular
  </button>
</div>


      {filteredPosts.map((post, index) => (
        <div key={index} className="post mb-6 relative">
          <div className="post_content bg-white rounded-[10px] p-4 relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    alt=""
                    src={post.userImage}
                    className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
                  />
                  <span className="absolute bottom-2 right-0 w-2 h-2 bg-[#52C343] rounded-full shadow-[0_0_0_2px_white]"></span>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold mb-1 text-[#252525] leading-tight">
                    {post.userName}
                  </p>
                  <span className="text-sm text-gray-500 leading-tight">
                    {post.userPost}
                  </span>
                </div>
              </div>

              <button
                className="cursor-pointer relative z-20"
                onClick={() => togglePostActions(index)}
                aria-label="Toggle post actions"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <circle
                      cx="13.16"
                      cy="5.45"
                      r="1.07"
                      stroke="#252525"
                      strokeWidth="2.14"
                    />
                    <circle
                      cx="13.16"
                      cy="12.94"
                      r="1.07"
                      stroke="#252525"
                      strokeWidth="2.14"
                    />
                    <circle
                      cx="13.16"
                      cy="20.43"
                      r="1.07"
                      stroke="#252525"
                      strokeWidth="2.14"
                    />
                  </g>
                </svg>
              </button>
            </div>

            <div>
              <h3 className="mb-2.5">{post.title}</h3>
              <p className="text-sm text-[#252525] mb-7">
                {post.desc} <span className="text-[#868686]">Read more..</span>
              </p>
            </div>

            <div className="mb-2.5">
              <img src={post.postImage} alt="" className="rounded-md" />
            </div>

            <div className="flex gap-2.5 mb-2.5">
              {buttons.map((btn, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center"
                >
                  <img src={btn.btnIcon} alt="icon" className="object-cover" />
                  {btn.btnText}
                  {btn.downarrow && <img src={btn.downarrow} alt="" />}
                </button>
              ))}
            </div>

            <div>
              <input
                type="text"
                placeholder="Join the conversation"
                className="w-full bg-white outline-0 border-[1px] rounded-[32px] py-3 px-6 text-sm mb-2"
                style={{ borderColor: "#D3D3D3" }}
              />
            </div>

            {activePostActions === index && (
              <div className="absolute top-14 right-4  bg-white border border-gray-300 rounded-[10px] shadow-md p-1.5 z-50 ">
                <button
                  onClick={() => alert(`Flagged post: ${post.title}`)}
                  className="group w-full text-left pl-[10px] pr-5.5 text-sm py-2.5 hover:bg-[#E7F2F9] rounded-[5px] flex items-center gap-2 mb-0.5"
                >
                  <span className="inline-block group-hover:hidden">
                    <img src={Flagwhite} alt="Flagwhite" />
                  </span>
                  <span className="hidden group-hover:inline-block">
                    <img src={Flagblue} alt="Flagblue" />
                  </span>
                  Flag Post
                </button>

                <button
                  onClick={() => alert(`Saved post: ${post.title}`)}
                  className="group w-full text-left  pl-[10px] pr-5.5 text-sm py-2.5 hover:bg-[#E7F2F9] rounded-[5px] flex items-center gap-2"
                >
                  <span className="inline-block group-hover:hidden">
                    <img src={Save} alt="Save" />
                  </span>
                  <span className="hidden group-hover:inline-block">
                    <img src={SaveBlue} alt="SaveBlue" />
                  </span>
                  Save Post
                </button>
              </div>
            )}

            <div className="flex items-start gap-3 mb-5">
              <img
                alt=""
                src={post.userImage}
                className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
              />
              <div>
                <p className="font-semibold mb-1 text-[#252525] leading-tight">
                  {post.userName}
                </p>
                <span className="text-[12px] mb-2 text-gray-500 leading-tight">
                  {post.userTime}
                </span>
                <p className="text-sm mb-2.5">{post.userReview}</p>
                <div className="flex gap-2.5 mb-2.5">
                  {buttons.map((btn, idx) => (
                    <button
                      key={idx}
                      className="flex text-[12px] items-center gap-1 bg-[#E6E9EB] rounded-[32px] px-1 py-1.5 min-w-[75px] justify-center"
                    >
                      <img
                        src={btn.btnIcon}
                        alt="icon"
                        className="object-cover h-[19px] w-[19px]"
                      />
                      {btn.btnText}
                      {btn.downarrow && (
                        <img
                          src={btn.downarrow}
                          alt=""
                          className="object-cover h-5 w-5"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-[#007AB2]">- View 2 replies</p>
              </div>
            </div>

            <p className="text-[#007AB2] font-medium text-sm">
              Show 5 more Comments
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityFeed;
