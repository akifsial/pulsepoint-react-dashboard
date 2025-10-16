import { useEffect, useState, useRef } from "react";
import userProfile from "@assets/media/svgs/dashboard-svgs/userProfile.svg";
// import arrowUp from "@assets/media/svgs/dashboard-svgs/arrow-up-btn.svg";
import arrowDowm from "@assets/media/svgs/dashboard-svgs/arrow-down-btn.svg";
import arrowUp from "@assets/media/svgs/arrowUp.svg";
import share from "@assets/media/svgs/dashboard-svgs/share.svg";
import commentIcon from "@assets/media/svgs/dashboard-svgs/comment.svg";
import Flagwhite from "@assets/media/svgs/dashboard-svgs/flag4.svg";
import Flagblue from "@assets/media/svgs/dashboard-svgs/flag3.svg";
import Save from "@assets/media/svgs/dashboard-svgs/save.svg";
import SaveBlue from "@assets/media/svgs/dashboard-svgs/saveBlue.svg";
import DummyUser from "@assets/media/images/dashboard-images/userDummy.png";
import arrowDown from "@assets/media/svgs/arrowDown.svg";
import postImage from "../../../assets/media/images/dashboard-images/postImage.png";
import Model from "@components/model/model";
import FlagPost from "./flag-post";
import SubmitReport from "./submit-report";
import ShareModal from "@components/share-modal";
import {
  ApiDeleteComment,
  ApiDeletePost,
  ApieSaveCreatePost,
  ApiLikeComment,
  ApiLikePost,
  ApiParentCommentReply,
  ApiPostComment,
} from "@src/api/api-community-forum";
import { Loader, Send } from "lucide-react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import arrowUpTrans from "@assets/media/svgs/dashboard-svgs/arrowUp.svg";
import {
  useGetCommunityPost,
  useGetSingleCommunityPost,
} from "@src/hooks/use-community";
import { useGetSingleUser } from "@src/hooks/use-community";
import FeedSkeleton from "@components/loaders/community-feed-loader";
import { CommentItem } from "./comment-block";
import DropdownActions from "@components/dashboard-components/dropdown-actions/dropdown-actions";
import DeleteModal from "@components/model/delete-modal";
import Spinner from "@components/loaders/spinner";
import PostContent from "@components/post-content";
import { useParams } from "react-router-dom";

