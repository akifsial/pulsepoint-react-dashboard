import React, { useRef, useState } from "react";

import { Send } from "lucide-react";

import commentIcon from "@assets/media/svgs/dashboard-svgs/comment.svg";
import DummyUser from "@assets/media/images/dashboard-images/userDummy.png";

import arrowUpTrans from "@assets/media/svgs/dashboard-svgs/arrowUp.svg";
import dayjs from "dayjs";
import arrowDowm from "@assets/media/svgs/dashboard-svgs/arrow-down-btn.svg";
import arrowUp from "@assets/media/svgs/arrowUp.svg";
import { IoEllipsisHorizontal, IoEllipsisVerticalSharp } from "react-icons/io5";
import DropdownActions from "@src/Components/Dashboard-components/dropdownactions/dropdownactions";
import DeleteDropdownActions from "@src/Components/Dashboard-components/dropdownactions/deletedropdownactions";
import Spinner from "@src/Components/loaders/spinner";

export const CommentItem = ({
  comment,
  myId,
  postId,
  LikeIsPending,
  PostsPending,
  handleCommentReaction,
  parentCommentReplyId,
  handleParentComment,
  parentCommentReplyValue,
  setParentCommentReplyValue,
  handleParentCommentReply,
  IsCommentReply,
  setIsCommentReply,
  replyId,
  setReplyParentId,
  handleDeleteComment,
  inputRef,
}) => {
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  const isReplyVisible = activeReplyId === comment.id;

  const toggleReplies = () => {
    if (isReplyVisible) {
      setActiveReplyId(null); 
    } else {
      setActiveReplyId(comment.id); 
    }
  };

  const [replyLoading, setReplyLoading] = useState(false);

  const handleReply = async (postId, commentId, value) => {
    if (!replyValues[commentId]?.trim()) return;

    try {
      setReplyLoading(true);
      await handleParentCommentReply(postId, commentId, value[commentId]);
      setReplyValues((prev) => ({ ...prev, [commentId]: "" }));
    } finally {
      setReplyLoading(false);
    }
  };

  const [replyValues, setReplyValues] = useState({});

  const handleReplyChange = (id, value) => {
    setReplyValues((prev) => ({ ...prev, [id]: value }));
  };
  

  const [localLike, setLocalLike] = useState(comment?.userLike?.is_like ?? null);
const [localCount, setLocalCount] = useState(comment?.likeCount || 0);

const handleReactionClick = async (status: "like" | "dislike") => {
  let newStatus = localLike;
  let newCount = localCount;

  if (status === "like") {
    if (localLike === true) {
      newStatus = null;
      newCount = Math.max(0, newCount - 1);
    } else {
      newStatus = true;
      newCount = newCount + 1;
      if (localLike === false) {
      }
    }
  }

  if (status === "dislike") {
    if (localLike === false) {
      newStatus = null;
    } else {
      newStatus = false;
      if (localLike === true) {
        newCount = Math.max(0, newCount - 1);
      }
    }
  }

  setLocalLike(newStatus);
  setLocalCount(newCount);

  await handleCommentReaction(status, comment, postId);
};


  return (
    <div className="ml-4 mt-3">
      <div className="flex items-start relative gap-3 mb-3">
        <img
          src={
            comment?.user?.image
              ? `${import.meta.env.VITE_APP_API_IMG_URL}${comment?.user?.image}`
              : DummyUser
          }
          className="w-[43px] h-[43px] rounded-full object-cover border border-gray-200"
          alt="userIcon"
        />
        <div className="flex  flex-col text-[#252525] font-normal">
          <div className="">
            <p className="font-semibold">
              {comment?.user?.first_name} {comment?.user?.last_name}
            </p>
            <p className="text-[#00000] text-[12px]">
              Today at {dayjs(comment?.created_at).format("h:mm A")}
            </p>
            <p className="text-sm text-gray-700 mb-2.5">{comment?.content}</p>

            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="flex  items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-1.5 py-1.5 min-w-[88px] justify-center">
                    <button
                disabled={LikeIsPending}
                className="flex items-center gap-2"
                onClick={() => handleReactionClick("like")}
              >
                {localLike === true ? (
                  <div className="bg-black p-1.5 rounded-full">
                    <img src={arrowUp} className="py-0.5 px-1" alt="Liked" />
                  </div>
                ) : (
                  <img src={arrowDowm} className="rotate-180" alt="Like" />
                )}
                {localCount}
              </button>

              <button
                className="ps-2"
                disabled={LikeIsPending}
                onClick={() => handleReactionClick("dislike")}
              >
                {localLike === false ? (
                  <div className="bg-black p-1.5 rounded-full">
                    <img
                      src={arrowUp}
                      className="rotate-180 py-0.5 px-1"
                      alt="Dislike"
                    />
                  </div>
                ) : (
                  <img src={arrowDowm} alt="Dislike" />
                )}
              </button>

               
              </div>

              <button
                onClick={toggleReplies}
                className="flex cursor-pointer items-center gap-2 bg-[#E6E9EB] rounded-[32px] px-2 py-3 justify-center min-w-[78px]"
              >
                <img src={commentIcon} alt="Comments" />
                <span className="text-sm">{comment?.replies?.length || 0}</span>
              </button>

              {comment?.user?.id == myId?.id && (
                <div className="bg-grey-500 cursor-pointer">
                  <DeleteDropdownActions
                    onDelete={() => handleDeleteComment(comment?.id, postId)}
                    variant="simple"
                  />
                </div>
              )}
            </div>
            {isReplyVisible && (
              <div className="relative mb-3">
                

                <input
                  type="text"
                  placeholder="Reply..."
                  value={replyValues[comment.id] || ""}
                  className="w-full outline-none border border-gray-300 rounded-[32px] py-3 pr-14 pl-6 text-sm"
                  onChange={(e) =>
                    handleReplyChange(comment.id, e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      replyValues[comment.id]?.trim() &&
                      !replyLoading
                    ) {
                      handleReply(postId, comment.id, replyValues);
                    }
                  }}
                />

                <button
                  onClick={() => handleReply(postId, comment.id, replyValues)}

                  className={`absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center w-9 h-9 rounded-full transition ${
                    !replyValues[comment?.id]?.trim() || replyLoading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#007AB2] hover:bg-[#005f8e] cursor-pointer"
                  }`}
                >
                  {replyLoading ? (
                    <Spinner />
                  ) : (
                    <Send className="w-3.5 h-3.5 text-white" />
                  )}
                </button>
              </div>
            )}
          </div>

          {isReplyVisible && comment?.replies?.length > 0 && (
            <div className="mt-2">
              {comment.replies.map((reply) => (
                <div className="flex items-center gap-5">
                  <CommentItem
                    comment={reply}
                    myId={myId}
                    postId={postId}
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
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
