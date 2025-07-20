import { useState } from "react";
import userProfile from "@assets/media/svgs/dashboard-svgs/userProfile.svg";
import arrowUp from "@assets/media/svgs/dashboard-svgs/arrow-up-btn.svg";
import arrowDowm from "@assets/media/svgs/dashboard-svgs/arrow-down-btn.svg";
import share from "@assets/media/svgs/dashboard-svgs/share.svg";
import comment from "@assets/media/svgs/dashboard-svgs/comment.svg";
import Flagwhite from "@assets/media/svgs/dashboard-svgs/flag4.svg";
import Flagblue from "@assets/media/svgs/dashboard-svgs/flag3.svg";
import Save from "@assets/media/svgs/dashboard-svgs/save.svg";
import SaveBlue from "@assets/media/svgs/dashboard-svgs/saveBlue.svg";
import postImage from "../../../assets/media/images/dashboard-images/postImage.png";
import Model from "@components/Model/Model";
import FlagPost from "./FlagPost";
import SubmitReport from "./SubmitReport";

const postList = [
  {
    id: 1,
    community_id: 1,
    postImage: postImage,
    userImage: userProfile,
    userIcon: userProfile,
    userName: "Cody Fisher",
    userPost: "Posted by: caregiverSon89",
    title: "How do I convince my dad to accept home care?",
    desc: "My 78-year-old dad is struggling with mobility, but refuses help at home. Has anyone had success getting through to a stubborn parent?",
    userReview: "My 78-year-old dad is struggling with mobility...",
    time: "Today at 3:00PM",
    detail:
      "Work on something and want to share it? Showoff Saturdays are you! Make a new post on Saturday and tag it [Showoff Saturday] and watch the view rise.",
  },
  {
    id: 2,
    community_id: 2,
    postImage: postImage,
    userImage: userProfile,
    userIcon: userProfile,
    userName: "Cody Fisher",
    userPost: "Posted by: caregiverSon89",
    title: "How do I convince my dad to accept home care?",
    desc: "My 78-year-old dad is struggling with mobility, but refuses help at home. Has anyone had success getting through to a stubborn parent?",
    userReview: "My 78-year-old dad is struggling with mobility...",
    time: "Today at 3:00PM",
    detail:
      "Work on something and want to share it? Showoff Saturdays are you! Make a new post on Saturday and tag it [Showoff Saturday] and watch the view rise.",
  },
];

const buttons = [
  { btnText: "32k", btnIcon: arrowUp, downarrow: arrowDowm },
  { btnText: "2.2k", btnIcon: comment },
  { btnText: "Share", btnIcon: share },
  { btnText: "Flag", btnIcon: Flagwhite },
];

const CommunityFeed = ({ setOpenBackFeed }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [activePostActions, setActivePostActions] = useState(null);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [showSubmitReport, setShowSubmitReport] = useState(false);
  const [flaggedPost, setFlaggedPost] = useState(null);

  const togglePostActions = (index) => {
    setActivePostActions(activePostActions === index ? null : index);
  };

  const filteredPosts = activeTab === "home" ? postList : postList.slice(0, 1);

  return (
    <div
      className=" h-[661px] overflow-y-auto transition-colors duration-300"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Optional Tab Switch UI */}
      {/* <div className="flex gap-2 mb-4">
        <button onClick={() => setActiveTab("home")} className="px-4 py-2 bg-blue-500 text-white rounded">All Posts</button>
        <button onClick={() => setActiveTab("filtered")} className="px-4 py-2 bg-gray-200 text-black rounded">One Post</button>
      </div> */}

      {filteredPosts.map((post, index) => (
        <div key={index} className="post mb-6 relative last:m-0">
          <div className="post_content bg-white rounded-[10px] p-4 relative">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={post.userImage}
                    className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
                    alt=""
                  />
                  <span className="absolute bottom-2 right-0 w-2 h-2 bg-[#52C343] rounded-full shadow-[0_0_0_2px_white]" />
                </div>
                <div className="flex flex-col">
                  <p
                    className="font-semibold mb-1 text-[#252525] leading-tight cursor-pointer"
                    onClick={() => setOpenBackFeed(true)}
                  >
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

            <div className="text-sm text-[#252525] mb-7">
              <h3 className="mb-2 font-[Space Grotesk] text-xl">
                {post.title}
              </h3>
              <p>
                {post.desc} <span className="text-[#868686]">Read more..</span>
              </p>
            </div>

            <div className="mb-2.5">
              <img src={post.postImage} alt="" className="rounded-md" />
            </div>

            <div className="flex gap-2.5 mb-2.5">
              {buttons
                .filter((btn) => btn.btnText !== "Flag")
                .map((btn, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center"
                  >
                    <img src={btn.btnIcon} alt="icon" />
                    {btn.btnText}
                    {btn.downarrow && <img src={btn.downarrow} alt="" />}
                  </button>
                ))}
            </div>

            <input
              type="text"
              placeholder="Join the conversation"
              className="w-full bg-white outline-0 border-[1px] rounded-[32px] py-3 px-6 text-sm mb-2"
              style={{ borderColor: "#D3D3D3" }}
            />
            <div className="flex items-start gap-3 mb-3">
              <img
                src={post.userIcon}
                className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200 flex-none"
                alt="userIcon"
              />
              <div className="flex flex-col mb-1 text-[#252525] leading-tight font-normal">
                <p className="font-semibold">{post.userName}</p>
                <span className="text-[12px] text-gray-500 leading-tight mb-1.5">
                  {post.time}
                </span>
                <p className="text-sm text-gray-700 mb-2.5">{post.detail}</p>
                <div className="flex gap-2.5 mb-2.5">
                  {buttons.map((btn, idx) => (
                    <button
                      key={idx}
                      className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1 py-1 min-w-[78px] justify-center"
                    >
                      <img src={btn.btnIcon} alt="icon" />
                      {btn.btnText}
                      {btn.downarrow && <img src={btn.downarrow} alt="" />}
                    </button>
                  ))}
                </div>
                <span className="text-[#007AB2] text-sm">-View 2 replies</span>
              </div>
            </div>

            <p className="text-[#007AB2] font-medium text-sm">
              Show 5 more Comments
            </p>
            {activePostActions === index && (
              <div className="absolute top-14 right-4 bg-white border border-gray-300 rounded-[10px] shadow-md p-1.5 z-50">
                <button
                  onClick={() => {
                    setFlaggedPost({
                      ...post,
                      post_id: post.id,
                      community_id: post.community_id,
                    });
                    setIsFlagModalOpen(true);
                    setShowSubmitReport(false);
                  }}

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
                  className="group w-full text-left pl-[10px] pr-5.5 text-sm py-2.5 hover:bg-[#E7F2F9] rounded-[5px] flex items-center gap-2"
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
          </div>
        </div>
      ))}
      {isFlagModalOpen && (
        <Model className="max-w-[618px]" setIsOpen={setIsFlagModalOpen}>
          <FlagPost
            post_id={flaggedPost?.post_id}
            community_id={flaggedPost?.community_id}
            onSubmit={() => setShowSubmitReport(true)}
          />
        </Model>
      )}


      {showSubmitReport && (
        <Model
          className="max-w-[516px]"
          setIsOpen={() => setShowSubmitReport(false)}
        >
          <SubmitReport />
        </Model>
      )}
    </div>
  );
};

export default CommunityFeed;
