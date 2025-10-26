import React, { useEffect, useRef, useState } from "react";
import arrowUp from "@assets/media/svgs/dashboard-svgs/arrow-up-btn.svg";
import arrowDowm from "@assets/media/svgs/dashboard-svgs/arrow-down-btn.svg";
import share from "@assets/media/svgs/dashboard-svgs/share.svg";
import comment from "@assets/media/svgs/dashboard-svgs/comment.svg";
import CommonInput from "@components/shared-components/inputs/common-input/common-input";
import searchCommunity from "@assets/media/svgs/dashboard-svgs/searchCommunity.svg";
import postImage from "@assets/media/images/dashboard-images/postFallback.png";
import dummyImage from "@assets/media/images/dummyUser.png";
import DummyUser from "@assets/media/images/dashboard-images/userDummy.png";
import commentIcon from "@assets/media/svgs/dashboard-svgs/comment.svg";
import goldenArrowUpIcon from "@assets/media/svgs/dashboard-svgs/goldenUpArrow.svg"
import goldenArrowDownIcon from "@assets/media/svgs/dashboard-svgs/goldenDownArrow.svg"
import goldenCommentIcon from "@assets/media/svgs/dashboard-svgs/commentsGoldenIcon.svg"
import shareGoldenIcon from "@assets/media/svgs/dashboard-svgs/shareGoldenIcon.svg"


import {
  useGetPopularCommunities,
  useGetPopularDoctors,
  useGetPopularPost,
} from "@src/hooks/use-website";
import { Link, useNavigate } from "react-router-dom";
import LoginOrSignupModal from "@components/model/login-or-signup-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ApiDeleteComment,
  ApiLikeComment,
  ApiLikePost,
  ApiParentCommentReply,
  ApiPostComment,
} from "@src/api/api-community-forum";
import { useGetCommunityPost } from "@src/hooks/use-community";
import { CommentItem } from "@components/careprovider/communityforum/comment-block";
import Spinner from "@components/loaders/spinner";
import { Send } from "lucide-react";
import FeedSkeleton from "@components/loaders/community-feed-loader";
import PostContent from "@components/post-content";
import toast from "react-hot-toast";

