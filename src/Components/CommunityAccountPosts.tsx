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
import Model from "@src/components/Model/Model";
// import FlagPost from "./FlagPost";
import FlagPost from "./CareProvider/CommunityForum/FlagPost";
import SubmitReport from "./CareProvider/CommunityForum/SubmitReport";
import ShareModal from "@src/components/ShareModal";
import {
  ApiDeleteComment,
  ApieSaveCreatePost,
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
import { useGetCommunityPost } from "@src/hooks/useCommunity";
import { useGetSingleUser } from "@src/hooks/useCommunity";
import FeedSkeleton from "@src/components/Loaders/CommunityFeedLoader";
import { CommentItem } from "./CareProvider/CommunityForum/CommentBlock";
import DropdownActions from "@src/components/Dashboard-components/Dropdown-actions/DropdownActions";

const CommunityAccountPosts = ({ setOpenBackFeed, setPostIdFeed, data }) => {
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
  const [replyButton, setReplyButton] = useState();
  const [parentCommentReplyValue, setParentCommentReplyValue] = useState("");
  const [shareModal, setShareModal] = useState(false);
  const [parentCommentReplyId, setParentCommentReplyId] = useState([]);
  const { data: postData, isPending: PostsPending } = useGetCommunityPost();
  const [replyId, setReplyId] = useState();
  const myId = JSON.parse(localStorage.getItem("userInfo"));
  const [replyInput, setReplyInput] = useState("");
  const [IsCommentReply, setIsCommentReply] = useState();
  const [replyParentId, setReplyParentId] = useState();

  const toggleComments = (post_id) => {
    setComment("");
    setPostId(post_id);
    setOpenComments(openComments === post_id ? null : post_id);
  };

  const togglePostActions = (index) => {
    setActivePostActions(activePostActions === index ? null : index);
  };

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
      // toast.success("Liked Successfully");
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

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
      // toast.success("Reply Posted Successfully");
      setComment("");
      setParentCommentReplyValue("");
    },
    onError: (error) => {
      // toast.error("Something Went Wrong");
    },
  });

  const handleParentCommentReply = async (postId, parentCommentId, id) => {
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

  const { mutateAsync: LikeParentCommentMutation } = useMutation({
    // mutationFn: ({commentId,data}) => ApiLikePost(data),
    mutationFn: ({ commentId, data }) => ApiLikeComment(commentId, data),

    onSuccess: async () => {
      queryClient.invalidateQueries(["useGetCommunityPost"]);
      // toast.success("Liked Successfully");
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });
  // ___________________
  // const handleCommentReaction = async (status, comment, postId) => {
  //   let newStatus = "";

  //   // const alreadyLiked = comment?.comment_likes?.filter(
  //   //   (item) => item.user_id == myId?.id
  //   // );

  //   // const alreadyLiked = comment?.userLike?.filter(
  //   //   (item) => item.is_like == myId?.id
  //   // );

  //   // const alreadyLiked =
  //   //   Array.isArray(comment?.userLike) &&
  //   //   comment.userLike.length > 0
  //   //     ? comment.userLike[0].is_like
  //   //     : null;

  //   if (status === "like") {
  //     if (comment?.userLike?.is_like==true ) {
  //       newStatus = ""; // remove like
  //     } else {
  //       newStatus = "like"; // set like
  //     }
  //   }

  //   if (status === "dislike") {
  //     if (comment?.userLike?.is_like == true || comment?.userLike==null ) {
  //       // newStatus = ""; // remove dislike
  //       newStatus = "dislike"; // set dislike
  //     } else {
  //       newStatus = ""; // remove dislike
  //     }
  //   }

  //   const data = {
  //     post_id: postId,
  //     type: newStatus,
  //   };

  //   // const data = {
  //   //   type: newStatus,
  //   //   // post_id: post.id,
  //   // };

  //   await LikeParentCommentMutation({ commentId: comment?.id, data });
  // };

  // MAIN CODE____________________________________
  // ___________________

  const handleCommentReaction = async (status, comment, postId) => {
    let newStatus = "";

    const userLike = comment?.userLike;

    if (status === "like") {
      if (userLike?.is_like === true) {
        newStatus = ""; // remove like
      } else {
        newStatus = "like"; // add like or switch from dislike
      }
    }

    if (status === "dislike") {
      if (userLike?.is_like === false) {
        newStatus = "";
      } else {
        newStatus = "dislike";
      }
    }

    const data = {
      post_id: postId,
      type: newStatus,
    };

    await LikeParentCommentMutation({ commentId: comment?.id, data });
  };

  const { mutateAsync: savePostMutation, isPending: isLoadingSavePost } =
    useMutation({
      mutationFn: (data) => ApieSaveCreatePost(data),

      onSuccess: async () => {
        toast.success("Post Saved Successfully");
        queryClient.invalidateQueries(["useGetCommunityPost"]);

        setComment("");
      },
      onError: (error) => {
        toast.error("Something Went Wrong");
      },
    });

  const handleSavePost = async (postId) => {
    const data = {
      post_id: postId,
    };
    await savePostMutation(data);
  };

  const {
    mutateAsync: deleteCommentMutation,
    // isPending: savedCareProvidersPending,
  } = useMutation({
    mutationFn: (commentId, post_id) => ApiDeleteComment(commentId, post_id),

    onSuccess: async () => {
      toast.success("Comment Deleted Successfully");
      queryClient.invalidateQueries(["useGetCommunityPost"]); // refetch list
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleDeleteComment = async (commentId, postId) => {
    const post_id = {
      post_id: postId,
    };
    await deleteCommentMutation(commentId, post_id);
  };

  return (
    <div
      className=" h-[661px] overflow-y-auto md:mb-0 mb-8 transition-colors duration-300"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {PostsPending ? <FeedSkeleton /> : ""}
      {data?.data?.community_posts?.length == 0 ? (
        <div className="flex justify-center h-full mt-[50px]">
          <h2>Nothing here yet!</h2>
        </div>
      ) : (
        data?.data?.community_posts?.map((post, index) => (
          <div key={index} className="post mb-6 relative last:m-0">
            <div className="post_content bg-white rounded-[10px] p-4 relative">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={
                        post?.user?.image
                          ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                              post?.user?.image
                            }`
                          : DummyUser
                      }
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
                      {post?.user?.first_name}{" "}
                      <span>{post?.user?.last_name}</span>
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
                    .map((comment) => (
                      <div className="flex items-center">
                        <CommentItem
                          key={comment.id}
                          comment={comment}
                          myId={myId}
                          postId={post.id}
                          LikeIsPending={LikeIsPending}
                          PostsPending={PostsPending}
                          handleCommentReaction={handleCommentReaction}
                          parentCommentReplyId={parentCommentReplyId}
                          handleParentComment={handleParentComment}
                          parentCommentReplyValue={parentCommentReplyValue}
                          setParentCommentReplyValue={
                            setParentCommentReplyValue
                          }
                          handleParentCommentReply={handleParentCommentReply}
                          IsCommentReply={IsCommentReply}
                          setIsCommentReply={setIsCommentReply}
                          replyId={replyId}
                          setReplyParentId={setReplyParentId}
                        />

                        <div className="bg-grey-500 mb-20 cursor-pointer">
                          <DropdownActions
                            onDelete={() =>
                              handleDeleteComment(comment?.id, post?.id)
                            }
                            variant="simple"
                          />
                        </div>
                      </div>
                    ))}
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
                    onClick={() => handleSavePost(post.id)}
                    className="group w-full text-left pl-[10px] pr-5.5 text-sm py-2.5 hover:bg-[#E7F2F9] rounded-[5px] flex items-center gap-2"
                  >
                    {post?.savedPostUser == null ? (
                      <span className="inline-block ">
                        <img src={Save} alt="Save" />
                      </span>
                    ) : (
                      <span className="">
                        <img src={SaveBlue} alt="SaveBlue" />
                      </span>
                    )}
                    Save Post
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}

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

export default CommunityAccountPosts;
