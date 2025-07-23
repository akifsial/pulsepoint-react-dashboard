import { useEffect, useState } from "react";
import userProfile from "@assets/media/svgs/dashboard-svgs/userProfile.svg";
import arrowUp from "@assets/media/svgs/dashboard-svgs/arrow-up-btn.svg";
import arrowDowm from "@assets/media/svgs/dashboard-svgs/arrow-down-btn.svg";
import share from "@assets/media/svgs/dashboard-svgs/share.svg";
import commentIcon from "@assets/media/svgs/dashboard-svgs/comment.svg";
import Flagwhite from "@assets/media/svgs/dashboard-svgs/flag4.svg";
import Flagblue from "@assets/media/svgs/dashboard-svgs/flag3.svg";
import Save from "@assets/media/svgs/dashboard-svgs/save.svg";
import SaveBlue from "@assets/media/svgs/dashboard-svgs/saveBlue.svg";
import DummyUser from "@assets/media/images/dashboard-images/userDummy.png";
import postImage from "../../../assets/media/images/dashboard-images/postImage.png";
import Model from "@components/Model/Model";
import FlagPost from "./FlagPost";
import SubmitReport from "./SubmitReport";
import ShareModal from "@components/ShareModal";
import {
  ApiLikeComment,
  ApiLikePost,
  ApiParentCommentReply,
  ApiPostComment,
} from "@src/api/ApiCommunityForum";
import { Send } from "lucide-react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import arrowUpTrans from "@assets/media/svgs/dashboard-svgs/arrowUp.svg";
import { useGetCommunityPost, useGetCommunityPostSaved } from "@src/hooks/useCommunity";
import { useGetSingleUser } from "@src/hooks/useCommunity";
import FeedSkeleton from "@components/Loaders/CommunityFeedLoader";

const postList = [
  {
    id: 1,
    community_id: 1,
    postImage: postImage,
    userImage: userProfile,
    userIcon: userProfile,
    userLike: true,

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
    userLike: true,
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
    userLike: false,
    time: "2 hours ago",
    commentText: "I had a similar situation with my grandfather.",
    likes: "12.5K",
    postComments: "1.8K",
  },
  {
    id: 2,
    post_id: 1,
    commenterName: "Alex Smith",
    commenterImage: userProfile,
    time: "1 hour ago",
    userLike: false,
    commentText:
      "It took a lot of patience and showing him how it actually helps.",
    likes: "13.6k",
    postComments: "4.4K",
  },
  {
    id: 3,
    post_id: 1,
    commenterName: "Dante",
    userLike: false,
    commenterImage: userProfile,
    time: "5 hour ago",
    commentText: "It took showing him how it actually helps.",
    likes: "11.8k",
    postComments: "42.4K",
  },
  {
    id: 2,
    post_id: 1,
    commenterName: "Henry",
    userLike: false,

    commenterImage: userProfile,
    time: "6 hour ago",
    commentText: "True, i appreciate",
    likes: "18.6k",
    postComments: "14.4K",
  },
  {
    id: 2,
    post_id: 1,
    commenterName: "Zade",
    userLike: false,

    commenterImage: userProfile,
    time: "1 hour ago",
    commentText: "It took a lot of time...",
    likes: "17.6k",
    postComments: "23.4K",
  },
  {
    id: 2,
    post_id: 1,
    commenterName: "Groover",
    commenterImage: userProfile,
    time: "2 hour ago",
    userLike: true,
    commentText: "It took a lot of patience...",
    likes: "48.6k",
    postComments: "56.4K",
  },
];

const buttons = [
  { btnText: "32k", btnIcon: arrowUp, downarrow: arrowDowm },
  { btnText: "2.2k", btnIcon: commentIcon },
  { btnText: "Share", btnIcon: share },
  { btnText: "Flag", btnIcon: Flagwhite },
];