export default function Convience() {
  const [debouncedSearchText, setDebouncedSearchText] =
    useState(searchCommunity);

  const { data: popularPost } = useGetPopularPost();

  const {
    data: postData,
    isPending: PostsPending,
    isLoading,
  } = useGetCommunityPost();

  const queryClient = useQueryClient();
  const [localLock, setLocalLock] = useState(false);
  const [activePostActions, setActivePostActions] = useState(null);
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState();

  const [openComments, setOpenComments] = useState(null);

  const { mutateAsync: LikeMutation, isPending: LikeIsPending } = useMutation({
    mutationFn: (data) => ApiLikePost(data),

    onSuccess: async () => {
      queryClient.invalidateQueries(["useGetCommunityPost"]);
    },
    onError: (error) => {
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [localLikes, setLocalLikes] = useState<{
    [postId: number]: boolean | null;
  }>({});
  const [parentCommentReplyValue, setParentCommentReplyValue] = useState("");
  const [IsCommentReply, setIsCommentReply] = useState();

  const [parentCommentReplyId, setParentCommentReplyId] = useState([]);

  const [sharePostId, setSharePostId] = useState();

  useEffect(() => {
    const initialState: { [postId: number]: boolean | null } = {};
    initialState[popularPost?.payload?.id] = popularPost?.payload?.userLike?.is_like ?? null;
    setLocalLikes(initialState);
  }, [popularPost]);

  const buttons = [
    { btnText: "Vote", btnIcon: arrowUp, downarrow: arrowDowm },
    { btnText: "2.2k", btnIcon: comment },
    { btnText: "Share", btnIcon: share },
  ];


  const handleReaction = async (status: "like" | "dislike", post) => {
    setLocalLikes((prev) => {
      const current = prev[post.id] ?? null;

      setLocalCounts((prevCounts) => {
        let count = prevCounts[post.id] ?? 0;

        if (status === "like") {
          if (current === true) {
            count -= 1;
          } else {
            count += 1;
            if (current === false) {
            }
          }
        }

        if (status === "dislike") {
          if (current === true) {
            count -= 1;
          }
        }

        return { ...prevCounts, [post.id]: count };
      });

      if (status === "like") {
        return { ...prev, [post.id]: current === true ? null : true };
      } else {
        return { ...prev, [post.id]: current === false ? null : false };
      }
    });

    const data = {
      type:
        status === "like"
          ? localLikes[post?.id] === true
            ? "" 
            : "like"
          : localLikes[post?.id] === false
            ? "" 
            : "dislike",
      post_id: post?.id,
    };

    await LikeMutation(data);
  };

  const handleParentComment = (parentCommentId) => {
    setParentCommentReplyValue("");
    if (parentCommentReplyId.includes(parentCommentId)) {
      setParentCommentReplyId((prev) =>
        prev.filter((id) => id !== parentCommentId)
      );
    } else {
      setParentCommentReplyId((prev) => [...prev, parentCommentId]);
    }
  };

  const [replyId, setReplyId] = useState();
  const [replyParentId, setReplyParentId] = useState();
  const [search, setSearch] = useState("");
  const [localCounts, setLocalCounts] = useState<{
    [postId: number]: number;
  }>(0);

  const { data } = useGetPopularDoctors(debouncedSearchText);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(search);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCommunityClick = (id: string) => {
    if (userInfo) {
      if (userInfo?.role_type == "PATIENT") {
        navigate(`/patient/web/community/${id}`);
      }
      if (userInfo?.role_type == "CARE_PROVIDER") {
        navigate(`/care-provider/web/community/${id}`);
      }
    }
    if (userInfo?.role_type == "ADMIN") {
      setShowModal(true);
    }

    setShowModal(true);
  };

  const postsToRender = data?.data ?? postData?.records ?? [];

  const toggleComments = (post_id) => {
    setComment("");
    setPostId(post_id);
    setOpenComments(openComments === post_id ? null : post_id);
  };

  const handleCommentReaction = async (status, comment, postId) => {
    let newStatus = "";

    const userLike = comment?.userLike;

    if (status === "like") {
      if (userLike?.is_like === true) {
        newStatus = ""; 
      } else {
        newStatus = "like"; 
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

  const { mutateAsync: LikeParentCommentMutation } = useMutation({
    mutationFn: ({ commentId, data }) => ApiLikeComment(commentId, data),

    onSuccess: async () => {
      queryClient.invalidateQueries(["useGetCommunityPost"]);
    },
    onError: (error) => {
    },
  });

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

  const handleParentCommentReply = async (postId, parentCommentId, value) => {
    const data = {
      content: value,
      post_id: postId,
      parent_id: parentCommentId,
    };

    const handleClear = () => {
      if (inputRef.current) {
        inputRef.current.value = ""; 
      }
    };

    const {
      mutateAsync: ParentCommentReplyMutation,
    } = useMutation({
      mutationFn: ({ data, commentId }) =>
        ApiParentCommentReply(data, commentId),

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

    await ParentCommentReplyMutation({
      data,
      commentId: parentCommentId,
    });
  };

  const myId = JSON.parse(localStorage.getItem("userInfo"));

  const {
    mutateAsync: deleteCommentMutation,
  } = useMutation({
    mutationFn: (commentId, post_id) => ApiDeleteComment(commentId, post_id),

    onSuccess: async () => {
      toast.success("Comment Deleted Successfully");
      queryClient.invalidateQueries(["useGetCommunityPost"]); 
    },
    onError: (error) => {
    },
  });

  const handleDeleteComment = async (commentId, postId) => {
    const post_id = {
      post_id: postId,
    };
    await deleteCommentMutation(commentId, post_id);
  };

  const handleSendComment = async () => {
    if (!comment.trim() || !postId) return;

    const data = {
      content: comment,
      post_id: postId,
    };

    await commentsMutation(data);
  };

  const handleLogin = () => {
    queryClient.clear();


    localStorage.clear();
    navigate("/login");
  };

  const handleSignup = () => {
    queryClient.clear();


    localStorage.clear();
    navigate("/signup");
  };

  return (

    <section className="bg-[#F3F8FC] text-black py-16 max-w-8xl mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex md:flex-nowrap flex-wrap gap-4">
          <div className="lg:col-span-8 flex flex-col gap-2 mb-10">
            <div className="flex items-center space-x-3 mb-1">
              <img
                src={
                  popularPost?.payload?.user?.image
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${popularPost?.payload?.user?.image
                    }`
                    : dummyImage
                }
                alt="Cody Fisher"
                className="w-10 h-10 object-cover rounded-full"
              />
              <div>
                <h3 className="font-semibold">
                  {popularPost?.payload?.user?.first_name} {popularPost?.payload?.user?.last_name}
                </h3>
                <p className="text-sm text-gray-400">
                  Posted by: {popularPost?.payload?.user?.user_name}
                </p>
              </div>
            </div>

            <h2 className="text-[24px] font-bold mb-0">{popularPost?.payload?.title}</h2>
            <p className="text-black mb-3 font-normal text-[16px]">
              {popularPost?.payload?.content?.length > 250 ? (
                <>
                  {popularPost?.payload?.content.slice(0, 250)}...
                  <span className="text-[#8d8d8d] cursor-pointer">
                    {" "}
                    Read more
                  </span>
                </>
              ) : (
                popularPost?.payload?.content
              )}
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              <img
                src={
                  popularPost?.payload?.image
                    ? `${import.meta.env.VITE_APP_API_IMG_URL}${popularPost?.payload?.image
                    }`
                    : postImage
                }
                alt="Community discussion"
                className="md:w-[764px] w-full h-[291px] object-cover rounded-lg"
              />
            </div>

            <div>
              <div className="flex gap-2.5 mb-2.5">
                <div className="flex flex-wrap gap-2.5 mb-2.5">
                  <div className="flex items-center gap-2 bg-black rounded-[5px] px-1.5 py-1.5 min-w-[145px] min-h-[50px] justify-center">
                    <button
                      className="flex cursor-pointer items-center gap-2 min-w-[40px] justify-center"
                      onClick={() => handleReaction("like", popularPost?.payload)}
                      disabled={localLock || LikeIsPending || PostsPending}
                    >
                      {localLikes[popularPost?.payload?.id] === true ? (
                        <div className="bg-[#2A2A2A]  p-2 rounded-full">
                          <img
                            src={goldenArrowUpIcon}
                            className="py-0.5 px-1"
                            alt="Liked"
                          />
                        </div>
                      ) : (
                        <img
                          src={goldenArrowDownIcon}
                          className="rotate-180"
                          alt="Like"
                        />
                      )}
                      <span className="text-white font-normal">Vote</span>

                    </button>
                    <button
                      className="flex cursor-pointer items-center gap-2 min-w-[40px] justify-center"
                      onClick={() => handleReaction("dislike", popularPost?.payload)}
                      disabled={localLock || LikeIsPending || PostsPending}
                    >
                      {localLikes[popularPost?.payload?.id] === false ? (
                        <div className="bg-[#2A2A2A] p-1 rounded-full">
                          <img
                            src={goldenArrowUpIcon}
                            className="rotate-180 py-1.5 px-2"
                            alt="Dislike"
                          />
                        </div>
                      ) : (
                        <img src={goldenArrowDownIcon} alt="Dislike" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => toggleComments(popularPost?.payload?.id)}
                    className="flex items-center bg-black text-white rounded-[5px]  cursor-pointer gap-2 bg-[#E6E9EB] px-1.5 py-1.5 min-w-[88px] justify-center"
                  >
                    <img src={goldenCommentIcon} alt="Comments" />
                    {popularPost?.payload?._count?.comments}
                  </button>

                  <button
                    onClick={() => {
                      setSharePostId(popularPost?.payload?.id);
                    }}
                    className="flex items-center cursor-pointer gap-2 bg-black text-white rounded-[5px]  px-[15px] py-1 min-w-[78px] justify-center"
                  >
                    <img src={shareGoldenIcon} alt="Share" />
                    Share
                  </button>
                </div>
              </div>
              {openComments === popularPost?.payload?.id && (
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
                      className={`absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center w-9 h-9 rounded-full transition ${comment
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

                  {popularPost?.payload?.comments?.map((comment) => (
                    <div className="flex  items-center">
                      <CommentItem
                        comment={comment}
                        myId={myId}
                        postId={popularPost?.payload?.id}
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
                        localLikes={localLikes}
                        localCounts={localCounts}
                        handleReaction={handleReaction}
                        post={popularPost?.payload}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

           
          </div>

          <div className="hidden lg:block lg:col-span-2 "></div>

          <div className="lg:col-span-4 lg:w-[368px] flex-shrink-0 md:w-[292px] w-full">
            <div>
              <CommonInput
                placeholder="Search Communities "
                showImg={true}
                onChange={(e) => setSearch(e.target.value)}
                imgSrc={searchCommunity}
                imgLeft={true}
                inputClassName="text-base"
                containerClassName="w-full max-w-md border-0 px-5 py-3.5 rounded-[10px] mb-6"
                imgClassName="w-5 h-5"
              />


              <div className="bg-white  min-h-70 rounded-[10px] px-5 pt-4.5 pb-[4px] mb-4">
                <h4 className="font-bold md:text-[24px] text-[18px] mb-5.5">
                  Top Popular Communities
                </h4>
                {data?.records?.length === 0 ? (
                  <p className="text-center font-bold mt-20">No Data Found</p>
                ) : (
                  data?.records?.map((community, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCommunityClick(community.id)}
                      className="flex cursor-pointer items-center gap-3.5 py-[13px] border-b border-b-[#E6E6E6] last:border-b-0"
                    >
                      <img
                        src={
                          community?.profile_icon_image
                            ? `${import.meta.env.VITE_APP_API_IMG_URL}${community.profile_icon_image
                            }`
                            : dummyImage
                        }
                        alt={community.name}
                        className="w-[37px] object-cover h-[37px] rounded-full"
                      />
                      <p className="font-bold md:text-[19px] text-[14px]">
                        {community?.title}
                      </p>
                    </div>
                  ))
                )}

                {showModal && (
                  <LoginOrSignupModal
                    onSignup={() => handleSignup()}
                    onLogin={() => handleLogin()}
                    setShowModal={setShowModal}
                    onClose={() => setShowModal(false)}
                    isOpen={showModal}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
