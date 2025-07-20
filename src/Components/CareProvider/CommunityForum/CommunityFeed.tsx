import { useState } from "react";
import userProfile from "@assets/media/svgs/dashboard-svgs/userProfile.svg";
import arrowUp from "@assets/media/svgs/dashboard-svgs/arrow-up-btn.svg";
import arrowDowm from "@assets/media/svgs/dashboard-svgs/arrow-down-btn.svg";
import share from "@assets/media/svgs/dashboard-svgs/share.svg";
import commentIcon from "@assets/media/svgs/dashboard-svgs/comment.svg";
import Flagwhite from "@assets/media/svgs/dashboard-svgs/flag4.svg";
import Flagblue from "@assets/media/svgs/dashboard-svgs/flag3.svg";
import Save from "@assets/media/svgs/dashboard-svgs/save.svg";
import SaveBlue from "@assets/media/svgs/dashboard-svgs/saveBlue.svg";
import postImage from "../../../assets/media/images/dashboard-images/postImage.png";
import Model from "@components/Model/Model";
import FlagPost from "./FlagPost";
import SubmitReport from "./SubmitReport";
import { useGetPostComments } from "@src/hooks/useCommunity";
import { ApiPostComment } from "@src/api/ApiCommunityForum";
import { Send } from "lucide-react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

const Comments = [
  {
    id: 1,
    post_id: 1,
    commenterName: "Jane Doe",
    commenterImage: userProfile,
    time: "2 hours ago",
    commentText: "I had a similar situation with my grandfather.",
    likes: "12.5K",
    postComments: "1.8K"
  },
  {
    id: 2,
    post_id: 1,
    commenterName: "Alex Smith",
    commenterImage: userProfile,
    time: "1 hour ago",
    commentText: "It took a lot of patience and showing him how it actually helps.",
    likes: "13.6k",
    postComments: "4.4K"
  },
   {
    id: 3,
    post_id: 1,
    commenterName: "Dante",
    commenterImage: userProfile,
    time: "5 hour ago",
    commentText: "It took showing him how it actually helps.",
    likes: "11.8k",
    postComments: "42.4K"
  },
   {
    id: 2,
    post_id: 1,
    commenterName: "Henry",
    commenterImage: userProfile,
    time: "6 hour ago",
    commentText: "True, i appreciate",
    likes: "18.6k",
    postComments: "14.4K"
  },
   {
    id: 2,
    post_id: 1,
    commenterName: "Zade",
    commenterImage: userProfile,
    time: "1 hour ago",
    commentText: "It took a lot of time...",
    likes: "17.6k",
    postComments: "23.4K"
  },
   {
    id: 2,
    post_id: 1,
    commenterName: "Groover",
    commenterImage: userProfile,
    time: "2 hour ago",
    commentText: "It took a lot of patience...",
    likes: "48.6k",
    postComments: "56.4K"
  },

];


const buttons = [
  { btnText: "32k", btnIcon: arrowUp, downarrow: arrowDowm },
  { btnText: "2.2k", btnIcon: commentIcon },
  { btnText: "Share", btnIcon: share },
  { btnText: "Flag", btnIcon: Flagwhite },
];


const CommunityFeed = ({ setOpenBackFeed }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [activePostActions, setActivePostActions] = useState(null);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [showSubmitReport, setShowSubmitReport] = useState(false);
  const [flaggedPost, setFlaggedPost] = useState(null);
  const [openComments, setOpenComments] = useState(null);
  const [sendText, setSendText] = useState("");
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState()
  const [showMoreComments, setShowMoreComments] = useState({});
  console.log("showchaa",showMoreComments)

  const { data } = useGetPostComments()

  const toggleComments = (post_id) => {
    setComment("")
    setPostId(post_id)
    setOpenComments(openComments === post_id ? null : post_id);
  };


  const togglePostActions = (index) => {
    setActivePostActions(activePostActions === index ? null : index);
  };

  const filteredPosts = activeTab === "home" ? postList : postList.slice(0, 1);

  const {
    mutateAsync: commentsMutation,
    isPending: commentsIsPending,
  } = useMutation({
    mutationFn: (data) => ApiPostComment(data),

    onSuccess: async () => {
      toast.success("Comment Posted Successfully");
      // QueryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleComments = async () => {
    const data = {
      content: comment,
      post_id: postId
    }
    await commentsMutation(data);
  };


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
              <div className="flex gap-2.5 mb-2.5">
                {/* Likes Button */}
                <button className="flex items-center cursor-pointer gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center">
                  <img src={arrowUp} alt="Likes" />
                  32k
                  <img src={arrowDowm} alt="Down arrow" />
                </button>

                {/* Comments Button */}
                <button onClick={() => toggleComments(post.id)}
                  className="flex items-center cursor-pointer gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center">
                  <img src={commentIcon} alt="Comments" />
                  2.2k
                </button>

                {/* Share Button */}
                <button className="flex items-center cursor-pointer gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center">
                  <img src={share} alt="Share" />
                  Share
                </button>
              </div>

            </div>
            {openComments === post.id && (
              <div>

                <div className="relative mb-3">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Join the conversation"
                    className="w-full bg-white outline-none border border-gray-300 rounded-[32px] py-3 pr-14 pl-6 text-sm"
                  />

                  <button
                    disabled={!comment}
                    className={`absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center w-9 h-9 rounded-full transition ${comment
                      ? "bg-[#007AB2] hover:bg-[#005f8e] cursor-pointer"
                      : "bg-gray-300"
                      }`}
                    onClick={handleComments}
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>




                {/* <div className="flex items-start gap-3 mb-3">
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
                </div> */}

                {Comments.slice(0, showMoreComments[post.id] ? undefined : 3)
                  .map((comment, key) => (
                    <div key={key} className="flex items-start gap-3 mb-3">
                      <img
                        src={comment.commenterImage}
                        className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200 flex-none"
                        alt="userIcon"
                      />
                      <div className="flex flex-col mb-1 text-[#252525] leading-tight font-normal">
                        <p className="font-semibold">{comment.commenterName}</p>
                        <span className="text-[12px] text-gray-500 leading-tight mb-1.5">
                          {comment.time}
                        </span>
                        <p className="text-sm text-gray-700 mb-2.5">{comment.commentText}</p>
                        <div className="flex gap-2.5 mb-2.5">
                          {/* Like Button */}
                          <button className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1 py-1 min-w-[78px] justify-center">
                            <img src={arrowUp} alt="Like" />
                            {comment.likes}
                            <img src={arrowDowm} alt="Down" />
                          </button>

                          {/* Comment Button */}
                          <button className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1 py-1 min-w-[78px] justify-center">
                            <img src={commentIcon} alt="" />
                            {comment.postComments}
                          </button>

                          {/* Share Button */}
                          <button className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1 py-1 min-w-[78px] justify-center">
                            <img src={share} alt="Share" />
                            Share
                          </button>

                          {/* Flag Button */}
                          <button className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1 py-1 min-w-[78px] justify-center">
                            <img src={Flagwhite} alt="Flag" />
                            Flag
                          </button>
                        </div>

                        <span className="text-[#007AB2] text-sm">-View 2 replies</span>
                      </div>
                    </div>
                  ))}



                {Comments.length > 3 && !showMoreComments[post.id] && (
                  <p
                    className="text-[#007AB2] font-medium text-sm cursor-pointer"
                    onClick={() =>
                      setShowMoreComments(prev => ({ ...prev, [post.id]: true }))
                    }
                  >
                    Show more Comments
                  </p>
                )}


              </div>

            )}
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