const CommunitySinglePost = ({ setOpenBackFeed, setPostIdFeed, data }) => {
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
  const {id}=useParams()

  const { data: singlePostData } = useGetSingleCommunityPost(id);

  const {
    data: postData,
    isPending: PostsPending,
    isLoading,
  } = useGetCommunityPost();


  const [replyId, setReplyId] = useState();
  const myId = JSON.parse(localStorage.getItem("userInfo"));
  const [replyInput, setReplyInput] = useState("");
  const [IsCommentReply, setIsCommentReply] = useState();
  const [isPosting, setIsPosting] = useState(false);
  const [replyParentId, setReplyParentId] = useState();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState();

  const menuRef = useRef(null);

  const handleSendComment = async () => {
    if (!comment.trim() || !postId) return;

    const data = {
      content: comment,
      post_id: postId,
    };

    await commentsMutation(data);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActivePostActions(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      // toast.error("Something Went Wrong");
    },
  });

  const [localLikes, setLocalLikes] = useState<{
    [postId: number]: boolean | null;
  }>({});

  useEffect(() => {
    const initialState: { [postId: number]: boolean | null } = {};
    // postData?.records?.forEach((post) => {
    initialState[singlePostData?.id] =
      singlePostData?.userLike?.is_like ?? null;
    // });
    setLocalLikes(initialState);
  }, [postData]);

  const [localLock, setLocalLock] = useState(false);

  const handleReaction = async (status: "like" | "dislike", post) => {
    setLocalLikes((prev) => {
      const current = prev[post.id] ?? null;

      if (status === "like") {
        return { ...prev, [post.id]: current === true ? null : true };
      } else {
        return { ...prev, [post.id]: current === false ? null : false };
      }
    });

    setLocalLock(true);
    setTimeout(() => setLocalLock(false), 2000); // 500ms lock

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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // clears the input
    }
  };

  // Parent Comment Reply

  const {
    mutateAsync: ParentCommentReplyMutation,
    // isPending: isPendingParentCommentReply,
  } = useMutation({
    mutationFn: ({ data, commentId }) => ApiParentCommentReply(data, commentId),

    onSuccess: async () => {
      handleClear();

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
      // toast.error("Something Went Wrong");
    },
  });

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
        toast.success("Post Updated!");
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
      // toast.error("Something Went Wrong");
    },
  });

  const handleDeleteComment = async (commentId, postId) => {
    const post_id = {
      post_id: postId,
    };
    await deleteCommentMutation(commentId, post_id);
  };

  const {
    mutateAsync: deletePostMutation,
    // isPending: savedCareProvidersPending,
  } = useMutation({
    mutationFn: () => ApiDeletePost(deleteModalId),

    onSuccess: async () => {
      toast.success("Post Deleted Successfully");
      setIsDeleteModal(false);
      queryClient.invalidateQueries(["useGetCommunityPost"]); // refetch list
    },
    onError: (error) => {
      // toast.error("Something Went Wrong");
    },
  });

  const handleDeletePost = async () => {
    await deletePostMutation();
  };

  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;

  const postsToRender = data?.data ?? postData?.records ?? [];
  return (
    <div
      className={` transition-colors h-[400px] w-full duration-300 ${
        postData?.records?.length > 0 ? "h-[661px] overflow-y-auto" : ""
      } `}
      // style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {PostsPending ? (
        <FeedSkeleton />
      ) : postsToRender?.length == 0 ? (
        <div className="flex justify-center h-full mt-[50px]">
          <h2>Nothing here yet!</h2>
        </div>
      ) : (
        <div key={1} className="post mb-6 relative last:m-0">
          <div className="post_content bg-white rounded-[10px]  p-4 relative ">
            <div className="flex justify-between items-center  mb-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* {
                      post?.user?.image ? 
                    } */}
                  <img
                    src={
                      singlePostData?.user?.image
                        ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                            singlePostData?.user?.image
                          }`
                        : DummyUser
                    }
                    className="w-[43px] h-[43px] rounded-full !object-cover border border-gray-200"
                    alt=""
                  />
                  {singlePostData?.user?.is_online ? (
                    <span className="absolute bottom-2 right-0 w-2 h-2 bg-[#52C343] rounded-full shadow-[0_0_0_2px_white]" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col">
                  <p
                    className="font-semibold mb-1 text-[#252525] leading-tight "
                    // onClick={() => {
                    //   setOpenBackFeed(true);
                    //   setPostIdFeed(post.id);
                    //   {
                    //     handleSingleUser;
                    //   }
                    // }}
                  >
                    {singlePostData?.user?.first_name
                      ? singlePostData?.user?.first_name
                      : ""}
                    {singlePostData?.user?.last_name ? (
                      <span>{singlePostData?.user?.last_name}</span>
                    ) : (
                      ""
                    )}
                    {/* <span>{post?.user?.last_name}</span> */}
                    {singlePostData?.user?.organization_name
                      ? singlePostData?.user?.organization_name
                      : ""}{" "}
                  </p>
                  <span className="text-sm text-gray-500 leading-tight">
                    {singlePostData?.userPost}
                  </span>
                </div>
              </div>
              <button
                className="cursor-pointer relative z-20"
                onClick={
                  () =>
                    setActivePostActions(
                      activePostActions === singlePostData?.id
                        ? null
                        : singlePostData?.id
                    )
                  // handle
                }
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
                {singlePostData?.title}
              </h3>
              <p>
                {/* {post?.content} <span className="text-[#868686]"></span> */}
                <PostContent content={singlePostData?.content} />
              </p>
            </div>
            {singlePostData?.image ? (
              <div className="mb-2.5 max-h-[500px]">
                <img
                  src={`${import.meta.env.VITE_APP_API_IMG_URL}${
                    singlePostData?.image
                  }`}
                  alt=""
                  loading="lazy"
                  className="rounded-md w-full h-[400px] object-cover"
                />
              </div>
            ) : (
              ""
            )}

            <div className="flex gap-2.5 mb-2.5">
              <div className="flex gap-2.5 mb-2.5">
                <div className="flex items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center">
                  {/* Like Button */}
                  {/* <button
                      disabled={LikeIsPending}
                      onClick={() => handleReaction("like", post)}
                      className="flex items-center gap-2 min-w-[40px] justify-center"
                    >
                      {post.userLike?.is_like === true ? (
                        <div className="bg-black p-2 rounded-full">
                          <img
                            src={arrowUp}
                            className="py-0.5 px-1"
                            alt="Liked"
                          />
                        </div>
                      ) : (
                        <img
                          src={arrowDowm}
                          className="rotate-180"
                          alt="Like"
                        />
                      )}
                      {post?.like_count}
                    </button> */}

                  {/* Dislike Button */}
                  {/* <button
                      disabled={LikeIsPending}
                      onClick={() => handleReaction("dislike", post)}
                      className="flex items-center gap-2 min-w-[40px] justify-center"
                    >
                      {post.userLike?.is_like === false ? (
                        <div className="bg-black p-1 rounded-full">
                          <img
                            src={arrowUp}
                            className="rotate-180 py-1.5 px-2"
                            alt="Dislike"
                          />
                        </div>
                      ) : (
                        <img src={arrowDowm} alt="Dislike" />
                      )}
                    </button> */}

                  <button
                    className={`flex cursor-pointer items-center gap-2 min-w-[40px] justify-center 
                      `}
                    onClick={() => handleReaction("like", singlePostData)}
                    disabled={localLock || LikeIsPending || PostsPending} // include the 500ms lock
                  >
                    {localLikes[singlePostData?.id] === true ? (
                      <div className="bg-black p-2 rounded-full">
                        <img
                          src={arrowUp}
                          className="py-0.5 px-1"
                          alt="Liked"
                        />
                      </div>
                    ) : (
                      <img src={arrowDowm} className="rotate-180" alt="Like" />
                    )}
                    {/* {post._count?.likes +
                        (localLikes[post.id] === true ? 1 : 0)} */}
                    {singlePostData?._count?.likes}
                  </button>

                  <button
                    className="flex cursor-pointer items-center gap-2 min-w-[40px] justify-center"
                    onClick={() => handleReaction("dislike", singlePostData)}
                    // disabled={LikeIsPending && PostsPending}
                    disabled={localLock || LikeIsPending || PostsPending} // include the 500ms lock
                  >
                    {localLikes[singlePostData?.id] === false ? (
                      <div className="bg-black p-1 rounded-full">
                        <img
                          src={arrowUp}
                          className="rotate-180 py-1.5 px-2"
                          alt="Dislike"
                        />
                      </div>
                    ) : (
                      <img src={arrowDowm} alt="Dislike" />
                    )}
                  </button>
                </div>

                {/* Comments Button */}
                <button
                  onClick={() => toggleComments(singlePostData?.id)}
                  className="flex items-center cursor-pointer gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center"
                >
                  <img src={commentIcon} alt="Comments" />
                  {singlePostData?._count?.comments}
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
                <ShareModal postId={singlePostData?.id} onClose={() => setShareModal(false)} />
              )}
            </div>
            {openComments === singlePostData?.id && (
              <div>
                <div className="relative mb-3">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Join the conversation"
                    className="w-full bg-white outline-none border border-gray-300 rounded-[32px] py-3 pr-14 pl-6 text-sm"
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        comment.trim() &&
                        !commentsIsPending
                      ) {
                        e.preventDefault();
                        handleSendComment();
                      }
                    }}
                  />

                  <button
                    disabled={!comment || commentsIsPending}
                    className={`absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center w-9 h-9 rounded-full transition ${
                      comment
                        ? "bg-[#007AB2] hover:bg-[#005f8e] cursor-pointer"
                        : "bg-gray-300"
                    }`}
                    onClick={handleComments}
                  >
                    {commentsIsPending ? (
                      <Spinner />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                </div>

                {singlePostData?.comments?.map((comment) => (
                  <div className="flex  items-center">
                    <CommentItem
                      // key={comment.id}
                      comment={comment}
                      myId={myId}
                      postId={singlePostData.id}
                      LikeIsPending={LikeIsPending}
                      PostsPending={PostsPending}
                      handleCommentReaction={handleCommentReaction}
                      parentCommentReplyId={parentCommentReplyId}
                      handleParentComment={handleParentComment}
                      parentCommentReplyValue={parentCommentReplyValue}
                      setParentCommentReplyValue={setParentCommentReplyValue}
                      handleParentCommentReply={handleParentCommentReply}
                      IsCommentReply={IsCommentReply}
                      setIsCommentReply={setIsCommentReply}
                      replyId={replyId}
                      setReplyParentId={setReplyParentId}
                      handleDeleteComment={handleDeleteComment}
                      inputRef={inputRef}
                    />

                    {/* <div className="bg-grey-500 mb-20 cursor-pointer">
                          <DropdownActions
                            // onView={() => console.log("View Detail")}
                            // onEdit={() => console.log("Edit Detail")}
                            onDelete={() =>
                              handleDeleteComment(comment?.id, post?.id)
                            }
                            variant="simple"
                          />
                        </div> */}

                    {/* </div> */}
                  </div>
                ))}
                {/* YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY */}
              </div>
            )}
            {activePostActions === singlePostData?.id && (
              <div
                ref={menuRef}
                className="absolute top-14 right-4 bg-white border border-gray-300 rounded-[10px] shadow-md p-1.5 z-50"
              >
                {/* ✅ Flag Post Button */}
                <button
                  disabled={singlePostData?.postFlag}
                  onClick={() => {
                    if (singlePostData?.postFlag == null) {
                      setFlaggedPost({
                        ...singlePostData,
                        post_id: singlePostData.id,
                        community_id: singlePostData.community_id,
                      });
                      setIsFlagModalOpen(true);
                      setShowSubmitReport(false);
                    }
                  }}
                  className={`group w-full text-left pl-[10px] pr-5.5 text-sm py-2.5 rounded-[5px] flex items-center gap-2 mb-0.5
    ${
      singlePostData?.postFlag
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "hover:bg-[#E7F2F9] cursor-pointer"
    }`}
                >
                  <span className="inline-block group-hover:hidden">
                    <img src={Flagwhite} alt="Flagwhite" />
                  </span>
                  <span className="hidden group-hover:inline-block">
                    <img src={Flagblue} alt="Flagblue" />
                  </span>
                  {singlePostData?.postFlag ? "Already Reported" : "Flag Post"}
                </button>

                {/* ✅ Save / Unsave Post Button */}
                <button
                  onClick={() => handleSavePost(singlePostData.id)}
                  className="group cursor-pointer w-full text-left pl-[10px] pr-5.5 text-sm py-2.5 hover:bg-[#E7F2F9] rounded-[5px] flex items-center gap-2"
                >
                  {singlePostData?.savedPostUser == null ? (
                    <span className="inline-block">
                      <img src={Save} alt="Save" />
                    </span>
                  ) : (
                    <span>
                      <img src={SaveBlue} alt="SaveBlue" />
                    </span>
                  )}
                  {singlePostData?.savedPostUser ? "Unsave Post" : "Save Post"}
                </button>

                {userId == singlePostData?.user_id ? (
                  <button
                    // onClick={() => handleDeletePost(post.id)}
                    onClick={() => {
                      setIsDeleteModal(true);
                      setDeleteModalId(singlePostData?.id);
                    }}
                    className="group cursor-pointer w-full text-left pl-[10px] pr-5.5 text-sm py-2.5 hover:bg-[#E7F2F9] rounded-[5px] flex items-center gap-2"
                  >
                    <img src={Save} alt="Save" />
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isFlagModalOpen && (
        <Model className="max-w-[618px]" setIsOpen={setIsFlagModalOpen}>
          <FlagPost
            post_id={flaggedPost?.post_id}
            community_id={flaggedPost?.community_id}
            onSubmit={() => setShowSubmitReport(true)}
            setIsFlagModalOpen={setIsFlagModalOpen}
          />
        </Model>
      )}
      <DeleteModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        onDelete={handleDeletePost}
        loading={isLoading}
      />

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

export default CommunitySinglePost;
