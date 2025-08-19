import React, { useState } from "react";
import backArrow from "../../../assets/media/svgs/dashboard-svgs/arrow-left.svg";
import userProfile from "../../../assets/media/svgs/dashboard-svgs/userProfile.svg";
import postImage from "../../../assets/media/images/dashboard-images/postImage.png";
import arrowUp from "@assets/media/svgs/dashboard-svgs/arrow-up-btn.svg";
import arrowDowm from "@assets/media/svgs/dashboard-svgs/arrow-down-btn.svg";
import share from "@assets/media/svgs/dashboard-svgs/share.svg";
import comment from "@assets/media/svgs/dashboard-svgs/comment.svg";
import flag from "@assets/media/svgs/dashboard-svgs/flag2.svg";
import trash from "../../../assets/media/svgs/dashboard-svgs/trash.svg";
import eye from "../../../assets/media/svgs/dashboard-svgs/eye.svg";
import Flagwhite from "@assets/media/svgs/dashboard-svgs/flag4.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import Model from "@components/Model/Model";
import DeleteReview from "./DeleteReview";
import { useNavigate } from "react-router-dom";

const postList = [
  {
    postImage: postImage,
    userImage: userProfile,
    userIcon: userProfile,
    userDoc: "(Patient)",
    userName: "Savannah Nguyen",
    userPost: "Alzheimer’s Support",
    userTime: "10/4/2025, 9:47 AM",
    title: "How do I convince my dad to accept home care?",
    desc: "My 78-year-old dad is struggling with mobility, but refuses help at home. Has anyone had success getting through to a stubborn parent?",
    userReview: "My 78-year-old dad is struggling with mobility...",
    time: "Today at 3:00PM",
    detail:
      "Work on something and want to share it? Showoff Saturdays are you! Make a new post on Saturday and tag it [Showoff Saturday] and watch the view rise.",
  },
];

const ViewCommunity = ({ community, goBack }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate=useNavigate
  const buttons = [
    { btnText: "32k", btnIcon: arrowUp, downarrow: arrowDowm },
    { btnText: "2.2k", btnIcon: comment },
    { btnText: "Share", btnIcon: share },
  ];
  return (
    <>
      <div className="mb-[25px]" >
        <div className="flex items-center mb-4.5 gap-2.5 " >
          <img src={backArrow} alt="backArrow" className="cursor-pointer" onClick={()=>goBack(false)}/>
          <h2 className="text-xl font-semibold text-[#252525] font-[Space Grotesk]">
            Back to Feedsdfghj
          </h2>
        </div>
      </div>

      {postList.map((post, index) => (
        <div key={index} className="post mb-6 relative">
          <div className="post_content bg-white rounded-[10px] p-4 pb-9 relative">
            <div className="flex justify-between">
              <div className="flex items-center gap-3 mb-6 mt-2.5">
                <div className="relative">
                  <img
                    src={post.userImage}
                    className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
                    alt=""
                  />
                  <span className="absolute bottom-2 right-0 w-2 h-2 bg-[#52C343] rounded-full shadow-[0_0_0_2px_white]" />
                </div>

                <div className="flex flex-col">
                  <p className="font-semibold mb-1 text-[#252525] leading-tight">
                    {post.userName}{" "}
                    <span className="text-[#25252566]">{post.userDoc}</span>
                  </p>
                  <span className="text-sm text-gray-500 leading-tight">
                    <p>
                      Posted in <b>{post.userPost}</b> | Posted On{" "}
                      <b>{post.userTime}</b>
                    </p>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-[13px]">
                <PrimaryButton
                  btnText="Add A Flag"
                  showImg={true}
                  img={Flagwhite}
                  imgClass="w-[20px] h-[20px]"
                  btnClass="flex items-center justify-center h-[44px] w-[139px] cursor-pointer bg-[#F9F9F9] border border-[#D3D3D3] text-[#252525] py-[13px] px-4 rounded-lg "
                />
                <PrimaryButton
                  btnText="Delete Review"
                  showImg={true}
                  img={trash}
                  imgClass="w-[20px] h-[20px]"
                  btnClass="flex items-center justify-center h-[44px] w-[169px] cursor-pointer bg-[#C22E00]  text-white py-[13px] px-4 rounded-lg "
                  onClick={() => setIsDeleteModalOpen(true)}
                />
                <PrimaryButton
                  btnText="Approve & Publish"
                  showImg={true}
                  img={eye}
                  imgClass="w-[18px] h-[18px]"
                  btnClass="flex items-center justify-center h-[44px] w-[177px] cursor-pointer bg-[#52C343]  text-white py-[13px] px-4 rounded-lg "
                />
              </div>
            </div>

            <div className="text-sm text-[#252525] mb-7 max-w-[755px]">
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

            <div className="flex gap-2.5 mb-4">
              {buttons.map((btn, idx) => (
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

            <div className="font-semibold text-[#252525]/50 leading-tight mb-6">
              <p className="mb-2.5">Flag provided by Care Provider</p>
              <div className="flex items-center gap-3.5">
                <div className="border border-[#D3D3D3] rounded-[10px] px-2 py-3 flex items-center gap-2">
                  <img src={flag} alt="flag" className="w-[24px] h-[24px]" />
                  <p className="text-[16px] font-bold text-[#252525]">
                    3 Flagged
                  </p>
                </div>
                <p>(Reason: Misleading Information, Off-topic, PHI Violation)</p>
              </div>
            </div>

            <div className="font-semibold text-[#252525]/50 leading-tight">
              <p className="mb-2.5">Flag provided by Patient</p>
              <div className="flex items-center gap-3.5">
                <div className="border border-[#D3D3D3] rounded-[10px] px-2 py-3 flex items-center gap-2">
                  <img src={flag} alt="flag" className="w-[24px] h-[24px]" />
                  <p className="text-[16px] font-bold text-[#252525]">
                    2 Flagged
                  </p>
                </div>
                <p>(Reason: PHI Violation, Spam, Misleading Information)</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Delete Review Modal */}
      {isDeleteModalOpen && (
        <Model setIsOpen={setIsDeleteModalOpen} className="max-w-[488px]">
         <DeleteReview/> 
         </Model>
      )}
    </>
  );
};

export default ViewCommunity;