const SavedCommunityFeed = ({ setOpenBackFeed, setPostIdFeed }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [activePostActions, setActivePostActions] = useState(null);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [showSubmitReport, setShowSubmitReport] = useState(false);
  const [flaggedPost, setFlaggedPost] = useState(null);
  const [openComments, setOpenComments] = useState(null);
  const [sendText, setSendText] = useState("");
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState();
  const [showMoreComments, setShowMoreComments] = useState({});
  const [isLike, setIsLike] = useState([]);
  const [isDislike, setIsDislIke] = useState([]);
  const [commentsId, setCommentsId] = useState([]);
  const [parentCommentReplyValue, setParentCommentReplyValue] = useState("");
  const [shareModal, setShareModal] = useState(false);
  const [parentCommentReplyId, setParentCommentReplyId] = useState([]);
  const { data: postData, isPending: PostsPending } = useGetCommunityPostSaved();
  const [replyId, setReplyId] = useState();
  const myId = JSON.parse(localStorage.getItem("userInfo"));

  // console.log("PARENT", parentiD);

  const toggleComments = (post_id) => {
    setComment("");
    setPostId(post_id);
    setOpenComments(openComments === post_id ? null : post_id);
  };

  const togglePostActions = (index) => {
    setActivePostActions(activePostActions === index ? null : index);
  };

  const filteredPosts = activeTab === "home" ? postList : postList.slice(0, 1);

  const {
    mutateAsync: getSingleUserMutation,
    isPending: getSingleUserIsPending,
  } = useMutation({
    mutationFn: () => useGetSingleUser(),

    onSuccess: async () => {
      toast.success("Get Single User Successfully");
      // queryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleSingleUser = async () => {
    await getSingleUserMutation();
  };

  const queryClient = useQueryClient();

  const { mutateAsync: commentsMutation, isPending: commentsIsPending } =
    useMutation({
      mutationFn: (data) => ApiPostComment(data),

      onSuccess: async () => {
        queryClient.invalidateQueries(["useGetCommunityPost"]);
        toast.success("Comment Posted Successfully");
        setComment("");
      },
      onError: (error) => {
        toast.error("Something Went Wrong");
      },
    });

  const handleComments = async () => {
    const data = {
      content: comment,
      post_id: postId,
    };
    await commentsMutation(data);
  };

  // Like\\

  const { mutateAsync: LikeMutation, isPending: LikeIsPending } = useMutation({
    mutationFn: (data) => ApiLikePost(data),

    onSuccess: async () => {
      queryClient.invalidateQueries(["useGetCommunityPost"]);
      toast.success("Liked Successfully");
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  // const handleReaction = async (status, postId,userLike) => {
  //   let newStatus = "";
  //   if (status == "like") {
  //     if (isLike.includes(postId)) {
  //       newStatus = "";
  //     } else {
  //       setIsLike((prev) => [...prev, postId]); // Adds postId to like array
  //       newStatus = "like";
  //     }
  //   }
  //   if (status == "dislike") {
  //     // setIsDislIke(true);
  //     if (isDislike.includes(postId)) {
  //       newStatus = "";
  //     } else {
  //       setIsDislIke((prev) => [...prev, postId]); // Adds postId to like array
  //       newStatus = "dislike";
  //     }
  //   }

  //   const data = {
  //     type: status,
  //     post_id: postId,
  //   };
  //   await LikeMutation(data);
  // };

  // const handleReaction = async (status, postId) => {
  //   let newStatus = "";

  //   // Toggle Like
  //   if (status === "like") {
  //     if (isLike.includes(postId)) {
  //       // Remove like
  //       setIsLike((prev) => prev.filter((id) => id !== postId));
  //       newStatus = "";
  //     } else {
  //       // Add like, remove dislike
  //       setIsLike((prev) => [...prev, postId]);
  //       setIsDislIke((prev) => prev.filter((id) => id !== postId));
  //       newStatus = "like";
  //     }
  //   }

  //   // Toggle Dislike
  //   if (status === "dislike") {
  //     if (isDislike.includes(postId)) {
  //       // Remove dislike
  //       setIsDislIke((prev) => prev.filter((id) => id !== postId));
  //       newStatus = "";
  //     } else {
  //       // Add dislike, remove like
  //       setIsDislIke((prev) => [...prev, postId]);
  //       setIsLike((prev) => prev.filter((id) => id !== postId));
  //       newStatus = "dislike";
  //     }
  //   }

  //   // Send to API
  //   const data = {
  //     type: newStatus,
  //     post_id: postId,
  //   };

  //   await LikeMutation(data);
  // };

  const handleReaction = async (status, post) => {
    let newStatus = "";

    const alreadyLiked = post.userLike?.is_like === true;
    const alreadyDisliked = post.userLike?.is_like === false;

    if (status === "like") {
      if (alreadyLiked) {
        newStatus = ""; // remove like
      } else {
        newStatus = "like"; // set like
      }
    }

    if (status === "dislike") {
      if (alreadyDisliked) {
        newStatus = ""; // remove dislike
      } else {
        newStatus = "dislike"; // set dislike
      }
    }

    const data = {
      type: newStatus,
      post_id: post.id,
    };

    await LikeMutation(data);
  };
  const handleParentComment = (parentCommentId) => {
    setParentCommentReplyValue("");
    if (parentCommentReplyId.includes(parentCommentId)) {
      // Remove if already active
      setParentCommentReplyId((prev) =>
        prev.filter((id) => id !== parentCommentId)
      );
    } else {
      // Add if not active
      setParentCommentReplyId((prev) => [...prev, parentCommentId]);
    }
  };

  // Parent Comment Reply

  const {
    mutateAsync: ParentCommentReplyMutation,
    // isPending: isPendingParentCommentReply,
  } = useMutation({
    mutationFn: ({ data, commentId }) => ApiParentCommentReply(data, commentId),

    onSuccess: async () => {
      queryClient.invalidateQueries(["useGetCommunityPost"]);
      toast.success("Reply Posted Successfully");
      setComment("");
      setParentCommentReplyValue("");
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleParentCommentReply = async (postId, parentCommentId, id) => {
    console.log("X_________X", id);
    if (id) {
      setReplyId(id);
    }
    const data = {
      content: parentCommentReplyValue,
      post_id: postId,
      parent_id: parentCommentId,
    };
    // await ParentCommentReplyMutation(data,commentId:parentCommentId);
    await ParentCommentReplyMutation({
      data,
      commentId: parentCommentId,
    });
  };

  // MAIN CODE____________________________________

  // const handleCommentReaction = async (status, comment, postId) => {
  //   let newStatus = "";

  //   const alreadyLiked = comment.comment_likes?.some((r) => r.type === "like");
  //   const alreadyDisliked = comment.comment_likes?.some(
  //     (r) => r.type === "dislike"
  //   );

  //   if (status === "like") {
  //     newStatus = alreadyLiked ? "" : "like";
  //   }

  //   if (status === "dislike") {
  //     newStatus = alreadyDisliked ? "" : "dislike";
  //   }

  //   const data = {
  //     post_id: postId,
  //     type: newStatus,
  //   };

  //   await LikeParentCommentMutation({ commentId: comment?.id, data });
  // };

  const { mutateAsync: LikeParentCommentMutation } = useMutation({
    // mutationFn: ({commentId,data}) => ApiLikePost(data),
    mutationFn: ({ commentId, data }) => ApiLikeComment(commentId, data),

    onSuccess: async () => {
      queryClient.invalidateQueries(["useGetCommunityPost"]);
      toast.success("Liked Successfully");
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleCommentReaction = async (status, comment, postId) => {
    console.log("commment", comment);

    let newStatus = "";

    // const alreadyLiked = comment?.comment_likes === true;
    // const alreadyLiked = comment?.comment_likes.length > 0 ? true : false;
    // const alreadyDisliked = comment?.comment_likes.length == 0 ? true : false;

    const alreadyLiked = comment?.comment_likes.filter(
      (item) => item.user_id == myId?.id
    );

    // console.log("alread", alreadyLiked[0]);

    //     const alreadyDislike = comment?.comment_likes.some(
    //   (item) => item.user_id == myId?.id
    // );

    console.log("yessssssssssssssssss already liked", alreadyLiked);

    if (status === "like") {
      if (alreadyLiked[0]?.is_like) {
        newStatus = ""; // remove like
      } else {
        newStatus = "like"; // set like
      }
    }

    if (status === "dislike") {
      if (alreadyLiked[0]?.is_like == false) {
        newStatus = ""; // remove dislike
      } else {
        newStatus = "dislike"; // set dislike
      }
    }

    const data = {
      post_id: postId,
      type: newStatus,
    };

    // const data = {
    //   type: newStatus,
    //   // post_id: post.id,
    // };

    await LikeParentCommentMutation({ commentId: comment?.id, data });
  };

  // MAIN CODE____________________________________

  return (
    <div
      className=" h-[661px] overflow-y-auto transition-colors duration-300"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {PostsPending ? <FeedSkeleton /> : ""}
      {postData?.records?.map((post, index) => (
        <div key={index} className="post mb-6 relative last:m-0">
          <div className="post_content bg-white rounded-[10px] p-4 relative">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={DummyUser}
                    className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
                    alt=""
                  />
                  <span className="absolute bottom-2 right-0 w-2 h-2 bg-[#52C343] rounded-full shadow-[0_0_0_2px_white]" />
                </div>
                <div className="flex flex-col">
                  <p
                    className="font-semibold mb-1 text-[#252525] leading-tight cursor-pointer"
                    onClick={() => {
                      setOpenBackFeed(true);
                      setPostIdFeed(post.id);
                      {
                        handleSingleUser;
                      }
                    }}
                  >
                    {post?.user?.first_name}
                    {post?.user?.last_name}
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
                {post?.content} <span className="text-[#868686]"></span>
              </p>
            </div>

            <div className="mb-2.5">
              <img
                src={`${import.meta.env.VITE_APP_API_IMG_URL}${post?.image}`}
                alt=""
                className="rounded-md"
              />
            </div>

            <div className="flex gap-2.5 mb-2.5">
              <div className="flex gap-2.5 mb-2.5">
                {/* Likes Button */}
                {/* <div className="flex items-center cursor-pointer gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center">
                  <button
                    onClick={() =>
                      handleReaction("like", post.id, post.userLike)
                    }
                    className="flex items-center cursor-pointer gap-1 bg-[#E6E9EB] rounded-[32px] min-w-[40px]  justify-center"
                  >
                    {isLike.includes(post.id) ? (
                      <div className="bg-black-500 p-2 rounded-full">
                        <img src={arrowUpTrans} alt="Likes" />
                      </div>
                    ) : post.userLike ? (
                      <div className="bg-black p-2 rounded-full">
                        <img src={arrowUpTrans} alt="Likes" />
                      </div>
                    ) : (
                      <img
                        className="text-black"
                        src={arrowUpTrans}
                        alt="Likes"
                      />
                    )}

                    {post?.like_count}
                  </button>

                  <button
                    onClick={() =>
                      handleReaction("dislike", post.id, post.userLike)
                    }
                    className="flex items-center cursor-pointer gap-2 bg-[#E6E9EB] rounded-[32px]  min-w-[40px] justify-center"
                  >
                    {isDislike.includes(post.id) ? (
                      <div className="bg-black-500">
                        <img src={arrowUpTrans} alt="Likes" />
                      </div>
                    ) : post.userLike == false ? (
                      <div className="bg-black-500">
                        <img src={arrowUpTrans} alt="Likes" />
                      </div>
                    ) : (
                      <img src={arrowUpTrans} alt="Likes" />
                    )}
                  </button>
                </div> */}

                <div className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center">
                  {/* Like Button */}
                  <button
                    disabled={LikeIsPending}
                    onClick={() => handleReaction("like", post)}
                    className="flex items-center gap-1 min-w-[40px] justify-center"
                  >
                    {post.userLike?.is_like === true ? (
                      <div className="bg-black p-1.5 rounded-full">
                        <img src={arrowUpTrans} alt="Liked" />
                      </div>
                    ) : (
                      <img src={arrowUpTrans} alt="Like" />
                    )}
                    {post?.like_count}
                  </button>

                  {/* Dislike Button */}
                  <button
                    disabled={LikeIsPending}
                    onClick={() => handleReaction("dislike", post)}
                    className="flex items-center gap-2 min-w-[40px] justify-center"
                  >
                    {post.userLike?.is_like === false ? (
                      <div className="bg-black p-2 rounded-full">
                        <img src={arrowUpTrans} alt="Disliked" />
                      </div>
                    ) : (
                      <img src={arrowUpTrans} alt="Dislike" />
                    )}
                  </button>
                </div>

                {/* Comments Button */}
                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center cursor-pointer gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center"
                >
                  <img src={commentIcon} alt="Comments" />
                  {post?.comment_count}
                </button>

                {/* Share Button */}
                <button
                  onClick={() => setShareModal(true)}
                  className="flex items-center cursor-pointer gap-2 bg-[#E6E9EB] rounded-[32px] px-1 py-1 min-w-[78px] justify-center"
                >
                  <img src={share} alt="Share" />
                  Share
                </button>
              </div>
              {shareModal && (
                <ShareModal onClose={() => setShareModal(false)} />
              )}
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
                    className={`absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center w-9 h-9 rounded-full transition ${
                      comment
                        ? "bg-[#007AB2] hover:bg-[#005f8e] cursor-pointer"
                        : "bg-gray-300"
                    }`}
                    onClick={handleComments}
                  >
                    {PostsPending ? (
                      "Loading..."
                    ) : (
                      <Send className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                </div>

                {post?.comments
                  ?.slice(0, showMoreComments[post.id] ? undefined : 3)
                  .map((comment, key) => {
                    // const isAlreadyLike = comment?.comment_likes.some(
                    //   (item) => item.user_id == myId?.id
                    // );

                    const isAlreadyLike = comment?.comment_likes.filter(
                      (item) => item.user_id == myId?.id
                    );

                    console.log(
                      "Filterrr++++++++++++rr",
                      isAlreadyLike[0]?.is_like
                    );
                    return (
                      <div key={key} className="flex items-start gap-3 mb-3">
                        <img
                          src={DummyUser}
                          className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200 flex-none"
                          alt="userIcon"
                        />
                        <div className="flex flex-col mb-1 text-[#252525] leading-tight font-normal">
                          <p className="font-semibold">
                            {comment?.user?.first_name}{" "}
                            {comment?.user?.last_name}
                          </p>

                          <span className="text-[12px] text-gray-500 leading-tight mb-1.5">
                            {/* {comment.time} */}
                          </span>
                          <p className="text-sm text-gray-700 mb-2.5">
                            {comment.content}
                          </p>
                          <div className="flex gap-2.5 mb-2.5">
                            {/* <button className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1 py-1 min-w-[78px] justify-center">
                            <img src={arrowUp} alt="Like" />
                            12
                            <img src={arrowDowm} alt="Down" />
                          </button> */}

                            {/* -----------------LIKE BTNS REPLY---------------- */}
                            <div className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center">
                              {/* Like Button */}
                              {/* <button
                              disabled={LikeIsPending}
                              onClick={() =>
                                handleCommentReply("like", comment, post.id)
                              }
                              className="flex items-center gap-1 min-w-[40px] justify-center"
                            >
                              {comment?.comment_likes.some((item)=>(item?.user_id)) === myId ? (
                                <div className="bg-black p-1.5 rounded-full">
                                  <img className="bg-red-500 p-2" src={arrowUpTrans} alt="Liked" />
                                </div>
                              ) : (
                                <img  src={arrowUpTrans} alt="Like" />
                              )}
                              {post?.like_count}
                            </button> */}

                              <button
                                disabled={LikeIsPending}
                                onClick={() => {
                                  handleCommentReaction(
                                    "like",
                                    comment,
                                    post.id
                                  );
                                  // console.log("12345",comment?.comment_likes.filter((item)=>(item.id==myId?.id)))
                                  // console.log("12345",myId.id)
                                  // console.log("$$$$$$$$$$$$44444",comment?.comment_likes.filter((item)=>(item.id==myId?.id)))
                                  // console.log("$$$$$$$$$$$$44444",comment?.comment_likes.filter((item)=>(item.user_id==myId?.id)))

                                  // console.log("asdasdasdasdasda",isAlreadyLike)
                                }}
                                className="flex items-center gap-1 min-w-[40px] justify-center"
                              >
                                {isAlreadyLike[0]?.is_like ? (
                                  <div className="bg-black p-1.5 rounded-full">
                                    <img
                                      // className="bg-red-500 p-2"
                                      src={arrowUpTrans}
                                      alt="Liked"
                                    />
                                  </div>
                                ) : (
                                  <img src={arrowUpTrans} alt="Like" />
                                )}
                                {post?.like_count}
                              </button>

                              {/* Dislike Button */}
                              <button
                                disabled={LikeIsPending}
                                onClick={() =>
                                  handleCommentReaction(
                                    "dislike",
                                    comment,
                                    post.id
                                  )
                                }
                                className="flex items-center gap-2 min-w-[40px] justify-center"
                              >
                                {isAlreadyLike[0]?.is_like == false ? (
                                  <div className="bg-black p-1.5 rounded-full">
                                    <img src={arrowUpTrans} alt="Disliked" />
                                  </div>
                                ) : (
                                  <img src={arrowUpTrans} alt="Dislike" />
                                )}
                              </button>
                            </div>
                            {/* -----------------LIKE BTNS REPLY---------------- */}

                            <button
                              onClick={() => handleParentComment(comment.id)}
                              className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1 py-1 min-w-[78px] justify-center"
                            >
                              <img src={commentIcon} alt="" />
                            </button>
                          </div>

                          {/* ------------------------- Parent Reply Comment --------------------------- */}

                          {parentCommentReplyId.includes(comment?.id) ? (
                            <>
                              <div className="relative mb-3">
                                <input
                                  type="text"
                                  value={parentCommentReplyValue}
                                  onChange={(e) =>
                                    setParentCommentReplyValue(e.target.value)
                                  }
                                  placeholder="Reply..."
                                  className="w-full bg-white outline-none border border-gray-300 rounded-[32px] py-3 pr-14 pl-6 text-sm"
                                />

                                <button
                                  disabled={!comment}
                                  className={`absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center w-9 h-9 rounded-full transition ${
                                    comment
                                      ? "bg-[#007AB2] hover:bg-[#005f8e] cursor-pointer"
                                      : "bg-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleParentCommentReply(
                                      post?.id,
                                      comment?.id
                                    )
                                  }
                                >
                                  {PostsPending ? (
                                    "Loading..."
                                  ) : (
                                    <Send className="w-3.5 h-3.5 text-white" />
                                  )}
                                </button>
                              </div>
                              {/* REPLYS */}
                              {comment?.comment_replies.map((commentReply) => (
                                <div
                                  // key={key}
                                  className="flex items-start gap-3 mb-3"
                                >
                                  <img
                                    src={DummyUser}
                                    className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200 flex-none"
                                    alt="userIcon"
                                  />
                                  <div className="flex flex-col mb-1 text-[#252525] leading-tight font-normal">
                                    <p className="font-semibold">
                                      {comment?.user?.first_name}{" "}
                                      {comment?.user?.last_name}
                                    </p>

                                    <span className="text-[12px] text-gray-500 leading-tight mb-1.5">
                                      {/* {comment.time} */}
                                    </span>
                                    <p className="text-sm text-gray-700 mb-2.5">
                                      {commentReply?.content}
                                    </p>
                                    <div className="flex gap-2.5 mb-2.5">
                                      {/* Like Button */}
                                      <button className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1 py-1 min-w-[78px] justify-center">
                                        <img src={arrowUp} alt="Like" />
                                        {/* {comment.likes} */}
                                        12
                                        <img src={arrowDowm} alt="Down" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleParentCommentReply(
                                            post.id,
                                            commentReply?.parent_id,
                                            commentReply?.id
                                          )
                                        }
                                        className="flex items-center cursor-pointer gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center"
                                      >
                                        <img src={commentIcon} alt="Comments" />
                                        {post?.comment_count}xxxxxxxxxxxxxx
                                      </button>
                                    </div>
                                    {replyId == commentReply?.id ? (
                                      <div className="">
                                        <div className="bg-red-500 relative mb-3">
                                          <input
                                            type="text"
                                            value={parentCommentReplyValue}
                                            onChange={(e) =>
                                              setParentCommentReplyValue(
                                                e.target.value
                                              )
                                            }
                                            placeholder="Reply..."
                                            className="w-full bg-white outline-none border border-gray-300 rounded-[32px] py-3 pr-14 pl-6 text-sm"
                                          />

                                          <button
                                            disabled={!comment}
                                            className={`absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center w-9 h-9 rounded-full transition ${
                                              comment
                                                ? "bg-[#007AB2] hover:bg-[#005f8e] cursor-pointer"
                                                : "bg-gray-300"
                                            }`}
                                            onClick={() =>
                                              handleParentCommentReply(
                                                post?.id,
                                                comment?.id
                                              )
                                            }
                                          >
                                            {PostsPending ? (
                                              "Loading..."
                                            ) : (
                                              <Send className="w-3.5 h-3.5 text-white" />
                                            )}
                                          </button>
                                        </div>
                                        <h1>fucii</h1>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ))}
                              {/* REPLYS */}
                            </>
                          ) : (
                            ""
                          )}
                          {/* ----------------------- Reply Comment -------------------------- */}

                          {/* <span className="text-[#007AB2] text-sm">
                          -View 2 replies
                        </span> */}
                        </div>
                      </div>
                    );
                  })}

                {post?.comments?.length > 3 && !showMoreComments[post.id] && (
                  <p
                    className="text-[#007AB2] font-medium text-sm cursor-pointer"
                    onClick={() =>
                      setShowMoreComments((prev) => ({
                        ...prev,
                        [post.id]: true,
                      }))
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

export default SavedCommunityFeed;
